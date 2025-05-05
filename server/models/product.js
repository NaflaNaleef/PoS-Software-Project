// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   category: { type: String, required: true },
//   quantity: { type: Number, required: true },
//   categoryCode: { type: String, unique: true }, 
//   prize: { type: String, required: true },
// });

// module.exports = mongoose.model('Product', productSchema);

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
<<<<<<< HEAD
  barcode: { type: String, unique: true },
  quantity: { type: Number, required: true, default:0 },
=======
  quantity: { type: Number, required: true },
>>>>>>> 2e821696327acc44563cdcb6768e199e64f37e14
  createdAt: { type: Date, default: Date.now }, // Automatically records creation time
});

module.exports = mongoose.model('Product', productSchema);

