const Order = require('../models/Order');
const Cart = require('../models/Cart');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res, next) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      res.status(400);
      throw new Error('No order items');
    }

    // Map cart items to order items and calculate total
    const orderItems = cart.items.map((item) => ({
      name: item.product.name,
      quantity: item.quantity,
      image: item.product.image,
      price: item.product.price,
      product: item.product._id,
    }));

    const totalPrice = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const order = new Order({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    const createdOrder = await order.save();

    // Clear user's cart after order is placed
    cart.items = [];
    await cart.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    next(error);
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
      // Check if user is admin or the order belongs to the user
      if (req.user.role === 'admin' || order.user._id.toString() === req.user._id.toString()) {
        res.json(order);
      } else {
        res.status(403);
        throw new Error('Not authorized to view this order');
      }
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addOrderItems,
  getOrderById,
  getMyOrders,
};
