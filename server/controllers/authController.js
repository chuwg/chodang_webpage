const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// 회원가입 컨트롤러
exports.signup = async (req, res) => {
  try {
    const { username, email, password, phone, address } = req.body;

    // 아이디 중복 체크
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: '이미 사용 중인 아이디입니다.'
      });
    }

    // 이메일 중복 체크
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: '이미 사용 중인 이메일입니다.'
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

    // JWT 토큰 생성
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      message: '회원가입이 완료되었습니다.',
      token
    });

  } catch (error) {
    console.error('회원가입 에러:', error);
    res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.',
      error: error.message
    });
  }
};

// 아이디 중복 체크 컨트롤러
exports.checkUsername = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username || username.length < 4) {
      return res.status(400).json({
        success: false,
        message: '유효하지 않은 아이디입니다.',
        available: false
      });
    }

    const existingUser = await User.findOne({ username });
    
    res.json({
      success: true,
      available: !existingUser,
      message: !existingUser ? '사용 가능한 아이디입니다.' : '이미 사용 중인 아이디입니다.'
    });

  } catch (error) {
    console.error('아이디 중복 체크 에러:', error);
    res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.',
      available: false
    });
  }
};

// 로그인 컨트롤러 추가
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 사용자 찾기
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: '아이디 또는 비밀번호를 확인해주세요'
      });
    }

    // 비밀번호 확인
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: '아이디 또는 비밀번호를 확인해주세요'
      });
    }

    // 토큰 생성
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: '로그인 성공',
      token
    });

  } catch (error) {
    console.error('로그인 에러:', error);
    res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.'
    });
  }
}; 