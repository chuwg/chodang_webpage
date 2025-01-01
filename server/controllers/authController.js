const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// 일반 회원가입
exports.signup = async (req, res) => {
  try {
    const { username, email, password, phone, address } = req.body;

    // 이미 존재하는 사용자 확인
    const existingUser = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (existingUser) {
      return res.status(400).json({
        message: '이미 존재하는 아이디 또는 이메일입니다.'
      });
    }

    // 새 사용자 생성
    const user = await User.create({
      username,
      email,
      password,
      phone,
      address
    });

    // 토큰 생성
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('회원가입 에러:', error);
    res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.'
    });
  }
};

// 소셜 로그인 성공 후 처리
exports.socialLoginSuccess = async (req, res) => {
  try {
    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // 프론트엔드로 리다이렉트 (토큰 포함)
    res.redirect(`${process.env.FRONTEND_URL}/social-login-success?token=${token}`);
  } catch (error) {
    res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
  }
};

// 로그인
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 사용자 찾기
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: '아이디 또는 비밀번호가 일치하지 않습니다.'
      });
    }

    // 비밀번호 확인
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: '아이디 또는 비밀번호가 일치하지 않습니다.'
      });
    }

    // 토큰 생성
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('로그인 에러:', error);
    res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.'
    });
  }
};

// 아이디 중복 체크
exports.checkUsername = async (req, res) => {
  try {
    const { username } = req.body;
    // ... 중복 체크 로직
  } catch (error) {
    console.error('아이디 중복 체크 에러:', error);
    res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.'
    });
  }
};

// 관리자 로그인 핸들러 추가
exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

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

    res.json({
      success: true,
      token,
      user: {
        id: 'admin',
        username: 'admin',
        role: 'admin'
      }
    });
  } catch (error) {
    console.error('관리자 로그인 에러:', error);
    res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.'
    });
  }
}; 