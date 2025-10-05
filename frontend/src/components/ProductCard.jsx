// src/components/ProductCard.jsx
import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ title, image, price, discountPrice }) => {
  return (
    <div className="relative border rounded-lg shadow-md hover:shadow-lg transition p-4 bg-white">
      {/* Cart button (top-right) */}
      <button className="absolute top-2 right-2 p-2 border rounded-md hover:bg-gray-100">
        <FaShoppingCart className="text-gray-600" />
      </button>

      {/* Product Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-contain mb-4"
      />

      {/* Product Title */}
      <h3 className="text-lg font-semibold text-center">{title}</h3>

      {/* Original Price */}
      <p className="text-gray-500 text-center line-through">{price} LKR</p>

      {/* Cash Discount Section */}
      <div className="text-center mt-2">
        <p className="text-red-600 font-semibold text-sm uppercase">
          Cash Discount Price
        </p>
        <p className="text-red-700 text-2xl font-bold">{discountPrice} LKR</p>
      </div>
    </div>
  );
};

export default ProductCard;
