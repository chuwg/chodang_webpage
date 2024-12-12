const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
  try {
    console.log('연결 시도 중...');
    
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // 타임아웃 시간 증가
      socketTimeoutMS: 45000, // 소켓 타임아웃 설정
    });
    
    console.log('연결 성공!');
    console.log('Connected to MongoDB');
    
    await mongoose.disconnect();
    console.log('연결 종료');
    
  } catch (error) {
    console.error('연결 실패 상세:', {
      name: error.name,
      message: error.message,
      code: error.code
    });
  }
  process.exit();
};

testConnection(); 