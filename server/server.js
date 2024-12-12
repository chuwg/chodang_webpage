const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
require('dotenv').config();
console.log('전체 환경변수:', process.env);  // 환경변수 확인용

const app = express();

// 미들웨어
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// MongoDB 연결
connectDB()
  .then(() => {
    // 서버 시작
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`서버가 ${PORT}번 포트에서 실행중입니다.`);
    });
  })
  .catch(error => {
    console.error('서버 시작 실패:', error);
    process.exit(1);
  });

// 라우트
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

console.log('MONGODB_URI:', process.env.MONGODB_URI);