import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

// --- Frontend Mock Data ---
const mockUsers = [
  { _id: '65f6c82d3f4a5b6c7d8e9f0a', name: 'Alice Admin', email: 'alice.a@technologia.com', role: 'admin' },
  { _id: '65f6c82d3f4a5b6c7d8e9f0b', name: 'Bob User', email: 'bob.u@gmail.com', role: 'user' },
  { _id: '65f6c82d3f4a5b6c7d8e9f0c', name: 'Charlie Tester', email: 'charlie.t@test.com', role: 'user' },
  { _id: '65f6c82d3f4a5b6c7d8e9f0d', name: 'David Manager', email: 'david.m@technologia.com', role: 'admin' },
];
// --- End Mock Data ---

const UserList = () => {
  // Replace backend query state with local state and mock data
  const [users, setUsers] = useState(mockUsers);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading] = useState(false); // Simulate loading state

  const navigate = useNavigate();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user? (Frontend Simulation)')) {
      setIsDeleting(true);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500)); 

        // Check if the user is an admin (optional safety check)
        const userToDelete = users.find(u => u._id === id);
        if (userToDelete && userToDelete.role === 'admin') {
            toast.error('Cannot delete an admin account in this simulation.');
            return;
        }

        // Update local state to remove the user
        setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
        toast.success('User deleted successfully (frontend only)');
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        toast.error('Failed to delete user (frontend simulation)');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">User Management</h1>
      
      {/* Simulated Deleting/Loading States */}
      {isDeleting && <p className="text-center text-red-600 text-lg my-4">Deleting user...</p>}
      {isLoading && <p className="text-center text-indigo-600 text-lg my-4">Loading users...</p>}
      
      {/* Conditional Rendering based on simulated loading */}
      {!isLoading && (
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                <th className="py-3 px-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                <th className="py-3 px-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-800" title={user._id}>
                    {user._id.substring(0, 12)}...
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">{user.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">
                    <a href={`mailto:${user.email}`} className="text-indigo-600 hover:underline">
                      {user.email}
                    </a>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {/* Displaying Role */}
                    {user.role === 'admin' ? (
                      <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                         <FaCheck className="mr-1" /> Admin
                      </span>
                    ) : (
                      <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                         <FaTimes className="mr-1" /> User
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 flex items-center justify-center space-x-2">
                    <button
                      onClick={() => navigate(`/admin/users/${user._id}/edit`)}
                      className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition-colors shadow-sm"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteHandler(user._id)}
                      className={`p-2 rounded-full transition-colors shadow-sm ${user.role === 'admin' ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-red-500 text-white hover:bg-red-600'}`}
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