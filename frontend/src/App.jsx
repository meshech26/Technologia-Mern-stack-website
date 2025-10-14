import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import Home from "./pages/Home";
import WarrantyValidation from "./pages/warrantyValidate";
import Repair from "./pages/repair";
import Cart from "./pages/Cart";
import Payment from "./pages/payment"; // ✅ Added Payment Page
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/home" element={<Home />} />
        <Route path="/warranty-validate" element={<WarrantyValidation />} />
        <Route path="/repair" element={<Repair />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} /> {/* ✅ Added Payment route */}
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
