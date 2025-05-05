// require("dotenv").config();
// const express = require("express");
// const app = express();
// const cors = require("cors");

// const connection = require("./db");  
// const userRoutes = require("./routes/users");
// const authRoutes = require("./routes/auth");
// const employeeRoutes = require("./routes/employee");
// const customerRoutes = require("./routes/customer"); 
// const supplierRoutes = require("./routes/supplier");
// const productRoutes = require("./routes/product");

// const mongoose = require('mongoose');

// // Connect to the database
// connection();  

// // Middlewares
// app.use(express.json());
// app.use(cors());



// // Use routes
// app.use("/api/users", userRoutes);
// app.use("/api/auth", authRoutes);
// app.use('/api/employees' , employeeRoutes);
// app.use("/api/customers", customerRoutes);
// app.use("/api/suppliers", supplierRoutes);
// app.use("/api/products",productRoutes);


// app.get("/api", (req, res) => {
//   res.json({ "users": ["user1"] });
// });

// // Add a sample login route
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   const userDoc = await User.findOne({ email });

//   if (userDoc) {
//     const passOk = bcrypt.compareSync(password, userDoc.password);
//     if (passOk) {
//       jwt.sign({
//         email: userDoc.email,
//         id: userDoc._id,
//       }, jwtSecret, (err, token) => {
//         if (err) throw err;
//         res.cookie('token', token, { httpOnly: true }).json(userDoc);
//       });
//     } else {
//       res.status(422).json('Password not correct');
//     }
//   } else {
//     res.status(404).json('User not found');
//   }
// });

// const port = process.env.PORT || 5000;
// app.listen(port, () => console.log(`Listening on port ${port}...`));

// require("dotenv").config();
// const express = require("express");
// const app = express();
// const cors = require("cors");
// const http = require("http");
// const { Server } = require("socket.io");

// const connection = require("./db");
// const userRoutes = require("./routes/users");
// const authRoutes = require("./routes/auth");
// const employeeRoutes = require("./routes/employee");
// const customerRoutes = require("./routes/customer");
// const supplierRoutes = require("./routes/supplier");
// const productRoutes = require("./routes/product");
// const dashboardRoutes = require("./routes/dashboard");

// const mongoose = require("mongoose");
// // Optional if you use login routes
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("./models/user"); // Add this if missing
// const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret"; // Define secret

// // Connect to MongoDB
// connection();

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Routes
// app.use("/api/users", userRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/employees", employeeRoutes);
// app.use("/api/customers", customerRoutes);
// app.use("/api/suppliers", supplierRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/dashboard", dashboardRoutes);

// // Sample API
// app.get("/api", (req, res) => {
//   res.json({ users: ["user1"] });
// });

// // Optional login route
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const userDoc = await User.findOne({ email });

//   if (userDoc) {
//     const passOk = bcrypt.compareSync(password, userDoc.password);
//     if (passOk) {
//       jwt.sign(
//         {
//           email: userDoc.email,
//           id: userDoc._id,
//         },
//         jwtSecret,
//         (err, token) => {
//           if (err) throw err;
//           res.cookie("token", token, { httpOnly: true }).json(userDoc);
//         }
//       );
//     } else {
//       res.status(422).json("Password not correct");
//     }
//   } else {
//     res.status(404).json("User not found");
//   }
// });

// //  Setup HTTP server and Socket.IO
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000", // your frontend URL
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   },
// });

// //  Attach socket instance to app for use in routes
// app.set("io", io);

// // Optional: handle connection events
// io.on("connection", (socket) => {
//   console.log("A client connected:", socket.id);

//   socket.on("disconnect", () => {
//     console.log("Client disconnected:", socket.id);
//   });
// });

// //  Start server
// const port = process.env.PORT || 5000;
// server.listen(port, () => console.log(`Server running on port ${port}...`));
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const employeeRoutes = require("./routes/employee");
const customerRoutes = require("./routes/customer");
const supplierRoutes = require("./routes/supplier");
const productRoutes = require("./routes/product");
const dashboardRoutes = require("./routes/dashboard");

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret";

// Connect to MongoDB
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

// Existing middleware
app.use(express.json());
app.use(cors());

// Existing routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/products", productRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Sample API
app.get("/api", (req, res) => {
  res.json({ users: ["user1"] });
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });

  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
        },
        jwtSecret,
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token, { httpOnly: true }).json(userDoc);
        }
      );
    } else {
      res.status(422).json("Password not correct");
    }
  } else {
    res.status(404).json("User not found");
  }
});

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start server with Socket.IO support
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});