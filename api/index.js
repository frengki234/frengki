require("dotenv").config();
const app = require("../src/app");
const connectDB = require("../src/config/db");

// Panggil koneksi database
connectDB();

// Export LANGSUNG instance app Express-nya
module.exports = app;