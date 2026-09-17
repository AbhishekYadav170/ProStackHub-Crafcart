const express = require("express");

const {
  addReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/reviewController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get reviews - public
router.get(
  "/product/:productId",
  getProductReviews
);

// Add review - logged in customer
router.post(
  "/product/:productId",
  protect,
  addReview
);

// Delete own review
router.delete(
  "/:id",
  protect,
  deleteReview
);

module.exports = router;