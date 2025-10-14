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
import PaymentSuccess from "./pages/paymentSuccess";
import OrderHistory from "./pages/OrderHistory";




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
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/order-history" element={<OrderHistory />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
