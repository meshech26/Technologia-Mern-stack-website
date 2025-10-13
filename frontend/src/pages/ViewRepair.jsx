import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ViewRepair = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [repair, setRepair] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepair = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/repairs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRepair(res.data);
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to load repair details');
      } finally {
        setLoading(false);
      }
    };

    fetchRepair();
  }, [id]);

  const renderImage = (label, path) => {
    if (!path) return null;
    const imageUrl = path.startsWith('http') ? path : `http://localhost:5000/${path}`;
    return (
      <div className="text-center">
        <p className="font-semibold mb-2">{label}</p>
        <img src={imageUrl} alt={label} className="w-40 h-40 object-cover rounded border" />
      </div>
    );
  };

  if (loading) return <div className="p-6">Loading repair details...</div>;
  if (!repair) return <div className="p-6">No repair found.</div>;

  return (
    <>
      <Header />
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/repair')}
        className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-2xl font-bold">Repair Details</h1>

      {/* Image Preview Section */}
      <div className="grid grid-cols-2 gap-6">
        {renderImage('Before (Damaged)', repair.damagedImage)}
        {renderImage('After (Repaired)', repair.repairedImage)}
      </div>

      {/* Text Details */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {Object.entries(repair).map(([key, value]) => {
          const isImageField = key.toLowerCase().includes('image');
          if (isImageField) return null;

          return (
            <div key={key}>
              <span className="font-semibold capitalize">{key}:</span>{' '}
              <span>{value || '—'}</span>
            </div>
          );
        })}
      </div>
    </div>
     <Footer />
    </>
  );
};

export default ViewRepair;