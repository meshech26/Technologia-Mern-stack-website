import express from 'express';
const router = express.Router();
import {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  createProduct,
  updateProduct,
  deleteProduct,
  getOrders,
  updateOrderToDelivered,
  getAdminStats,
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// User Management
router.route('/users').get(protect, admin, getUsers);
router.route('/users/:id').get(protect, admin, getUser).delete(protect, admin, deleteUser).put(protect, admin, updateUser);

// Product Management
router.route('/products').post(protect, admin, createProduct);
router.route('/products/:id').put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);

// Order Management
router.route('/orders').get(protect, admin, getOrders);
router.route('/orders/:id/deliver').put(protect, admin, updateOrderToDelivered);

// Dashboard Stats
router.route('/stats').get(protect, admin, getAdminStats);

export default router;