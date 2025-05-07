
const express = require('express');
const router = express.Router();
const Product = require('../models/product'); // Import the Product model

// Create a product
router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();

    const io = req.app.get("io");
    io.emit("productUpdated");


    res.status(201).json(savedProduct);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Barcode already exists!' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});


// Read products with pagination, sorting, and filtering
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'name', order = 'asc', filter = '' } = req.query;

    const query = filter
      ? {
          $or: [
            { name: { $regex: filter, $options: 'i' } }, // Case-insensitive search in name
            { description: { $regex: filter, $options: 'i' } }, // Case-insensitive search in description
          ],
        }
      : {};

    const products = await Product.find(query)
      .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Product.countDocuments(query);

    res.status(200).json({
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      products,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    const io = req.app.get("io");
    io.emit("productUpdated");

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    const io = req.app.get("io");
    io.emit("productUpdated");

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Optional extra route (if you're using it)
router.post("/add-product", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();

    const io = req.app.get("io");
    io.emit("productUpdated");

    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
