const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Base codes for categories
const categoryBaseCodes = {
  Electronics: "ELEC",
  Clothing: "CLTH",
  Food: "FOOD",
  Furniture: "FURN",
};

// Add a new product
router.post('/add', async (req, res) => {
  try {
    const { name, category, quantity, prize } = req.body;

    // Validate required fields
    if (!name || !category || !quantity || !prise) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate the category
    const baseCode = categoryBaseCodes[category];
    if (!baseCode) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    // Validate prise
    const numericPrise = parseFloat(prise);
    if (isNaN(numericPrise) || numericPrise <= 0) {
      return res.status(400).json({ error: 'Prise must be a positive number' });
    }

    // Count existing products in the same category
    const count = await Product.countDocuments({ category });

    // Generate a unique category code
    const categoryCode = `${baseCode}-${(count + 1).toString().padStart(3, "0")}`;

    // Generate a unique barcode (Example: timestamp + random number)
    const barcode = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Create the new product
    const product = new Product({ 
      name, 
      category, 
      quantity, 
      categoryCode, 
      prise: numericPrise, 
      barcode 
    });
    await product.save();

    res.status(201).json({ message: 'Product added successfully', product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  try {
    // Validate prise (if provided)
    if (req.body.prize) {
      const numericPrise = parseFloat(req.body.prize);
      if (isNaN(numericPrise) || numericPrise <= 0) {
        return res.status(400).json({ error: 'Prise must be a positive number' });
      }
      req.body.prize = numericPrise; // Update with validated prize
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Additional Route: Get Product by Barcode
router.get('/barcode/:barcode', async (req, res) => {
  try {
    const product = await Product.findOne({ barcode: req.params.barcode });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

