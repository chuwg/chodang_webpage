const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');

// 상품 등록
router.post('/', protect, authorize('admin'), createProduct);

// 상품 목록 조회
router.get('/', getProducts);

// 상품 상세 조회
router.get('/:id', getProduct);

// 상품 수정
router.put('/:id', protect, authorize('admin'), updateProduct);

// 상품 삭제
router.delete('/:id', protect, authorize('admin'), deleteProduct);

module.exports = router; 