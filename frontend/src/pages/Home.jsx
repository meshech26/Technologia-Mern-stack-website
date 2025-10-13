import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ProductModel from "../components/ProductModel";

const Home = () => {
  const location = useLocation();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const query = new URLSearchParams(location.search).get("q")?.toLowerCase();

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

  // 🔍 Filter and return products per category
  const filterProducts = (category) =>
    products.filter((p) => {
      const matchCategory = p.category?.toLowerCase() === category;
      const matchSearch = query
        ? p.title?.toLowerCase().includes(query)
        : true;
      return matchCategory && matchSearch;
    });

  const mobileResults = filterProducts("mobile");
  const laptopResults = filterProducts("laptop");
  const accessoryResults = filterProducts("accessory");

  const totalMatches =
    mobileResults.length + laptopResults.length + accessoryResults.length;

  // 🧱 Render product grid
  const renderGrid = (items, label) => (
    <section>
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        {label}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((product) => (
          <ProductCard
            key={product._id}
            title={product.title}
            image={product.image}
            price={product.price?.toLocaleString()}
            discountPrice={product.discountPrice?.toLocaleString()}
            onCartClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>
    </section>
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-blue-200 via-purple-100 to-pink-200 flex flex-col">
      <main className="pt-32 px-4 pb-20 flex-grow">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* ❌ Show only this if no matches */}
          {query && totalMatches === 0 && (
            <div className="text-center text-lg text-red-600 font-semibold">
              🔍 No product matches the search term{" "}
              <span className="italic text-gray-700">"{query}"</span>.
            </div>
          )}

          {/* ✅ Show only matching categories */}
          {mobileResults.length > 0 && renderGrid(mobileResults, "Mobile")}
          {laptopResults.length > 0 && renderGrid(laptopResults, "Laptop")}
          {accessoryResults.length > 0 &&
            renderGrid(accessoryResults, "Accessories")}
        </div>
      </main>

      {/* 🔲 Modal */}
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
