const mongoose = require('mongoose');

const salesReturnSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    product: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    reason: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('SalesReturn', salesReturnSchema);
