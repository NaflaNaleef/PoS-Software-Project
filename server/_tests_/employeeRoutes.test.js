const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const employeeRouter = require('../routes/employee'); // path to your employee routes

// Create an Express app for testing
const app = express();
app.use(express.json());
app.use('/employees', employeeRouter);

// Connect to the test database (you can use an in-memory DB for tests, like Mongo Memory Server)
beforeAll(async () => {
  const mongoUri = 'mongodb://localhost:27017/employee_test_db';
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Employee API', () => {
  let createdEmployeeId;

  // Test POST route to create an employee
  it('should create a new employee', async () => {
    const newEmployee = {
      name: 'John Doe',
      contactNumber: '123456789',
      email: 'john.doe@example.com',
      salary: 50000,
      position: 'Developer'
    };
    

    const response = await request(app).post('/employees').send(newEmployee);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newEmployee.name);
    expect(response.body.contactNumber).toBe(newEmployee.contactNumber);

    createdEmployeeId = response.body._id; // Save the employee ID for later tests
  });

  // Test GET route to read employees with pagination, sorting, and filtering
  it('should return employees with pagination', async () => {
    const response = await request(app).get('/employees?page=1&limit=5&sortBy=name&order=asc');

    expect(response.status).toBe(200);
    expect(response.body.employees.length).toBeLessThanOrEqual(5);
    expect(response.body.totalPages).toBeGreaterThan(0);
  });

  // Test GET route with filtering
  it('should filter employees by name or contact number', async () => {
    const response = await request(app).get('/employees?filter=John');

    expect(response.status).toBe(200);
    expect(response.body.employees.length).toBeGreaterThan(0);
  });

  // Test PUT route to update an employee
  it('should update an employee', async () => {
    const updatedData = { name: 'John Smith' };

    const response = await request(app)
      .put(`/employees/${createdEmployeeId}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedData.name);
  });

  // Test DELETE route to delete an employee
  it('should delete an employee', async () => {
    const response = await request(app).delete(`/employees/${createdEmployeeId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Employee deleted successfully');
  });
});
