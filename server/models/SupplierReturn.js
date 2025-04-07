const mongoose = require('mongoose');

const supplierReturnSchema = new mongoose.Schema({
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
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

module.exports = mongoose.model('SupplierReturn', supplierReturnSchema);
