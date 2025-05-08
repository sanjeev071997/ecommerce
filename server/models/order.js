import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  shippingInfo: {
    address: String,
    city: String,
    state: String,
    country: String,
    pinCode: String,
    phone: String
  },
  paymentInfo: {
    id: String,
    status: String
  },
  paidAt: Date,
  itemsPrice: Number,
  taxPrice: Number,
  shippingPrice: Number,
  totalPrice: Number,
  orderStatus: {
    type: String,
    default: 'Processing'
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
