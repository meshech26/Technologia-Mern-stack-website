import { Link } from 'react-router-dom';
import { FaCheck, FaTimes, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
//import { useGetOrdersQuery, useDeliverOrderMutation } from '../../redux/api/ordersApiSlice';
//import Loader from '../../components/Loader';
//import Message from '../../components/Message';

// Helper function to format the date
const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-LK', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const OrderList = () => {
  const { data: orders, isLoading, error, refetch } = useGetOrdersQuery();
  const [deliverOrder, { isLoading: isDelivering }] = useDeliverOrderMutation();

  const deliverOrderHandler = async (id) => {
    if (window.confirm('Are you sure you want to mark this order as delivered?')) {
      try {
        await deliverOrder(id);
        refetch();
        toast.success('Order marked as delivered');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
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

    // Add header
    doc.setFontSize(18);
    doc.text('Tech Store - All Orders Report', 14, 22);
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
        order.totalPrice.toFixed(2),
        order.isPaid ? 'Yes' : 'No',
        order.isDelivered ? 'Yes' : 'No',
      ];
      tableRows.push(orderData);
    });

    // ✅ Use autoTable properly
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
    doc.save(`TechStore_Orders_${formatDate(new Date())}.pdf`);
    toast.success('PDF download started!');
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Orders</h1>
        <button
          onClick={handleDownloadPdf}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700 disabled:bg-gray-400"
          disabled={isLoading || !orders || orders.length === 0}
        >
          <FaDownload className="mr-2" />
          Download PDF
        </button>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="overflow-x-auto">
          {orders.length === 0 ? (
            <Message>No orders found.</Message>
          ) : (
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-3 px-4 text-left uppercase font-semibold text-sm">
                    ID
                  </th>
                  <th className="py-3 px-4 text-left uppercase font-semibold text-sm">
                    USER
                  </th>
                  <th className="py-3 px-4 text-left uppercase font-semibold text-sm">
                    DATE
                  </th>
                  <th className="py-3 px-4 text-left uppercase font-semibold text-sm">
                    TOTAL
                  </th>
                  <th className="py-3 px-4 text-center uppercase font-semibold text-sm">
                    PAID
                  </th>
                  <th className="py-3 px-4 text-center uppercase font-semibold text-sm">
                    DELIVERED
                  </th>
                  <th className="py-3 px-4"></th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {orders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{order._id}</td>
                    <td className="py-3 px-4">
                      {order.user ? order.user.name : 'N/A'}
                    </td>
                    <td className="py-3 px-4">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="py-3 px-4">
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
                          className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 disabled:bg-gray-400"
                          disabled={isDelivering}
                        >
                          Mark Delivered
                        </button>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <Link
                        to={`/order/${order._id}`}
                        className="text-blue-500 hover:underline"
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
