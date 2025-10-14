import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function WarrantyDashboard() {
  const [warranties, setWarranties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [qrUploading, setQrUploading] = useState(null);
  const [qrGenerating, setQrGenerating] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [currentQrData, setCurrentQrData] = useState(null);
  const navigate = useNavigate();

  const fetchWarranties = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (statusFilter !== 'ALL') params.append('status', statusFilter);
      if (fromDate) params.append('fromDate', fromDate);
      if (toDate) params.append('toDate', toDate);

      // --- FIX: Standardized API path ---
      const res = await api.get(`/warranties?${params}`);
      setWarranties(res.data);
    } catch (err) {
      console.error("Failed to fetch warranties:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWarranties();
  }, []);

  useEffect(() => {
    const handleWarrantyAdded = () => fetchWarranties();
    window.addEventListener("warrantyAdded", handleWarrantyAdded);
    return () => window.removeEventListener("warrantyAdded", handleWarrantyAdded);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWarranties();
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("ALL");
    setFromDate("");
    setToDate("");
    fetchWarranties();
  };

  const handleGenerateQR = async (warrantyId) => {
    setQrGenerating(warrantyId);
    try {
      // --- FIX: Standardized API path ---
      const res = await api.get(`/warranties/${warrantyId}/generate-and-save-qr`);
      setCurrentQrData(res.data);
      setShowQrModal(true);
      fetchWarranties(); // Refresh list to show new QR image icon
    } catch (err) {
      alert(`Failed to generate QR code: ${err.response?.data?.message || err.message}`);
    } finally {
      setQrGenerating(null);
    }
  };

  const handleDownloadQR = async (warrantyId, productId) => {
    try {
      // --- FIX: Standardized API path ---
      const response = await api.get(`/warranties/${warrantyId}/download-qr`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `qr-${productId}.png`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Failed to download QR code.");
    }
  };

  const handleQrUpload = async (warrantyId, file) => {
    if (!file) return;
    setQrUploading(warrantyId);
    try {
      const formData = new FormData();
      formData.append("qrImage", file);
      // --- FIX: Standardized API path ---
      await api.put(`/warranties/${warrantyId}/upload-qr`, formData);
      alert("QR image uploaded successfully!");
      fetchWarranties();
    } catch (err) {
      alert("Failed to upload QR image.");
    } finally {
      setQrUploading(null);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this warranty?")) {
      try {
        // --- FIX: Standardized API path ---
        await api.delete(`/warranties/${id}`);
        alert("Warranty deleted successfully!");
        fetchWarranties();
      } catch (err) {
        alert("Failed to delete warranty.");
      }
    }
  };

  const handleView = (id) => navigate(`/view-warranty/${id}`);
  const handleEdit = (id) => navigate(`/edit-warranty/${id}`);

  if (loading) {
    return <p className="text-center mt-6">Loading warranties...</p>;
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mt-4">
      {showQrModal && currentQrData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">QR Code Generated</h3>
            <div className="text-center">
              <img src={currentQrData.qrCodeImage} alt="QR Code" className="mx-auto border rounded mb-4 max-w-xs" />
              <div className="text-left mb-4">
                <p><strong>Product ID:</strong> {currentQrData.productId}</p>
                <p><strong>Product Name:</strong> {currentQrData.productName}</p>
                <p><strong>Warranty ID:</strong> {currentQrData.warrantyId}</p>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleDownloadQR(currentQrData._id, currentQrData.productId)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex-1">Download QR</button>
                <button onClick={() => setShowQrModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 flex-1">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <h2 className="text-2xl font-bold mb-4">Warranty Records</h2>
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Search (ID/Product)</label><input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." className="w-full p-2 border rounded"/></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Status</label><select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full p-2 border rounded"><option value="ALL">All Status</option><option value="VALID">Valid</option><option value="EXPIRED">Expired</option></select></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">From Date</label><input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full p-2 border rounded"/></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">To Date</label><input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-full p-2 border rounded"/></div>
          <div className="flex items-end space-x-2"><button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Search</button><button type="button" onClick={handleClearFilters} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Clear</button></div>
        </form>
      </div>
      {warranties.length === 0 ? (<p className="text-gray-500">No warranties found.</p>) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Warranty ID</th>
                <th className="border border-gray-300 p-2 text-left">Product Name</th>
                <th className="border border-gray-300 p-2 text-left">Product ID</th>
                <th className="border border-gray-300 p-2 text-left">Purchase Date</th>
                <th className="border border-gray-300 p-2 text-left">QR Actions</th>
                <th className="border border-gray-300 p-2 text-left">QR Image</th>
                <th className="border border-gray-300 p-2 text-left">Status</th>
                <th className="border border-gray-300 p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {warranties.map((w) => (
                <tr key={w._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2 font-mono text-sm">{w.warrantyId}</td>
                  <td className="border border-gray-300 p-2">{w.productName}</td>
                  <td className="border border-gray-300 p-2">{w.productId}</td>
                  <td className="border border-gray-300 p-2">{new Date(w.purchaseDate).toLocaleDateString()}</td>
                  <td className="border border-gray-300 p-2">
                    <div className="flex flex-col space-y-2">
                      <button onClick={() => handleGenerateQR(w._id)} disabled={qrGenerating === w._id} className="bg-green-600 text-white px-2 py-1 rounded text-sm hover:bg-green-700 disabled:bg-gray-400">{qrGenerating === w._id ? "Generating..." : "Generate QR"}</button>
                      <button onClick={() => handleDownloadQR(w._id, w.productId)} className="bg-blue-600 text-white px-2 py-1 rounded text-sm hover:bg-blue-700">Download QR</button>
                    </div>
                  </td>
                  <td className="border border-gray-300 p-2">
                    {w.qrImage ? (<div className="flex flex-col items-center"><img src={`http://localhost:5000/uploads/${w.qrImage}`} alt="QR Code" className="w-12 h-12 object-cover border rounded"/></div>) : (
                      <div>
                        <input type="file" accept="image/*" onChange={(e) => handleQrUpload(w._id, e.target.files[0])} className="w-full text-sm" disabled={qrUploading === w._id}/>
                        {qrUploading === w._id && (<span className="text-xs text-blue-600">Uploading...</span>)}
                      </div>
                    )}
                  </td>
                  <td className={`border border-gray-300 p-2 font-semibold ${w.status === "VALID" ? "text-green-600" : "text-red-600"}`}>{w.status}</td>
                  <td className="border border-gray-300 p-2">
                    <div className="flex space-x-2">
                      <button onClick={() => handleView(w._id)} className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600">View</button>
                      <button onClick={() => handleEdit(w._id)} className="bg-green-500 text-white px-2 py-1 rounded text-sm hover:bg-green-600">Edit</button>
                      <button onClick={() => handleDelete(w._id)} className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}