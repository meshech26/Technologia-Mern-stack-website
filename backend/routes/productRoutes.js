import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  addProductReview, // ✅ NEW
} from "../controllers/productController.js";

const router = express.Router();

// GET all products
router.get("/", getProducts);

// GET a single product by ID
router.get("/:id", getProductById);

// POST a new product
router.post("/", createProduct);

// ✅ POST a review to a specific product
router.post("/:id/reviews", addProductReview);

export default router;
