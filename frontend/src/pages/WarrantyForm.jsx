import { useState } from "react";
import { api } from "../api/api";
import { Link } from "react-router-dom"; // Import Link for navigation

export default function WarrantyForm() {
  const [form, setForm] = useState({
    productName: "",
    productId: "",
    customerEmail: "",
    purchaseDate: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle warranty creation
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.productName || !form.productId || !form.purchaseDate) {
      alert("Please fill all required fields!");
      return;
    }
    
    setSubmitting(true);
    try {
      const res = await api.post("/warranties", form);
      alert(`✅ Warranty created for ${res.data.productName}`);

      // Trigger dashboard auto-refresh
      window.dispatchEvent(new Event("warrantyAdded"));

      // Reset form
      setForm({
        productName: "",
        productId: "",
        customerEmail: "",
        purchaseDate: "",
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Failed to create warranty. Check console for details.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mt-4 max-w-2xl mx-auto">
      {/* --- Header with Navigation Buttons --- */}
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-bold">Submit a Warranty</h2>
        
        {/* --- Buttons in the Top-Right Corner --- */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Link 
            to="/check-warranty-qr" 
            className="bg-green-600 text-white text-center px-4 py-2 rounded hover:bg-green-700 text-sm"
          >
            Check by QR Code
          </Link>
          <Link 
            to="/check-warranty-product-id" 
            className="bg-purple-600 text-white text-center px-4 py-2 rounded hover:bg-purple-700 text-sm"
          >
            Check by Product ID
          </Link>
        </div>
      </div>

      {/* --- Warranty Submission Form --- */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Product Name *</label>
          <input
            type="text"
            name="productName"
            value={form.productName}
            onChange={handleChange}
            placeholder="Enter product name"
            required
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">Product ID *</label>
          <input
            type="text"
            name="productId"
            value={form.productId}
            onChange={handleChange}
            placeholder="Enter product ID"
            required
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">Customer Email</label>
          <input
            type="email"
            name="customerEmail"
            value={form.customerEmail}
            onChange={handleChange}
            placeholder="Enter customer email (optional)"
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">Purchase Date *</label>
          <input
            type="date"
            name="purchaseDate"
            value={form.purchaseDate}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 disabled:bg-gray-400"
        >
          {submitting ? "Submitting..." : "Submit Warranty"}
        </button>
      </form>
    </div>
  );
}