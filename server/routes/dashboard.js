
const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');
const Product = require('../models/product');
const Bill = require('../models/bill'); 
// const Bill = require('../models/Bill');

router.get("/", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [
      totalCustomers,
      totalProducts,
      totalSales,
      salesToday,
      amountToday,
      overallAmount
    ] = await Promise.all([
      Customer.countDocuments(),
      Product.countDocuments(),
      Bill.countDocuments(),
      Bill.countDocuments({ date: { $gte: today } }),
      Bill.aggregate([
        { $match: { date: { $gte: today } } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } }
      ]),
      Bill.aggregate([
        { 
          $match: { 
            date: { 
              $gte: today,
              $lt: tomorrow
            } 
          } 
        },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } }
      ]),
      Bill.aggregate([
        { $group: { _id: null, total: { $sum: "$totalAmount" } } }
      ])
    ]);

    res.json({
      totalCustomers,
      totalProducts,
      totalSales,
      salesToday,
      amountToday: amountToday[0]?.total || 0,
      totalRevenue: overallAmount[0]?.total || 0,
      salesData: [], // Add your sales data logic here
      statsData: []  // Add your stats data logic here
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;