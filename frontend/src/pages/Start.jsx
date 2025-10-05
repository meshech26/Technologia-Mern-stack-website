import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Start = () => {
  const [expanded, setExpanded] = useState(false);
  const repairCardRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (expanded) setExpanded(false);
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [expanded]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-blue-200 via-purple-100 to-pink-200">
      {/* Hero Section */}
      <section className="w-full min-h-[70vh] flex items-center justify-center pt-32">
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 drop-shadow-sm">
            Welcome to Technologia
          </h1>
          <img
            src="/images/1.png"
            alt="Technologia Logo"
            className="w-40 h-40 mx-auto mb-8 rounded-full shadow-lg ring-4 ring-white object-cover"
          />
          <p className="text-gray-700 text-2xl md:text-3xl mb-8 font-semibold">
            Your one-stop shop for all mobile electronics & services
          </p>
          <Link
            to="/home"
            className="inline-block px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full hover:bg-blue-700 hover:scale-105 transition-all shadow-md"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-16 tracking-wide drop-shadow-sm">
            Features
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 transition-all duration-[3000ms]">
            {!expanded ? (
              <>
                {/* Feature 1 */}
                <div className="p-8 bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 border-t-4 border-blue-600">
                  <h3 className="text-3xl font-bold text-blue-700 mb-4">
                    Buy Electronics Anytime
                  </h3>
                  <p className="text-gray-700 text-xl leading-relaxed">
                    Purchase mobiles and gadgets instantly — faster with just one click.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="p-8 bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 border-t-4 border-purple-600">
                  <h3 className="text-3xl font-bold text-purple-700 mb-4">
                    Advanced Warranty Checker
                  </h3>
                  <p className="text-gray-700 text-xl leading-relaxed">
                    Verify your product warranty easily with our modern QR code system.
                  </p>
                </div>

                {/* Feature 3 - Clickable */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpanded(true);
                  }}
                  className="cursor-pointer p-8 bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 border-t-4 border-green-600"
                >
                  <h3 className="text-3xl font-bold text-green-700 mb-4">
                    Trusted Repair Service
                  </h3>
                  <p className="text-gray-700 text-xl leading-relaxed">
                    Quality repairs done right — ensuring every client’s satisfaction.
                  </p>
                  <p className="text-sm text-green-700 mt-2 underline">Click to expand</p>
                </div>

                {/* Feature 4 */}
                <div className="p-8 bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 border-t-4 border-pink-600">
                  <h3 className="text-3xl font-bold text-pink-700 mb-4">
                    Live ChatBot Support
                  </h3>
                  <p className="text-gray-700 text-xl leading-relaxed">
                    Get help anytime — repair queries, product suggestions, and accessory advice from our Tech Bot.
                  </p>
                </div>
              </>
            ) : (
              <div
                ref={repairCardRef}
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(false);
                }}
                className="col-span-full p-8 bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl border-t-4 border-green-600 text-left transition-all duration-[3000ms] cursor-pointer"
              >
                <h3 className="text-3xl font-bold text-green-700 mb-4 text-center">
                  Trusted Repair Service
                </h3>

                <div className="space-y-6 text-gray-700 text-base">
                  <div>
                    <h4 className="text-xl font-semibold text-blue-700">🔧 What We Repair</h4>
                    <ul className="list-disc pl-6">
                      <li>Smartphones (screen, battery, charging port, camera)</li>
                      <li>Laptops (keyboard, display, hardware upgrades)</li>
                      <li>Tablets & Accessories (connectivity issues, replacement)</li>
                      <li>Water damage diagnosis and recovery</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-blue-700">✅ Why Choose Us</h4>
                    <ul className="list-disc pl-6">
                      <li>Certified technicians with real experience</li>
                      <li>Original parts and transparent pricing</li>
                      <li>Fast turnaround — same-day for most devices</li>
                      <li>Customer satisfaction guaranteed</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-blue-700">📍 How It Works</h4>
                    <ol className="list-decimal pl-6">
                      <li>Bring or send your device to our service center</li>
                      <li>Receive a free diagnosis and repair quote</li>
                      <li>Track repair progress through your order ID</li>
                      <li>Pick up or get it delivered to your location</li>
                    </ol>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Start;
