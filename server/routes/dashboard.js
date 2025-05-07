
const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');
const Product = require('../models/product');

router.get("/", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // const tomorrow = new Date(today);
    // tomorrow.setDate(tomorrow.getDate() + 1);

    const [
      totalCustomers,
      totalProducts,
      // totalSales,
      // salesToday,
      // amountToday,
      // overallAmount
    ] = await Promise.all([
      Customer.countDocuments(),
      Product.countDocuments(),

    ]);

    res.json({
      totalCustomers,
      totalProducts,
      // totalSales,
      // salesToday,
      // amountToday: amountToday[0]?.total || 0,
      // totalRevenue: overallAmount[0]?.total || 0,
      salesData: [], // Add your sales data logic here
      statsData: []  // Add your stats data logic here
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;