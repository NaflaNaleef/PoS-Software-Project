const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }, // Automatically records creation time
});

module.exports = mongoose.model('Dashboard', dashboardSchema);
