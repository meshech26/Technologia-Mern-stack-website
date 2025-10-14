import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useNavigate

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate(); // Hook for navigation

  // Check if a token exists to determine auth state
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    navigate("/login"); // Redirect to login page
  };
  
  // ... (rest of the functions like handleSearch, useEffects remain the same)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 space-x-4">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3 shrink-0">
            <img src="/images/1.png" alt="Technologia Logo" className="w-10 h-10 rounded-full object-cover" />
            <Link to="/home" className="text-xl font-bold text-white whitespace-nowrap">Technologia</Link>
          </div>

          {/* Search Bar can remain */}
          {/* ... */}

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium shrink-0">
            <Link to="/home" className="hover:text-blue-400 flex items-center space-x-1"><span>🏠</span><span>Home</span></Link>
            <Link to="/warranty" className="hover:text-blue-400 flex items-center space-x-1"><span>📝</span><span>Warranty Form</span></Link>
            
            {/* --- Conditionally render admin links --- */}
            {isAuthenticated && (
              <div className="flex items-center space-x-1 border-l border-gray-600 pl-4 ml-2">
                <Link to="/dashboard" className={`hover:text-blue-400 flex items-center space-x-1 px-3 py-1 rounded ${location.pathname === "/dashboard" ? "bg-blue-600 text-white" : ""}`}><span>📊</span><span>Dashboard</span></Link>
                <Link to="/report" className={`hover:text-blue-400 flex items-center space-x-1 px-3 py-1 rounded ${location.pathname === "/report" ? "bg-blue-600 text-white" : ""}`}><span>📋</span><span>Report</span></Link>
              </div>
            )}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* ... Search and Cart Icons ... */}
            
            {/* --- Conditional Login/Logout Button --- */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 rounded hover:bg-red-500 transition text-sm font-semibold shrink-0"
              >
                <span>👤</span>
                <span className="hidden sm:inline">Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 transition text-sm font-semibold shrink-0"
              >
                <span>👤</span>
                <span className="hidden sm:inline">Admin Sign In</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2 hover:text-blue-400 transition" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>☰</button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-gray-800 border-t border-gray-700 py-4">
            <div className="flex flex-col space-y-3 px-4">
              <Link to="/home" className="hover:text-blue-400 py-2 border-b border-gray-700 flex items-center space-x-2"><span>🏠</span><span>Home</span></Link>
              <Link to="/warranty" className="hover:text-blue-400 py-2 border-b border-gray-700 flex items-center space-x-2"><span>📝</span><span>Warranty Form</span></Link>
              
              {/* Conditional Mobile Admin Links */}
              {isAuthenticated && (
                <div className="py-2 border-b border-gray-700">
                  <span className="font-semibold">Admin Panel</span>
                  <div className="mt-2 space-y-2 pl-4">
                    <Link to="/dashboard" className={`block py-1 flex items-center space-x-2 ${location.pathname === "/dashboard" ? "text-blue-400 font-semibold" : "hover:text-blue-400"}`}><span>📊</span><span>Dashboard</span></Link>
                    <Link to="/report" className={`block py-1 flex items-center space-x-2 ${location.pathname === "/report" ? "text-blue-400 font-semibold" : "hover:text-blue-400"}`}><span>📋</span><span>Report</span></Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;