import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import Warranty from "../models/Warranty.js";
import jsQR from "jsqr";
import QRCode from 'qrcode';
import sharp from 'sharp';
import authMiddleware from "../middleware/authMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

// --- MULTER SETUP ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "qr-" + uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });
const tempStorage = multer.memoryStorage();
const tempUpload = multer({ storage: tempStorage });
const decodeQRCode = async (imageBuffer) => {
  try {
    const { data, info } = await sharp(imageBuffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const clampedData = new Uint8ClampedArray(data);
    const decodedQR = jsQR(clampedData, info.width, info.height);
    if (decodedQR && decodedQR.data) {
      return { success: true, data: decodedQR.data };
    }
    return { success: false, error: "No QR code could be detected." };
  } catch (error) {
    return { success: false, error: `Image processing failed: ${error.message}` };
  }
};

// =================================================================
// ==================== PUBLIC ROUTES (NO AUTH) ====================
// =================================================================

// CREATE a new warranty
router.post("/", upload.single("qrImage"), async (req, res) => {
  try {
    const { productName, productId, customerEmail, purchaseDate } = req.body;
    const warranty = new Warranty({ productName, productId, customerEmail, purchaseDate });
    await warranty.save();
    res.status(201).json(warranty);
  } catch (err) {
    res.status(500).json({ message: "Failed to create warranty", error: err.message });
  }
});

// CHECK warranty by QR code
router.post("/check-qr", tempUpload.single("qrImage"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No QR image uploaded" });
    const decodeResult = await decodeQRCode(req.file.buffer);
    if (!decodeResult.success) return res.status(400).json({ found: false, message: `QR decoding failed: ${decodeResult.error}` });
    let productIdFromQR = decodeResult.data.trim().replace('PRODUCT_ID:', '').trim();
    const warranty = await Warranty.findOne({ productId: productIdFromQR });
    if (!warranty) return res.json({ found: false, message: `No warranty for product ID: ${productIdFromQR}` });
    const expiryDate = new Date(warranty.purchaseDate);
    expiryDate.setMonth(expiryDate.getMonth() + warranty.warrantyMonths);
    res.json({ found: true, ...warranty.toObject(), expiryDate });
  } catch (err) {
    res.status(500).json({ message: "Error checking warranty", error: err.message });
  }
});

// CHECK warranty by Product ID
router.post("/check", async (req, res) => {
    // ... (logic for this route remains the same)
  try {
    const { productId } = req.body;
    const warranty = await Warranty.findOne({ productId });
    if (!warranty) return res.json({ status: null });
    const expiryDate = new Date(warranty.purchaseDate);
    expiryDate.setMonth(expiryDate.getMonth() + warranty.warrantyMonths);
    res.json({ productName: warranty.productName, status: warranty.status, expiryDate });
  } catch (err) {
    res.status(500).json({ message: "Error checking warranty", error: err.message });
  }
});

// ==================================================================
// ==================== ADMIN ROUTES (PROTECTED) ====================
// ==================================================================

// --- CORRECTED ROUTE ORDER ---

// READ ALL warranties for the dashboard (General GET)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { search, status, fromDate, toDate } = req.query;
    let filter = {};
    if (search) {
      filter.$or = [
        { warrantyId: { $regex: search, $options: 'i' } },
        { productId: { $regex: search, $options: 'i' } },
        { productName: { $regex: search, $options: 'i' } }
      ];
    }
    if (status && status !== 'ALL') filter.status = status;
    if (fromDate || toDate) {
      filter.purchaseDate = {};
      if (fromDate) filter.purchaseDate.$gte = new Date(fromDate);
      if (toDate) filter.purchaseDate.$lte = new Date(toDate);
    }
    const warranties = await Warranty.find(filter).sort({ createdAt: -1 });
    res.json(warranties);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch warranties", error: err.message });
  }
});

// GENERATE AND SAVE a QR code for a specific warranty (Specific GET with action)
router.get("/:id/generate-and-save-qr", authMiddleware, async (req, res) => {
    try {
        const warranty = await Warranty.findById(req.params.id);
        if (!warranty) return res.status(404).json({ message: "Warranty not found" });
        const qrData = `PRODUCT_ID:${warranty.productId}`;
        const qrCodeBuffer = await QRCode.toBuffer(qrData, { width: 400, margin: 2, errorCorrectionLevel: 'H' });
        const qrFilename = `qr-generated-${warranty.productId}-${Date.now()}.png`;
        const uploadsDir = path.join(__dirname, "../uploads");
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }
        const qrPath = path.join(uploadsDir, qrFilename);
        await sharp(qrCodeBuffer).toFile(qrPath);
        const updatedWarranty = await Warranty.findByIdAndUpdate(req.params.id, { qrImage: qrFilename }, { new: true });
        const qrCodeDataURL = `data:image/png;base64,${qrCodeBuffer.toString('base64')}`;
        res.json({ ...updatedWarranty.toObject(), qrCodeImage: qrCodeDataURL });
    } catch (err) {
        console.error("CRITICAL ERROR in generate-and-save-qr:", err);
        res.status(500).json({ message: "Failed to generate and save QR code", error: err.message });
    }
});

// DOWNLOAD a QR code for a specific warranty (Specific GET with action)
router.get("/:id/download-qr", authMiddleware, async (req, res) => {
    try {
        const warranty = await Warranty.findById(req.params.id);
        if (!warranty) return res.status(404).json({ message: "Warranty not found" });
        const qrData = `PRODUCT_ID:${warranty.productId}`;
        const qrCodeBuffer = await QRCode.toBuffer(qrData, { width: 400, margin: 2, errorCorrectionLevel: 'H' });
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Content-Disposition', `attachment; filename="qr-${warranty.productId}.png"`);
        res.send(qrCodeBuffer);
    } catch (err) {
        res.status(500).json({ message: "Failed to generate QR code for download", error: err.message });
    }
});

// GET A SINGLE warranty by its ID (Most general GET by ID - MUST BE LAST)
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const warranty = await Warranty.findById(req.params.id);
        if (!warranty) {
            return res.status(404).json({ message: "Warranty not found" });
        }
        res.json(warranty);
    } catch (err) {
        // This error often happens if the ID format is invalid
        console.error(`Error fetching warranty with ID: ${req.params.id}`, err);
        res.status(500).json({ message: "Failed to fetch warranty", error: err.message });
    }
});

// UPDATE a warranty
router.put("/:id", authMiddleware, upload.single("qrImage"), async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file) updateData.qrImage = req.file.filename;
        const updatedWarranty = await Warranty.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedWarranty) return res.status(404).json({ message: "Warranty not found" });
        res.json(updatedWarranty);
    } catch (err) {
        res.status(500).json({ message: "Failed to update warranty", error: err.message });
    }
});


// DELETE a warranty
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const deletedWarranty = await Warranty.findByIdAndDelete(req.params.id);
        if (!deletedWarranty) return res.status(404).json({ message: "Warranty not found" });
        res.json({ message: "Warranty deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete warranty", error: err.message });
    }
});

// UPLOAD QR MANUALLY to a warranty
router.put("/:id/upload-qr", authMiddleware, upload.single("qrImage"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No QR image uploaded" });
        const updatedWarranty = await Warranty.findByIdAndUpdate(req.params.id, { qrImage: req.file.filename }, { new: true });
        if (!updatedWarranty) return res.status(404).json({ message: "Warranty not found" });
        res.json(updatedWarranty);
    } catch (err) {
        res.status(500).json({ message: "Failed to upload QR image", error: err.message });
    }
});

// --- Re-pasting the unchanged routes for completeness ---
router.post("/", upload.single("qrImage"), async (req, res) => {
    try {
      const { productName, productId, customerEmail, purchaseDate } = req.body;
      const warranty = new Warranty({ productName, productId, customerEmail, purchaseDate });
      await warranty.save();
      res.status(201).json(warranty);
    } catch (err) {
      res.status(500).json({ message: "Failed to create warranty", error: err.message });
    }
});
router.post("/check-qr", tempUpload.single("qrImage"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No QR image uploaded" });
    const decodeResult = await decodeQRCode(req.file.buffer);
    if (!decodeResult.success) return res.status(400).json({ found: false, message: `QR decoding failed: ${decodeResult.error}` });
    let productIdFromQR = decodeResult.data.trim().replace('PRODUCT_ID:', '').trim();
    const warranty = await Warranty.findOne({ productId: productIdFromQR });
    if (!warranty) return res.json({ found: false, message: `No warranty for product ID: ${productIdFromQR}` });
    const expiryDate = new Date(warranty.purchaseDate);
    expiryDate.setMonth(expiryDate.getMonth() + warranty.warrantyMonths);
    res.json({ found: true, ...warranty.toObject(), expiryDate });
  } catch (err) {
    res.status(500).json({ message: "Error checking warranty", error: err.message });
  }
});
router.post("/check", async (req, res) => {
  try {
    const { productId } = req.body;
    const warranty = await Warranty.findOne({ productId });
    if (!warranty) return res.json({ status: null });
    const expiryDate = new Date(warranty.purchaseDate);
    expiryDate.setMonth(expiryDate.getMonth() + warranty.warrantyMonths);
    res.json({ productName: warranty.productName, status: warranty.status, expiryDate });
  } catch (err) {
    res.status(500).json({ message: "Error checking warranty", error: err.message });
  }
});
router.put("/:id", authMiddleware, upload.single("qrImage"), async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file) updateData.qrImage = req.file.filename;
        const updatedWarranty = await Warranty.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedWarranty) return res.status(404).json({ message: "Warranty not found" });
        res.json(updatedWarranty);
    } catch (err) {
        res.status(500).json({ message: "Failed to update warranty", error: err.message });
    }
});
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const deletedWarranty = await Warranty.findByIdAndDelete(req.params.id);
        if (!deletedWarranty) return res.status(404).json({ message: "Warranty not found" });
        res.json({ message: "Warranty deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete warranty", error: err.message });
    }
});
router.put("/:id/upload-qr", authMiddleware, upload.single("qrImage"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No QR image uploaded" });
        const updatedWarranty = await Warranty.findByIdAndUpdate(req.params.id, { qrImage: req.file.filename }, { new: true });
        if (!updatedWarranty) return res.status(404).json({ message: "Warranty not found" });
        res.json(updatedWarranty);
    } catch (err) {
        res.status(500).json({ message: "Failed to upload QR image", error: err.message });
    }
});


export default router;