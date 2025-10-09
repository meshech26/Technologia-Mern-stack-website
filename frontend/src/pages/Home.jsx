import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ProductModel from "../components/ProductModel";

const Home = () => {
  const location = useLocation();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  // 🧠 Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // 👇 Smooth scroll for footer links (/home#mobile, etc.)
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  // 🔍 Filter helper
  const getProductsByCategory = (category) =>
    products.filter((p) => p.category?.toLowerCase() === category.toLowerCase());

  // 🧩 Render a grid for any category
  const renderProductGrid = (category) => {
    const categoryProducts = getProductsByCategory(category);

    if (categoryProducts.length === 0)
      return (
        <p className="text-center text-gray-500">
          No {category} products found.
        </p>
      );

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categoryProducts.map((product) => (
          <ProductCard
            key={product._id}
            title={product.title}
            image={product.image} // Base64 or /uploads URL
            price={product.price.toLocaleString()}
            discountPrice={product.discountPrice.toLocaleString()}
            onCartClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-blue-200 via-purple-100 to-pink-200 flex flex-col">
      <main className="pt-32 px-4 pb-20 flex-grow">
        <div className="max-w-7xl mx-auto space-y-16">

          {/* 📱 Mobiles */}
          <section id="mobile">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Mobile
            </h2>
            {renderProductGrid("mobile")}
          </section>

          {/* 💻 Laptops */}
          <section id="laptop">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Laptop
            </h2>
            {renderProductGrid("laptop")}
          </section>

          {/* 🎧 Accessories */}
          <section id="accessories">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Accessories
            </h2>
            {renderProductGrid("accessory")}
          </section>
        </div>
      </main>

      {/* 🪟 Modal */}
      {selectedProduct && (
        <ProductModel
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Home;
