import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Only accept cart-passed items
  const selectedItems = location.state?.selectedItems || [];
  const [paymentMethod, setPaymentMethod] = useState("card");

  const total = selectedItems.reduce(
    (sum, item) => sum + item.qty * item.discountPrice,
    0
  );

  const handlePayment = () => {
    if (!paymentMethod) return alert("Please select a payment method.");
    if (selectedItems.length === 0) return alert("No items selected for payment.");

    alert(`✅ Payment successful via ${paymentMethod.toUpperCase()}!`);
    navigate("/home");
  };

  return (
    <div className="pt-28 px-4 pb-20 min-h-screen bg-gradient-to-r from-blue-200 via-purple-100 to-pink-200">

      {/* 📍 Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <nav className="flex text-sm text-blue-800 font-medium space-x-2 items-center">
          <a href="/home" className="flex items-center hover:underline">
            <span className="mr-1">🏠</span> Home
          </a>
          <span className="text-gray-400">/</span>

          <a href="/cart" className="hover:underline">Shopping Cart</a>
          <span className="text-gray-400">/</span>

          <span className="text-gray-500">Checkout</span>
        </nav>
      </div>

      {/* 💳 Payment Summary Card */}
      <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Payment Summary
        </h2>

        {/* 🧾 Order Summary */}
        <div className="space-y-4 mb-6">
          {selectedItems.length === 0 ? (
            <p className="text-center text-gray-600">No products selected for checkout.</p>
          ) : (
            selectedItems.map((item, idx) => (
              <div key={idx} className="flex justify-between border-b pb-2">
                <span className="text-gray-700">{item.title}</span>
                <span className="text-gray-800 font-semibold">
                  {(item.qty * item.discountPrice).toLocaleString()} LKR
                </span>
              </div>
            ))
          )}
        </div>

        {/* 💰 Total */}
        {selectedItems.length > 0 && (
          <div className="text-right text-xl font-bold text-gray-900 mb-6">
            Total: {total.toLocaleString()} LKR
          </div>
        )}

        {/* 💳 Payment Method - Card Only */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Payment Method:</h3>

          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="payment"
              value="card"
              checked
              readOnly
              className="accent-blue-600"
            />
            <span className="text-gray-700 font-medium">Card Payment (Visa / MasterCard)</span>
          </label>

          <div className="mt-4 text-sm text-gray-600">
            Secure payment via Visa, MasterCard, or Debit Card.
          </div>
        </div>

        {/* 🧾 Pay Now */}
        <button
          onClick={handlePayment}
          disabled={selectedItems.length === 0}
          className={`w-full py-3 rounded-lg font-semibold transition ${
            selectedItems.length === 0
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;
