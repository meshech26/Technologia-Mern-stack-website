import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCheck, FaTimes, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Removed: Loader, Message components as we're simulating loading/error locally
// import Loader from '../../components/Loader';
// import Message from '../../components/Message';

// --- Frontend Mock Data ---
const mockOrders = [
  {
    _id: '65f6c82d3f4a5b6c7d8e9f01',
    user: { _id: 'user123', name: 'Alice Smith' },
    createdAt: '2024-03-10T10:00:00.000Z',
    totalPrice: 2500.00,
    isPaid: true,
    paidAt: '2024-03-10T10:05:00.000Z',
    isDelivered: false,
    orderItems: [{ name: 'iPhone 15 Pro', qty: 1, price: 1199 }],
    shippingAddress: { address: '123 Main St', city: 'Colombo', postalCode: '00100', country: 'Sri Lanka' }
  },
  {
    _id: '65f6c82d3f4a5b6c7d8e9f02',
    user: { _id: 'user124', name: 'Bob Johnson' },
    createdAt: '2024-03-08T14:30:00.000Z',
    totalPrice: 750.50,
    isPaid: true,
    paidAt: '2024-03-08T14:35:00.000Z',
    isDelivered: true,
    deliveredAt: '2024-03-09T11:00:00.000Z',
    orderItems: [{ name: 'Sony WH-1000XM5', qty: 1, price: 399 }],
    shippingAddress: { address: '456 Elm St', city: 'Kandy', postalCode: '00200', country: 'Sri Lanka' }
  },
  {
    _id: '65f6c82d3f4a5b6c7d8e9f03',
    user: { _id: 'user125', name: 'Charlie Brown' },
    createdAt: '2024-03-05T09:15:00.000Z',
    totalPrice: 150.00,
    isPaid: false,
    paidAt: null,
    isDelivered: false,
    orderItems: [{ name: 'Logitech MX Master 3S Mouse', qty: 1, price: 99 }],
    shippingAddress: { address: '789 Oak Ave', city: 'Galle', postalCode: '00300', country: 'Sri Lanka' }
  },
  {
    _id: '65f6c82d3f4a5b6c7d8e9f04',
    user: { _id: 'user126', name: 'Diana Prince' },
    createdAt: '2024-03-01T17:00:00.000Z',
    totalPrice: 1399.00,
    isPaid: true,
    paidAt: '2024-03-01T17:05:00.000Z',
    isDelivered: true,
    deliveredAt: '2024-03-02T13:00:00.000Z',
    orderItems: [{ name: 'MacBook Air M2', qty: 1, price: 1399 }],
    shippingAddress: { address: '101 Pine Ln', city: 'Jaffna', postalCode: '00400', country: 'Sri Lanka' }
  },
];
// --- End Mock Data ---

// Helper function to format the date
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-LK', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

const OrderList = () => {
    // Replace Redux state with local state and mock data
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Simulate initial loading
    const [isDelivering, setIsDelivering] = useState(false); // Simulate delivery action

    // Simulate fetching orders on component mount
    useEffect(() => {
        const timer = setTimeout(() => {
            setOrders(mockOrders);
            setIsLoading(false);
        }, 500); // Simulate network delay
        return () => clearTimeout(timer);
    }, []);

    const deliverOrderHandler = async (id) => {
        if (window.confirm('Are you sure you want to mark this order as delivered? (Frontend Simulation)')) {
            setIsDelivering(true);
            try {
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 500)); 
                
                // Update local state: mark order as delivered
                setOrders(prevOrders => prevOrders.map(order => 
                    order._id === id ? { ...order, isDelivered: true, deliveredAt: new Date().toISOString() } : order
                ));
                toast.success('Order marked as delivered (frontend only)');
            // eslint-disable-next-line no-unused-vars
            } catch (err) {
                toast.error('Failed to mark order as delivered (frontend simulation)');
            } finally {
                setIsDelivering(false);
            }
        }
    };

    /**
     * Handles the PDF download functionality.
     */
    const handleDownloadPdf = () => {
        if (!orders || orders.length === 0) {
            toast.error('No orders to download.');
            return;
        }

        const doc = new jsPDF('landscape');

        // Add header for Technologia E-commerce
        doc.setFontSize(18);
        doc.text('Technologia E-commerce - All Orders Report', 14, 22);
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Generated on: ${formatDate(new Date())}`, 14, 29);

        // Define table columns and rows
        const tableColumn = ['ID', 'User', 'Date', 'Total (Rs)', 'Paid', 'Delivered'];
        const tableRows = [];

        orders.forEach((order) => {
            const orderData = [
                order._id,
                order.user ? order.user.name : 'N/A',
                formatDate(order.createdAt),
                `Rs: ${order.totalPrice.toFixed(2)}`,
                order.isPaid ? 'Yes' : 'No',
                order.isDelivered ? 'Yes' : 'No',
            ];
            tableRows.push(orderData);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 35,
            headStyles: { fillColor: [37, 99, 235] }, // blue header
            styles: { font: 'helvetica', fontSize: 9 },
            margin: { top: 10 },
        });

        // Footer with page numbers
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(9);
            doc.text(
                `Page ${i} of ${pageCount}`,
                doc.internal.pageSize.width - 28,
                doc.internal.pageSize.height - 10
            );
        }

        // Save PDF
        doc.save(`Technologia_Orders_Report_${formatDate(new Date())}.pdf`);
        toast.success('PDF download started!');
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-extrabold text-gray-800">All Orders</h1>
                <button
                    onClick={handleDownloadPdf}
                    className="bg-green-600 text-white px-5 py-2 rounded-full flex items-center hover:bg-green-700 transition-colors shadow-md disabled:bg-gray-400"
                    disabled={isLoading || !orders || orders.length === 0}
                >
                    <FaDownload className="mr-2" />
                    Download PDF
                </button>
            </div>

            {/* Simulated Loading/Delivering States */}
            {isLoading && <p className="text-center text-indigo-600 text-lg my-4">Loading orders...</p>}
            {isDelivering && <p className="text-center text-blue-600 text-lg my-4">Updating delivery status...</p>}
            
            {!isLoading && ( // Only show table if not loading
                <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-100">
                    {orders.length === 0 ? (
                        <p className="py-4 px-4 text-center text-gray-500">No orders found.</p>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">USER</th>
                                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">DATE</th>
                                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">TOTAL (Rs)</th>
                                    <th className="py-3 px-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">PAID</th>
                                    <th className="py-3 px-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">DELIVERED</th>
                                    <th className="py-3 px-4"></th> {/* For details link */}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {orders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50">
                                        <td className="py-3 px-4 text-sm text-gray-800">{order._id.substring(0, 12)}...</td>
                                        <td className="py-3 px-4 text-sm text-gray-900">
                                            {order.user ? order.user.name : 'N/A'}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-800">
                                            {formatDate(order.createdAt)}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-800">
                                            Rs:{order.totalPrice.toFixed(2)}
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            {order.isPaid ? (
                                                <FaCheck className="text-green-500 mx-auto" />
                                            ) : (
                                                <FaTimes className="text-red-500 mx-auto" />
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            {order.isDelivered ? (
                                                <FaCheck className="text-green-500 mx-auto" />
                                            ) : (
                                                <button
                                                    onClick={() => deliverOrderHandler(order._id)}
                                                    className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-sm"
                                                    disabled={isDelivering || !order.isPaid} // Disable if not paid
                                                >
                                                    Mark Delivered
                                                </button>
                                            )}
                                        </td>
                                        <td className="py-3 px-4">
                                            <Link
                                                to={`/order/${order._id}`}
                                                className="text-indigo-600 hover:underline text-sm font-medium"
                                            >
                                                Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
};

export default OrderList;