import express from 'express';
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart
} from '../controllers/cartController.js';
import { isAuthenticatedUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add', isAuthenticatedUser, addToCart);
router.get('/get', isAuthenticatedUser, getCart);
router.put('/update', isAuthenticatedUser, updateCartItem);
router.delete('/delete/:productId', isAuthenticatedUser, removeCartItem);
router.delete('/delete', isAuthenticatedUser, clearCart);

export default router;
