import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/api";

export default function ViewWarranty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [warranty, setWarranty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWarranty = async () => {
      try {
        // --- FIX: Standardized API path ---
        const res = await api.get(`/warranties/${id}`);
        setWarranty(res.data);
      } catch (err) {
        console.error("Failed to fetch warranty:", err);
        alert("Could not load warranty details.");
      } finally {
        setLoading(false);
      }
    };
    fetchWarranty();
  }, [id]);

  const calculateExpiryDate = (purchaseDate, warrantyMonths) => {
    if (!purchaseDate || !warrantyMonths) return "N/A";
    const expiry = new Date(purchaseDate);
    expiry.setMonth(expiry.getMonth() + warrantyMonths);
    return expiry.toLocaleDateString();
  };

  if (loading) {
    return <p className="text-center mt-6">Loading warranty details...</p>;
  }

  if (!warranty) {
    return <p className="text-center mt-6">Warranty not found.</p>;
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mt-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Warranty Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Unchanged JSX */}
        <div className="space-y-4">
          <div><label className="font-semibold text-gray-700">Product Name:</label><p className="mt-1 p-2 bg-gray-50 rounded">{warranty.productName}</p></div>
          <div><label className="font-semibold text-gray-700">Product ID:</label><p className="mt-1 p-2 bg-gray-50 rounded">{warranty.productId}</p></div>
          <div><label className="font-semibold text-gray-700">Customer Email:</label><p className="mt-1 p-2 bg-gray-50 rounded">{warranty.customerEmail || "Not provided"}</p></div>
        </div>
        <div className="space-y-4">
          <div><label className="font-semibold text-gray-700">Purchase Date:</label><p className="mt-1 p-2 bg-gray-50 rounded">{new Date(warranty.purchaseDate).toLocaleDateString()}</p></div>
          <div><label className="font-semibold text-gray-700">Warranty Period:</label><p className="mt-1 p-2 bg-gray-50 rounded">{warranty.warrantyMonths ? `${warranty.warrantyMonths} months` : "No warranty"}</p></div>
          <div><label className="font-semibold text-gray-700">Expiry Date:</label><p className="mt-1 p-2 bg-gray-50 rounded">{calculateExpiryDate(warranty.purchaseDate, warranty.warrantyMonths)}</p></div>
          <div><label className="font-semibold text-gray-700">Status:</label><p className={`mt-1 p-2 rounded font-semibold ${warranty.status === "VALID" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{warranty.status}</p></div>
        </div>
      </div>
      {warranty.qrImage && (<div className="mt-6"><label className="font-semibold text-gray-700">QR Image:</label><div className="mt-2"><img src={`http://localhost:5000/uploads/${warranty.qrImage}`} alt="QR Code" className="max-w-xs border rounded"/></div></div>)}
      <div className="mt-8 flex justify-end space-x-4">
        <button onClick={() => navigate("/dashboard")} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Back to Dashboard</button>
        <button onClick={() => navigate(`/edit-warranty/${id}`)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Edit Warranty</button>
      </div>
    </div>
  );
}