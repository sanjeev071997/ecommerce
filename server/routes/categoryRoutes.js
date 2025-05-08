// routes/categoryRoutes.js
import express from 'express';
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController.js';
import { isAuthenticatedUser, isAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post('/add',isAuthenticatedUser, isAdmin, createCategory);
router.get('/get', getAllCategories);
router.get('/get/:id', getCategoryById);
router.put('/update/:id', isAuthenticatedUser, isAdmin, updateCategory);
router.delete('/delete/:id',isAuthenticatedUser, isAdmin, deleteCategory);

export default router;
