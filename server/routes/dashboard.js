// // // // // // const express = require('express');
// // // // // // const router = express.Router();
// // // // // // const Customer = require('../models/customer');
// // // // // // const Product = require('../models/product');

// // // // // // router.get("/", async (req, res) => {
// // // // // //   try {
// // // // // //     console.log('Fetching dashboard data...'); // Debug log
    
// // // // // //     const [
// // // // // //       totalCustomers,
// // // // // //       products,  // Changed from totalProducts to products
// // // // // //     ] = await Promise.all([
// // // // // //       Customer.countDocuments(),
// // // // // //       Product.find({}),
// // // // // //     ]);

// // // // // //     console.log('Products found:', products.length); // Debug log
    
// // // // // //     const totalQuantity = products.reduce((sum, product) => sum + (product.quantity || 0), 0);

// // // // // //     console.log('Calculated total quantity:', totalQuantity); // Debug log

// // // // // //     res.json({
// // // // // //       totalCustomers,
// // // // // //       totalProducts: totalQuantity, // Now correctly using the calculated quantity
// // // // // //       salesData: [],
// // // // // //       statsData: []
// // // // // //     });

// // // // // //   } catch (err) {
// // // // // //     console.error('Dashboard error:', err); // Better error logging
// // // // // //     res.status(500).json({ 
// // // // // //       message: 'Failed to load dashboard data',
// // // // // //       error: err.message 
// // // // // //     });
// // // // // //   }
// // // // // // });

// // // // // // module.exports = router;


// // // // // const express = require('express');
// // // // // const router = express.Router();
// // // // // const Customer = require('../models/customer');
// // // // // const Product = require('../models/product');

// // // // // router.get("/", async (req, res) => {
// // // // //   try {
// // // // //     const [
// // // // //       totalCustomers,
// // // // //       products
// // // // //     ] = await Promise.all([
// // // // //       Customer.countDocuments(),
// // // // //       Product.find({}),
// // // // //     ]);

// // // // //     const totalQuantity = products.reduce((sum, product) => sum + (product.quantity || 0), 0);

// // // // //     res.json({
// // // // //       totalCustomers,
// // // // //       totalProducts: totalQuantity
// // // // //     });

// // // // //   } catch (err) {
// // // // //     console.error('Dashboard error:', err);
// // // // //     res.status(500).json({ 
// // // // //       message: 'Failed to load dashboard data',
// // // // //       error: err.message 
// // // // //     });
// // // // //   }
// // // // // });

// // // // // module.exports = router;



// // // // const express = require('express');
// // // // const router = express.Router();
// // // // const Customer = require('../models/customer');
// // // // const Product = require('../models/product');
// // // // const Bill = require('../models/bill'); // Changed from Transaction to Bill

// // // // router.get("/", async (req, res) => {
// // // //   try {
// // // //     const [
// // // //       totalCustomers,
// // // //       products,
// // // //       bills // Changed from transactions to bills
// // // //     ] = await Promise.all([
// // // //       Customer.countDocuments(),
// // // //       Product.find({}),
// // // //       Bill.find({}) // Fetch all bills
// // // //     ]);

// // // //     const totalQuantity = products.reduce((sum, product) => sum + (product.quantity || 0), 0);
    
// // // //     // Calculate total sales amount from bills
// // // //     const totalSalesAmount = bills.reduce((sum, bill) => {
// // // //       // Remove 'Rs.' and convert to number
// // // //       const amount = parseFloat(bill.totalAmount.replace(/[^\d.]/g, '')) || 0;
// // // //       return sum + amount;
// // // //     }, 0);
    
// // // //     // Calculate total items sold from bills
// // // //     const totalItemsSold = bills.reduce((sum, bill) => {
// // // //       // Split items string and sum quantities
// // // //       const items = bill.items.split(/(?=\s)/); // Split on space before each item
// // // //       return sum + items.reduce((itemSum, item) => {
// // // //         const match = item.match(/\(x(\d+)\)/); // Extract quantity
// // // //         return itemSum + (match ? parseInt(match[1]) : 1);
// // // //       }, 0);
// // // //     }, 0);

// // // //     res.json({
// // // //       totalCustomers,
// // // //       totalProducts: totalQuantity,
// // // //       totalSalesAmount,
// // // //       totalItemsSold
// // // //     });

// // // //   } catch (err) {
// // // //     console.error('Dashboard error:', err);
// // // //     res.status(500).json({ 
// // // //       message: 'Failed to load dashboard data',
// // // //       error: err.message 
// // // //     });
// // // //   }
// // // // });

// // // // module.exports = router;

// // // const express = require('express');
// // // const router = express.Router();
// // // const Customer = require('../models/customer');
// // // const Product = require('../models/product');
// // // const Bill = require('../models/bill');

// // // router.get("/", async (req, res) => {
// // //   try {
// // //     const [
// // //       totalCustomers,
// // //       products,
// // //       bills
// // //     ] = await Promise.all([
// // //       Customer.countDocuments(),
// // //       Product.find({}),
// // //       Bill.find({})
// // //     ]);

// // //     const totalQuantity = products.reduce((sum, product) => sum + (product.quantity || 0), 0);
    
// // //     // Calculate total sales amount
// // //     const totalSalesAmount = bills.reduce((sum, bill) => {
// // //       const amountStr = bill.totalAmount.replace('Rs.', '').trim();
// // //       return sum + parseFloat(amountStr) || 0;
// // //     }, 0);
    
// // //     // Calculate total items sold
// // //     const totalItemsSold = bills.reduce((sum, bill) => {
// // //       const itemGroups = bill.items.match(/\b.+\s\(x\d+\)/g) || [];
// // //       return sum + itemGroups.reduce((itemSum, item) => {
// // //         const quantityMatch = item.match(/\(x(\d+)\)/);
// // //         return itemSum + (quantityMatch ? parseInt(quantityMatch[1]) : 0);
// // //       }, 0);
// // //     }, 0);

// // //     res.json({
// // //       totalCustomers,
// // //       totalProducts: totalQuantity,
// // //       totalSalesAmount,
// // //       totalItemsSold
// // //     });

// // //   } catch (err) {
// // //     console.error('Dashboard error:', err);
// // //     res.status(500).json({ 
// // //       message: 'Failed to load dashboard data',
// // //       error: err.message 
// // //     });
// // //   }
// // // });

// // // module.exports = router;

// // const express = require('express');
// // const router = express.Router();
// // const Customer = require('../models/customer');
// // const Product = require('../models/product');
// // const Bill = require('../models/bill');

// // router.get("/", async (req, res) => {
// //   try {
// //     const [
// //       totalCustomers,
// //       products,
// //       bills
// //     ] = await Promise.all([
// //       Customer.countDocuments(),
// //       Product.find({}),
// //       Bill.find({})
// //     ]);

// //     const totalQuantity = products.reduce((sum, product) => sum + (product.quantity || 0), 0);
    
// //     // Calculate total sales amount
// //     const totalSalesAmount = bills.reduce((sum, bill) => sum + (bill.totalAmount || 0), 0);
    
// //     // Calculate total items sold
// //     const totalItemsSold = bills.reduce((sum, bill) => {
// //       return sum + bill.items.reduce((itemSum, item) => itemSum + (item.quantity || 0), 0);
// //     }, 0);

// //     res.json({
// //       totalCustomers,
// //       totalProducts: totalQuantity,
// //       totalSalesAmount,
// //       totalItemsSold
// //     });

// //   } catch (err) {
// //     console.error('Dashboard error:', err);
// //     res.status(500).json({ 
// //       message: 'Failed to load dashboard data',
// //       error: err.message 
// //     });
// //   }
// // });

// // module.exports = router;




// const express = require('express');
// const router = express.Router();
// const Customer = require('../models/customer');
// const Product = require('../models/product');
// const Bill = require('../models/bill');

// // Main dashboard route
// router.get("/", async (req, res) => {
//   try {
//     const [customers, products, bills] = await Promise.all([
//       Customer.countDocuments(),
//       Product.find({}),
//       Bill.find({})
//     ]);

//     // Calculate totals
//     const totalProducts = products.reduce((sum, p) => sum + (p.quantity || 0), 0);
//     const totalSales = bills.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
//     const totalItems = bills.reduce((sum, b) => 
//       sum + b.items.reduce((itemSum, item) => itemSum + (item.quantity || 0), 0), 0);

//     res.json({
//       totalCustomers: customers,
//       totalProducts,
//       totalSalesAmount: totalSales,
//       totalItemsSold: totalItems
//     });

//   } catch (err) {
//     console.error('Dashboard error:', err);
//     res.status(500).json({ error: 'Failed to load dashboard data' });
//   }
// });

// // Debug route to check bill data
// router.get("/debug", async (req, res) => {
//   try {
//     const bills = await Bill.find({});
//     const sample = bills[0] || null;
    
//     res.json({
//       billCount: bills.length,
//       sampleBill: sample,
//       calculatedTotal: bills.reduce((sum, b) => sum + (b.totalAmount || 0), 0),
//       firstBillAmount: sample?.totalAmount,
//       firstBillItems: sample?.items
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');
const Product = require('../models/product');
const Bill = require('../models/bill');

router.get("/", async (req, res) => {
  try {
    const [totalCustomers, products, bills] = await Promise.all([
      Customer.countDocuments(),
      Product.find({}),
      Bill.find({})
    ]);

    // Calculate total products in inventory
    const totalProducts = products.reduce((sum, product) => sum + (product.quantity || 0), 0);

    // Calculate total sales amount
    const totalSalesAmount = bills.reduce((sum, bill) => sum + (bill.totalAmount || 0), 0);

    // Calculate total items sold
    const totalItemsSold = bills.reduce((sum, bill) => {
      return sum + bill.items.reduce((itemSum, item) => itemSum + (item.quantity || 0), 0);
    }, 0);

    res.json({
      totalCustomers,
      totalProducts,
      totalSalesAmount,
      totalItemsSold
    });

  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ 
      message: 'Failed to load dashboard data',
      error: err.message 
    });
  }
});

// Debug endpoint to check data
router.get("/debug", async (req, res) => {
  try {
    const bills = await Bill.find({});
    res.json({
      billCount: bills.length,
      sampleBill: bills[0] || null,
      calculatedTotal: bills.reduce((sum, b) => sum + (b.totalAmount || 0), 0),
      calculatedItems: bills.reduce((sum, b) => 
        sum + b.items.reduce((itemSum, item) => itemSum + (item.quantity || 0), 0), 0)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;