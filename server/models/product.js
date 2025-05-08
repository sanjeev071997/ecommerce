import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide product description']
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  stock: {
    type: Number,
    required: [true, 'Please provide product stock'],
    default: 1
  },
  imageUrl: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
