const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Sale = require('../models/sale');

// Create a Sale
router.post('/create', async (req, res) => {
  try {
    const { customerName, products, paymentMethod, paymentStatus } = req.body;

    if (!customerName || !products || !paymentMethod || !paymentStatus) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    let totalAmount = 0;

    // Update product stock and calculate total amount
    for (const item of products) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({ error: `Product not found: ${item.productId}` });
      }

      if (product.quantity < item.quantity) {
        return res.status(400).json({ error: `Insufficient stock for ${product.name}` });
      }

      // Deduct stock
      product.quantity -= item.quantity;
      await product.save();

      // Calculate total amount
      totalAmount += product.price * item.quantity;
    }

    // Create the sale record
    const sale = new Sale({
      customerName,
      products,
      totalAmount,
      paymentMethod,
      paymentStatus,
    });

    await sale.save();

    res.status(201).json({ message: 'Sale created successfully', sale });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
