const mongoose = require("mongoose");
const { User, validate } = require("../models/user"); // Adjust path accordingly
const { MongoMemoryServer } = require("mongodb-memory-server");
const jwt = require("jsonwebtoken");
require("dotenv").config();

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
});

describe("User Model", () => {
    it("should save a valid user", async () => {
        const user = new User({
            firstName: "John",
            lastName: "Doe",
            email: "john@example.com",
            password: "SecurePass123!",
        });

        const savedUser = await user.save();
        expect(savedUser._id).toBeDefined();
        expect(savedUser.email).toBe("john@example.com");
    });

    it("should not allow duplicate emails", async () => {
        const user1 = new User({
            firstName: "Alice",
            lastName: "Smith",
            email: "alice@example.com",
            password: "StrongPass123!",
        });

        await user1.save();

        const user2 = new User({
            firstName: "Bob",
            lastName: "Smith",
            email: "alice@example.com", // Duplicate email
            password: "AnotherPass123!",
        });

        await expect(user2.save()).rejects.toThrow();
    });

    it("should generate a valid JWT token", async () => {
        process.env.JWTPRIVATEKEY = "secretKey"; // Temporary key for testing

        const user = new User({
            firstName: "John",
            lastName: "Doe",
            email: "john@example.com",
            password: "SecurePass123!",
        });

        const token = user.generateAuthToken();
        expect(token).toBeDefined();

        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        expect(decoded).toHaveProperty("_id");
    });
});

describe("User Validation", () => {
    it("should validate correct user data", () => {
        const validUser = {
            firstName: "John",
            lastName: "Doe",
            email: "john@example.com",
            password: "SecurePass123!",
        };

        const { error } = validate(validUser);
        expect(error).toBeUndefined();
    });

    it("should return an error for an invalid email", () => {
        const invalidUser = {
            firstName: "John",
            lastName: "Doe",
            email: "invalid-email",
            password: "SecurePass123!",
        };

        const { error } = validate(invalidUser);
        expect(error).toBeDefined();
        expect(error.details[0].message).toMatch(/valid email/);
    });

    it("should return an error for a missing password", () => {
        const invalidUser = {
            firstName: "John",
            lastName: "Doe",
            email: "john@example.com",
        };

        const { error } = validate(invalidUser);
        expect(error).toBeDefined();
        expect(error.details[0].message).toMatch(/required/);
    });
});
