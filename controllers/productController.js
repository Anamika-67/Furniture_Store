const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
  try {
    const pageSize = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};

    const category = req.query.category ? { category: req.query.category } : {};

    const count = await Product.countDocuments({ ...keyword, ...category });
    const products = await Product.find({ ...keyword, ...category })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ featured: true }).limit(5);
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    res.json(products);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  getFeaturedProducts,
  getTopProducts,
};
