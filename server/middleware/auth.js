const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: '인증 토큰이 없습니다.'
      });
    }

    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;  // 디코딩된 사용자 정보를 req.user에 저장
      next();
    } catch (jwtError) {
      console.error('JWT 검증 에러:', jwtError);
      return res.status(401).json({
        success: false,
        message: '유효하지 않은 토큰입니다.'
      });
    }
  } catch (error) {
    console.error('Auth 미들웨어 에러:', error);
    res.status(500).json({
      success: false,
      message: '서버 인증 처리 중 오류가 발생했습니다.'
    });
  }
};

module.exports = auth; 