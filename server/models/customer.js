const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }, // Automatically records creation time
});

// Prevent OverwriteModelError during hot reloads or repeated imports
module.exports = mongoose.models.Customer || mongoose.model('Customer', customerSchema);

