import React, { useEffect, useState } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🧠 Replace with real API endpoint
  const fetchOrderHistory = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Failed to fetch order history:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  return (
    <div className="pt-28 px-6 pb-16 min-h-screen bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">📦 Order History</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-600">No orders found.</p>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div key={order._id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                  <h2 className="font-semibold text-lg text-gray-800">
                    Order ID: <span className="text-blue-700">{order._id}</span>
                  </h2>
                  <p className="text-sm text-gray-500 mt-2 sm:mt-0">
                    Date: {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-contain rounded"
                      />
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700">{item.title}</h3>
                        <p className="text-xs text-gray-600">
                          Qty: {item.qty} × {item.price.toLocaleString()} LKR
                        </p>
                        <p className="text-sm font-bold text-gray-800">
                          Total: {(item.qty * item.price).toLocaleString()} LKR
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-right mt-4 font-bold text-gray-900">
                  Order Total: {order.total.toLocaleString()} LKR
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
