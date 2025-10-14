import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/api";

export default function EditWarranty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    productName: "", productId: "", customerEmail: "", purchaseDate: "", warrantyMonths: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchWarranty = async () => {
      try {
        // --- THE FIX ---
        // The path now correctly matches the rest of the app (no leading slash).
        const res = await api.get(`/warranties/${id}`);
        const foundWarranty = res.data;
        
        if (foundWarranty) {
          setForm({
            productName: foundWarranty.productName,
            productId: foundWarranty.productId,
            customerEmail: foundWarranty.customerEmail || "",
            purchaseDate: new Date(foundWarranty.purchaseDate).toISOString().split('T')[0],
            warrantyMonths: foundWarranty.warrantyMonths || "",
          });
        }
      } catch (err) {
        console.error("Failed to fetch warranty for editing:", err);
        alert("Could not load warranty data for editing."); // This is the error you are seeing
      } finally {
        setLoading(false);
      }
    };
    fetchWarranty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put(`/warranties/${id}`, form);
      alert("Warranty updated successfully!");
      window.dispatchEvent(new Event("warrantyAdded"));
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to update warranty.");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (form.productId) {
      let warrantyMonths = "";
      if (form.productId.startsWith("R")) warrantyMonths = "12";
      else if (form.productId.startsWith("P")) warrantyMonths = "24";
      else if (form.productId.startsWith("S")) warrantyMonths = "36";
      else warrantyMonths = "0";
      setForm(prev => ({ ...prev, warrantyMonths }));
    }
  }, [form.productId]);

  if (loading) {
    return <p className="text-center mt-6">Loading warranty data...</p>;
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mt-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Edit Warranty</h2>
      <form onSubmit={handleSubmit}>
        {/* Unchanged JSX */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="block mb-1 font-semibold text-gray-700">Product Name *</label><input type="text" name="productName" value={form.productName} onChange={handleChange} required className="border p-2 rounded w-full mb-3"/></div>
          <div><label className="block mb-1 font-semibold text-gray-700">Product ID *</label><input type="text" name="productId" value={form.productId} onChange={handleChange} required className="border p-2 rounded w-full mb-3" placeholder="Starts with R, P, S for warranty"/><small className="text-gray-500">R=12m, P=24m, S=36m, Others=None</small></div>
          <div><label className="block mb-1 font-semibold text-gray-700">Customer Email</label><input type="email" name="customerEmail" value={form.customerEmail} onChange={handleChange} className="border p-2 rounded w-full mb-3"/></div>
          <div><label className="block mb-1 font-semibold text-gray-700">Purchase Date *</label><input type="date" name="purchaseDate" value={form.purchaseDate} onChange={handleChange} required className="border p-2 rounded w-full mb-3"/></div>
          <div><label className="block mb-1 font-semibold text-gray-700">Warranty Months</label><input type="number" name="warrantyMonths" value={form.warrantyMonths} onChange={handleChange} className="border p-2 rounded w-full mb-3" min="0" readOnly style={{ backgroundColor: '#f9f9f9' }}/><small className="text-gray-500">Auto-calculated from Product ID</small></div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button type="button" onClick={() => navigate("/dashboard")} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>
          <button type="submit" disabled={saving} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50">{saving ? "Updating..." : "Update Warranty"}</button>
        </div>
      </form>
    </div>
  );
}