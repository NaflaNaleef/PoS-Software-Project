const mongoose = require('mongoose');
const Product = require('../models/product'); // Adjust if needed
const db = require('./db'); // Make sure this path is correct

beforeAll(async () => {
  await db.connect();
});

afterAll(async () => {
  await db.disconnect();
});

describe('Product Model Test', () => {
  it('should create & save a product successfully', async () => {
    const productData = {
      name: 'Laptop',
      description: 'High-performance laptop',
      price: 1200,
      barcode: '1234567890123',
      quantity: 10,
    };

    const product = new Product(productData);
    const savedProduct = await product.save();

    expect(savedProduct._id).toBeDefined();
    expect(savedProduct.name).toBe(productData.name);
    expect(savedProduct.description).toBe(productData.description);
    expect(savedProduct.price).toBe(productData.price);
    expect(savedProduct.barcode).toBe(productData.barcode);
    expect(savedProduct.quantity).toBe(productData.quantity);
  });

  it('should not save a product without required fields', async () => {
    const product = new Product({}); // Missing required fields
    let error;
    try {
      await product.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.name).toBeDefined();
    expect(error.errors.description).toBeDefined();
    expect(error.errors.price).toBeDefined();
  });

  it('should not allow duplicate barcodes', async () => {
    const productData = {
      name: 'Phone',
      description: 'Smartphone with great features',
      price: 800,
      barcode: '9876543210987',
      quantity: 5,
    };

    const product1 = new Product(productData);
    const product2 = new Product(productData);

    await product1.save();

    let error;
    try {
      await product2.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.code).toBe(11000); // MongoDB duplicate key error code
  });
});
