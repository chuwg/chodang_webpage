const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updatePassword
} = require('../controllers/userController');

// 관리자용 라우트
router.get('/', getUsers);

// 일반 사용자 라우트
router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

// 비밀번호 변경 라우트
router.put('/:id/password', updatePassword);

module.exports = router; 