const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, '아이디는 필수입니다'],
    unique: true,
    trim: true,
    minlength: [4, '아이디는 최소 4자 이상이어야 합니다'],
    maxlength: [20, '아이디는 최대 20자까지 가능합니다']
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, '유효한 이메일 주소를 입력해주세요'],
    default: null
  },
  password: {
    type: String,
    required: [true, '비밀번호는 필수입니다'],
    minlength: [8, '비밀번호는 최소 8자 이상이어야 합니다']
  },
  phone: {
    type: String,
    required: [true, '전화번호는 필수입니다'],
    match: [/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/, '유효한 전화번호를 입력해주세요']
  },
  address: {
    type: String,
    required: [true, '주소는 필수입니다'],
    minlength: [10, '상세한 주소를 입력해주세요']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 비밀번호 해싱 미들웨어
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// 비밀번호 검증 메서드
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema); 