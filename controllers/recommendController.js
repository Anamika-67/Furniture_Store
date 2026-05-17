const Product = require('../models/Product');
const Order = require('../models/Order');

// @desc    Get personalized recommendations based on past orders
// @route   GET /api/recommendations
// @access  Private
const getRecommendations = async (req, res, next) => {
  try {
    // Find user's past orders
    const orders = await Order.find({ user: req.user._id }).populate('items.product');
    
    if (!orders || orders.length === 0) {
      // If no past orders, return popular items
      const popularProducts = await Product.find({}).sort({ rating: -1, numReviews: -1 }).limit(10);
      return res.json(popularProducts);
    }

    // Extract categories user has bought from
    const categoriesBought = new Set();
    orders.forEach(order => {
      order.items.forEach(item => {
        if (item.product && item.product.category) {
          categoriesBought.add(item.product.category);
        }
      });
    });

    // Find products in those categories that the user hasn't bought yet
    const recommendedProducts = await Product.find({
      category: { $in: Array.from(categoriesBought) }
    })
    .sort({ rating: -1 })
    .limit(10);

    res.json(recommendedProducts);
  } catch (error) {
    next(error);
  }
};

// @desc    Get similar products to a specific product
// @route   GET /api/recommendations/similar/:productId
// @access  Public
const getSimilarProducts = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);
    
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    // Find products in the same category
    const similarProducts = await Product.find({
      _id: { $ne: product._id }, // Exclude current product
      category: product.category,
    })
    .limit(5);

    res.json(similarProducts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRecommendations,
  getSimilarProducts,
};
