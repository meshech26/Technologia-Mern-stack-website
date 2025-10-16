import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../redux/features/cart/cartSlice';

const ShippingPage = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/confirmorder');
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        
        <h1 className="text-2xl font-bold mb-6">Shipping</h1>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="address" className="block mb-2">Address</label>
            <input type="text" id="address" className="w-full border rounded px-3 py-2"
              value={address} onChange={(e) => setAddress(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block mb-2">City</label>
            <input type="text" id="city" className="w-full border rounded px-3 py-2"
              value={city} onChange={(e) => setCity(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label htmlFor="postalCode" className="block mb-2">Postal Code</label>
            <input type="text" id="postalCode" className="w-full border rounded px-3 py-2"
              value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label htmlFor="country" className="block mb-2">Country</label>
            <input type="text" id="country" className="w-full border rounded px-3 py-2"
              value={country} onChange={(e) => setCountry(e.target.value)} required />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShippingPage;
