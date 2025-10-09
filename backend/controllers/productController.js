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
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Create new product
// @route POST /api/products
export const createProduct = async (req, res) => {
  try {
    const { title, image, price, discountPrice, category, description } = req.body;

    if (!title || !image || !price || !discountPrice || !category) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const newProduct = new Product({
      title,
      image, // Base64 string or image URL
      price,
      discountPrice,
      category,
      description,
      reviews: [], // initialize empty reviews array
    });

    const createdProduct = await newProduct.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Add a product review
// @route POST /api/products/:id/reviews
export const addProductReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const { name, rating, comment } = req.body;

    if (product) {
      const review = {
        name,
        rating: Number(rating),
        comment,
      };

      // push new review and save
      product.reviews.push(review);
      await product.save();

      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
