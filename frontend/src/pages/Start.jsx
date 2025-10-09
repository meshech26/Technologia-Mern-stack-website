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
                    𝐵𝑢𝑦 𝐸𝑙𝑒𝑐𝑡𝑟𝑜𝑛𝑖𝑐𝑠 𝐴𝑛𝑦𝑡𝑖𝑚𝑒
                  </h3>
                  <p className="text-gray-700 text-xl leading-relaxed">
                    Purchase mobiles and gadgets instantly faster with just one click.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="p-8 bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 border-t-4 border-purple-600">
                  <h3 className="text-3xl font-bold text-purple-700 mb-4">
                    𝐴𝑑𝑣𝑎𝑛𝑐𝑒𝑑 𝑊𝑎𝑟𝑟𝑎𝑛𝑡𝑦 𝐶𝘩𝑒𝑐𝑘𝑒𝑟
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
                    𝑇𝑟𝑢𝑠𝑡𝑒𝑑 𝑅𝑒𝑝𝑎𝑖𝑟 𝑆𝑒𝑟𝑣𝑖𝑐𝑒
                  </h3>
                  <p className="text-gray-700 text-xl leading-relaxed">
                    Quality repairs done right ensuring every client's satisfaction.
                  </p>
                  <p className="text-sm text-green-700 mt-2 underline">Click to expand</p>
                </div>

                {/* Feature 4 */}
                <div className="p-8 bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 border-t-4 border-pink-600">
                  <h3 className="text-3xl font-bold text-pink-700 mb-4">
                    𝐿𝑖𝑣𝑒 𝐶ℎ𝑎𝑡𝐵𝑜𝑡 𝑆𝑢𝑝𝑝𝑜𝑟𝑡
                  </h3>
                  <p className="text-gray-700 text-xl leading-relaxed">
                    Get help anytime repair queries, product suggestions, and accessory advice from our Tech Bot.
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
                  𝑇𝑟𝑢𝑠𝑡𝑒𝑑 𝑅𝑒𝑝𝑎𝑖𝑟 𝑆𝑒𝑟𝑣𝑖𝑐𝑒
                </h3>

                <div className="space-y-6 text-gray-700 text-base">
                  <div>
                    <h4 className="text-xl font-semibold text-blue-700">What We Repair</h4>
                    <ul className="list-disc pl-6 font-semibold">
                      <li>𝑆𝑚𝑎𝑟𝑡𝑝𝘩𝑜𝑛𝑒𝑠 (𝑠𝑐𝑟𝑒𝑒𝑛, 𝑏𝑎𝑡𝑡𝑒𝑟𝑦, 𝑐𝘩𝑎𝑟𝑔𝑖𝑛𝑔 𝑝𝑜𝑟𝑡, 𝑐𝑎𝑚𝑒𝑟𝑎)</li>
                      <li>𝐿𝑎𝑝𝑡𝑜𝑝𝑠 (𝑘𝑒𝑦𝑏𝑜𝑎𝑟𝑑, 𝑑𝑖𝑠𝑝𝑙𝑎𝑦, 𝘩𝑎𝑟𝑑𝑤𝑎𝑟𝑒 𝑢𝑝𝑔𝑟𝑎𝑑𝑒𝑠)</li>
                      <li>𝑇𝑎𝑏𝑙𝑒𝑡𝑠 & 𝐴𝑐𝑐𝑒𝑠𝑠𝑜𝑟𝑖𝑒𝑠 (𝑐𝑜𝑛𝑛𝑒𝑐𝑡𝑖𝑣𝑖𝑡𝑦 𝑖𝑠𝑠𝑢𝑒𝑠, 𝑟𝑒𝑝𝑙𝑎𝑐𝑒𝑚𝑒𝑛𝑡)</li>
                      <li>𝑊𝑎𝑡𝑒𝑟 𝑑𝑎𝑚𝑎𝑔𝑒 𝑑𝑖𝑎𝑔𝑛𝑜𝑠𝑖𝑠 𝑎𝑛𝑑 𝑟𝑒𝑐𝑜𝑣𝑒𝑟𝑦</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-blue-700">Why Choose Us</h4>
                    <ul className="list-disc pl-6 font-semibold">
                      <li>𝐶𝑒𝑟𝑡𝑖𝑓𝑖𝑒𝑑 𝑡𝑒𝑐𝘩𝑛𝑖𝑐𝑖𝑎𝑛𝑠 𝑤𝑖𝑡𝘩 𝑟𝑒𝑎𝑙 𝑒𝑥𝑝𝑒𝑟𝑖𝑒𝑛𝑐𝑒</li>
                      <li>𝑂𝑟𝑖𝑔𝑖𝑛𝑎𝑙 𝑝𝑎𝑟𝑡𝑠 𝑎𝑛𝑑 𝑡𝑟𝑎𝑛𝑠𝑝𝑎𝑟𝑒𝑛𝑡 𝑝𝑟𝑖𝑐𝑖𝑛𝑔</li>
                      <li>𝐹𝑎𝑠𝑡 𝑡𝑢𝑟𝑛𝑎𝑟𝑜𝑢𝑛𝑑 — 𝑠𝑎𝑚𝑒-𝑑𝑎𝑦 𝑓𝑜𝑟 𝑚𝑜𝑠𝑡 𝑑𝑒𝑣𝑖𝑐𝑒𝑠</li>
                      <li>𝐶𝑢𝑠𝑡𝑜𝑚𝑒𝑟 𝑠𝑎𝑡𝑖𝑠𝑓𝑎𝑐𝑡𝑖𝑜𝑛 𝑔𝑢𝑎𝑟𝑎𝑛𝑡𝑒𝑒𝑑</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-blue-700">How It Works</h4>
                    <ol className="list-decimal pl-6 font-semibold">
                      <li>𝐵𝑟𝑖𝑛𝑔 𝑜𝑟 𝑠𝑒𝑛𝑑 𝑦𝑜𝑢𝑟 𝑑𝑒𝑣𝑖𝑐𝑒 𝑡𝑜 𝑜𝑢𝑟 𝑠𝑒𝑟𝑣𝑖𝑐𝑒 𝑐𝑒𝑛𝑡𝑒𝑟</li>
                      <li>𝑅𝑒𝑐𝑒𝑖𝑣𝑒 𝑎 𝑓𝑟𝑒𝑒 𝑑𝑖𝑎𝑔𝑛𝑜𝑠𝑖𝑠 𝑎𝑛𝑑 𝑟𝑒𝑝𝑎𝑖𝑟 𝑞𝑢𝑜𝑡𝑒</li>
                      <li>𝑇𝑟𝑎𝑐𝑘 𝑟𝑒𝑝𝑎𝑖𝑟 𝑝𝑟𝑜𝑔𝑟𝑒𝑠𝑠 𝑡𝘩𝑟𝑜𝑢𝑔𝘩 𝑦𝑜𝑢𝑟 𝑜𝑟𝑑𝑒𝑟 𝐼𝐷</li>
                      <li>𝑃𝑖𝑐𝑘 𝑢𝑝 𝑜𝑟 𝑔𝑒𝑡 𝑖𝑡 𝑑𝑒𝑙𝑖𝑣𝑒𝑟𝑒𝑑 𝑡𝑜 𝑦𝑜𝑢𝑟 𝑙𝑜𝑐𝑎𝑡𝑖𝑜𝑛</li>
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
