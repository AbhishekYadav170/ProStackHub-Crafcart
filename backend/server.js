const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// ================================
// DATABASE
// ================================

connectDB();

// ================================
// MIDDLEWARE
// ================================

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

// ================================
// AUTH ROUTES
// ================================

app.use("/api/auth", authRoutes);

// ================================
// TEST ROUTE
// ================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CartCraft API is running 🚀",
  });
});

// ================================
// SERVER
// ================================

app.listen(PORT, () => {
  console.log(`CartCraft server running on port ${PORT}`);
});