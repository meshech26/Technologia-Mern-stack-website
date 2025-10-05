// src/pages/Repair.jsx
import React from "react";

const Repair = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-purple-100 via-blue-100 to-pink-100 pt-32 px-4 pb-20">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md shadow-lg rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Repair Services
        </h1>

        <p className="text-gray-700 text-lg mb-8 text-center">
          Get your devices fixed by trusted professionals — fast, affordable, and reliable.
        </p>

        <div className="space-y-6">
          {/* Section 1 */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">
              🔧 What We Repair
            </h2>
            <ul className="list-disc pl-6 text-gray-700 text-base">
              <li>Smartphones (screen, battery, charging port, camera)</li>
              <li>Laptops (keyboard, display, hardware upgrades)</li>
              <li>Tablets & Accessories (connectivity issues, replacement)</li>
              <li>Water damage diagnosis and recovery</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">
              ✅ Why Choose Us
            </h2>
            <ul className="list-disc pl-6 text-gray-700 text-base">
              <li>Certified technicians with real experience</li>
              <li>Original parts and transparent pricing</li>
              <li>Fast turnaround — same-day for most devices</li>
              <li>Customer satisfaction guaranteed</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">
              📍 How It Works
            </h2>
            <ol className="list-decimal pl-6 text-gray-700 text-base">
              <li>Bring or send your device to our service center</li>
              <li>Receive a free diagnosis and repair quote</li>
              <li>Track repair progress through your order ID</li>
              <li>Pick up or get it delivered to your location</li>
            </ol>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-full text-lg hover:bg-blue-700 transition">
            Book a Repair
          </button>
        </div>
      </div>
    </div>
  );
};

export default Repair;
