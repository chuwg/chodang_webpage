const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { signup, checkUsername, login, socialLoginSuccess } = require('../controllers/authController');

// 회원가입 라우트
router.post('/signup', signup);

// 아이디 중복 체크 라우트
router.post('/check-username', checkUsername);

// 로그인 라우트
router.post('/login', login);

// Google OAuth Routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  socialLoginSuccess
);

// Naver OAuth Routes
router.get('/naver',
  passport.authenticate('naver')
);

router.get('/naver/callback',
  passport.authenticate('naver', { failureRedirect: '/login' }),
  socialLoginSuccess
);

// Kakao OAuth Routes
router.get('/kakao',
  passport.authenticate('kakao')
);

router.get('/kakao/callback',
  passport.authenticate('kakao', { failureRedirect: '/login' }),
  socialLoginSuccess
);

// 관리자 로그인 라우트 추가
router.post('/admin-login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('관리자 로그인 시도:', { username, password });

    // 관리자 계정 확인
    if (username !== 'admin' || password !== 'chekd4032') {
      return res.status(401).json({
        success: false,
        message: '관리자 인증에 실패했습니다.'
      });
    }

    // 관리자용 JWT 토큰 생성
    const token = jwt.sign(
      {
        id: 'admin',
        role: 'admin',
        isAdmin: true
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      success: true,
      token
    });
  } catch (error) {
    console.error('관리자 로그인 에러:', error);
    return res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.'
    });
  }
});

module.exports = router; 