const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Customer = require('../models/customer'); // adjust the path

describe('Customer Model Test', () => {
  let mongoServer;
  let connection;

  // Set up MongoDB in-memory server before tests
  beforeAll(async () => {
    jest.setTimeout(10000); // Increase timeout to 10 seconds
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    connection = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  // Disconnect from the in-memory server after tests
  afterAll(async () => {
    await mongoose.disconnect();
    if (mongoServer) {
      await mongoServer.stop();
    }
  });

  // Test creating a customer
  it('should create a new customer', async () => {
    const customerData = {
      name: 'John Doe',
      contactNumber: '1234567890',
      email: 'john.doe@example.com',
      address: '123 Main St',
    };

    const customer = new Customer(customerData);
    await customer.save();

    const savedCustomer = await Customer.findOne({ email: customer.email });
    expect(savedCustomer).toBeTruthy();
    expect(savedCustomer.name).toBe(customerData.name);
    expect(savedCustomer.contactNumber).toBe(customerData.contactNumber);
    expect(savedCustomer.address).toBe(customerData.address);
    expect(savedCustomer.email).toBe(customerData.email);
  });

  // Test validation for required fields
  it('should throw an error if required fields are missing', async () => {
    const customerData = {
      name: 'John Doe',
      contactNumber: '1234567890',
      email: 'john.doe@example.com',
      // address is missing
    };

    const customer = new Customer(customerData);
    try {
      await customer.save();
    } catch (error) {
      expect(error.errors.address).toBeTruthy();
    }
  });

  // Test unique email constraint
  it('should throw an error if email is not unique', async () => {
    const customerData = {
      name: 'Jane Doe',
      contactNumber: '0987654321',
      email: 'john.doe@example.com', // already used email
      address: '456 Oak St',
    };

    const customer = new Customer(customerData);
    try {
      await customer.save();
    } catch (error) {
      expect(error.code).toBe(11000); // Duplicate key error code for MongoDB
    }
  });
});
