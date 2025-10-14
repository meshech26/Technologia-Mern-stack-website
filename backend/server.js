import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js"; // ✅ your main product API
import paymentRoutes from "./routes/paymentRoutes.js";
import stripeRoutes from "./routes/stripeRoutes.js";






dotenv.config();

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" })); // ✅ increase limit for Base64 image uploads

// Add this middleware
app.use("/api/payments", paymentRoutes);

app.use("/api/stripe", stripeRoutes);

// Connect to MongoDB
connectDB();

// __dirname setup for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static uploads folder (optional, if you still keep local files)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/api/products", productRoutes); // ✅ active product routes

// Root route
app.get("/", (req, res) => {
  res.send("✅ API is running and connected to MongoDB...");
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
