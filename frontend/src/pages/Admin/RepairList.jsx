//import { useGetRepairsQuery, useUpdateRepairMutation } from '../../redux/api/adminApiSlice';
//import Loader from '../../components/Loader';
//import Message from '../../components/Message';
import { toast } from 'react-toastify';

const RepairList = () => {
    const { data: repairs, refetch, isLoading, error } = useGetRepairsQuery();
    const [updateRepair, { isLoading: isUpdating }] = useUpdateRepairMutation();

    const handleStatusChange = async (id, status) => {
        try {
            await updateRepair({ id, status }).unwrap();
            refetch();
            toast.success('Repair status updated');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Repair Tickets</h1>
            {isUpdating && <Loader />}
            {isLoading ? <Loader /> : error ? <Message variant='danger'>{error?.data?.message || error.error}</Message> : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-2 px-4">ID</th>
                                <th className="py-2 px-4">CUSTOMER</th>
                                <th className="py-2 px-4">PRODUCT</th>
                                <th className="py-2 px-4">ISSUE</th>
                                <th className="py-2 px-4">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {repairs.map(repair => (
                                <tr key={repair._id} className="border-b">
                                    <td className="py-2 px-4">{repair._id}</td>
                                    <td className="py-2 px-4">{repair.customerName}</td>
                                    <td className="py-2 px-4">{repair.productName}</td>
                                    <td className="py-2 px-4">{repair.issueDescription}</td>
                                    <td className="py-2 px-4">
                                        <select
                                            value={repair.status}
                                            onChange={(e) => handleStatusChange(repair._id, e.target.value)}
                                            className="p-2 border rounded-md"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Resolved">Resolved</option>
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

export default RepairList;