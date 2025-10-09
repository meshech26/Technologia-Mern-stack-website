import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Product from "./models/productModel.js";
import products from "./data/products.js";

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    await Product.deleteMany(); // clear old data
    await Product.insertMany(products);
    console.log("✅ Products added successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
