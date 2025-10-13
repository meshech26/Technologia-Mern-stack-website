// models/Repair.js
import mongoose from 'mongoose';

const repairSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: [true, 'Product ID is required'],
    match: [/^R00/, "Product ID must start with 'R00'"],
    unique: true,
  },
  repairId: {
    type: String,
    required: true,
    unique: true,
  },
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
  },
  productName: {
    type: String,
    required: [true, 'Product name is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  damagedImage: {
    type: String,
    required: [true, 'Damaged image URL is required'],
  },
  repairedImage: {
    type: String,
  },
  status: {
    type: String,
    enum: {
      values: ['Pending', 'Rejected', 'Approved', 'In Progress', 'Resolved'],
      message: 'Status must be one of: Pending, Rejected, Approved, In Progress, Resolved',
    },
    default: 'Pending',
  },
  isValid: {
    type: Boolean,
    default: false,
  },
  isConfirmed: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

const Repair = mongoose.model('Repair', repairSchema);
export default Repair;