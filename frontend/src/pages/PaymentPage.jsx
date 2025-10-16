import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { toast } from 'react-toastify';
import { savePaymentMethod } from '../redux/features/cart/cartSlice';

const PaymentPage = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, totalPrice: cartTotalPrice, paymentMethod: savedPaymentMethod } = cart;
  const [paymentMethod, setPaymentMethod] = useState(savedPaymentMethod || 'Credit Card');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (!shippingAddress?.address) navigate('/shipping');
  }, [shippingAddress, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));

    if (paymentMethod === 'PayPal') {
      navigate('/order/success');
      return;
    }

    if (paymentMethod === 'Credit Card') {
      if (!stripe || !elements) return;

      try {
        const { data } = await axios.post('/api/payment/process', {
          amount: Math.round(cartTotalPrice * 100), // full total
        });

        const result = await stripe.confirmCardPayment(data.client_secret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: shippingAddress.name || 'Guest',
              email: shippingAddress.email || 'guest@example.com',
            },
          },
        });

        if (result.error) toast.error(result.error.message);
        else if (result.paymentIntent.status === 'succeeded') {
          toast.success('Payment successful');
          navigate('/order/success');
        }
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      }
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-lg">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">Payment Method</h1>
          <form onSubmit={submitHandler}>
            <div className="space-y-4 mb-6">
              <label className="flex items-center border p-4 rounded cursor-pointer">
                <input type="radio" name="paymentMethod" value="Credit Card"
                  checked={paymentMethod === 'Credit Card'} onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2" /> Credit Card
              </label>
              <label className="flex items-center border p-4 rounded cursor-pointer">
                <input type="radio" name="paymentMethod" value="PayPal"
                  checked={paymentMethod === 'PayPal'} onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2" /> PayPal
              </label>
            </div>

            {paymentMethod === 'Credit Card' && (
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block mb-1">Card Number</label>
                  <CardNumberElement className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block mb-1">Expiry Date</label>
                  <CardExpiryElement className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block mb-1">CVC</label>
                  <CardCvcElement className="w-full border rounded px-3 py-2" />
                </div>
              </div>
            )}

            <button type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600"
              disabled={paymentMethod === 'Credit Card' && !stripe}>
              {paymentMethod === 'Credit Card' ? `Pay Rs: ${cartTotalPrice || 0}` : 'Continue'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
