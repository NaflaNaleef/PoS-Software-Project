const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  customerName: { type: String, required: true }, // For internal use
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['cash', 'card', 'credit'], required: true },
  paymentStatus: { type: String, enum: ['paid', 'not paid', 'partially paid'], required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Sale', saleSchema);
