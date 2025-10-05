import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Start from './pages/Start';
import Home from './pages/Home';
import WarrantyValidation from './pages/warrantyValidate';
import Header from './components/Header';
import Footer from './components/Footer';
import Repair from './pages/repair';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/home" element={<Home />} />
        <Route path="/warranty-validate" element={<WarrantyValidation />} />
        <Route path="/repair" element={<Repair />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
