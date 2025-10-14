import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Start from './pages/Start';
import Home from './pages/Home';
import WarrantyValidation from './pages/warrantyValidate';
import Header from './components/Header';
import Footer from './components/Footer';
import Repair from './pages/repair';

// Import the Admin components
import AdminDashboard from './pages/Admin/AdminDashboard'; // Assuming this path
import ProductList from './pages/Admin/ProductList';       // Assuming this path

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Public/User Routes */}
        <Route path="/" element={<Start />} />
        <Route path="/home" element={<Home />} />
        <Route path="/warranty-validate" element={<WarrantyValidation />} />
        <Route path="/repair" element={<Repair />} />

        {/* Admin Protected Routes */}
        {/* The AdminDashboard component acts as a layout for all admin-related pages.
            It should contain an <Outlet /> where its child routes (like ProductList) will render. */}
        <Route path="/admin/dashboard" element={<AdminDashboard />}>
            <Route path="/admin/productlist" element={<ProductList />} />
            <Route path="/admin/userlist" element={<UserList />} />
            <Route path="/admin/orderlist" element={<OrderList />} />
            {/* <Route path="userlist" element={<UserList />} /> */}
            {/* <Route path="orderlist" element={<OrderList />} /> */}
            {/* <Route path="repairlist" element={<RepairList />} /> */}
            {/* <Route path="warrantylist" element={<WarrantyList />} /> */}
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;