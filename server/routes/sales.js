const express = require("express");
const router = express.Router();
const SalesTransaction = require("../models/salesTransaction");
const Product = require("../models/product");

// Generate Invoice Number
const generateInvoiceNumber = async () => {
  const lastTransaction = await SalesTransaction.findOne().sort({ createdAt: -1 }).limit(1);
  const yearMonth = new Date().toISOString().slice(0, 7).replace('-', ''); // e.g., 2025-05 -> 202505
  const lastInvoiceNumber = lastTransaction ? lastTransaction.invoiceNumber : null;
  
  let nextNumber = 1;
  if (lastInvoiceNumber && lastInvoiceNumber.startsWith(yearMonth)) {
    nextNumber = parseInt(lastInvoiceNumber.slice(-3)) + 1; // Increment the last 3 digits
  }
  
  const invoiceNumber = `${yearMonth}-${String(nextNumber).padStart(3, '0')}`; // Format as e.g. 202505-001

  return invoiceNumber;
};

// Create a new sales transaction

router.post("/", async (req, res) => {
  try {
    const { customer, items, totalAmount, paymentStatus, paymentMethod } = req.body;


    // Step 1: Check Stock for All Items Before Proceeding
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product not found` });
      }
      if (product.quantity < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for ${product.name}` });
      }
    }

    // Step 2: Deduct Stock Only After Successful Stock Check
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, { $inc: { quantity: -item.quantity } });
    }

// Generate unique invoice number
const invoiceNumber = await generateInvoiceNumber();

    const newTransaction = new SalesTransaction({
      invoiceNumber,  
      customer,
      items,
      totalAmount,
      paymentStatus,
      paymentMethod,
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

// Get a single transaction by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await SalesTransaction.findById(id)
      .populate("customer")
      .populate("items.product");

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transaction", error });
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
