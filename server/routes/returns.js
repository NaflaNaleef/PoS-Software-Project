const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Return = require('../models/return');

// Handle a Return
router.post('/create', async (req, res) => {
  try {
    const { customerName, products } = req.body;

    if (!customerName || !products) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    let totalRefundAmount = 0;

    // Update product stock and calculate refund amount
    for (const item of products) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({ error: `Product not found: ${item.productId}` });
      }

      // Add stock back
      product.quantity += item.quantity;
      await product.save();

      // Calculate refund amount
      totalRefundAmount += product.price * item.quantity;
    }

    // Create the return record
    const returnRecord = new Return({
      customerName,
      products,
      totalRefundAmount,
    });

    await returnRecord.save();

    res.status(201).json({ message: 'Return processed successfully', return: returnRecord });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
