// src/pages/PaymentSuccess.jsx
import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen pt-32 bg-green-50 text-center px-6">
      <div className="max-w-2xl mx-auto bg-white p-10 rounded-xl shadow-md">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          ✅ Payment Successful!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Thank you for your purchase. Your order is now being processed.
        </p>

        <img
          src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
          alt="Success"
          className="w-24 h-24 mx-auto mb-6"
        />

        <Link
          to="/order-history"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          My orders
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
