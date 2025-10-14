import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedItems = location.state?.selectedItems || [];

  const [cardNumber, setCardNumber] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const total = selectedItems.reduce(
    (sum, item) => sum + item.qty * item.discountPrice,
    0
  );

  const handlePayment = () => {
    if (!cardNumber || !nameOnCard || !expiry || !cvv) {
      alert("Please fill in all card details.");
      return;
    }

    if (selectedItems.length === 0) {
      alert("No items selected for payment.");
      return;
    }

    alert(`✅ Payment successful!`);
    navigate("/home");
  };

  return (
    <div className="pt-28 px-4 pb-20 min-h-screen bg-gradient-to-r from-blue-200 via-purple-100 to-pink-200">

      {/* 📍 Breadcrumb */}
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

      {/* 💳 Payment Section */}
      <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-md space-y-6">

        <h2 className="text-3xl font-bold text-gray-800 text-center">Payment Summary</h2>

        {/* 🧾 Cart Items */}
        {selectedItems.length === 0 ? (
          <p className="text-center text-gray-600">No products selected for checkout.</p>
        ) : (
          <div className="space-y-3">
            {selectedItems.map((item, idx) => (
              <div key={idx} className="flex justify-between border-b pb-2">
                <span className="text-gray-700">{item.title}</span>
                <span className="text-gray-800 font-semibold">
                  {(item.qty * item.discountPrice).toLocaleString()} LKR
                </span>
              </div>
            ))}
          </div>
        )}

        {/* 💰 Total */}
        {selectedItems.length > 0 && (
          <div className="text-right text-xl font-bold text-gray-900 border-t pt-4">
            Total: {total.toLocaleString()} LKR
          </div>
        )}

        {/* 💳 Card Payment Form */}
        {selectedItems.length > 0 && (
          <>
            <h3 className="text-lg font-semibold text-gray-800 mt-6">Card Information</h3>

            {/* Card Icons */}
            <div className="flex space-x-3 mb-4">
              <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-6" />
              <img src="https://img.icons8.com/color/48/mastercard.png" alt="MasterCard" className="h-6" />
              <img src="https://img.icons8.com/color/48/amex.png" alt="Amex" className="h-6" />
            </div>

            {/* Card Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card number<span className="text-red-500 ml-1">*</span></label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="Card number"
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name on card<span className="text-red-500 ml-1">*</span></label>
                <input
                  type="text"
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                  placeholder="Name on card"
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry date<span className="text-red-500 ml-1">*</span></label>
                  <input
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV<span className="text-red-500 ml-1">*</span></label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="CVV"
                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* ⛳ Pay Now */}
            <button
              onClick={handlePayment}
              className="mt-6 bg-orange-500 text-white py-3 w-full rounded-lg hover:bg-orange-600 transition"
            >
              Pay Now
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;
