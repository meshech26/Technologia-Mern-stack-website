import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const WarrantySchema = new mongoose.Schema({
  warrantyId: { 
    type: String, 
    unique: true, 
    default: () => `WARR-${uuidv4().slice(0, 8).toUpperCase()}` 
  },
  productName: { type: String, required: true },
  productId: { type: String, required: true },
  customerEmail: { type: String },
  purchaseDate: { type: Date, required: true },
  warrantyMonths: { type: Number },
  qrImage: { type: String },
  status: { type: String, enum: ["VALID", "EXPIRED"], default: "VALID" },
  createdAt: { type: Date, default: Date.now },
});

// Check if warranty is valid now
WarrantySchema.methods.isValidNow = function () {
  const end = new Date(this.purchaseDate);
  end.setMonth(end.getMonth() + this.warrantyMonths);
  return new Date() <= end;
};

// Pre-save: set warrantyMonths based on productId prefix
WarrantySchema.pre("save", function (next) {
  if (this.productId.startsWith("R")) this.warrantyMonths = 12;
  else if (this.productId.startsWith("P")) this.warrantyMonths = 24;
  else if (this.productId.startsWith("S")) this.warrantyMonths = 36;
  else this.warrantyMonths = 0;

  this.status = this.isValidNow() ? "VALID" : "EXPIRED";
  next();
});

export default mongoose.model("Warranty", WarrantySchema,"warranties");