import asyncHandler from 'express-async-handler';
import Repair from '../models/repairModel.js';
import sendEmail from '../utils/sendEmail.js';

// @desc    Submit a repair request
// @route   POST /api/repairs
// @access  Public
const submitRepairRequest = asyncHandler(async (req, res) => {
  const { customerName, phoneNumber, productName, issueDescription } = req.body;

  const repair = await Repair.create({
    customerName,
    phoneNumber,
    productName,
    issueDescription,
  });

  if (repair) {
    res.status(201).json({ message: 'Repair request submitted successfully' });
  } else {
    res.status(400);
    throw new Error('Invalid repair data');
  }
});

// @desc    Get all repair requests
// @route   GET /api/repairs
// @access  Private/Admin
const getAllRepairs = asyncHandler(async (req, res) => {
  const repairs = await Repair.find({});
  res.status(200).json(repairs);
});

// @desc    Update repair status
// @route   PUT /api/repairs/:id
// @access  Private/Admin
const updateRepairStatus = asyncHandler(async (req, res) => {
  const repair = await Repair.findById(req.params.id);

  if (repair) {
    repair.status = req.body.status || repair.status;
    const updatedRepair = await repair.save();
    
    // Optional: Notify customer via email or SMS (using email here)
    // await sendEmail({ ... });

    res.status(200).json(updatedRepair);
  } else {
    res.status(404);
    throw new Error('Repair ticket not found');
  }
});

export { submitRepairRequest, getAllRepairs, updateRepairStatus };