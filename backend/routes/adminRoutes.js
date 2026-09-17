const express = require("express");

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getAdminProducts,
} = require("../controllers/adminController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

// ========================================
// ADMIN SECURITY
// ========================================

router.use(protect);
router.use(adminOnly);

// ========================================
// PRODUCT MANAGEMENT
// ========================================

router.get("/products", getAdminProducts);

router.post("/products", createProduct);

router.put("/products/:id", updateProduct);

router.delete("/products/:id", deleteProduct);

module.exports = router;