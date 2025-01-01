const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const categoryBaseCodes = {
  Electronics: "ELEC",
  Clothing: "CLTH",
  Food: "FOOD",
  Furniture: "FURN",
};

router.post('/add', async (req, res) => {
  try {
    const { name, category, quantity, prize } = req.body;

    // Validate the category
    const baseCode = categoryBaseCodes[category];
    if (!baseCode) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    // Count existing products in the same category
    const count = await Product.countDocuments({ category });

    // Generate a unique code for the category
    const categoryCode = `${baseCode}-${(count + 1).toString().padStart(3, "0")}`;

    // Create the new product with the generated categoryCode
    const product = new Product({ name, category, quantity, categoryCode, prize });
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
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
