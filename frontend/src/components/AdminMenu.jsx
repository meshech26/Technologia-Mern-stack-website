import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Admin Navigation</h2>
            <ul className="space-y-2">
                <li>
                    <NavLink to="/admin/dashboard" className={({isActive}) => `block p-2 rounded ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}>Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to="/admin/productlist" className={({isActive}) => `block p-2 rounded ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}>Products</NavLink>
                </li>
                 <li>
                    <NavLink to="/admin/userlist" className={({isActive}) => `block p-2 rounded ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}>Users</NavLink>
                </li>
                <li>
                    <NavLink to="/admin/orderlist" className={({isActive}) => `block p-2 rounded ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}>Orders</NavLink>
                </li>
                <li>
                    <NavLink to="/admin/repairlist" className={({isActive}) => `block p-2 rounded ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}>Repairs</NavLink>
                </li>
                 <li>
                    <NavLink to="/admin/warrantylist" className={({isActive}) => `block p-2 rounded ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}>Warranties</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default AdminMenu;