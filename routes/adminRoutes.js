const express = require('express');
const router = express.Router();
const {
  getOrders,
  updateOrderToDelivered,
  getUsers,
  getDashboardStats,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

// All routes require user to be logged in and have admin role
router.use(protect, admin);

router.route('/orders').get(getOrders);
router.route('/orders/:id/deliver').put(updateOrderToDelivered);
router.route('/users').get(getUsers);
router.route('/dashboard').get(getDashboardStats);

module.exports = router;
