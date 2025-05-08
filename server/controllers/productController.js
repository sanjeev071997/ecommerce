import Product from "../models/product.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorhandler.js";
import logger from "../config/logger.js";

// Create Product
export const createProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      message: "Product created",
      data: product,
    });
  } catch (error) {
    logger.error(error);
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get All Products
export const getAllProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    logger.error(error);
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get Single Product
export const getProductById = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) return next(new ErrorHandler("Product not found", 404));
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    logger.error(error);
    return next(new ErrorHandler(error.message, 500));
  }
});

// Update Product
export const updateProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return next(new ErrorHandler("Product not found", 404));
    res.status(200).json({
      success: true,
      message: "Product updated",
      data: product,
    });
  } catch (error) {
    logger.error(error);
    return next(new ErrorHandler(error.message, 500));
  }
});

// Delete Product
export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return next(new ErrorHandler("Product not found", 404));
    res.status(200).json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    logger.error(error);
    return next(new ErrorHandler(error.message, 500));
  }
});
