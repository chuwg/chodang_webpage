const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  updateStock
} = require('../controllers/productController');

// 기본 CRUD 라우트
router.route('/')
  .get(getProducts)
  .post(createProduct);

router.route('/:id')
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);

// 추가 기능 라우트
router.get('/search', searchProducts);
router.patch('/:id/stock', updateStock);

module.exports = router; 