import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaStar } from "react-icons/fa";

const ProductModel = ({ product, onClose }) => {
  if (!product) return null;

  const [count, setCount] = useState(1);
  const [reviews, setReviews] = useState([
    { user: "Ravindu", text: "Great product, worth the price!", rating: 5 },
    { user: "Minali", text: "Good quality and fast delivery.", rating: 4 },
  ]);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setCount(value === "" ? "" : Math.max(1, Number(value)));
  };

  const handleAddReview = () => {
    if (newReview.trim() && newRating > 0) {
      setReviews([
        { user: "You", text: newReview.trim(), rating: newRating },
        ...reviews,
      ]);
      setNewReview("");
      setNewRating(0);
      setHoverRating(0);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 rounded-[20px] overflow-hidden m-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-lg shadow-xl w-[90%] max-w-5xl p-8 overflow-y-auto max-h-[90vh] relative"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ❌ Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-black"
            onClick={onClose}
          >
            <FaTimes size={20} />
          </button>

          {/* 🔍 Main Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Left: Image */}
            <div className="flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="w-full max-h-[400px] object-contain"
              />
            </div>

            {/* Right: Details */}
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">
                {product.title}
              </h2>

              <p className="text-lg font-bold text-gray-700">
                Category:{" "}
                <span className="capitalize font-normal">
                  {product.category}
                </span>
              </p>

              <p className="text-lg font-bold text-gray-700">
                Description:{" "}
                <span className="font-normal">{product.description}</span>
              </p>

              <p className="text-lg font-bold text-gray-700">
                Original Price:{" "}
                <span className="line-through font-normal text-gray-500">
                  {product.price.toLocaleString()} LKR
                </span>
              </p>

              <p className="text-lg font-bold text-gray-700">
                Discounted Price:{" "}
                <span className="text-red-600 font-normal">
                  {product.discountPrice.toLocaleString()} LKR
                </span>
              </p>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-4 mt-4">
                <button
                  className="w-8 h-8 border rounded hover:bg-gray-100"
                  onClick={() =>
                    setCount((c) => Math.max(1, Number(c || 1) - 1))
                  }
                >
                  -
                </button>

                <input
                  type="text"
                  value={count}
                  onChange={handleInputChange}
                  className="w-16 text-center border rounded p-1 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                  className="w-8 h-8 border rounded hover:bg-gray-100"
                  onClick={() => setCount((c) => Number(c || 1) + 1)}
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button className="mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                Add to Cart
              </button>
            </div>
          </div>

          {/* 🌟 Reviews Section */}
          <div className="border-t pt-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Customer Reviews
            </h3>

            {/* Existing Reviews */}
            <div className="space-y-3 mb-6 max-h-[200px] overflow-y-auto pr-2">
              {reviews.map((r, idx) => (
                <div
                  key={idx}
                  className="border p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-gray-800">{r.user}</p>
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < r.rating ? "fill-current" : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">{r.text}</p>
                </div>
              ))}
            </div>

            {/* Add Review */}
            <div className="flex flex-col gap-3">
              {/* Star Selector */}
              <div className="flex items-center gap-1 text-xl text-yellow-500">
                {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <FaStar
                      key={index}
                      className={`cursor-pointer transition ${
                        ratingValue <= (hoverRating || newRating)
                          ? "fill-current"
                          : "text-gray-300"
                      }`}
                      onMouseEnter={() => setHoverRating(ratingValue)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setNewRating(ratingValue)}
                    />
                  );
                })}
                <span className="text-sm text-gray-600 ml-2">
                  {newRating ? `${newRating} / 5` : ""}
                </span>
              </div>

              {/* Comment */}
              <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Write your review..."
                className="flex-grow border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                rows={2}
              />

              <button
                onClick={handleAddReview}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-fit"
              >
                Post Review
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductModel;
