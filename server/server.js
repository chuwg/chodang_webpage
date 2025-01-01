const app = require('./app');  // app.js에서 설정된 app을 가져옴
const connectDB = require('./config/database');
require('dotenv').config();

// MongoDB 연결 및 서버 시작
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`서버가 ${PORT}번 포트에서 실행중입니다.`);
    });
  })
  .catch(error => {
    console.error('서버 시작 실패:', error);
    process.exit(1);
  });