const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');
const Product = require('../models/product');

router.get("/", async (req, res) => {
  try {
    const [
      totalCustomers,
      products
    ] = await Promise.all([
      Customer.countDocuments(),
      Product.find({}),
    ]);

    const totalQuantity = products.reduce((sum, product) => sum + (product.quantity || 0), 0);

    res.json({
      totalCustomers,
      totalProducts: totalQuantity
    });

  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ 
      message: 'Failed to load dashboard data',
      error: err.message 
    });
  }
});

module.exports = router;
