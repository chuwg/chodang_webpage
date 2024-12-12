const express = require('express');
const router = express.Router();
const { getOrders } = require('../controllers/orderController');
const { authenticateToken, isAdmin } = require('../middleware/auth');

router.get('/', authenticateToken, isAdmin, getOrders);

module.exports = router; 