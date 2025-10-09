import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);       // GET all products
router.get("/:id", getProductById); // GET single product
router.post("/", createProduct);    // POST new product

export default router;
