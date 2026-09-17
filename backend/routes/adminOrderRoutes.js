const express = require("express");

const {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  updatePaymentStatus,
} = require("../controllers/adminOrderController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

// Admin security
router.use(protect);
router.use(adminOnly);

// Get all orders
router.get("/", getAllOrders);

// Get single order
router.get("/:id", getOrderById);

// Update order status
router.patch("/:id/status", updateOrderStatus);

// Update payment status
router.patch("/:id/payment", updatePaymentStatus);

module.exports = router;