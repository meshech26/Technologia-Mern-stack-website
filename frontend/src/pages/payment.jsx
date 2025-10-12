import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get selected items passed from Cart
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
        <div className="text-right text-xl font-bold text-gray-900 mb-6">
          Total: {total.toLocaleString()} LKR
        </div>

        {/* 💳 Payment Method */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Select Payment Method:</h3>

          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
                className="accent-blue-600"
              />
              <span className="text-gray-700 font-medium">Card Payment (Visa / MasterCard)</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="payment"
                value="koko"
                checked={paymentMethod === "koko"}
                onChange={() => setPaymentMethod("koko")}
                className="accent-purple-600"
              />
              <span className="text-gray-700 font-medium">Koko (Buy Now Pay Later)</span>
            </label>
          </div>

          {/* Show extra description */}
          <div className="mt-4 text-sm text-gray-600">
            {paymentMethod === "card" && (
              <p>Secure payment via Visa, MasterCard, or Debit Card.</p>
            )}
            {paymentMethod === "koko" && (
              <p>You will be redirected to Koko to complete the payment.</p>
            )}
          </div>
        </div>

        {/* 🧾 Pay Now */}
        <button
          onClick={handlePayment}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;
