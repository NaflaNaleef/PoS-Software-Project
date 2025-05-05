const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
  totalAmount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  // Add other fields as needed (e.g., customer reference, items, etc.)
});

module.exports = mongoose.model('Bill', BillSchema);