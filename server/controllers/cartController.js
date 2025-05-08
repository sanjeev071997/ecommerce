import mongoose from 'mongoose';
import Cart from '../models/cart.js';
import Product from '../models/product.js';
import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../utils/errorhandler.js';
import logger from '../config/logger.js';

// Add product to cart
// export const addToCart = catchAsyncErrors(async (req, res, next) => {
//   const userId = req.user.id;
//   const { productId, quantity } = req.body;

//   try {
//     let cart = await Cart.findOne({ user: userId });

//     if (!cart) {
//       cart = await Cart.create({
//         user: userId,
//         items: [{ product: productId, quantity }]
//       });
//     } else {
//       const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
//       if (itemIndex > -1) {
//         cart.items[itemIndex].quantity += quantity;
//       } else {
//         cart.items.push({ product: productId, quantity });
//       }
//       await cart.save();
//     }

//     res.status(200).json({ success: true, message: 'Item added to cart', data: cart });
//   } catch (error) {
//     logger.error(error);
//     return next(new ErrorHandler(error.message, 500));
//   }
// });

export const addToCart = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  // Basic validations
  if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ success: false, message: 'Invalid or missing productId' });
  }

  if (quantity !== undefined && (!Number.isInteger(quantity) || quantity < 1)) {
    return res.status(400).json({ success: false, message: 'Quantity must be an integer >= 1' });
  }

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity: quantity || 1 }]
      });
    } else {
      const itemIndex = cart.items.findIndex(
        item => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity || 1;
      } else {
        cart.items.push({ product: productId, quantity: quantity || 1 });
      }

      await cart.save();
    }

    res.status(200).json({
      success: true,
      message: 'Item added to cart',
      data: cart
    });
  } catch (error) {
    console.error(error); // or logger.error(error)
    return next(new ErrorHandler(error.message, 500));
  }
});


// Get user cart
export const getCart = catchAsyncErrors(async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate({
      path: 'items.product',
      populate: {
        path: 'category',
        model: 'Category' 
      }
    });
    if (!cart) return res.status(200).json({ success: true, data: [] });
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    logger.error(error);
    return next(new ErrorHandler(error.message, 500));
  }
});

// Update cart item quantity
export const updateCartItem = catchAsyncErrors(async (req, res, next) => {
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return next(new ErrorHandler('Cart not found', 404));

    const item = cart.items.find(item => item.product.toString() === productId);
    if (!item) return next(new ErrorHandler('Item not found in cart', 404));

    item.quantity = quantity;
    await cart.save();
    res.status(200).json({ success: true, message: 'Quantity updated', data: cart });
  } catch (error) {
    logger.error(error);
    return next(new ErrorHandler(error.message, 500));
  }
});

// Remove item from cart
export const removeCartItem = catchAsyncErrors(async (req, res, next) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return next(new ErrorHandler('Cart not found', 404));

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();
    res.status(200).json({ success: true, message: 'Item removed', data: cart });
  } catch (error) {
    logger.error(error);
    return next(new ErrorHandler(error.message, 500));
  }
});

// Clear cart
export const clearCart = catchAsyncErrors(async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return next(new ErrorHandler('Cart not found', 404));

    cart.items = [];
    await cart.save();
    res.status(200).json({ success: true, message: 'Cart cleared' });
  } catch (error) {
    logger.error(error);
    return next(new ErrorHandler(error.message, 500));
  }
});
