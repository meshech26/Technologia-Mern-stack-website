import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const EditRepair = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [repair, setRepair] = useState(null);
  const [formData, setFormData] = useState({
    status: '',
    repairedImage: null,
    isValid: false,
    isConfirmed: false,
  });

  useEffect(() => {
    const fetchRepair = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/repairs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRepair(res.data);
        setFormData({
          status: res.data.status || '',
          repairedImage: null,
          isValid: res.data.isValid || false,
          isConfirmed: res.data.isConfirmed || false,
        });
      } catch (error) {
        alert('Failed to load repair data');
      }
    };
    fetchRepair();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      repairedImage: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const data = new FormData();
      data.append('status', formData.status);
      data.append('isValid', formData.isValid);
      data.append('isConfirmed', formData.isConfirmed);
      if (formData.repairedImage) {
        data.append('repairedImage', formData.repairedImage); // ✅ Must match backend field
      }

      await axios.put(`http://localhost:5000/api/repairs/${id}/admin`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Repair updated successfully!');
      navigate(`/repair/${id}`);
    } catch (error) {
      alert(error.response?.data?.message || 'Update failed');
    }
  };

  if (!repair) return <div className="p-6">Loading...</div>;

  return (
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Edit Repair: {repair.repairId}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Status */}
          <div>
            <label className="block font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            >
              {['Pending', 'Rejected', 'Approved', 'In Progress', 'Resolved'].map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Repaired Image Upload */}
          <div>
            <label className="block font-medium mb-1">Upload Repaired Image</label>
            <input
              type="file"
              name="repairedImage"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border px-4 py-2 rounded"
            />
          </div>

          {/* Checkboxes */}
          <div className="flex items-center space-x-4">
            <label>
              <input
                type="checkbox"
                name="isValid"
                checked={formData.isValid}
                onChange={handleChange}
                className="mr-2"
              />
              Is Valid
            </label>
            <label>
              <input
                type="checkbox"
                name="isConfirmed"
                checked={formData.isConfirmed}
                onChange={handleChange}
                className="mr-2"
              />
              Is Confirmed
            </label>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Update
          </button>
        </form>
      </div>
  );
};

export default EditRepair;