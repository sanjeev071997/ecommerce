import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
import { isAuthenticatedUser, isAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post('/add', isAuthenticatedUser, isAdmin, createProduct);
router.get('/get', getAllProducts);
router.get('/get/:id', getProductById);
router.put('/update/:id', isAuthenticatedUser, isAdmin, updateProduct);
router.delete('/delete/:id', isAuthenticatedUser, isAdmin, deleteProduct);

export default router;
