require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");  
const mongoose = require('mongoose');
const http = require("http");
const { Server } = require("socket.io");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret";
const User = require("./models/user");

// Import Routes
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const employeeRoutes = require("./routes/employee");
const customerRoutes = require("./routes/customer"); 
const supplierRoutes = require("./routes/supplier");
const productRoutes = require("./routes/product");
const saleRoutes = require("./routes/sales");
const stripeRoutes = require("./routes/stripe");
const supplierPurchaseRoutes = require('./routes/supplierPurchaseRoutes');
const supplierReturnRoutes = require('./routes/supplierReturnRoutes');
const dashboardRoutes = require("./routes/dashboard");


// Connect to the database
connection();  

// Create HTTP server and Socket.IO instance
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

// Middleware to make io accessible in routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Middlewares
app.use(express.json());
app.use(cors());

// Use Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/products", productRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/stripe", stripeRoutes);
app.use('/api/supplier-purchases', supplierPurchaseRoutes);
app.use('/api/supplier-returns', supplierReturnRoutes);
app.use("/api/dashboard", dashboardRoutes);

// API Test Route
app.get("/api", (req, res) => {
  res.json({ "users": ["user1"] });
});

// Sample Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });

  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign({
        email: userDoc.email,
        id: userDoc._id,
      }, jwtSecret, (err, token) => {
        if (err) throw err;
        res.cookie('token', token, { httpOnly: true }).json(userDoc);
      });
    } else {
      res.status(422).json('Password not correct');
    }
  } else {
    res.status(404).json('User not found');
  }
});

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});


// // Start the Server
// const port = process.env.PORT || 5000;
// app.listen(port, () => console.log(`Listening on port ${port}...`));

// Start server with Socket.IO support
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});