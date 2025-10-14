// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 pt-12 pb-8 mt-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Left: Logo + About */}
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <img
              src="/images/1.png" // 👈 update with your logo
              alt="Technologia Logo"
              className="w-14 h-14 rounded-full object-cover shadow-md"
            />
            <h2 className="text-2xl font-bold text-white">Technologia</h2>
          </div>
          <p className="text-sm leading-relaxed">
            Discover mobiles, laptops, and accessories.  
            Get expert repair services and enjoy a complete shopping experience.  
          </p>
          <p className="mt-4 text-sm">
            📍 182 Colombo - Galle Main Rd, Colombo 4  
          </p>
          <p className="text-sm">📞 +94770176666</p>
          <p className="mt-2 text-sm">
            📍 No 500, Peradeniya Road, Kandy  
          </p>
          <p className="text-sm">📞 +94771094444</p>
        </div>

        {/* Center: Main Categories */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">MAIN CATEGORIES</h3>
          <ul className="space-y-2">
            <li><Link to="/mobile" className="hover:text-white">Mobile</Link></li>
            <li><Link to="/laptop" className="hover:text-white">Laptop</Link></li>
            <li><Link to="/accessories" className="hover:text-white">Accessories</Link></li>
          </ul>
        </div>

        {/* Right: Quick Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">QUICK NAVIGATION</h3>
          <ul className="space-y-2">
            <li><Link to="/home" className="hover:text-white">Home</Link></li>
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
            <li><Link to="/newsroom" className="hover:text-white">Newsroom</Link></li>
            <li><Link to="/career" className="hover:text-white">Career</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-6">
        {/* Social Icons */}
        <div className="flex space-x-4 mb-4 md:mb-0">
          <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-500">🌐</a>
          <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-500">🐦</a>
          <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-500">📸</a>
          <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-500">🎵</a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Technologia. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;