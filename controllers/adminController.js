const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Private/Admin
const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name email');
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// @desc    Update order to delivered
// @route   PUT /api/admin/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = 'delivered';
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// @desc    Get admin dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getDashboardStats = async (req, res, next) => {
  try {
    const usersCount = await User.countDocuments({});
    const productsCount = await Product.countDocuments({});
    const ordersCount = await Order.countDocuments({});
    
    const orders = await Order.find({});
    const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

    res.json({
      users: usersCount,
      products: productsCount,
      orders: ordersCount,
      revenue: totalRevenue,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOrders,
  updateOrderToDelivered,
  getUsers,
  getDashboardStats,
};
