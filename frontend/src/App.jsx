import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Start from './pages/Start';
import Home from './pages/Home';
import WarrantyValidation from './pages/warrantyValidate';
import Header from './components/Header';
import Footer from './components/Footer';
import Repair from './pages/repair';

// Import Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import OrderList from './pages/Admin/OrderList.jsx';
import UserList from './pages/Admin/UserList.jsx';
import UserEditPage from './pages/Admin/UserEditPage.jsx';
import ProductList from './pages/Admin/ProductList.jsx';
import ProductEdit from './pages/Admin/ProductEdit.jsx';
import CreateProduct from './pages/Admin/CreateProduct.jsx';
import WarrantyList from './pages/Admin/WarrantyList.jsx';
import RepairList from './pages/Admin/RepairList.jsx';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/home" element={<Home />} />
        <Route path="/warranty-validate" element={<WarrantyValidation />} />
        <Route path="/repair" element={<Repair />} />
      
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/userlist" element={<UserList />} />
        <Route path="/admin/users/:id/edit" element={<UserEditPage />} />
        <Route path="/admin/orderlist" element={<OrderList />} />
        <Route path="/admin/productlist" element={<ProductList />} /> 
        <Route path="/admin/product/:id/edit" element={<ProductEdit />} /> 
        <Route path="/admin/product/create" element={<CreateProduct />} /> 
        <Route path="/admin/warrantylist" element={<WarrantyList />} /> 
        <Route path="/admin/repairlist" element={<RepairList />} /> 
      
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
