const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Base64 디코딩 함수
const decodeBase64 = (str) => {
  try {
    return Buffer.from(str, 'base64').toString('utf-8');
  } catch (error) {
    return null;
  }
};

// 인증 미들웨어
exports.protect = async (req, res, next) => {
  try {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: '로그인이 필요한 서비스입니다.'
      });
    }

    try {
      // base64 디코딩 시도
      const decodedString = Buffer.from(token, 'base64').toString('utf-8');
      const adminData = JSON.parse(decodedString);
      
      console.log('Decoded admin data:', adminData); // 디버깅용
      console.log('Current time:', Date.now()); // 디버깅용
      
      // 관리자 토큰 검증
      if (adminData && 
          adminData.id === 'admin' && 
          adminData.role === 'admin' && 
          adminData.exp > Date.now()) {
        req.user = { role: 'admin' };
        return next();
      }
      
      throw new Error('Invalid admin token');
    } catch (error) {
      console.error('토큰 검증 에러:', error);
      return res.status(401).json({
        success: false,
        message: '유효하지 않은 토큰입니다.'
      });
    }
  } catch (error) {
    console.error('인증 에러:', error);
    res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.'
    });
  }
};

// 권한 확인 미들웨어
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: '이 기능에 대한 접근 권한이 없습니다.'
      });
    }
    next();
  };
}; 