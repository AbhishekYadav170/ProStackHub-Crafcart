const express = require("express");

const {
  getDashboardStats,
} = require("../controllers/dashboardController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

// Admin security
router.use(protect);
router.use(adminOnly);

// Dashboard statistics
router.get("/stats", getDashboardStats);

module.exports = router;