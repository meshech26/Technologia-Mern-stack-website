//import { useGetWarrantiesQuery, useUpdateWarrantyMutation } from '../../redux/api/adminApiSlice';
//import Loader from '../../components/Loader';
//import Message from '../../components/Message';
import { toast } from 'react-toastify';

const WarrantyList = () => {
    const { data: warranties, refetch, isLoading, error } = useGetWarrantiesQuery();
    const [updateWarranty, { isLoading: isUpdating }] = useUpdateWarrantyMutation();

    const handleStatusChange = async (id, status) => {
        try {
            await updateWarranty({ id, status }).unwrap();
            refetch();
            toast.success('Warranty status updated');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Warranty Claims</h1>
            {isUpdating && <Loader />}
            {isLoading ? <Loader /> : error ? <Message variant='danger'>{error?.data?.message || error.error}</Message> : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-2 px-4">ID</th>
                                <th className="py-2 px-4">USER</th>
                                <th className="py-2 px-4">PRODUCT</th>
                                <th className="py-2 px-4">SERIAL NO.</th>
                                <th className="py-2 px-4">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {warranties.map(warranty => (
                                <tr key={warranty._id} className="border-b">
                                    <td className="py-2 px-4">{warranty._id}</td>
                                    <td className="py-2 px-4">{warranty.user?.name || 'N/A'}</td>
                                    <td className="py-2 px-4">{warranty.product?.name || 'N/A'}</td>
                                    <td className="py-2 px-4">{warranty.serialNumber}</td>
                                    <td className="py-2 px-4">
                                         <select
                                            value={warranty.status}
                                            onChange={(e) => handleStatusChange(warranty._id, e.target.value)}
                                            className="p-2 border rounded-md"
                                        >
                                            <option value="Claim Submitted">Claim Submitted</option>
                                            <option value="In Review">In Review</option>
                                            <option value="Approved">Approved</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default WarrantyList;