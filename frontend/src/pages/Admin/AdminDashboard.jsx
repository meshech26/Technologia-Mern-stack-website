// frontend/src/pages/AdminDashboard.jsx (Simplified Example)
import { Outlet, Link } from 'react-router-dom';

const AdminDashboard = () => {
    // ... (authentication/authorization logic)
    return (
        <div className="flex">
            <aside className="w-64 bg-gray-800 p-4">
                {/* AdminMenu component or direct navigation links */}
                <Link to="/admin/dashboard">Dashboard</Link>
                <Link to="/admin/productlist">Products</Link>
                <Link to="/admin/userlist">Users</Link>
                <Link to="/admin/orderlist">Orders</Link>
                {/* ... other admin links */}
            </aside>
            <main className="flex-1 p-4">
                {/* THIS IS WHERE NESTED ROUTES WILL RENDER */}
                <Outlet /> 
            </main>
        </div>
    );
};
export default AdminDashboard;