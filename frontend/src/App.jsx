import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import WarrantyForm from "./pages/WarrantyForm";
import Dashboard from "./pages/Dashboard";
import Report from "./pages/Report";
import ViewWarranty from "./pages/ViewWarranty";
import EditWarranty from "./pages/EditWarranty";
import CheckWarrantyQR from "./pages/CheckWarrantyQR"; 
import CheckWarrantyProductID from "./pages/CheckWarrantyProductID"; 

// --- IMPORT NEW COMPONENTS ---
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow pt-20">
          <Routes>
            {/* --- Public Routes --- */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/warranty" element={<WarrantyForm />} />
            <Route path="/check-warranty-qr" element={<CheckWarrantyQR />} />
            <Route path="/check-warranty-product-id" element={<CheckWarrantyProductID />} />
            
            {/* --- Protected Admin Routes --- */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/report" element={<Report />} />
              <Route path="/view-warranty/:id" element={<ViewWarranty />} />
              <Route path="/edit-warranty/:id" element={<EditWarranty />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;