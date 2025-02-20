const express = require("express");
const router = express.Router();
const SalesTransaction = require("../models/salesTransaction");


// Create a new sales transaction
router.post("/", async (req, res) => {
  try {
    const { customer, items, totalAmount, paymentStatus, paymentMethod } = req.body;

    const invoiceNumber = "INV-" + Date.now();

    const newTransaction = new SalesTransaction({
      customer,
      items,
      totalAmount,
      paymentStatus,
      paymentMethod,
      invoiceNumber,
    });

    await newTransaction.save();
    res.status(201).json({ message: "Transaction recorded successfully", newTransaction });
  } catch (error) {
    res.status(500).json({ message: "Error creating transaction", error });
  }
});

// Get all transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await SalesTransaction.find().populate("customer").populate("items.product");
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
});
// Delete a sales transaction
router.delete("/:id",  async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await SalesTransaction.findByIdAndDelete(id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting transaction", error });
  }
});


module.exports = router;
