const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRouter = require('./routes/authRoutes');
const adminRouter = require('./routes/admin');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// 디버깅을 위한 로그 미들웨어
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// CORS 설정
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// JSON 파싱 미들웨어
app.use(express.json());

// API 라우트
app.use('/api/auth', authRouter);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRouter);
app.use('/api/users', userRoutes);

// 404 에러 처리
app.use((req, res) => {
  console.log('404 에러 발생:', req.method, req.url);
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

module.exports = app;