import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddRepair = () => {
  const [formData, setFormData] = useState({
    productId: '',
    customerName: '',
    productName: '',
    description: '',
    damagedImage: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, damagedImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.productId.startsWith("R00")) {
      alert("Product ID must start with 'R00'");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const form = new FormData();

      form.append('productId', formData.productId);
      form.append('customerName', formData.customerName);
      form.append('productName', formData.productName);
      form.append('description', formData.description);

      if (formData.damagedImage) {
        form.append('damagedImage', formData.damagedImage);
      }

      await axios.post('http://localhost:5000/api/repairs', form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Repair submitted successfully!');
      navigate('/repair');
    } catch (error) {
      alert(error.response?.data?.message || 'Submission failed');
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-6 bg-gradient-to-r from-blue-200 via-purple-100 to-pink-200 flex flex-col items-center justify-start">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-start mb-4">
          <button
            onClick={() => navigate('/repair')}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            ← Back to Dashboard
          </button>
        </div>

        <h1 className="text-2xl font-bold mb-4">Submit a Repair Request</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {['productId', 'customerName', 'productName', 'description'].map((field) => (
            <div key={field}>
              <label className="block font-medium mb-1 capitalize">{field}</label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded"
              />
            </div>
          ))}

          <div>
            <label className="block font-medium mb-1">Damaged Image</label>
            <input
              type="file"
              name="damagedImage"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="w-full border px-4 py-2 rounded"
            />
          </div>

          <div className="flex justify-center">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRepair;