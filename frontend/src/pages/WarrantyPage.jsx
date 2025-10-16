import { useState } from 'react';
import { toast } from 'react-toastify';
import { useCheckWarrantyMutation } from '../redux/api/warrantyApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

const WarrantyPage = () => {
    const [checkWarranty, { isLoading }] = useCheckWarrantyMutation();
    const [serialNumber, setSerialNumber] = useState('');
    const [warrantyStatus, setWarrantyStatus] = useState(null);
    const [error, setError] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        setWarrantyStatus(null);
        setError(null);
        try {
            const res = await checkWarranty({ serialNumber }).unwrap();
            setWarrantyStatus(res);
        } catch (err) {
            setError(err?.data?.message || err.error);
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6">Check Warranty</h1>
                <form onSubmit={submitHandler}>
                    <input type="text" placeholder="Enter Serial Number" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} className="w-full px-3 py-2 border rounded-lg" required />
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mt-4" disabled={isLoading}>
                        {isLoading ? 'Checking...' : 'Check'}
                    </button>
                </form>

                {isLoading && <Loader />}
                {error && <Message variant="danger">{error}</Message>}

                {warrantyStatus && (
                    <div className="mt-6 border-t pt-4">
                        <h2 className="text-xl font-bold">Warranty Details</h2>
                        <p><strong>Product:</strong> {warrantyStatus.productName}</p>
                        <p><strong>Purchase Date:</strong> {new Date(warrantyStatus.purchaseDate).toLocaleDateString()}</p>
                        <p><strong>Expiry Date:</strong> {new Date(warrantyStatus.expiryDate).toLocaleDateString()}</p>
                        <p><strong>Status:</strong> <span className={warrantyStatus.isExpired ? 'text-red-500 font-bold' : 'text-green-500 font-bold'}>
                            {warrantyStatus.isExpired ? 'Expired' : 'Active'}
                        </span></p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WarrantyPage;