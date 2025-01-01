const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const productRoutes = require('./routes/productRoutes');

const app = express();

// 미들웨어
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());

// MongoDB 연결
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB 연결 성공');
  })
  .catch((err) => {
    console.error('MongoDB 연결 실패:', err.message);
    process.exit(1);  // 연결 실패시 프로세스 종료
  });

// 라우트
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/products', productRoutes);

// 디버깅을 위한 로그 미들웨어 추가
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// API 테스트 라우트
app.get('/api/test', (req, res) => {
  res.json({ message: 'API 서버가 정상적으로 동작중입니다.' });
});

// 404 에러 처리
app.use((req, res, next) => {
  console.log('404 에러 발생:', req.url);
  res.status(404).json({
    success: false,
    message: '요청하신 리소스를 찾을 수 없습니다.'
  });
});

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
  console.error('서버 에러:', err);
  res.status(500).json({
    success: false,
    message: '서버 오류가 발생했습니다.'
  });
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`서버가 ${port}번 포트에서 실행 중입니다.`);
});

module.exports = app;