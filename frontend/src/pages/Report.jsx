import { useEffect, useState } from "react";
import { api } from "../api/api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // <-- CORRECTED IMPORT
import { CSVLink } from "react-csv";

export default function Report() {
  const [data, setData] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const fetchData = async () => {
    try {
      const res = await api.get("/warranties");
      setData(res.data);
    } catch (error) {
      console.error("Failed to fetch warranty data:", error);
      alert("Could not fetch warranty data for the report.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = data.filter((w) => {
    const date = new Date(w.purchaseDate);
    // Add time to 'to' date to include the full day
    const toDate = to ? new Date(to) : null;
    if (toDate) toDate.setHours(23, 59, 59, 999);
    
    return (!from || date >= new Date(from)) && (!to || date <= toDate);
  });

  const exportPDF = () => {
    if (filtered.length === 0) {
      alert("No data available to export.");
      return;
    }

    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(16);
    doc.text("Technologia Warranty System - Warranty Report", 14, 15);
    
    // Date range
    doc.setFontSize(10);
    doc.text(`Date Range: ${from || "Start"} to ${to || "End"}`, 14, 22);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 28);
    
    // Table - Use the imported autoTable function
    autoTable(doc, { // <-- CORRECTED USAGE
      head: [["Warranty ID", "Product", "Product ID", "Purchase Date", "Warranty (Months)", "Status"]],
      body: filtered.map((w) => [
        w.warrantyId || "N/A",
        w.productName,
        w.productId,
        new Date(w.purchaseDate).toLocaleDateString(),
        w.warrantyMonths || "0",
        w.status
      ]),
      startY: 35,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [59, 130, 246] } // A nice blue color for the header
    });
    
    doc.save("warranty-report.pdf");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Warranty Report</h2>

      <div className="flex gap-4 mb-6 flex-wrap">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <div className="flex items-end gap-2">
          <button
            onClick={exportPDF}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 h-fit"
          >
            Export PDF
          </button>
          <CSVLink
            data={filtered.map((w) => ({
              WarrantyID: w.warrantyId,
              Product: w.productName,
              ProductID: w.productId,
              PurchaseDate: new Date(w.purchaseDate).toLocaleDateString(),
              WarrantyMonths: w.warrantyMonths,
              Status: w.status
            }))}
            filename="warranty-report.csv"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 h-fit inline-block"
          >
            Export CSV
          </CSVLink>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Warranty ID</th>
              <th className="border p-2 text-left">Product</th>
              <th className="border p-2 text-left">Product ID</th>
              <th className="border p-2 text-left">Purchase Date</th>
              <th className="border p-2 text-left">Warranty (Months)</th>
              <th className="border p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((w) => (
              <tr key={w._id} className="border-t hover:bg-gray-50">
                <td className="border p-2 font-mono text-sm">{w.warrantyId}</td>
                <td className="border p-2">{w.productName}</td>
                <td className="border p-2">{w.productId}</td>
                <td className="border p-2">{new Date(w.purchaseDate).toLocaleDateString()}</td>
                <td className="border p-2">{w.warrantyMonths || "0"}</td>
                <td className={`border p-2 font-semibold ${
                  w.status === "VALID" ? "text-green-600" : "text-red-600"
                }`}>
                  {w.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}