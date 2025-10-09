import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true }, // will store base64 string
    price: { type: Number, required: true },
    discountPrice: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
