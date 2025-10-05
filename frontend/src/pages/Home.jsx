import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const location = useLocation();

  // 👇 Smooth scroll to #section based on hash
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth" });
        }, 100); // Give time for DOM to render
      }
    }
  }, [location]);

  const renderProductGrid = (prefix) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {Array.from({ length: 9 }).map((_, i) => (
        <ProductCard
          key={i}
          title={`${prefix} ${i + 1}`}
          image={`/images/${prefix}${i + 1}.png`}
          price={(550000 + i * 1000).toLocaleString()}
          discountPrice={(535000 + i * 1000).toLocaleString()}
        />
      ))}
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-blue-200 via-purple-100 to-pink-200 flex flex-col">
      <main className="pt-32 px-4 pb-20 flex-grow">
        <div className="max-w-7xl mx-auto space-y-16">

          {/* Mobile Section */}
          <section id="mobile">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Mobile
            </h2>
            {renderProductGrid("mobile")}
          </section>

          {/* Laptop Section */}
          <section id="laptop">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Laptop
            </h2>
            {renderProductGrid("laptop")}
          </section>

          {/* Accessories Section */}
          <section id="accessories">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Accessories
            </h2>
            {renderProductGrid("accessory")}
          </section>

        </div>
      </main>
    </div>
  );
};

export default Home;
