import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTools, FaUser } from "react-icons/fa";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // 🛒 Update cart count from localStorage
  useEffect(() => {
    const updateCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalItems);
    };
    updateCount();
    window.addEventListener("storage", updateCount);
    return () => window.removeEventListener("storage", updateCount);
  }, [location]);

  // ✋ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔍 Handle search
  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/home?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-gray-900/90 backdrop-blur-sm text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 space-x-6">
        {/* Brand Name */}
        <div className="text-xl font-bold text-white whitespace-nowrap shrink-0">
          Technologia
        </div>

        {/* Search Bar */}
        <div className="flex items-center bg-gray-800 rounded-full overflow-hidden border border-gray-700 focus-within:border-blue-500 transition flex-grow max-w-lg">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="bg-transparent text-white px-4 py-2 focus:outline-none w-full placeholder-gray-400"
          />
          <button
            onClick={handleSearch}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 transition text-sm font-semibold"
          >
            Search
          </button>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium shrink-0">
          <Link to="/home" className="hover:text-blue-400">
            Home
          </Link>
          <Link to="/order-history" className="hover:text-blue-400">
            Order History
          </Link>

          {/* Services Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="hover:text-blue-400 focus:outline-none"
            >
              <span className="inline-flex items-center space-x-1">
                <FaTools className="text-base" />
                <span>Services</span>
              </span>
            </button>

            {dropdownOpen && (
              <div className="absolute mt-2 bg-white text-gray-800 rounded shadow-lg w-40 z-50">
                <Link
                  to="/warranty-validate"
                  className="block px-4 py-2 hover:bg-blue-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Warranty
                </Link>
                <Link
                  to="/repair"
                  className="block px-4 py-2 hover:bg-blue-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Repair
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Cart */}
        <Link
          to="/cart"
          className="relative flex items-center space-x-2 p-2 hover:text-blue-400 transition shrink-0 text-sm font-medium"
        >
          <FaShoppingCart className="text-lg" />
          <span>Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Sign In */}
        <Link
          to="/signin"
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 transition text-sm font-semibold shrink-0"
        >
          <FaUser className="text-base" />
          <span>Sign In</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
