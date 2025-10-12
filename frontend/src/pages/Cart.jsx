import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addToCart } from "../redux/cartSlice";
import { useNavigate, Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);

  // ✅ State to track selected items (by _id)
  const [selectedItems, setSelectedItems] = useState(
    cartItems.map((item) => item._id) // default: all selected
  );

  const updateQuantity = (product, newQty) => {
    if (newQty < 1) return;
    dispatch(
      addToCart({
        ...product,
        qty: newQty,
      })
    );
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
  };

  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  const selectedCartItems = cartItems.filter((item) =>
    selectedItems.includes(item._id)
  );

  const total = selectedCartItems.reduce(
    (sum, item) => sum + item.qty * item.discountPrice,
    0
  );

  const handleCheckout = () => {
    if (selectedCartItems.length === 0) {
      alert("Please select at least one product to proceed.");
      return;
    }

    // Optional: pass selectedCartItems via state
    navigate("/payment", { state: { selectedItems: selectedCartItems } });
  };

  return (
    <div className="pt-28 px-6 pb-12 bg-gradient-to-r from-blue-200 via-purple-100 to-pink-200 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="empty-cart"
              className="mx-auto w-16 mb-4 opacity-70"
            />
            <p className="text-gray-600 text-lg mb-4">
              There are no items in your cart
            </p>
            <Link
              to="/home"
              className="bg-gray-800 text-white px-8 py-3 rounded-md hover:bg-gray-900 transition"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className={`flex flex-col sm:flex-row justify-between items-center border rounded-lg p-4 ${
                  selectedItems.includes(item._id) ? "bg-gray-50" : "bg-gray-100"
                }`}
              >
                {/* Left: Checkbox + Image + Text */}
                <div className="flex items-center space-x-4 w-full sm:w-2/3">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item._id)}
                    onChange={() => handleCheckboxChange(item._id)}
                    className="w-5 h-5 accent-blue-600"
                  />
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-contain"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {item.description || "No description available"}
                    </p>
                  </div>
                </div>

                {/* Right: Quantity + Remove + Price */}
                <div className="flex flex-col items-center sm:items-end mt-4 sm:mt-0 gap-3 w-full sm:w-1/3">
                  <div className="flex items-center space-x-3">
                    <button
                      className="w-8 h-8 border rounded hover:bg-gray-100"
                      onClick={() => updateQuantity(item, item.qty - 1)}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={item.qty}
                      onChange={(e) =>
                        updateQuantity(item, Number(e.target.value) || 1)
                      }
                      className="w-12 text-center border rounded"
                    />
                    <button
                      className="w-8 h-8 border rounded hover:bg-gray-100"
                      onClick={() => updateQuantity(item, item.qty + 1)}
                    >
                      +
                    </button>
                    <button
                      className="ml-3 text-red-500 hover:underline"
                      onClick={() => handleRemove(item._id)}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="font-semibold text-gray-700 text-right">
                    {(item.discountPrice * item.qty).toLocaleString()} LKR
                  </div>
                </div>
              </div>
            ))}

            {/* Total + Checkout */}
            <div className="text-right pt-6 border-t mt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Total: {total.toLocaleString()} LKR
              </h3>
              <button
                onClick={handleCheckout}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
              >
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
