import Order from '../models/order.js';
import Cart from '../models/cart.js';
import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../utils/errorhandler.js';
import logger from '../config/logger.js';

// Place a new order
export const placeOrder = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user.id;
  const {
    shippingInfo,
    paymentInfo,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart || cart.items.length === 0)
    return next(new ErrorHandler('Cart is empty', 400));

  const orderItems = cart.items.map(item => ({
    product: item.product._id,
    quantity: item.quantity
  }));

  const order = await Order.create({
    user: userId,
    orderItems,
    shippingInfo,
    paymentInfo,
    paidAt: Date.now(),
    itemsPrice: cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
    taxPrice,
    shippingPrice,
    totalPrice
  });

  // Clear cart
  cart.items = [];
  await cart.save();

  res.status(201).json({ success: true, message: 'Order placed successfully', data: order });
});

// Get logged in user's orders
export const getUserOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id }).populate('orderItems.product');
  res.status(200).json({ success: true, data: orders });
});

// Get single order by ID
export const getOrderById = catchAsyncErrors(async (req, res, next) => {
  // console.log(req.user, "order data")
  const order = await Order.findById(req.params.id).populate('user').populate('orderItems.product');
  console.log(order, "order")
  if (!order) return next(new ErrorHandler('Order not found', 404));
  res.status(200).json({ success: true, data: order });
});

// Admin: Get all orders
export const getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find().populate('user');
  res.status(200).json({ success: true, count: orders.length, data: orders });
});

// Admin: Update order status
export const updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) return next(new ErrorHandler('Order not found', 404));

  if (order.orderStatus === 'Delivered')
    return next(new ErrorHandler('Order already delivered', 400));

  order.orderStatus = req.body.status;
  if (req.body.status === 'Delivered') order.deliveredAt = Date.now();

  await order.save();
  res.status(200).json({ success: true, message: 'Order status updated' });
});

// Admin: Delete order
export const adminDeleteByOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) return next(new ErrorHandler('Order not found', 404));
  res.status(200).json({ success: true, message: 'Order deleted' });
});
