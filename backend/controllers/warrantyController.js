import asyncHandler from 'express-async-handler';
import Warranty from '../models/warrantyModel.js';

// @desc    Check a product's warranty
// @route   POST /api/warranties/check
// @access  Public
const checkWarranty = asyncHandler(async (req, res) => {
  const { serialNumber } = req.body;
  const warranty = await Warranty.findOne({ serialNumber }).populate('product', 'name');

  if (warranty) {
    const expiryDate = new Date(warranty.purchaseDate);
    expiryDate.setMonth(expiryDate.getMonth() + warranty.warrantyPeriodInMonths);

    const isExpired = new Date() > expiryDate;

    res.json({
      productName: warranty.product.name,
      purchaseDate: warranty.purchaseDate,
      expiryDate,
      isExpired,
      status: warranty.status,
    });
  } else {
    res.status(404).json({ message: 'Warranty not found for this serial number' });
  }
});

// @desc    Submit a warranty claim
// @route   POST /api/warranties
// @access  Private
const submitWarrantyClaim = asyncHandler(async (req, res) => {
  // This is a simplified version. A real app might create a warranty record
  // at the time of purchase. Here, we assume it exists.
  const { serialNumber } = req.body;
  const warranty = await Warranty.findOne({ serialNumber });
  
  if (warranty) {
     // Logic to update status, maybe add a claim description etc.
     warranty.status = 'Claim Submitted';
     await warranty.save();
     res.status(201).json({ message: 'Warranty claim submitted successfully.' });
  } else {
    res.status(404);
    throw new Error('Cannot submit claim for a non-existent warranty.');
  }
});

// @desc    Get all warranty claims
// @route   GET /api/warranties
// @access  Private/Admin
const getAllWarranties = asyncHandler(async (req, res) => {
    const warranties = await Warranty.find({}).populate('user', 'name').populate('product', 'name');
    res.json(warranties);
});

// @desc    Update warranty status
// @route   PUT /api/warranties/:id
// @access  Private/Admin
const updateWarrantyStatus = asyncHandler(async (req, res) => {
    const warranty = await Warranty.findById(req.params.id);
    if(warranty){
        warranty.status = req.body.status || warranty.status;
        const updatedWarranty = await warranty.save();
        res.json(updatedWarranty);
    } else {
        res.status(404);
        throw new Error('Warranty record not found');
    }
});


export { checkWarranty, submitWarrantyClaim, getAllWarranties, updateWarrantyStatus };