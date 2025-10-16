import { useState } from 'react';
import { toast } from 'react-toastify';
import { useSubmitRepairRequestMutation } from '../redux/api/repairApiSlice';
import Loader from '../components/Loader';

const RepairPage = () => {
    const [submitRequest, { isLoading }] = useSubmitRepairRequestMutation();

    const [customerName, setCustomerName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [productName, setProductName] = useState('');
    const [issueDescription, setIssueDescription] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await submitRequest({ customerName, phoneNumber, productName, issueDescription }).unwrap();
            toast.success('Repair request submitted!');
            setCustomerName('');
            setPhoneNumber('');
            setProductName('');
            setIssueDescription('');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
         <div className="flex justify-center">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6">Request a Repair</h1>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Full Name</label>
                        <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full px-3 py-2 border rounded-lg" required />
                    </div>
                     <div className="mb-4">
                        <label className="block text-gray-700">Phone Number</label>
                        <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full px-3 py-2 border rounded-lg" required />
                    </div>
                     <div className="mb-4">
                        <label className="block text-gray-700">Product Name</label>
                        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className="w-full px-3 py-2 border rounded-lg" required />
                    </div>
                     <div className="mb-4">
                        <label className="block text-gray-700">Describe the Issue</label>
                        <textarea value={issueDescription} onChange={(e) => setIssueDescription(e.target.value)} className="w-full px-3 py-2 border rounded-lg" rows="4" required></textarea>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mt-4" disabled={isLoading}>
                        {isLoading ? 'Submitting...' : 'Submit Request'}
                    </button>
                    {isLoading && <Loader />}
                </form>
            </div>
        </div>
    );
};

export default RepairPage;