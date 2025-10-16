import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { addToCart, removeFromCart } from '../redux/features/cart/cartSlice';
import Message from '../components/Message';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>Your cart is empty <Link to="/" className="underline">Go Back</Link></Message>
        ) : (
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item._id} className="flex items-center py-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg mr-4" />
                <div className="flex-1">
                  <Link to={`/product/${item._id}`} className="font-semibold text-lg hover:underline">{item.name}</Link>
                  <div className="text-gray-600">Rs:{item.price}</div>
                </div>
                <div className="flex items-center">
                   <select
                    value={item.qty}
                    onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                    className="p-2 border rounded-md mx-4"
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                    ))}
                  </select>
                  <button onClick={() => removeFromCartHandler(item._id)}><FaTrash className="text-red-500" /></button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="md:col-span-1">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold border-b pb-2">Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
          <p className="text-2xl font-bold my-4">Rs:{cart.itemsPrice}</p>
          <button
            onClick={checkoutHandler}
            disabled={cartItems.length === 0}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;