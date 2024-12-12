const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const pool = require('../config/database');

router.post('/signup', async (req, res) => {
  const { username, email, password, phone, address } = req.body;

  try {
    // 사용자 중복 체크
    const [existingUsers] = await pool.query(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({
        message: '이미 사용 중인 아이디 또는 이메일입니다.'
      });
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 정보 저장
    const [result] = await pool.query(
      `INSERT INTO users (username, email, password, phone, address, created_at) 
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [username, email, hashedPassword, phone, address]
    );

    res.status(201).json({
      message: '회원가입이 완료되었습니다.',
      userId: result.insertId
    });

  } catch (error) {
    console.error('회원가입 에러:', error);
    res.status(500).json({
      message: '서버 오류가 발생했습니다.'
    });
  }
});

// 아이디 중복 체크 API
router.post('/check-username', async (req, res) => {
  const { username } = req.body;

  if (!username || username.length < 4) {
    return res.status(400).json({
      message: '유효하지 않은 아이디입니다.',
      available: false
    });
  }

  try {
    const [existingUsers] = await pool.query(
      'SELECT id FROM users WHERE username = ?',
      [username]
    );

    console.log('Checking username:', username, 'Result:', existingUsers.length); // 디버깅용

    res.json({
      available: existingUsers.length === 0,
      message: existingUsers.length === 0 ? '사용 가능한 아이디입니다.' : '이미 사용 중인 아이디입니다.'
    });

  } catch (error) {
    console.error('아이디 중복 체크 에러:', error);
    res.status(500).json({
      message: '서버 오류가 발생했습니다.',
      available: false
    });
  }
});

module.exports = router; 