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
  .then(() => console.log('MongoDB 연결됨'))
  .catch(err => console.error('MongoDB 연결 실패:', err));

// 라우트
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/products', productRoutes);

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: '서버 오류가 발생했습니다.'
  });
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`서버가 ${port}번 포트에서 실행 중입니다.`);
});