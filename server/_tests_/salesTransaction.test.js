const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const SalesTransaction = require("../models/salesTransaction");
const Customer = require("../models/customer");
const Product = require("../models/product");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("SalesTransaction Model Test", () => {
  it("should create and save a sales transaction successfully", async () => {
    
    const customer = await Customer.create({
      name: "John Doe",
      address: "123 Main St",
      email: "johndoe@example.com",
      contactNumber: "1234567890",
    });

    
    const product = await Product.create({
      name: "Laptop",
      description: "A high-performance laptop",  
      price: 1000,
      stock: 10,
    });

    // Create a sales transaction
    const salesTransaction = new SalesTransaction({
      customer: customer._id,
      items: [
        {
          product: product._id,
          quantity: 2,
          price: 1000,
          total: 2000,
        },
      ],
      totalAmount: 2000,
      paymentStatus: "Paid",
      paymentMethod: "Card",
    });

    const savedTransaction = await salesTransaction.save();

    expect(savedTransaction._id).toBeDefined();
    expect(savedTransaction.customer.toString()).toBe(customer._id.toString());
    expect(savedTransaction.items.length).toBe(1);
    expect(savedTransaction.items[0].total).toBe(2000);
    expect(savedTransaction.paymentStatus).toBe("Paid");
  });

  it("should not save a sales transaction without a required field", async () => {
    const salesTransaction = new SalesTransaction({});

    let err;
    try {
      await salesTransaction.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
  });
});
