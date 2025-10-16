// eslint-disable-next-line no-unused-vars
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useGetOrderDetailsQuery, useDeliverOrderMutation } from '../redux/api/ordersApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

const OrderDetailsPage = () => {
  const { id: orderId } = useParams();
  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success('Order marked as delivered');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">{error?.data?.message || error.error}</Message>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Order #{order._id}</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Shipping</h2>
            <p><strong>Name:</strong> {order.user.name}</p>
            <p><strong>Email:</strong> <a href={`mailto:${order.user.email}`} className="text-blue-500">{order.user.email}</a></p>
            <p><strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
            {order.isDelivered ? <Message variant="success">Delivered on {new Date(order.deliveredAt).toLocaleDateString()}</Message> : <Message variant="danger">Not Delivered</Message>}
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
            <p><strong>Method:</strong> {order.paymentMethod}</p>
            {order.isPaid ? <Message variant="success">Paid on {new Date(order.paidAt).toLocaleDateString()}</Message> : <Message variant="danger">Not Paid</Message>}
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Order Items</h2>
            <ul className="divide-y divide-gray-200">
              {order.orderItems.map((item, idx) => (
                <li key={idx} className="flex items-center py-2">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded mr-4" />
                  <Link to={`/product/${item.product}`} className="flex-1 font-semibold hover:underline">{item.name}</Link>
                  <div className="text-gray-600">{item.qty} x Rs:{item.price} = Rs:{item.qty * item.price}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:col-span-1 space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold border-b pb-2 mb-2">Order Summary</h2>
            <div className="flex justify-between"><p>Items</p><p>Rs:{order.itemsPrice}</p></div>
            <div className="flex justify-between"><p>Shipping</p><p>Rs:{order.shippingPrice}</p></div>
            <div className="flex justify-between"><p>Tax</p><p>Rs:{order.taxPrice}</p></div>
            <div className="flex justify-between font-bold border-t pt-2 mt-2"><p>Total</p><p>Rs:{order.totalPrice}</p></div>

            {loadingDeliver && <Loader />}
            {userInfo && userInfo.role === 'admin' && !order.isDelivered && (
              <button onClick={deliverOrderHandler} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mt-4">
                Mark As Delivered
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
