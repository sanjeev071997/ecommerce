import express from 'express';
import {
  placeOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  adminDeleteByOrder
} from '../controllers/orderController.js';
import { isAuthenticatedUser, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', isAuthenticatedUser, placeOrder);
router.get('/me', isAuthenticatedUser, getUserOrders);
router.get('/:id', isAuthenticatedUser, getOrderById);

// Admin routes
router.get('/admin/orders', isAuthenticatedUser, isAdmin, getAllOrders);
router.put('/admin/order/:id', isAuthenticatedUser, isAdmin, updateOrderStatus);
router.delete('/admin/order/:id', isAuthenticatedUser, isAdmin, adminDeleteByOrder);

export default router;
