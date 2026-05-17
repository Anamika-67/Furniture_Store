const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  getFeaturedProducts,
  getTopProducts,
} = require('../controllers/productController');

router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/top', getTopProducts);
router.get('/:id', getProductById);

module.exports = router;
