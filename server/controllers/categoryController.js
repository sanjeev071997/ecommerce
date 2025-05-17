import Category from "../models/category.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Errorhandler from "../utils/Errorhandler.js";
import logger from "../config/logger.js";

// Create Category
export const createCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const category = await Category.create({ name, description });
    res.status(201).json({
      success: true,
      message: "Category created",
      data: category,
    });
  } catch (error) {
    logger.error(error);
    return next(new Errorhandler(error.message, 500));
  }
});

// Get All Categories
export const getAllCategories = catchAsyncErrors(async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    logger.error(error);
    return next(new Errorhandler(error.message, 500));
  }
});

// Get Single Category
export const getCategoryById = catchAsyncErrors(async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return next(new Errorhandler("Category not found", 404));
    }
    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    logger.error(error);
    return next(new Errorhandler(error.message, 500));
  }
});

// Update Category
export const updateCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) {
      return next(new Errorhandler("Category not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Category updated",
      data: category,
    });
  } catch (error) {
    logger.error(error);
    return next(new Errorhandler(error.message, 500));
  }
});

// Delete Category
export const deleteCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return next(new Errorhandler("Category not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Category deleted",
    });
  } catch (error) {
    logger.error(error);
    return next(new Errorhandler(error.message, 500));
  }
});
