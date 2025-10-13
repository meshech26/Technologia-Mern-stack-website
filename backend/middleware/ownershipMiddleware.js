// middleware/ownershipMiddleware.js
import Repair from '../models/Repair.js';

export const isOwnerOrAdmin = async (req, res, next) => {
  try {
    const repair = await Repair.findById(req.params.id);
    if (!repair) {
      return res.status(404).json({ message: 'Repair not found' });
    }

    const isOwner = repair.createdBy.toString() === req.user.userId;
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Access denied. Not authorized.' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};