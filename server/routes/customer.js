// // // // // // // // // const express = require('express');
// // // // // // // // // const router = express.Router();
// // // // // // // // // const Customer = require('../models/customer');
// // // // // // // // // // const io = require("../server"); // Import Socket.IO instance

// // // // // // // // // // Create a customer
// // // // // // // // // router.post('/', async (req, res) => {
// // // // // // // // //   try {
// // // // // // // // //     const newCustomer = new Customer(req.body);
// // // // // // // // //     const savedCustomer = await newCustomer.save();
// // // // // // // // //     res.status(201).json(savedCustomer); // Return the saved customer
// // // // // // // // //   } catch (error) {
// // // // // // // // //     console.error(error);
// // // // // // // // //     res.status(400).json({ error: error.message });
// // // // // // // // //   }
// // // // // // // // // });

// // // // // // // // // // Read customers with pagination, sorting, and filtering
// // // // // // // // // router.get('/', async (req, res) => {
// // // // // // // // //   try {
// // // // // // // // //     const { page = 1, limit = 10, sortBy = 'name', order = 'asc', filter = '' } = req.query;

// // // // // // // // //     const query = filter
// // // // // // // // //     ? {
// // // // // // // // //         $or: [
// // // // // // // // //           { name: { $regex: filter, $options: 'i' } }, // Case-insensitive search in name
// // // // // // // // //           { contactNumber: { $regex: filter, $options: 'i' } }, // Case-insensitive search in contact number
// // // // // // // // //         ],
// // // // // // // // //       }
// // // // // // // // //     : {};    
// // // // // // // // //     const customers = await Customer.find(query)
// // // // // // // // //       .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
// // // // // // // // //       .limit(limit * 1)
// // // // // // // // //       .skip((page - 1) * limit);

// // // // // // // // //     const total = await Customer.countDocuments(query);
    
// // // // // // // // //     res.status(200).json({
// // // // // // // // //       total,
// // // // // // // // //       totalPages: Math.ceil(total / limit),
// // // // // // // // //       currentPage: page,
// // // // // // // // //       customers,
// // // // // // // // //     });
// // // // // // // // //   } catch (error) {
// // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // //   }
// // // // // // // // // });

// // // // // // // // // // Update a customer
// // // // // // // // // router.put('/:id', async (req, res) => {
// // // // // // // // //   try {
// // // // // // // // //     const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
// // // // // // // // //     res.status(200).json(customer);
// // // // // // // // //   } catch (error) {
// // // // // // // // //     res.status(400).json({ error: error.message });
// // // // // // // // //   }
// // // // // // // // // });

// // // // // // // // // // Delete a customer
// // // // // // // // // router.delete('/:id', async (req, res) => {
// // // // // // // // //   try {
// // // // // // // // //     await Customer.findByIdAndDelete(req.params.id);
// // // // // // // // //     res.status(200).json({ message: 'Customer deleted successfully' });
// // // // // // // // //   } catch (error) {
// // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // //   }
// // // // // // // // // });
// // // // // // // // // router.post("/add-customer", async (req, res) => {
// // // // // // // // //   try {
// // // // // // // // //     const newCustomer = new Customer(req.body);
// // // // // // // // //     await newCustomer.save();

// // // // // // // // //     io.emit("customerUpdated");

// // // // // // // // //     res.status(201).json({ message: "Customer added successfully" });
// // // // // // // // //   } catch (error) {
// // // // // // // // //     res.status(500).json({ message: error.message });
// // // // // // // // //   }
// // // // // // // // // });


// // // // // // // // // module.exports = router;
// // // // // // // // const express = require('express');
// // // // // // // // const router = express.Router();
// // // // // // // // const Customer = require('../models/customer');

// // // // // // // // //  Create a customer (with real-time emit)
// // // // // // // // // router.post('/', async (req, res) => {
// // // // // // // // //   try {
// // // // // // // // //     const newCustomer = new Customer(req.body);
// // // // // // // // //     const savedCustomer = await newCustomer.save();

// // // // // // // // //     const io = req.app.get('io'); // Get the socket instance
// // // // // // // // //     io.emit('customerUpdated');   // Notify all clients

// // // // // // // // //     res.status(201).json(savedCustomer);
// // // // // // // // //   } catch (error) {
// // // // // // // // //     console.error(error);
// // // // // // // // //     res.status(400).json({ error: error.message });
// // // // // // // // //   }
// // // // // // // // // });
// // // // // // // // router.post("/add-customer", async (req, res) => {
// // // // // // // //   try {
// // // // // // // //     const newCustomer = new Customer(req.body);
// // // // // // // //     await newCustomer.save();

// // // // // // // //     const io = req.app.get("io"); // Socket instance
// // // // // // // //     io.emit("customerUpdated"); // Notify dashboard

// // // // // // // //     res.status(201).json({ message: "Customer added successfully" });
// // // // // // // //   } catch (error) {
// // // // // // // //     res.status(500).json({ message: error.message });
// // // // // // // //   }
// // // // // // // // });


// // // // // // // // //  Read customers (pagination, filtering, sorting)
// // // // // // // // router.get('/', async (req, res) => {
// // // // // // // //   try {
// // // // // // // //     const { page = 1, limit = 10, sortBy = 'name', order = 'asc', filter = '' } = req.query;

// // // // // // // //     const query = filter
// // // // // // // //       ? {
// // // // // // // //           $or: [
// // // // // // // //             { name: { $regex: filter, $options: 'i' } },
// // // // // // // //             { contactNumber: { $regex: filter, $options: 'i' } },
// // // // // // // //           ],
// // // // // // // //         }
// // // // // // // //       : {};

// // // // // // // //     const customers = await Customer.find(query)
// // // // // // // //       .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
// // // // // // // //       .limit(limit * 1)
// // // // // // // //       .skip((page - 1) * limit);

// // // // // // // //     const total = await Customer.countDocuments(query);

// // // // // // // //     res.status(200).json({
// // // // // // // //       total,
// // // // // // // //       totalPages: Math.ceil(total / limit),
// // // // // // // //       currentPage: page,
// // // // // // // //       customers,
// // // // // // // //     });
// // // // // // // //   } catch (error) {
// // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // //   }
// // // // // // // // });

// // // // // // // // //  Update a customer (with real-time emit)
// // // // // // // // router.put('/:id', async (req, res) => {
// // // // // // // //   try {
// // // // // // // //     const updatedCustomer = await Customer.findByIdAndUpdate(
// // // // // // // //       req.params.id,
// // // // // // // //       req.body,
// // // // // // // //       { new: true }
// // // // // // // //     );

// // // // // // // //     const io = req.app.get('io');
// // // // // // // //     io.emit('customerUpdated');

// // // // // // // //     res.status(200).json(updatedCustomer);
// // // // // // // //   } catch (error) {
// // // // // // // //     res.status(400).json({ error: error.message });
// // // // // // // //   }
// // // // // // // // });

// // // // // // // // //  Delete a customer (with real-time emit)
// // // // // // // // router.delete('/:id', async (req, res) => {
// // // // // // // //   try {
// // // // // // // //     await Customer.findByIdAndDelete(req.params.id);

// // // // // // // //     const io = req.app.get('io');
// // // // // // // //     io.emit('customerUpdated');

// // // // // // // //     res.status(200).json({ message: 'Customer deleted successfully' });
// // // // // // // //   } catch (error) {
// // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // //   }
// // // // // // // // });

// // // // // // // // module.exports = router;

// // // // // // // const express = require('express');
// // // // // // // const router = express.Router();
// // // // // // // const Customer = require('../models/customer');

// // // // // // // //  Create a customer
// // // // // // // router.post("/", async (req, res) => {
// // // // // // //   try {
// // // // // // //     const newCustomer = new Customer(req.body);
// // // // // // //     await newCustomer.save();

// // // // // // //     const io = req.app.get("io"); // Socket instance
// // // // // // //     io.emit("dashboard-update"); // Standard event for dashboard refresh

// // // // // // //     res.status(201).json({ message: "Customer added successfully" });
// // // // // // //   } catch (error) {
// // // // // // //     res.status(500).json({ message: error.message });
// // // // // // //   }
// // // // // // // });

// // // // // // // //  Read customers (unchanged)
// // // // // // // router.get('/', async (req, res) => {
// // // // // // //   try {
// // // // // // //     const { page = 1, limit = 10, sortBy = 'name', order = 'asc', filter = '' } = req.query;

// // // // // // //     const query = filter
// // // // // // //       ? {
// // // // // // //           $or: [
// // // // // // //             { name: { $regex: filter, $options: 'i' } },
// // // // // // //             { contactNumber: { $regex: filter, $options: 'i' } },
// // // // // // //           ],
// // // // // // //         }
// // // // // // //       : {};

// // // // // // //     const customers = await Customer.find(query)
// // // // // // //       .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
// // // // // // //       .limit(limit * 1)
// // // // // // //       .skip((page - 1) * limit);

// // // // // // //     const total = await Customer.countDocuments(query);

// // // // // // //     res.status(200).json({
// // // // // // //       total,
// // // // // // //       totalPages: Math.ceil(total / limit),
// // // // // // //       currentPage: page,
// // // // // // //       customers,
// // // // // // //     });
// // // // // // //   } catch (error) {
// // // // // // //     res.status(500).json({ error: error.message });
// // // // // // //   }
// // // // // // // });

// // // // // // // //  Update a customer
// // // // // // // router.put('/:id', async (req, res) => {
// // // // // // //   try {
// // // // // // //     const updatedCustomer = await Customer.findByIdAndUpdate(
// // // // // // //       req.params.id,
// // // // // // //       req.body,
// // // // // // //       { new: true }
// // // // // // //     );

// // // // // // //     const io = req.app.get('io');
// // // // // // //     io.emit('dashboard-update'); // Standard event

// // // // // // //     res.status(200).json(updatedCustomer);
// // // // // // //   } catch (error) {
// // // // // // //     res.status(400).json({ error: error.message });
// // // // // // //   }
// // // // // // // });

// // // // // // // //  Delete a customer
// // // // // // // router.delete('/:id', async (req, res) => {
// // // // // // //   try {
// // // // // // //     await Customer.findByIdAndDelete(req.params.id);

// // // // // // //     const io = req.app.get('io');
// // // // // // //     io.emit('dashboard-update'); // Standard event

// // // // // // //     res.status(200).json({ message: 'Customer deleted successfully' });
// // // // // // //   } catch (error) {
// // // // // // //     res.status(500).json({ error: error.message });
// // // // // // //   }
// // // // // // // });

// // // // // // // module.exports = router;

// // // // // // const express = require('express');
// // // // // // const router = express.Router();
// // // // // // const Customer = require('../models/customer');

// // // // // // // Helper function to get dashboard counts
// // // // // // const getCustomerCounts = async () => {
// // // // // //   return {
// // // // // //     totalCustomers: await Customer.countDocuments(),
// // // // // //     // Add other counts if needed
// // // // // //   };
// // // // // // };
// // // // // // router.get('/count', async (req, res) => {
// // // // // //     try {
// // // // // //         const count = await Customer.countDocuments();
// // // // // //         res.json({ count });
// // // // // //     } catch (err) {
// // // // // //         res.status(500).json({ message: err.message });
// // // // // //     }
// // // // // // });
// // // // // // // Create Customer (with real-time update)
// // // // // // router.post('/', async (req, res) => {
// // // // // //   try {
// // // // // //     const newCustomer = new Customer(req.body);
// // // // // //     await newCustomer.save();

// // // // // //     const io = req.app.get('io');
// // // // // //     const counts = await getCustomerCounts();
    
// // // // // //     io.emit('customer-updated', {
// // // // // //       ...counts,
// // // // // //       action: 'created',
// // // // // //       customerId: newCustomer._id
// // // // // //     });

// // // // // //     res.status(201).json({
// // // // // //       success: true,
// // // // // //       data: newCustomer,
// // // // // //       message: 'Customer created successfully'
// // // // // //     });
// // // // // //   } catch (error) {
// // // // // //     res.status(500).json({
// // // // // //       success: false,
// // // // // //       message: error.message
// // // // // //     });
// // // // // //   }
// // // // // // });

// // // // // // // Update Customer (with real-time update)
// // // // // // router.put('/:id', async (req, res) => {
// // // // // //   try {
// // // // // //     const updatedCustomer = await Customer.findByIdAndUpdate(
// // // // // //       req.params.id,
// // // // // //       req.body,
// // // // // //       { new: true, runValidators: true }
// // // // // //     );

// // // // // //     if (!updatedCustomer) {
// // // // // //       return res.status(404).json({
// // // // // //         success: false,
// // // // // //         message: 'Customer not found'
// // // // // //       });
// // // // // //     }

// // // // // //     const io = req.app.get('io');
// // // // // //     const counts = await getCustomerCounts();
    
// // // // // //     io.emit('customer-updated', {
// // // // // //       ...counts,
// // // // // //       action: 'updated',
// // // // // //       customerId: updatedCustomer._id
// // // // // //     });

// // // // // //     res.status(200).json({
// // // // // //       success: true,
// // // // // //       data: updatedCustomer
// // // // // //     });
// // // // // //   } catch (error) {
// // // // // //     res.status(500).json({
// // // // // //       success: false,
// // // // // //       message: error.message
// // // // // //     });
// // // // // //   }
// // // // // // });

// // // // // // // Delete Customer (with real-time update)
// // // // // // router.delete('/:id', async (req, res) => {
// // // // // //   try {
// // // // // //     const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);

// // // // // //     if (!deletedCustomer) {
// // // // // //       return res.status(404).json({
// // // // // //         success: false,
// // // // // //         message: 'Customer not found'
// // // // // //       });
// // // // // //     }

// // // // // //     const io = req.app.get('io');
// // // // // //     const counts = await getCustomerCounts();
    
// // // // // //     io.emit('customer-updated', {
// // // // // //       ...counts,
// // // // // //       action: 'deleted',
// // // // // //       customerId: req.params.id
// // // // // //     });

// // // // // //     res.status(200).json({
// // // // // //       success: true,
// // // // // //       message: 'Customer deleted successfully'
// // // // // //     });
// // // // // //   } catch (error) {
// // // // // //     res.status(500).json({
// // // // // //       success: false,
// // // // // //       message: error.message
// // // // // //     });
// // // // // //   }
// // // // // // });

// // // // // // // Get Customers (unchanged)
// // // // // // router.get('/', async (req, res) => {
// // // // // //   try {
// // // // // //     const { page = 1, limit = 10, sortBy = 'name', order = 'asc', filter = '' } = req.query;

// // // // // //     const query = filter
// // // // // //       ? {
// // // // // //           $or: [
// // // // // //             { name: { $regex: filter, $options: 'i' } },
// // // // // //             { contactNumber: { $regex: filter, $options: 'i' } },
// // // // // //           ],
// // // // // //         }
// // // // // //       : {};

// // // // // //     const customers = await Customer.find(query)
// // // // // //       .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
// // // // // //       .limit(limit * 1)
// // // // // //       .skip((page - 1) * limit);

// // // // // //     const total = await Customer.countDocuments(query);

// // // // // //     res.status(200).json({
// // // // // //       success: true,
// // // // // //       data: {
// // // // // //         total,
// // // // // //         totalPages: Math.ceil(total / limit),
// // // // // //         currentPage: page,
// // // // // //         customers,
// // // // // //       }
// // // // // //     });
// // // // // //   } catch (error) {
// // // // // //     res.status(500).json({
// // // // // //       success: false,
// // // // // //       message: error.message
// // // // // //     });
// // // // // //   }
// // // // // // });

// // // // // // module.exports = router;


// // // // const express = require('express');
// // // // const router = express.Router();
// // // // const Customer = require('../models/customer');

// // // // // Helper function to get customer count
// // // // const getCustomerCount = async () => {
// // // //   return await Customer.countDocuments();
// // // // };

// // // // // Create Customer (with minimal changes)
// // // // router.post('/', async (req, res) => {
// // // //   try {
// // // //     const newCustomer = new Customer(req.body);
// // // //     const savedCustomer = await newCustomer.save();

// // // //     // Real-time update addition
// // // //     const io = req.app.get('io');
// // // //     io.emit('customer-update', {
// // // //       totalCustomers: await getCustomerCount(),
// // // //       action: 'created'
// // // //     });

// // // //     res.status(201).json(savedCustomer);
// // // //   } catch (error) {
// // // //     res.status(400).json({ error: error.message });
// // // //   }
// // // // });

// // // // // Read Customers (unchanged)
// // // // router.get('/', async (req, res) => {
// // // //   try {
// // // //     const { page = 1, limit = 10, sortBy = 'name', order = 'asc', filter = '' } = req.query;

// // // //     const query = filter
// // // //       ? {
// // // //           $or: [
// // // //             { name: { $regex: filter, $options: 'i' } },
// // // //             { contactNumber: { $regex: filter, $options: 'i' } },
// // // //           ],
// // // //         }
// // // //       : {};

// // // //     const customers = await Customer.find(query)
// // // //       .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
// // // //       .limit(limit * 1)
// // // //       .skip((page - 1) * limit);

// // // //     const total = await Customer.countDocuments(query);

// // // //     res.status(200).json({
// // // //       total,
// // // //       totalPages: Math.ceil(total / limit),
// // // //       currentPage: page,
// // // //       customers,
// // // //     });
// // // //   } catch (error) {
// // // //     res.status(500).json({ error: error.message });
// // // //   }
// // // // });

// // // // // Update Customer (with minimal changes)
// // // // router.put('/:id', async (req, res) => {
// // // //   try {
// // // //     const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
// // // //     // Real-time update addition
// // // //     const io = req.app.get('io');
// // // //     io.emit('customer-update', {
// // // //       totalCustomers: await getCustomerCount(),
// // // //       action: 'updated'
// // // //     });

// // // //     res.status(200).json(customer);
// // // //   } catch (error) {
// // // //     res.status(400).json({ error: error.message });
// // // //   }
// // // // });

// // // // // Delete Customer (with minimal changes)
// // // // router.delete('/:id', async (req, res) => {
// // // //   try {
// // // //     await Customer.findByIdAndDelete(req.params.id);
    
// // // //     // Real-time update addition
// // // //     const io = req.app.get('io');
// // // //     io.emit('customer-update', {
// // // //       totalCustomers: await getCustomerCount(),
// // // //       action: 'deleted'
// // // //     });

// // // //     res.status(200).json({ message: 'Customer deleted successfully' });
// // // //   } catch (error) {
// // // //     res.status(500).json({ error: error.message });
// // // //   }
// // // // });

// // // // // Add count endpoint for frontend
// // // // router.get('/count', async (req, res) => {
// // // //   try {
// // // //     const count = await Customer.countDocuments();
// // // //     res.json({ count });
// // // //   } catch (err) {
// // // //     res.status(500).json({ message: err.message });
// // // //   }
// // // // });

// // // // module.exports = router;
// // // // const express = require('express');
// // // // const router = express.Router();
// // // // const Customer = require('../models/customer');

// // // // // Create Customer (original working version with real-time addition)
// // // // router.post('/', async (req, res) => {
// // // //   try {
// // // //     const newCustomer = new Customer(req.body);
// // // //     const savedCustomer = await newCustomer.save();
    
// // // //     // Added only this line for real-time updates:
// // // //     req.app.get('io').emit('customer-update', { 
// // // //       totalCustomers: await Customer.countDocuments() 
// // // //     });
    
// // // //     res.status(201).json(savedCustomer);
// // // //   } catch (error) {
// // // //     res.status(400).json({ error: error.message });
// // // //   }
// // // // });

// // // // // Read Customers (completely unchanged original working version)
// // // // router.get('/', async (req, res) => {
// // // //   try {
// // // //     const { page = 1, limit = 10, sortBy = 'name', order = 'asc', filter = '' } = req.query;

// // // //     const query = filter
// // // //       ? {
// // // //           $or: [
// // // //             { name: { $regex: filter, $options: 'i' } },
// // // //             { contactNumber: { $regex: filter, $options: 'i' } },
// // // //           ],
// // // //         }
// // // //       : {};

// // // //     const customers = await Customer.find(query)
// // // //       .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
// // // //       .limit(limit * 1)
// // // //       .skip((page - 1) * limit);

// // // //     const total = await Customer.countDocuments(query);

// // // //     res.status(200).json({
// // // //       total,
// // // //       totalPages: Math.ceil(total / limit),
// // // //       currentPage: page,
// // // //       customers,
// // // //     });
// // // //   } catch (error) {
// // // //     res.status(500).json({ error: error.message });
// // // //   }
// // // // });

// // // // // Update Customer (original working version with real-time addition)
// // // // router.put('/:id', async (req, res) => {
// // // //   try {
// // // //     const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
// // // //     // Added only this line for real-time updates:
// // // //     req.app.get('io').emit('customer-update', { 
// // // //       totalCustomers: await Customer.countDocuments() 
// // // //     });
    
// // // //     res.status(200).json(customer);
// // // //   } catch (error) {
// // // //     res.status(400).json({ error: error.message });
// // // //   }
// // // // });

// // // // // Delete Customer (original working version with real-time addition)
// // // // router.delete('/:id', async (req, res) => {
// // // //   try {
// // // //     await Customer.findByIdAndDelete(req.params.id);
    
// // // //     // Added only this line for real-time updates:
// // // //     req.app.get('io').emit('customer-update', { 
// // // //       totalCustomers: await Customer.countDocuments() 
// // // //     });
    
// // // //     res.status(200).json({ message: 'Customer deleted successfully' });
// // // //   } catch (error) {
// // // //     res.status(500).json({ error: error.message });
// // // //   }
// // // // });

// // // // module.exports = router;





// // // const express = require('express');
// // // const router = express.Router();
// // // const Customer = require('../models/customer');

// // // // 1. Original Create Customer (+1 line for dashboard)
// // // router.post('/', async (req, res) => {
// // //   try {
// // //     const newCustomer = new Customer(req.body);
// // //     const savedCustomer = await newCustomer.save();
    
// // //     // Added only this line for dashboard updates:
// // //     req.app.get('io').emit('customer-count-updated', await Customer.countDocuments());
    
// // //     res.status(201).json(savedCustomer);
// // //   } catch (error) {
// // //     res.status(400).json({ error: error.message });
// // //   }
// // // });

// // // // 2. Original Read Customers (UNCHANGED)
// // // router.get('/', async (req, res) => {
// // //   try {
// // //     const { page = 1, limit = 10, sortBy = 'name', order = 'asc', filter = '' } = req.query;

// // //     const query = filter
// // //       ? {
// // //           $or: [
// // //             { name: { $regex: filter, $options: 'i' } },
// // //             { contactNumber: { $regex: filter, $options: 'i' } },
// // //           ],
// // //         }
// // //       : {};

// // //     const customers = await Customer.find(query)
// // //       .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
// // //       .limit(limit * 1)
// // //       .skip((page - 1) * limit);

// // //     const total = await Customer.countDocuments(query);

// // //     res.status(200).json({
// // //       total,
// // //       totalPages: Math.ceil(total / limit),
// // //       currentPage: page,
// // //       customers,
// // //     });
// // //   } catch (error) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // // 3. Original Update Customer (+1 line for dashboard)
// // // router.put('/:id', async (req, res) => {
// // //   try {
// // //     const customer = await Customer.findByIdAndUpdate(
// // //       req.params.id,
// // //       req.body,
// // //       { new: true }
// // //     );
    
// // //     // Added only this line:
// // //     req.app.get('io').emit('customer-count-updated', await Customer.countDocuments());
    
// // //     res.status(200).json(customer);
// // //   } catch (error) {
// // //     res.status(400).json({ error: error.message });
// // //   }
// // // });

// // // // 4. Original Delete Customer (+1 line for dashboard)
// // // router.delete('/:id', async (req, res) => {
// // //   try {
// // //     await Customer.findByIdAndDelete(req.params.id);
    
// // //     // Added only this line:
// // //     req.app.get('io').emit('customer-count-updated', await Customer.countDocuments());
    
// // //     res.status(200).json({ message: 'Customer deleted successfully' });
// // //   } catch (error) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // module.exports = router;




















// // // // // const express = require('express');
// // // // // const router = express.Router();
// // // // // const Customer = require('../models/customer');
// // // // // // const io = require("../server"); // Import Socket.IO instance

// // // // // // Create a customer
// // // // // router.post('/', async (req, res) => {
// // // // //   try {
// // // // //     const newCustomer = new Customer(req.body);
// // // // //     const savedCustomer = await newCustomer.save();
// // // // //     res.status(201).json(savedCustomer); // Return the saved customer
// // // // //   } catch (error) {
// // // // //     console.error(error);
// // // // //     res.status(400).json({ error: error.message });
// // // // //   }
// // // // // });

// // // // // // Read customers with pagination, sorting, and filtering
// // // // // router.get('/', async (req, res) => {
// // // // //   try {
// // // // //     const { page = 1, limit = 10, sortBy = 'name', order = 'asc', filter = '' } = req.query;

// // // // //     const query = filter
// // // // //     ? {
// // // // //         $or: [
// // // // //           { name: { $regex: filter, $options: 'i' } }, // Case-insensitive search in name
// // // // //           { contactNumber: { $regex: filter, $options: 'i' } }, // Case-insensitive search in contact number
// // // // //         ],
// // // // //       }
// // // // //     : {};    
// // // // //     const customers = await Customer.find(query)
// // // // //       .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
// // // // //       .limit(limit * 1)
// // // // //       .skip((page - 1) * limit);

// // // // //     const total = await Customer.countDocuments(query);
    
// // // // //     res.status(200).json({
// // // // //       total,
// // // // //       totalPages: Math.ceil(total / limit),
// // // // //       currentPage: page,
// // // // //       customers,
// // // // //     });
// // // // //   } catch (error) {
// // // // //     res.status(500).json({ error: error.message });
// // // // //   }
// // // // // });

// // // // // // Update a customer
// // // // // router.put('/:id', async (req, res) => {
// // // // //   try {
// // // // //     const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
// // // // //     res.status(200).json(customer);
// // // // //   } catch (error) {
// // // // //     res.status(400).json({ error: error.message });
// // // // //   }
// // // // // });

// // // // // // Delete a customer
// // // // // router.delete('/:id', async (req, res) => {
// // // // //   try {
// // // // //     await Customer.findByIdAndDelete(req.params.id);
// // // // //     res.status(200).json({ message: 'Customer deleted successfully' });
// // // // //   } catch (error) {
// // // // //     res.status(500).json({ error: error.message });
// // // // //   }
// // // // // });
// // // // // router.post("/add-customer", async (req, res) => {
// // // // //   try {
// // // // //     const newCustomer = new Customer(req.body);
// // // // //     await newCustomer.save();

// // // // //     io.emit("customerUpdated");

// // // // //     res.status(201).json({ message: "Customer added successfully" });
// // // // //   } catch (error) {
// // // // //     res.status(500).json({ message: error.message });
// // // // //   }
// // // // // });


// // // // // module.exports = router;
// // // // const express = require('express');
// // // // const router = express.Router();
// // // // const Customer = require('../models/customer');

// // // // //  Create a customer (with real-time emit)
// // // // // router.post('/', async (req, res) => {
// // // // //   try {
// // // // //     const newCustomer = new Customer(req.body);
// // // // //     const savedCustomer = await newCustomer.save();

// // // // //     const io = req.app.get('io'); // Get the socket instance
// // // // //     io.emit('customerUpdated');   // Notify all clients

// // // // //     res.status(201).json(savedCustomer);
// // // // //   } catch (error) {
// // // // //     console.error(error);
// // // // //     res.status(400).json({ error: error.message });
// // // // //   }
// // // // // });
// // // // router.post("/add-customer", async (req, res) => {
// // // //   try {
// // // //     const newCustomer = new Customer(req.body);
// // // //     await newCustomer.save();

// // // //     const io = req.app.get("io"); // Socket instance
// // // //     io.emit("customerUpdated"); // Notify dashboard

// // // //     res.status(201).json({ message: "Customer added successfully" });
// // // //   } catch (error) {
// // // //     res.status(500).json({ message: error.message });
// // // //   }
// // // // });


// // // // //  Read customers (pagination, filtering, sorting)
// // // // router.get('/', async (req, res) => {
// // // //   try {
// // // //     const { page = 1, limit = 10, sortBy = 'name', order = 'asc', filter = '' } = req.query;

// // // //     const query = filter
// // // //       ? {
// // // //           $or: [
// // // //             { name: { $regex: filter, $options: 'i' } },
// // // //             { contactNumber: { $regex: filter, $options: 'i' } },
// // // //           ],
// // // //         }
// // // //       : {};

// // // //     const customers = await Customer.find(query)
// // // //       .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
// // // //       .limit(limit * 1)
// // // //       .skip((page - 1) * limit);

// // // //     const total = await Customer.countDocuments(query);

// // // //     res.status(200).json({
// // // //       total,
// // // //       totalPages: Math.ceil(total / limit),
// // // //       currentPage: page,
// // // //       customers,
// // // //     });
// // // //   } catch (error) {
// // // //     res.status(500).json({ error: error.message });
// // // //   }
// // // // });

// // // // //  Update a customer (with real-time emit)
// // // // router.put('/:id', async (req, res) => {
// // // //   try {
// // // //     const updatedCustomer = await Customer.findByIdAndUpdate(
// // // //       req.params.id,
// // // //       req.body,
// // // //       { new: true }
// // // //     );

// // // //     const io = req.app.get('io');
// // // //     io.emit('customerUpdated');

// // // //     res.status(200).json(updatedCustomer);
// // // //   } catch (error) {
// // // //     res.status(400).json({ error: error.message });
// // // //   }
// // // // });

// // // // //  Delete a customer (with real-time emit)
// // // // router.delete('/:id', async (req, res) => {
// // // //   try {
// // // //     await Customer.findByIdAndDelete(req.params.id);

// // // //     const io = req.app.get('io');
// // // //     io.emit('customerUpdated');

// // // //     res.status(200).json({ message: 'Customer deleted successfully' });
// // // //   } catch (error) {
// // // //     res.status(500).json({ error: error.message });
// // // //   }
// // // // });

// // // // module.exports = router;
// // // const express = require('express');
// // // const router = express.Router();
// // // const Customer = require('../models/customer');

// // // //  Create a customer
// // // router.post("/", async (req, res) => {
// // //   try {
// // //     const newCustomer = new Customer(req.body);
// // //     await newCustomer.save();

// // //     const io = req.app.get("io"); // Socket instance
// // //     io.emit("dashboard-update"); // Standard event for dashboard refresh

// // //     res.status(201).json({ message: "Customer added successfully" });
// // //   } catch (error) {
// // //     res.status(500).json({ message: error.message });
// // //   }
// // // });

// // // //  Read customers (unchanged)
// // // router.get('/', async (req, res) => {
// // //   try {
// // //     const { page = 1, limit = 10, sortBy = 'name', order = 'asc', filter = '' } = req.query;

// // //     const query = filter
// // //       ? {
// // //           $or: [
// // //             { name: { $regex: filter, $options: 'i' } },
// // //             { contactNumber: { $regex: filter, $options: 'i' } },
// // //           ],
// // //         }
// // //       : {};

// // //     const customers = await Customer.find(query)
// // //       .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
// // //       .limit(limit * 1)
// // //       .skip((page - 1) * limit);

// // //     const total = await Customer.countDocuments(query);

// // //     res.status(200).json({
// // //       total,
// // //       totalPages: Math.ceil(total / limit),
// // //       currentPage: page,
// // //       customers,
// // //     });
// // //   } catch (error) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // //  Update a customer
// // // router.put('/:id', async (req, res) => {
// // //   try {
// // //     const updatedCustomer = await Customer.findByIdAndUpdate(
// // //       req.params.id,
// // //       req.body,
// // //       { new: true }
// // //     );

// // //     const io = req.app.get('io');
// // //     io.emit('dashboard-update'); // Standard event

// // //     res.status(200).json(updatedCustomer);
// // //   } catch (error) {
// // //     res.status(400).json({ error: error.message });
// // //   }
// // // });

// // // //  Delete a customer
// // // router.delete('/:id', async (req, res) => {
// // //   try {
// // //     await Customer.findByIdAndDelete(req.params.id);

// // //     const io = req.app.get('io');
// // //     io.emit('dashboard-update'); // Standard event

// // //     res.status(200).json({ message: 'Customer deleted successfully' });
// // //   } catch (error) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // module.exports = router;
// // const express = require('express');
// // const router = express.Router();
// // const Customer = require('../models/customer');

// // // Helper function to get dashboard counts
// // const getCustomerCounts = async () => {
// //   return {
// //     totalCustomers: await Customer.countDocuments(),
// //     // Add other counts if needed
// //   };
// // };
// // router.get('/count', async (req, res) => {
// //   try {
// //       const count = await Customer.countDocuments();
// //       res.json({ count });
// //   } catch (err) {
// //       res.status(500).json({ message: err.message });
// //   }
// // });
// // // Create Customer (with real-time update)
// // router.post('/', async (req, res) => {
// //   try {
// //     const newCustomer = new Customer(req.body);
// //     await newCustomer.save();

// //     const io = req.app.get('io');
// //     const counts = await getCustomerCounts();
    
// //     io.emit('customer-updated', {
// //       ...counts,
// //       action: 'created',
// //       customerId: newCustomer._id
// //     });

// //     res.status(201).json({
// //       success: true,
// //       data: newCustomer,
// //       message: 'Customer created successfully'
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message
// //     });
// //   }
// // });

// // // Update Customer (with real-time update)
// // router.put('/:id', async (req, res) => {
// //   try {
// //     const updatedCustomer = await Customer.findByIdAndUpdate(
// //       req.params.id,
// //       req.body,
// //       { new: true, runValidators: true }
// //     );

// //     if (!updatedCustomer) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Customer not found'
// //       });
// //     }

// //     const io = req.app.get('io');
// //     const counts = await getCustomerCounts();
    
// //     io.emit('customer-updated', {
// //       ...counts,
// //       action: 'updated',
// //       customerId: updatedCustomer._id
// //     });

// //     res.status(200).json({
// //       success: true,
// //       data: updatedCustomer
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message
// //     });
// //   }
// // });

// // // Delete Customer (with real-time update)
// // router.delete('/:id', async (req, res) => {
// //   try {
// //     const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);

// //     if (!deletedCustomer) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Customer not found'
// //       });
// //     }

// //     const io = req.app.get('io');
// //     const counts = await getCustomerCounts();
    
// //     io.emit('customer-updated', {
// //       ...counts,
// //       action: 'deleted',
// //       customerId: req.params.id
// //     });

// //     res.status(200).json({
// //       success: true,
// //       message: 'Customer deleted successfully'
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message
// //     });
// //   }
// // });

// // // Get Customers (unchanged)
// // router.get('/', async (req, res) => {
// //   try {
// //     const { page = 1, limit = 10, sortBy = 'name', order = 'asc', filter = '' } = req.query;

// //     const query = filter
// //       ? {
// //           $or: [
// //             { name: { $regex: filter, $options: 'i' } },
// //             { contactNumber: { $regex: filter, $options: 'i' } },
// //           ],
// //         }
// //       : {};

// //     const customers = await Customer.find(query)
// //       .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
// //       .limit(limit * 1)
// //       .skip((page - 1) * limit);

// //     const total = await Customer.countDocuments(query);

// //     res.status(200).json({
// //       success: true,
// //       data: {
// //         total,
// //         totalPages: Math.ceil(total / limit),
// //         currentPage: page,
// //         customers,
// //       }
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message
// //     });
// //   }
// // });

// // module.exports = router;









// // const express = require('express');
// // const router = express.Router();
// // const Customer = require('../models/customer');

// // // 1. Original Create Customer (+1 emit line)
// // router.post('/', async (req, res) => {
// //   try {
// //     const newCustomer = new Customer(req.body);
// //     const savedCustomer = await newCustomer.save();
    
// //     // Only addition: Emit real-time update
// //     req.app.get('io').emit('customer-count-updated', { 
// //       totalCustomers: await Customer.countDocuments() 
// //     });
    
// //     res.status(201).json(savedCustomer); // Original response
// //   } catch (error) {
// //     res.status(400).json({ error: error.message }); // Original error handling
// //   }
// // });

// // // 2. Original Read Customers (COMPLETELY UNCHANGED)
// // router.get('/', async (req, res) => {
// //   try {
// //     const { page = 1, limit = 10, sortBy = 'name', order = 'asc', filter = '' } = req.query;

// //     const query = filter
// //       ? {
// //           $or: [
// //             { name: { $regex: filter, $options: 'i' } },
// //             { contactNumber: { $regex: filter, $options: 'i' } },
// //           ],
// //         }
// //       : {};

// //     const customers = await Customer.find(query)
// //       .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
// //       .limit(limit * 1)
// //       .skip((page - 1) * limit);

// //     const total = await Customer.countDocuments(query);

// //     res.status(200).json({
// //       total,
// //       totalPages: Math.ceil(total / limit),
// //       currentPage: page,
// //       customers,
// //     });
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // // 3. Original Update Customer (+1 emit line)
// // router.put('/:id', async (req, res) => {
// //   try {
// //     const customer = await Customer.findByIdAndUpdate(
// //       req.params.id,
// //       req.body,
// //       { new: true }
// //     );
    
// //     // Only addition: Emit real-time update
// //     req.app.get('io').emit('customer-count-updated', { 
// //       totalCustomers: await Customer.countDocuments() 
// //     });
    
// //     res.status(200).json(customer);
// //   } catch (error) {
// //     res.status(400).json({ error: error.message });
// //   }
// // });

// // // 4. Original Delete Customer (+1 emit line)
// // router.delete('/:id', async (req, res) => {
// //   try {
// //     await Customer.findByIdAndDelete(req.params.id);
    
// //     // Only addition: Emit real-time update
// //     req.app.get('io').emit('customer-count-updated', { 
// //       totalCustomers: await Customer.countDocuments() 
// //     });
    
// //     res.status(200).json({ message: 'Customer deleted successfully' });
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // module.exports = router;







// const express = require('express');
// const router = express.Router();
// const Customer = require('../models/customer');

// // Helper function to emit customer updates
// const emitCustomerUpdates = async (io) => {
//   const totalCustomers = await Customer.countDocuments();
//   io.emit('customer-count-updated', { totalCustomers });
//   io.emit('refresh-customers'); // For full list updates if needed
// };

// // 1. Create Customer
// router.post('/', async (req, res) => {
//   try {
//     const newCustomer = new Customer(req.body);
//     const savedCustomer = await newCustomer.save();
    
//     // Emit updates
//     await emitCustomerUpdates(req.app.get('io'));
    
//     res.status(201).json(savedCustomer);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // 2. Read Customers (unchanged except for potential optimization)
// router.get('/', async (req, res) => {
//   try {
//     const { page = 1, limit = 10, sortBy = 'name', order = 'asc', filter = '' } = req.query;

//     const query = filter
//       ? {
//           $or: [
//             { name: { $regex: filter, $options: 'i' } },
//             { contactNumber: { $regex: filter, $options: 'i' } },
//           ],
//         }
//       : {};

//     const customers = await Customer.find(query)
//       .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
//       .limit(limit * 1)
//       .skip((page - 1) * limit);

//     const total = await Customer.countDocuments(query);

//     res.status(200).json({
//       total,
//       totalPages: Math.ceil(total / limit),
//       currentPage: page,
//       customers,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // 3. Update Customer
// router.put('/:id', async (req, res) => {
//   try {
//     const customer = await Customer.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
    
//     if (!customer) {
//       return res.status(404).json({ error: 'Customer not found' });
//     }
    
//     // Emit updates
//     await emitCustomerUpdates(req.app.get('io'));
    
//     res.status(200).json(customer);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // 4. Delete Customer
// router.delete('/:id', async (req, res) => {
//   try {
//     const customer = await Customer.findByIdAndDelete(req.params.id);
    
//     if (!customer) {
//       return res.status(404).json({ error: 'Customer not found' });
//     }
    
//     // Emit updates
//     await emitCustomerUpdates(req.app.get('io'));
    
//     res.status(200).json({ message: 'Customer deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

// Enhanced emit function for dashboard updates
const emitDashboardUpdates = async (io) => {
  try {
    if (io) {
      io.emit('customerUpdated');
      io.emit('dashboardUpdate');
    }
  } catch (err) {
    console.error('Error emitting dashboard updates:', err);
  }
};

// Create Customer
router.post('/', async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    const savedCustomer = await newCustomer.save();
    
    await emitDashboardUpdates(req.app.get('io'));
    
    res.status(201).json(savedCustomer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Customers
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'name', order = 'asc', filter = '' } = req.query;

    const query = filter ? {
      $or: [
        { name: { $regex: filter, $options: 'i' } },
        { contactNumber: { $regex: filter, $options: 'i' } },
      ],
    } : {};

    const customers = await Customer.find(query)
      .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Customer.countDocuments(query);

    res.status(200).json({
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      customers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Customer
router.put('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    
    await emitDashboardUpdates(req.app.get('io'));
    
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Customer
router.delete('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    
    await emitDashboardUpdates(req.app.get('io'));
    
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;