import React, { useState, useEffect } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCartItems(JSON.parse(saved));
  }, []);

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (index, newQty) => {
    if (newQty < 1) return;
    const updated = [...cartItems];
    updated[index].quantity = newQty;
    setCartItems(updated);
  };

  const removeItem = (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.discountPrice,
    0
  );

  return (
    <div className="pt-28 px-6 pb-12 bg-gradient-to-r from-blue-200 via-purple-100 to-pink-200 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center justify-between border rounded-lg p-4 bg-gray-50"
              >
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-contain"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.title}
                    </h2>
                    <p className="text-red-600 font-bold">
                      {item.discountPrice} LKR
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mt-3 sm:mt-0">
                  {/* Quantity controls */}
                  <button
                    className="w-8 h-8 border rounded hover:bg-gray-100"
                    onClick={() =>
                      updateQuantity(index, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(index, Number(e.target.value) || 1)
                    }
                    className="w-12 text-center border rounded"
                  />
                  <button
                    className="w-8 h-8 border rounded hover:bg-gray-100"
                    onClick={() =>
                      updateQuantity(index, item.quantity + 1)
                    }
                  >
                    +
                  </button>

                  {/* Remove */}
                  <button
                    className="ml-4 text-red-500 hover:underline"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </button>
                </div>

                <div className="font-semibold text-gray-700 mt-2 sm:mt-0">
                  {(item.discountPrice * item.quantity).toLocaleString()} LKR
                </div>
              </div>
            ))}

            <div className="text-right pt-4 border-t mt-6">
              <h3 className="text-xl font-bold text-gray-800">
                Total: {total.toLocaleString()} LKR
              </h3>
              <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
