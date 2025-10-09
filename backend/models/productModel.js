import mongoose from "mongoose";

// 💬 Review Schema
const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

// 📦 Product Schema
const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true }, // Can be URL or Base64
    price: { type: Number, required: true },
    discountPrice: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String },
    reviews: [reviewSchema], // ✅ Added reviews array
  },
  { timestamps: true }
);

// ✅ Model Export
const Product = mongoose.model("Product", productSchema);
export default Product;
