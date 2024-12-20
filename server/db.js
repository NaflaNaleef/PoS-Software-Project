require("dotenv").config();
const mongoose = require("mongoose");

const connection = async () => {
  const dbURI = process.env.MONGO_URI || "your_mongodb_connection_string_here";

  try {
    await mongoose.connect(dbURI); // No options needed for modern Mongoose versions
    console.log("Connected to cloud database");
  } catch (err) {
    console.error("Database connection error:", err.message);
    process.exit(1); // Exit process on failure
  }
};

module.exports = connection;
