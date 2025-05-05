const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Supplier = require('../models/supplier'); // Adjust path as needed

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Supplier Model Test', () => {
  it('should create and save a supplier successfully', async () => {
    const validSupplier = new Supplier({
      name: 'ABC Supplies',
      company: 'John Doe',
      contactNumber: '1234567890',
      email: 'abc@example.com',
      address: '123 Main St',
    });

    const savedSupplier = await validSupplier.save();
    
    expect(savedSupplier._id).toBeDefined();
    expect(savedSupplier.name).toBe('ABC Supplies');
    expect(savedSupplier.email).toBe('abc@example.com');
  });

  it('should fail when required fields are missing', async () => {
    const invalidSupplier = new Supplier({ name: 'XYZ Supplies' }); // Missing required fields

    let err;
    try {
      await invalidSupplier.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
    expect(err.errors.company).toBeDefined();
    expect(err.errors.contactNumber).toBeDefined();
    expect(err.errors.email).toBeDefined();
  });

  it('should not allow duplicate emails', async () => {
    const supplier1 = new Supplier({
      name: 'Supplier One',
      company: 'Jane Doe',
      contactNumber: '1234567890',
      email: 'duplicate@example.com',
      address: '123 Main St',
    });

    const supplier2 = new Supplier({
      name: 'Supplier Two',
      company: 'John Doe',
      contactNumber: '0987654321',
      email: 'duplicate@example.com', // Duplicate email
      address: '456 Side St',
    });

    await supplier1.save();

    let err;
    try {
      await supplier2.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
    expect(err.code).toBe(11000); // MongoDB duplicate key error
  });
});
