const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const User = require('../models/User');

// 회원 목록 조회
router.get('/users', protect, authorize('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('회원 목록 조회 에러:', error);
    res.status(500).json({
      success: false,
      message: '회원 목록을 불러오는데 실패했습니다.'
    });
  }
});

// 회원 삭제
router.delete('/users/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: '사용자를 찾을 수 없습니다.'
      });
    }
    res.json({
      success: true,
      message: '회원이 삭제되었습니다.'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '회원 삭제에 실패했습니다.'
    });
  }
});

module.exports = router; 