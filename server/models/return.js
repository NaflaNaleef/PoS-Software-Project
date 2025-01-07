const mongoose = require('mongoose');

const returnSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      refundAmount: { type: Number, required: true },
    },
  ],
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Return', returnSchema);
