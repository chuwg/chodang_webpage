const express = require('express');
const passport = require('passport');
const router = express.Router();
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

module.exports = router; 