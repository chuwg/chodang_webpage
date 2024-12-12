const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, '상품명은 필수입니다'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, '가격은 필수입니다'],
        min: [0, '가격은 0보다 커야 합니다']
    },
    description: {
        type: String,
        required: [true, '상품 설명은 필수입니다']
    },
    stock: {
        type: Number,
        required: [true, '재고 수량은 필수입니다'],
        min: [0, '재고는 0보다 작을 수 없습니다']
    },
    image: {
        type: String,
        required: [true, '상품 이미지는 필수입니다']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema); 