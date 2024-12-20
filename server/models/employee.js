const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  salary: { type: Number, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Employee', employeeSchema);