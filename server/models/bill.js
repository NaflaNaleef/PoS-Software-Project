const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  customer: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true 
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Card', 'Online'],
    required: true
  }
});

module.exports = mongoose.model('Bill', billSchema);