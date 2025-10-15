import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewRepairImages = () => {
  const [repairs, setRepairs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepairs = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/repairs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRepairs(res.data);
      } catch (error) {
        alert('Failed to load repair images');
      } finally {
        setLoading(false);
      }
    };

    fetchRepairs();
  }, []);

  if (loading) return <div className="p-6">Loading images...</div>;

  return (
    <div className="min-h-screen pt-28 pb-16 px-6 bg-gradient-to-r from-blue-200 via-purple-100 to-pink-200 flex flex-col items-center justify-start">
      <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-md space-y-6">
        <h2 className="text-2xl font-bold">Before & After Gallery</h2>

        {repairs.length === 0 ? (
          <p>No repairs found.</p>
        ) : (
          repairs.map((repair) => (
            <div key={repair._id} className="border rounded p-4 shadow-sm">
              <h3 className="font-semibold mb-1">Repair ID: {repair.repairId}</h3>
              <p className="text-sm text-gray-700 mb-2">Description: {repair.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-1">Before Repair</p>
                  <img
                    src={`http://localhost:5000/${repair.damagedImage}`}
                    alt="Before"
                    className="w-full h-64 object-cover rounded border"
                  />
                </div>
                {repair.repairedImage && (
                  <div>
                    <p className="text-sm font-medium mb-1">After Repair</p>
                    <img
                      src={`http://localhost:5000/${repair.repairedImage}`}
                      alt="After"
                      className="w-full h-64 object-cover rounded border"
                    />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewRepairImages;