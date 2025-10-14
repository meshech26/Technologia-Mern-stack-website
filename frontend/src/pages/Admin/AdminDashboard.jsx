import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import AdminMenu from '../../components/AdminMenu';
//import { useGetAdminStatsQuery } from '../../redux/api/adminApiSlice';
//import Loader from '../../components/Loader';
//import Message from '../../components/Message';
import { FaUsers, FaBoxOpen, FaShoppingCart, FaDollarSign } from 'react-icons/fa';

const AdminDashboard = () => {
    const { data: stats, isLoading, error } = useGetAdminStatsQuery();

    // Data for the charts
    const chartData = [
        { name: 'Users', value: stats?.totalUsers || 0 },
        { name: 'Products', value: stats?.totalProducts || 0 },
        { name: 'Orders', value: stats?.totalOrders || 0 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

    const StatCard = ({ icon, title, value, color }) => (
        <div className={`bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4 border-l-4 ${color}`}>
            <div className="text-3xl">{icon}</div>
            <div>
                <h3 className="text-lg font-semibold text-gray-500">{title}</h3>
                <p className="text-3xl font-bold text-gray-800">{value}</p>
            </div>
        </div>
    );

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            <div className="grid md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                    <AdminMenu />
                </div>
                <div className="md:col-span-3">
                    <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
                    {isLoading ? <Loader /> : error ? <Message variant='danger'>{error?.data?.message || error.error}</Message> : (
                        <div>
                            {/* Stat Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                <StatCard icon={<FaUsers />} title="Total Users" value={stats.totalUsers} color="border-blue-500" />
                                <StatCard icon={<FaBoxOpen />} title="Total Products" value={stats.totalProducts} color="border-green-500" />
                                <StatCard icon={<FaShoppingCart />} title="Total Orders" value={stats.totalOrders} color="border-yellow-500" />
                                <StatCard icon={<FaDollarSign />} title="Total Sales" value={`Rs:${stats.totalSales.toFixed(2)}`} color="border-red-500" />
                            </div>

                            {/* Charts Section */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Bar Chart */}
                                <div className="bg-white p-6 rounded-xl shadow-lg">
                                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Summary Comparison</h2>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="value" fill="#8884d8" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* Pie Chart */}
                                <div className="bg-white p-6 rounded-xl shadow-lg">
                                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Entity Distribution</h2>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={chartData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                outerRadius={110}
                                                fill="#8884d8"
                                                dataKey="value"
                                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            >
                                                {chartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;