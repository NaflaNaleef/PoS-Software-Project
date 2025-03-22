// const express = require("express");
// const app = express();
// const cors = require("cors");
// app.use(cors());
// app.use(express.json());


// app.get("/api/dashboard", async (req, res) => {
//     try {
//       const totalCustomers = await Customer.countDocuments();
//       const totalProducts = await Product.countDocuments();
//       const totalOrders = await Order.countDocuments();
      
//       const today = new Date().toISOString().split("T")[0]; // Get today's date
//       const ordersToday = await Order.countDocuments({ date: today });
//       const amountToday = await Order.aggregate([{ $match: { date: today } }, { $group: { _id: null, total: { $sum: "$amount" } } }]);
  
//       const totalRevenue = await Order.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]);
  
//       res.json({
//         totalCustomers,
//         totalProducts,
//         totalOrders,
//         ordersToday,
//         amountToday: amountToday[0]?.total || 0,
//         totalRevenue: totalRevenue[0]?.total || 0,
//         salesData: [], 
//         statsData: { customers: totalCustomers, products: totalProducts, orders: totalOrders },
//       });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Customer = require("./models/Customer");
const Product = require("./models/Product");
// const Order = require("./models/Order");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/dashboard", async (req, res) => {
    try {
        // Fetch total counts
        const totalCustomers = await Customer.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();

        // Get today's date at 00:00:00
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Orders received today
        const ordersToday = await Order.countDocuments({ createdAt: { $gte: today } });

        // Total amount received today
        const amountTodayResult = await Order.aggregate([
            { $match: { createdAt: { $gte: today } } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        const amountToday = amountTodayResult[0]?.total || 0;

        // Overall revenue
        const totalRevenueResult = await Order.aggregate([
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        const totalRevenue = totalRevenueResult[0]?.total || 0;

        // Sales Data (Last 7 Days)
        const salesData = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    sales: { $sum: "$amount" }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Stats Data (Category-wise product count)
        const statsData = await Product.aggregate([
            { $group: { _id: "$category", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        res.json({
            totalCustomers,
            totalProducts,
            totalOrders,
            ordersToday,
            amountToday,
            totalRevenue,
            salesData,
            statsData
        });

    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
mongoose.connect("mongodb://localhost:27017/pos_system", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error("MongoDB connection error:", err));

module.exports = app;
