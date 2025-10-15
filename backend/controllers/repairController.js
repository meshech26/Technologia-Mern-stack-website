// controllers/repairController.js
import Repair from '../models/Repair.js';

// Create a new repair request
export const createRepair = async (req, res) => {
  try {
    const existing = await Repair.findOne({ productId: req.body.productId });
    if (existing) {
      return res.status(400).json({ message: 'Product ID already exists' });
    }

    const allRepairs = await Repair.find({}, 'repairId').lean();
    const maxId = allRepairs.reduce((max, r) => {
      const match = r.repairId?.match(/PR(\d+)/);
      const num = match ? parseInt(match[1]) : 0;
      return num > max ? num : max;
    }, 0);

    const repairId = `PR${(maxId + 1).toString().padStart(3, '0')}`;
    const damagedImagePath = req.file ? req.file.path : '';

    const newRepair = new Repair({
      ...req.body,
      repairId,
      damagedImage: damagedImagePath,
      createdBy: req.user?.userId || null,
      submittedAt: new Date(),
    });

    const savedRepair = await newRepair.save();
    return res.status(201).json(savedRepair);
  } catch (error) {
    console.error('Error during repair creation:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Get all repair requests with filtering and sorting
export const getAllRepairs = async (req, res) => {
  try {
    const filter = {};

    if (req.query.repairId) filter.repairId = req.query.repairId;
    if (req.query.status) filter.status = req.query.status;
    if (req.query.isConfirmed) filter.isConfirmed = req.query.isConfirmed === 'true';
    if (req.query.isValid) filter.isValid = req.query.isValid === 'true';
    if (req.query.customerName) {
      filter.customerName = { $regex: req.query.customerName, $options: 'i' };
    }
    if (req.query.productName) {
      filter.productName = { $regex: req.query.productName, $options: 'i' };
    }
    if (req.query.startDate && req.query.endDate) {
      filter.submittedAt = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate),
      };
    }

    const sortField = req.query.sortBy || 'submittedAt';
    const sortOrder = req.query.order === 'desc' ? -1 : 1;

    const repairs = await Repair.find(filter).sort({ [sortField]: sortOrder });
    res.status(200).json(repairs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single repair by ID
export const getRepairById = async (req, res) => {
  try {
    const repair = await Repair.findById(req.params.id);
    if (!repair) {
      return res.status(404).json({ message: 'Repair not found' });
    }
    res.status(200).json(repair);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching repair' });
  }
};

// Update repair status or other fields
export const updateRepair = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'No update data provided' });
    }

    const existingRepair = await Repair.findById(req.params.id);
    if (!existingRepair) {
      return res.status(404).json({ message: 'Repair not found' });
    }

    if ('status' in req.body && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can update status' });
    }

    if (req.file) {
      const fieldName = req.file.fieldname;
      if (fieldName === 'damagedImage') {
        req.body.damagedImage = req.file.path;
      } else if (fieldName === 'repairedImage') {
        req.body.repairedImage = req.file.path;
      }
    }

    const updatedRepair = await Repair.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedRepair);
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a repair request
export const deleteRepair = async (req, res) => {
  try {
    await Repair.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Repair request deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};