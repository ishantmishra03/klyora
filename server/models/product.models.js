import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    originalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    rating: {
      type: Number,
      default: 4.0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    badge: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    subCategory: {
      type: String,
      trim: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    onSale: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
