const express = require('express');
const router = express.Router();
const {
  getRecommendations,
  getSimilarProducts,
} = require('../controllers/recommendController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getRecommendations);
router.route('/similar/:productId').get(getSimilarProducts);

module.exports = router;
