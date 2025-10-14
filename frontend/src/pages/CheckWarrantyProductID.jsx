import { useState } from "react";
import { api } from "../api/api";
import { Link } from "react-router-dom";

export default function CheckWarrantyProductID() {
  const [productId, setProductId] = useState("");
  const [checkResult, setCheckResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheckByProductId = async () => {
    if (!productId) {
      alert("Please enter a Product ID to check!");
      return;
    }

    setLoading(true);
    setCheckResult(null);

    try {
      const res = await api.post("/warranties/check", { productId });
      
      if (res.data.status) {
        setCheckResult({ success: true, data: res.data });
      } else {
        setCheckResult({ success: false, message: "No warranty found for this product ID." });
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
        <h2 className="text-2xl font-bold">Check Warranty by Product ID</h2>
        <Link 
          to="/warranty" 
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back to Form
        </Link>
      </div>

      <div className="space-y-4">
        <p className="text-gray-600">
          Enter the unique Product ID to find the current warranty status and expiry date.
        </p>
        <input
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder="Enter Product ID to check"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleCheckByProductId}
          disabled={loading || !productId}
          className="bg-purple-600 text-white px-4 py-2 rounded w-full hover:bg-purple-700 disabled:bg-gray-400"
        >
          {loading ? "Checking..." : "Check Warranty"}
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