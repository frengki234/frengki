require("dotenv").config();
const app = require("../src/app");
const connectDB = require("../src/config/db");

// Variable untuk menyimpan status koneksi DB (caching)
let isConnected = false;

module.exports = async (req, res) => {
  // Pastikan koneksi DB dipanggil dan ditunggu (await) sebelum app diproses
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
  
  // Serahkan request ke aplikasi Express
  return app(req, res);
};