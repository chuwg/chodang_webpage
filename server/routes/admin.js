const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// 관리자 인증 미들웨어를 사용하여 모든 라우트 보호
router.use(auth, admin);

// 전체 회원 목록 조회
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({})
      .select('-password')  // 비밀번호 필드 제외
      .sort({ createdAt: -1 }); // 최신 가입순
    
    res.json({
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
router.delete('/users/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: '해당 회원을 찾을 수 없습니다.'
      });
    }
    
    res.json({
      success: true,
      message: '회원이 삭제되었습니다.'
    });
  } catch (error) {
    console.error('회원 삭제 에러:', error);
    res.status(500).json({
      success: false,
      message: '회원 삭제에 실패했습니다.'
    });
  }
});

module.exports = router; 