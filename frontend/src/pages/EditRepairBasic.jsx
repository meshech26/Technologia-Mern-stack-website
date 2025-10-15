import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditRepairBasic = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [damagedImage, setDamagedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRepair = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/repairs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDescription(res.data.description);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchRepair();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('description', description);
    if (damagedImage) formData.append('damagedImage', damagedImage);

    try {
      await axios.put(`http://localhost:5000/api/repairs/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Repair updated successfully!');
      navigate('/repair/');
    } catch (error) {
      alert(error.response?.data?.message || 'Update failed');
    }
  };

  if (loading) return <div className="p-6">Loading repair...</div>;
  if (error) return <div className="p-6 text-red-600">Failed to load repair. Please try again.</div>;

  return (
    <div className="min-h-screen pt-28 pb-16 px-6 bg-gradient-to-r from-blue-200 via-purple-100 to-pink-200 flex flex-col items-center justify-start">
      <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4 text-center">Edit Description & Damaged Image</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded"
            rows={4}
            placeholder="Update description"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setDamagedImage(e.target.files[0])}
            className="w-full border px-4 py-2 rounded"
          />
          <div className="flex justify-center">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRepairBasic;