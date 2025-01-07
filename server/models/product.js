const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  categoryCode: { type: String, unique: true },
  prize: { type: String, required: true },
  barcode: { type: String, unique: true, default: null }, // New field for barcode
  price: { type: Number, required: false }, // Add numeric price field alongside 'prize' for future
});

module.exports = mongoose.model('Product', productSchema);


