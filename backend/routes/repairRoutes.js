// routes/repairRoutes.js
import express from 'express';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';
import { isOwnerOrAdmin } from '../middleware/ownershipMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
import {
  createRepair,
  getAllRepairs,
  getRepairById,
  updateRepair,
  deleteRepair,
} from '../controllers/repairController.js';

const router = express.Router();

// Create a new repair request with damaged image upload
router.post('/', verifyToken, upload.single('damagedImage'), createRepair);

// Get all repair requests (public)
router.get('/', getAllRepairs);

// Get a single repair by ID (protected)
router.get('/:id', verifyToken, getRepairById);

// Update damaged image and description (basic user flow)
router.put('/:id', verifyToken, isOwnerOrAdmin, upload.single('damagedImage'), updateRepair);

// Update repaired image and status (admin-only flow)
router.put('/:id/admin', verifyToken, isAdmin, upload.single('repairedImage'), updateRepair);

// Delete a repair request by ID (admin or owner)
router.delete('/:id', verifyToken, isOwnerOrAdmin, deleteRepair);

export default router;