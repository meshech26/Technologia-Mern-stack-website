// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Start from './pages/Start';
import Home from './pages/Home';
import WarrantyValidation from './pages/warrantyValidate';

import RepairDashboard from './pages/RepairDashboard';
import AddRepair from './pages/AddRepair';
import ViewRepair from './pages/ViewRepair';
import EditRepair from './pages/EditRepair';
import Login from './pages/Login';
import ViewRepairImages from './pages/ViewRepairImages';
import EditRepairBasic from './pages/EditRepairBasic';

function LayoutWrapper() {
  const location = useLocation();
  const hideLayout = location.pathname === '/login';

  return (
    <>
      {!hideLayout && <Header />}
      <Routes>
        {/* General Pages */}
        <Route path="/" element={<Start />} />
        <Route path="/home" element={<Home />} />
        <Route path="/warranty-validate" element={<WarrantyValidation />} />
        <Route path="/repair" element={<RepairDashboard />} />

        {/* Repair Management Pages */}
        <Route path="/repair-dashboard" element={<RepairDashboard />} />
        <Route path="/repair/new" element={<AddRepair />} />
        <Route path="/repair/:id" element={<ViewRepair />} />
        <Route path="/repair/:id/edit" element={<EditRepair />} />
        <Route path="/repair/:id/edit-basic" element={<EditRepairBasic />} />
        <Route path="/view-repair-images" element={<ViewRepairImages />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}

export default App;