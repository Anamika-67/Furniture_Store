const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide product name'],
      trim: true,
      maxlength: [100, 'Product name cannot exceed 100 characters'],
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide product description'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide product price'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Please provide product category'],
      enum: {
        values: ['sofa', 'table', 'chair', 'bed', 'storage', 'decor', 'lighting', 'outdoor'],
        message: '{VALUE} is not a valid category',
      },
      index: true,
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/400x300?text=FurniQ+Product',
    },
    images: [
      {
        type: String,
      },
    ],
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Stock cannot be negative'],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    material: {
      type: String,
      trim: true,
    },
    color: {
      type: String,
      trim: true,
    },
    dimensions: {
      width: { type: Number },
      height: { type: Number },
      depth: { type: Number },
      unit: { type: String, default: 'cm' },
    },
    weight: {
      type: Number,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Text index for search functionality
productSchema.index({ name: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Product', productSchema);
