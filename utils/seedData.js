require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');
const connectDB = require('../config/db');
const bcrypt = require('bcryptjs');

const products = [
  {
    name: 'Modern Gray Fabric Sofa',
    price: 499.99,
    description: 'A comfortable modern sofa with gray fabric upholstery.',
    category: 'sofa',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
    stock: 15,
    rating: 4.5,
    numReviews: 12,
    featured: true,
  },
  {
    name: 'Mid-Century Modern Coffee Table',
    price: 199.99,
    description: 'Elegant mid-century modern wooden coffee table.',
    category: 'table',
    image: 'https://images.unsplash.com/photo-1533090481720-856c2e3e150f?auto=format&fit=crop&q=80&w=800',
    stock: 25,
    rating: 4.8,
    numReviews: 24,
    featured: true,
  },
  {
    name: 'Ergonomic Office Chair',
    price: 149.99,
    description: 'Adjustable ergonomic office chair for comfortable working.',
    category: 'chair',
    image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=800',
    stock: 10,
    rating: 4.2,
    numReviews: 8,
    featured: false,
  },
  {
    name: 'Minimalist Queen Bed Frame',
    price: 349.99,
    description: 'Sleek and sturdy minimalist bed frame. Mattress not included.',
    category: 'bed',
    image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=800',
    stock: 8,
    rating: 4.6,
    numReviews: 15,
    featured: true,
  },
  {
    name: 'Rustic Wooden Dining Table',
    price: 599.99,
    description: 'Large rustic wooden dining table, perfect for family meals.',
    category: 'table',
    image: 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&q=80&w=800',
    stock: 5,
    rating: 4.9,
    numReviews: 32,
    featured: false,
  },
  {
    name: 'Velvet Accent Chair',
    price: 249.99,
    description: 'Luxurious velvet accent chair to add color to any room.',
    category: 'chair',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800',
    stock: 12,
    rating: 4.7,
    numReviews: 18,
    featured: true,
  }
];

const importData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();

    // Hash password for admin manually to bypass pre-save if needed,
    // but Mongoose pre-save hook on User handles it on creation.
    const createdUsers = await User.create([
      {
        name: 'Admin User',
        email: 'admin@furniq.com',
        password: 'adminpassword',
        role: 'admin',
      },
      {
        name: 'Test User',
        email: 'user@example.com',
        password: 'password123',
        role: 'user',
      }
    ]);

    const adminUserId = createdUsers[0]._id;

    // Insert sample products
    await Product.insertMany(products);

    console.log('✅ Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error with data import: ${error}`);
    process.exit(1);
  }
};

importData();
