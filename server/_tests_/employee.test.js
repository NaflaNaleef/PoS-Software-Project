const mongoose = require('mongoose');
const Employee = require('../models/employee'); // Adjust path if needed
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('Employee Model Test', () => {
  it('should create and save an employee successfully', async () => {
    const employeeData = {
      name: 'John Doe',
      position: 'Software Engineer',
      salary: 80000,
      contactNumber: '1234567890',
      email: 'johndoe@example.com'
    };

    const validEmployee = new Employee(employeeData);
    const savedEmployee = await validEmployee.save();

    expect(savedEmployee._id).toBeDefined();
    expect(savedEmployee.name).toBe(employeeData.name);
    expect(savedEmployee.position).toBe(employeeData.position);
    expect(savedEmployee.salary).toBe(employeeData.salary);
    expect(savedEmployee.contactNumber).toBe(employeeData.contactNumber);
    expect(savedEmployee.email).toBe(employeeData.email);
  });

  it('should fail if a required field is missing', async () => {
    const employeeData = {
      name: 'Jane Doe',
      salary: 75000,
      contactNumber: '0987654321',
      email: 'janedoe@example.com'
    };

    const employeeWithoutPosition = new Employee(employeeData);
    let err;
    try {
      await employeeWithoutPosition.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
    expect(err.errors.position).toBeDefined();
  });

  it('should enforce unique email constraint', async () => {
    const employee1 = new Employee({
      name: 'Alice',
      position: 'Manager',
      salary: 90000,
      contactNumber: '1112223333',
      email: 'alice@example.com'
    });

    const employee2 = new Employee({
      name: 'Bob',
      position: 'Developer',
      salary: 70000,
      contactNumber: '4445556666',
      email: 'alice@example.com' // Same email as first employee
    });

    await employee1.save();
    let err;
    try {
      await employee2.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
    expect(err.code).toBe(11000); // MongoDB duplicate key error
  });
});
