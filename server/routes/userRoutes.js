const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updatePassword
} = require('../controllers/userController');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Order = require('../models/Order');

// 내 정보 조회 - 가장 먼저 위치
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: '사용자를 찾을 수 없습니다.'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('사용자 정보 조회 에러:', error);
    res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.'
    });
  }
});

// 내 주문 내역 조회
router.get('/me/orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('products.product')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error('주문 내역 조회 에러:', error);
    res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.'
    });
  }
});

// 관리자용 라우트
router.get('/', getUsers);

// 일반 사용자 라우트
router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

// 비밀번호 변경 라우트
router.put('/:id/password', updatePassword);

module.exports = router; 