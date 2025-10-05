import React, { useState } from "react";

const WarrantyValidation = () => {
  const [serialNumber, setSerialNumber] = useState("");
  const [qrFile, setQrFile] = useState(null);

  const handleCheckWarranty = () => {
    if (serialNumber.trim()) {
      console.log("Checking warranty for Serial Number:", serialNumber);
    } else if (qrFile) {
      console.log("Processing QR file:", qrFile.name);
    } else {
      alert("Please upload a QR code or enter a serial number.");
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-6 bg-gradient-to-r from-blue-200 via-purple-100 to-pink-200 flex flex-col items-center justify-start">
      <h1 className="text-2xl font-bold mb-8 text-center text-gray-800">
        Warranty Validation
      </h1>

      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md space-y-6">

        {/* QR Upload */}
        <div className="flex flex-col">
          <label className="font-semibold mb-2 text-gray-700">
            Upload QR Code (Image)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setQrFile(e.target.files[0])}
            className="border border-gray-300 rounded px-4 py-2"
          />
        </div>

        <div className="text-center text-gray-500">OR</div>

        {/* Serial Number Input */}
        <div className="flex flex-col">
          <label className="font-semibold mb-2 text-gray-700">
            Enter Serial Number
          </label>
          <input
            type="text"
            placeholder="e.g. SN123456789"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2"
          />
        </div>

        {/* Check Button */}
        <button
          onClick={handleCheckWarranty}
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Check Warranty
        </button>
      </div>
    </div>
  );
};

export default WarrantyValidation;
