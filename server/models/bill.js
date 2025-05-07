// const mongoose = require('mongoose');

// const BillSchema = new mongoose.Schema({
//   customer: { type: String, required: true },
//   totalAmount: { 
//     type: Number,  // Changed from String to Number
//     required: true,
//     min: 0
//   },
//   paymentStatus: { 
//     type: String, 
//     required: true, 
//     enum: ['Paid', 'Pending', 'Cancelled'] 
//   },
//   paymentMethod: { 
//     type: String, 
//     required: true, 
//     enum: ['Cash', 'Card', 'Online'] 
//   },
//   items: [{
//     product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
//     name: { type: String, required: true },
//     quantity: { type: Number, required: true, min: 1 },
//     price: { type: Number, required: true, min: 0 }
//   }],
//   date: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Bill', BillSchema);
const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  totalAmount: { type: Number, required: true }, // Changed to Number
  paymentStatus: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  items: [
    {
      name: String,
      quantity: Number,
      price: Number
    }
  ],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bill', BillSchema);