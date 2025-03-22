const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.get("/api/dashboard", async (req, res) => {
    try {
      const totalCustomers = await Customer.countDocuments();
      const totalProducts = await Product.countDocuments();
      const totalOrders = await Order.countDocuments();
      
      const today = new Date().toISOString().split("T")[0]; // Get today's date
      const ordersToday = await Order.countDocuments({ date: today });
      const amountToday = await Order.aggregate([{ $match: { date: today } }, { $group: { _id: null, total: { $sum: "$amount" } } }]);
  
      const totalRevenue = await Order.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]);
  
      res.json({
        totalCustomers,
        totalProducts,
        totalOrders,
        ordersToday,
        amountToday: amountToday[0]?.total || 0,
        totalRevenue: totalRevenue[0]?.total || 0,
        salesData: [], 
        statsData: { customers: totalCustomers, products: totalProducts, orders: totalOrders },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  