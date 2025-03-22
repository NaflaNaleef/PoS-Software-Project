const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const customerRoutes = require('../routes/customer'); // Adjust the path to the customer routes
const Customer = require('../models/customer'); // Adjust the path to your customer model

const app = express();
app.use(express.json());
app.use('/api/customers', customerRoutes); // Use the customer routes

beforeAll(async () => {
  // Connect to MongoDB in memory for testing
  const url = 'mongodb://127.0.0.1:27017/testdb'; // Set up a test database URL
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  // Clean up the database after tests
  await mongoose.connection.close();
});

describe('Customer API', () => {
  let customerId;

  // Test for creating a customer
  it('should create a customer', async () => {
    const customerData = {
        name: 'John Doe',
        contactNumber: '1234567890',
        address: '123 Main St',
        email: 'johndoe@example.com',
      };
      
    const res = await request(app).post('/api/customers').send(customerData);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    customerId = res.body._id;
    expect(res.body.name).toBe(customerData.name);
    expect(res.body.contactNumber).toBe(customerData.contactNumber);
  });

  // Test for reading customers
  it('should fetch customers with pagination, sorting, and filtering', async () => {
    const res = await request(app).get('/api/customers').query({ page: 1, limit: 1, filter: 'John' });

    expect(res.status).toBe(200);
    expect(res.body.customers.length).toBeGreaterThan(0);
    expect(res.body.total).toBeGreaterThan(0);
  });

  // Test for updating a customer
  it('should update a customer', async () => {
    const updatedData = {
      name: 'John Updated',
      contactNumber: '9876543210',
    };

    const res = await request(app).put(`/api/customers/${customerId}`).send(updatedData);

    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updatedData.name);
    expect(res.body.contactNumber).toBe(updatedData.contactNumber);
  });

  // Test for deleting a customer
  it('should delete a customer', async () => {
    const res = await request(app).delete(`/api/customers/${customerId}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Customer deleted successfully');
  });
});
