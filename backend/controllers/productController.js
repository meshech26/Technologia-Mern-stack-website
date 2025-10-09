import Product from "../models/productModel.js";

// @desc Get all products
// @route GET /api/products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get single product by ID
// @route GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create new product (with Base64 image)
// @route POST /api/products
export const createProduct = async (req, res) => {
  try {
    const { title, image, price, discountPrice, category, description } = req.body;

    if (!title || !image || !price || !discountPrice || !category) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const newProduct = new Product({
      title,
      image, // Base64 string
      price,
      discountPrice,
      category,
      description,
    });

    const createdProduct = await newProduct.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
