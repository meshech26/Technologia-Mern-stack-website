import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ title, image, price, discountPrice, onCartClick }) => {
  return (
    <div className="relative border rounded-lg shadow-md p-4 bg-white 
                    hover:shadow-2xl hover:-translate-y-2 transition duration-500 transform">
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
      <div className="text-center mt-2 mb-4">
        <p className="text-red-600 font-semibold text-sm uppercase">
          Cash Discount Price
        </p>
        <p className="text-red-700 text-2xl font-bold">{discountPrice} LKR</p>
      </div>

      {/* Cart button (now at the bottom) */}
      <div className="flex justify-center">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          onClick={() =>
            onCartClick({ title, image, price, discountPrice })
          }
        >
          <FaShoppingCart />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
