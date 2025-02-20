const mongoose = require("mongoose");

const SalesTransactionSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      total: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ["Paid", "Unpaid", "Partial"], default: "Paid" },
  paymentMethod: { type: String, enum: ["Cash", "Card"], required: true },
  invoiceNumber: { type: String, unique: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SalesTransaction", SalesTransactionSchema);
