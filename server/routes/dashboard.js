// // const express = require("express");
// // const app = express();
// // const cors = require("cors");
// // app.use(cors());
// // app.use(express.json());

// // app.get("/api/dashboard", async (req, res) => {
// //     try {
// //       const totalCustomers = await Customer.countDocuments();
// //       const totalProducts = await Product.countDocuments();
// //       const totalOrders = await Order.countDocuments();
      
// //       const today = new Date().toISOString().split("T")[0]; // Get today's date
// //       const ordersToday = await Order.countDocuments({ date: today });
// //       const amountToday = await Order.aggregate([{ $match: { date: today } }, { $group: { _id: null, total: { $sum: "$amount" } } }]);
  
// //       const totalRevenue = await Order.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]);
  
// //       res.json({
// //         totalCustomers,
// //         totalProducts,
// //         totalOrders,
// //         ordersToday,
// //         amountToday: amountToday[0]?.total || 0,
// //         totalRevenue: totalRevenue[0]?.total || 0,
// //         salesData: [], 
// //         statsData: { customers: totalCustomers, products: totalProducts, orders: totalOrders },
// //       });
// //     } catch (error) {
// //       res.status(500).json({ message: error.message });
// //     }
// //   });
// const express = require('express');
// const router = express.Router();

// const Customer = require('../models/customer');
// const Product = require('../models/product');
// const Bill = require('../models/Bill');

// router.get("/", async (req, res) => {
//   try {
//     const totalCustomers = await Customer.countDocuments();
//     const totalProducts = await Product.countDocuments();
//     const totalOrders = await Bill.countDocuments();

//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const ordersToday = await Bill.countDocuments({ date: { $gte: today } });

//     const amountToday = await Bill.aggregate([
//       { $match: { date: { $gte: today } } },
//       { $group: { _id: null, total: { $sum: "$totalAmount" } } }
//     ]);

//     const overallAmount = await Bill.aggregate([
//       { $group: { _id: null, total: { $sum: "$totalAmount" } } }
//     ]);

//     res.json({
//       totalCustomers,
//       totalProducts,
//       totalOrders,
//       ordersToday,
//       amountToday: amountToday[0]?.total || 0,
//       overallAmount: overallAmount[0]?.total || 0
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');
const Product = require('../models/product');
const Bill = require('../models/Bill');

router.get("/", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalCustomers,
      totalProducts,
      totalOrders,
      ordersToday,
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
        { $group: { _id: null, total: { $sum: "$totalAmount" } } }
      ])
    ]);

    res.json({
      totalCustomers,
      totalProducts,
      totalOrders,
      ordersToday,
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