require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");  
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const employeeRoutes = require("./routes/employee");
const customerRoutes = require("./routes/customer"); 
const supplierRoutes = require("./routes/supplier");

const mongoose = require('mongoose');

// Connect to the database
connection();  

// Middlewares
app.use(express.json());
app.use(cors());

// Define categoryBaseCodes
const categoryBaseCodes = {
  Electronics: "ELEC",
  Clothing: "CLTH",
  Food: "FOOD",
  Furniture: "FURN",
};

// Product Schema and Model
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  categoryCode: { type: String, unique: true, required: true },
  prize: { type: Number, required: true },
});
const Product = mongoose.model("Product", productSchema);

// Product Routes
app.post("/api/product", async (req, res) => {
  const { name, quantity, category, prize } = req.body;

  try {
    // Validate category
    const baseCode = categoryBaseCodes[category];
    if (!baseCode) {
      return res.status(400).json({ error: "Invalid category" });
    }

    // Count existing products in the same category
    const count = await product.countDocuments({ category });

    // Generate a unique categoryCode
    const categoryCode = `${baseCode}-${(count + 1).toString().padStart(3, "0")}`;

    // Create and save product
    const product = new product({ name, quantity, category, categoryCode, prize });
    await product.save();

    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/product", async (req, res) => {
  try {
    const products = await products.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/employees' , employeeRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/suppliers", supplierRoutes);


app.get("/api", (req, res) => {
  res.json({ "users": ["user1"] });
});

// Add a sample login route
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

// Start the server
//const app = express();
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
