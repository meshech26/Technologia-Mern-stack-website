import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const RepairDashboard = () => {
  const [repairs, setRepairs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [productName, setProductName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sortBy, setSortBy] = useState('submittedAt');
  const [order, setOrder] = useState('desc');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = useAuth();

  const fetchRepairs = async () => {
    setLoading(true);
    try {
      const params = {
        repairId: searchTerm,
        status,
        customerName,
        productName,
        startDate,
        endDate,
        sortBy,
        order,
      };
      const res = await axios.get('http://localhost:5000/api/repairs', { params });
      setRepairs(res.data);
    } catch (error) {
      alert('Failed to load repairs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepairs(); // Initial load only
  }, []);

  const handleSearchKey = (e) => {
    if (e.key === 'Enter') {
      fetchRepairs();
    }
  };

  const handleAddClick = () => {
    if (isLoggedIn) {
      navigate('/repair/new');
    } else {
      navigate('/login', { state: { redirectTo: '/repair/new' } });
    }
  };

  const handleTransparencyClick = () => {
    navigate('/view-repair-images');
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this repair?');
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/repairs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Repair deleted successfully!');
      setRepairs((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      alert(error.response?.data?.message || 'Delete failed');
    }
  };

  if (loading) return <div className="p-6">Loading repairs...</div>;

  return (

      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Repair Dashboard</h1>
          <div className="space-x-2">
            <button
              onClick={handleTransparencyClick}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Before & After Gallery
            </button>
            <button
              onClick={handleAddClick}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              + Add Repair
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search by Repair ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchKey}
            className="border px-4 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            onKeyDown={handleSearchKey}
            className="border px-4 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            onKeyDown={handleSearchKey}
            className="border px-4 py-2 rounded"
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="border px-4 py-2 rounded">
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            onKeyDown={handleSearchKey}
            className="border px-4 py-2 rounded"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            onKeyDown={handleSearchKey}
            className="border px-4 py-2 rounded"
          />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border px-4 py-2 rounded">
            <option value="submittedAt">Submitted Date</option>
            <option value="status">Status</option>
            <option value="customerName">Customer Name</option>
          </select>
          <select value={order} onChange={(e) => setOrder(e.target.value)} className="border px-4 py-2 rounded">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {/* Table */}
        <table className="w-full border mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Repair ID</th>
              <th className="p-2 text-left">Customer</th>
              <th className="p-2 text-left">Product</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Submitted</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {repairs.map((r) => (
              <tr key={r._id} className="border-t">
                <td className="p-2">{r.repairId}</td>
                <td className="p-2">{r.customerName}</td>
                <td className="p-2">{r.productName}</td>
                <td className="p-2">{r.status}</td>
                <td className="p-2">{new Date(r.createdAt).toLocaleDateString()}</td>
                <td className="p-2 flex items-center space-x-2">
                  <button
                    onClick={() => navigate(`/repair/${r._id}/edit-basic`)}
                    title="Edit Description & Damaged Image"
                    className="text-yellow-600 hover:text-yellow-700 text-lg"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => navigate(`/repair/${r._id}`)}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate(`/repair/${r._id}/edit`)}
                    className="text-green-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(r._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default RepairDashboard;