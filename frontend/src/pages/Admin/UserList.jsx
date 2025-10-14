import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
//import { useGetUsersQuery, useDeleteUserMutation } from '../../redux/api/adminApiSlice';
//import Loader from '../../components/Loader';
//import Message from '../../components/Message';

const UserList = () => {
  const { data: users, isLoading, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const navigate = useNavigate();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await deleteUser(id).unwrap();
        toast.success('User deleted successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Users</h1>
      {isDeleting && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 text-left uppercase font-semibold text-sm">ID</th>
                <th className="py-3 px-4 text-left uppercase font-semibold text-sm">Name</th>
                <th className="py-3 px-4 text-left uppercase font-semibold text-sm">Email</th>
                <th className="py-3 px-4 text-center uppercase font-semibold text-sm">Admin</th>
                <th className="py-3 px-4 text-center uppercase font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4" title={user._id}>
                    {user._id.substring(0, 12)}...
                  </td>
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">
                    <a href={`mailto:${user.email}`} className="text-blue-600 hover:underline">
                      {user.email}
                    </a>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {user.role === 'admin' ? (
                      <FaCheck className="text-green-500 mx-auto" />
                    ) : (
                      <FaTimes className="text-red-500 mx-auto" />
                    )}
                  </td>
                  <td className="py-3 px-4 flex items-center justify-center space-x-2">
                    {/* ✅ Fixed: Match the router path */}
                    <button
                      onClick={() => navigate(`/admin/users/${user._id}/edit`)}
                      className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition-colors"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteHandler(user._id)}
                      className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
                      disabled={user.role === 'admin'}
                    >
                      <FaTrash />
                    </button>
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

export default UserList;
