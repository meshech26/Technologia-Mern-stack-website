import { useState } from "react";
import { api } from "../api/api";
import { Link } from "react-router-dom";

export default function CheckWarrantyQR() {
  const [qrImage, setQrImage] = useState(null);
  const [checkResult, setCheckResult] = useState(null); // Use null to show/hide result box
  const [loading, setLoading] = useState(false);

  const handleQrCheck = async () => {
    if (!qrImage) {
      alert("Please select a QR image file first!");
      return;
    }

    setLoading(true);
    setCheckResult(null); // Reset previous results

    try {
      const formData = new FormData();
      formData.append("qrImage", qrImage);

      const res = await api.post("/warranties/check-qr", formData);

      if (res.data.found) {
        setCheckResult({ success: true, data: res.data });
      } else {
        setCheckResult({ success: false, message: res.data.message });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error checking warranty.";
      setCheckResult({ success: false, message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mt-4 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Check Warranty by QR Code</h2>
        <Link 
          to="/warranty" 
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back to Form
        </Link>
      </div>

      <div className="space-y-4">
        <p className="text-gray-600">
          Upload the QR code image that was generated from the dashboard to check the warranty status of a product.
        </p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setQrImage(e.target.files[0])}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleQrCheck}
          disabled={loading || !qrImage}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Checking QR..." : "Check Warranty"}
        </button>
      </div>

      {/* --- Results Display --- */}
      {checkResult && (
        <div className={`mt-6 p-4 rounded-lg ${checkResult.success ? 'bg-green-100' : 'bg-red-100'}`}>
          <h3 className="text-lg font-bold mb-3 ${checkResult.success ? 'text-green-800' : 'text-red-800'}">
            {checkResult.success ? "Warranty Found" : "Result"}
          </h3>

          {checkResult.success ? (
            <div className="space-y-2 text-green-900">
              <p><strong>Product:</strong> {checkResult.data.productName}</p>
              <p><strong>Product ID:</strong> {checkResult.data.productId}</p>
              <p><strong>Expires On:</strong> {new Date(checkResult.data.expiryDate).toLocaleDateString()}</p>
              <p>
                <strong>Status:</strong> 
                <span className={`font-semibold ml-2 ${
                  checkResult.data.status === "VALID" ? "text-green-700" : "text-red-700"
                }`}>
                  {checkResult.data.status}
                </span>
              </p>
            </div>
          ) : (
            <p className="text-red-800">{checkResult.message}</p>
          )}
        </div>
      )}
    </div>
  );
}