const express = require('express');
const router = express.Router();
const { signup, checkUsername, login } = require('../controllers/authController');

// 회원가입 라우트
router.post('/signup', signup);

// 아이디 중복 체크 라우트
router.post('/check-username', checkUsername);

// 로그인 라우트 추가
router.post('/login', login);

module.exports = router; 