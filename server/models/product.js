const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  categoryCode: { type: String, unique: true }, 
  prize: { type: String, required: true },
});

module.exports = mongoose.model('Product', productSchema);

