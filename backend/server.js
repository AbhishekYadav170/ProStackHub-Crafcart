const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");
const productRoutes = require("./routes/productRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cartRoutes = require("./routes/cartRoutes");


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

app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/cart", cartRoutes);
app.get("/api/auth/profile", protect, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});
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