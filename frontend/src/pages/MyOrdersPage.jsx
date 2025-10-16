/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaSearch, FaFilePdf } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { useGetMyOrdersQuery } from '../redux/api/ordersApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

const MyOrdersPage = () => {
  const { data: orders = [], isLoading, error } = useGetMyOrdersQuery();
  const [searchTerm, setSearchTerm] = useState('');

  const formatDate = (d) => {
    if (!d) return 'N/A';
    try {
      return new Date(d).toLocaleDateString();
    } catch (e) {
      return d;
    }
  };

  const downloadPDF = (order) => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text('Order Details', 14, 20);

      const orderInfo = [
        ['Order ID', order._id || 'N/A'],
        ['Customer Name', order.user?.name || order.shippingAddress?.name || 'N/A'],
        ['Order Date', formatDate(order.createdAt)],
        ['Payment Status', order.isPaid ? `Paid (${formatDate(order.paidAt)})` : 'Not Paid'],
        ['Delivery Status', order.isDelivered ? `Delivered (${formatDate(order.deliveredAt)})` : 'Not Delivered'],
        ['Total Price', `Rs:${Number(order.totalPrice ?? 0).toFixed(2)}`],
      ];

      autoTable(doc, {
        startY: 30,
        head: [['Field', 'Value']],
        body: orderInfo,
        theme: 'striped',
        headStyles: { fillColor: [66, 133, 244] },
      });

      const itemsArr = (order.orderItems || []).map((item) => [
        item.name || 'N/A',
        item.qty ?? 1,
        `Rs:${Number(item.price ?? 0).toFixed(2)}`,
        `Rs:${((item.qty ?? 1) * Number(item.price ?? 0)).toFixed(2)}`,
      ]);

      const nextY = doc.lastAutoTable.finalY + 12;

      if (itemsArr.length) {
        doc.setFontSize(14);
        doc.text('Ordered Items', 14, nextY - 2);
        autoTable(doc, {
          startY: nextY,
          head: [['Product', 'Quantity', 'Price', 'Subtotal']],
          body: itemsArr,
          theme: 'striped',
          headStyles: { fillColor: [15, 157, 88] },
        });
      }

      const finalY = doc.lastAutoTable.finalY;
      doc.setFontSize(12);
      doc.text(`Grand Total: Rs:${Number(order.totalPrice ?? 0).toFixed(2)}`, 14, finalY + 10);
      doc.save(`order_${order._id || 'unknown'}.pdf`);
      toast.success("PDF download started!");
    } catch (err) {
      console.error('PDF generation failed:', err);
      toast.error('Could not generate PDF.');
    }
  };

  const filteredOrders = orders.filter(order =>
    order._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div className="flex justify-center items-center h-screen"><Loader /></div>;
  if (error) return <Message variant="danger">{error?.data?.message || error.error}</Message>;

  return (
    <div className="w-full flex-grow bg-gradient-to-r from-blue-200 via-purple-100 to-pink-200 p-4 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl p-6">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by Order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute top-3 left-3 text-gray-400" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr className="border-b">
                <th className="py-3 px-4 text-left uppercase font-semibold text-sm">ID</th>
                <th className="py-3 px-4 text-left uppercase font-semibold text-sm">Date</th>
                <th className="py-3 px-4 text-left uppercase font-semibold text-sm">Total</th>
                <th className="py-3 px-4 text-center uppercase font-semibold text-sm">Paid</th>
                <th className="py-3 px-4 text-center uppercase font-semibold text-sm">Delivered</th>
                <th className="py-3 px-4 text-center uppercase font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4" title={order._id}>{order._id.substring(0, 12)}...</td>
                    <td className="py-3 px-4">{formatDate(order.createdAt)}</td>
                    <td className="py-3 px-4">Rs: {Number(order.totalPrice ?? 0).toFixed(2)}</td>
                    <td className="py-3 px-4 text-center">
                      {order.isPaid ? (
                        <span className="bg-green-100 text-green-700 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">Paid</span>
                      ) : (
                        <span className="bg-red-100 text-red-700 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">Not Paid</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {order.isDelivered ? (
                        <span className="bg-blue-100 text-blue-700 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">Delivered</span>
                      ) : (
                        <span className="bg-yellow-100 text-yellow-700 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">Pending</span>
                      )}
                    </td>
                    <td className="py-3 px-4 flex items-center justify-center space-x-2">
                      <Link to={`/order/${order._id}`} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors" title="View Details">
                        Details
                      </Link>
                      <button onClick={() => downloadPDF(order)} className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors" title="Download PDF">
                        <FaFilePdf />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrdersPage;