// const express = require("express");

// const {
//   createOrder,
//   getMyOrders,
//   getMyOrderById,
// } = require("../controllers/orderController");

// const protect = require("../middleware/authMiddleware");

// const router = express.Router();

// // All order APIs require login
// router.use(protect);

// // Create order
// router.post("/", createOrder);

// // Get logged-in user's orders
// router.get("/my-orders", getMyOrders);

// // Get one logged-in user's order
// router.get("/:id", getMyOrderById);

// module.exports = router;




const express = require("express");

const {
  createOrder,
  getMyOrders,
  getMyOrderById,
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// All order routes require login
router.use(protect);

// Create new order
router.post("/", createOrder);

// Get logged-in user's orders
router.get("/my-orders", getMyOrders);

// Get single order details
router.get("/:id", getMyOrderById);

module.exports = router;