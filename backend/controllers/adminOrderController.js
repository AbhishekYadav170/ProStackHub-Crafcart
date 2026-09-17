const Order = require("../models/Order");
const Product = require("../models/Product");

// ========================================
// GET ALL ORDERS
// ========================================

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get all orders error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

// ========================================
// GET SINGLE ORDER
// ========================================

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Get order error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
    });
  }
};

// ========================================
// UPDATE ORDER STATUS
// ========================================

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "confirmed",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];

    // ------------------------------------
    // Validate status
    // ------------------------------------

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    // ------------------------------------
    // Find order
    // ------------------------------------

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // ------------------------------------
    // Already cancelled
    // ------------------------------------

    if (
      order.orderStatus === "cancelled" &&
      status !== "cancelled"
    ) {
      return res.status(400).json({
        success: false,
        message: "Cancelled order cannot be changed",
      });
    }

    // ------------------------------------
    // Delivered order cannot be cancelled
    // ------------------------------------

    if (
      order.orderStatus === "delivered" &&
      status === "cancelled"
    ) {
      return res.status(400).json({
        success: false,
        message: "Delivered order cannot be cancelled",
      });
    }

    // ------------------------------------
    // Cancel order
    // ------------------------------------

    if (
      status === "cancelled" &&
      order.orderStatus !== "cancelled"
    ) {
      // Restore stock
      for (const item of order.items) {
        await Product.findByIdAndUpdate(
          item.product,
          {
            $inc: {
              stock: item.quantity,
            },
          }
        );
      }

      console.log(
        `Stock restored for cancelled order: ${order.orderNumber}`
      );
    }

    // ------------------------------------
    // Update status
    // ------------------------------------

    order.orderStatus = status;

    // ------------------------------------
    // COD becomes paid after delivery
    // ------------------------------------

    if (
      order.paymentMethod === "cod" &&
      status === "delivered"
    ) {
      order.paymentStatus = "paid";
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Update order status error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update order status",
    });
  }
};

// ========================================
// UPDATE PAYMENT STATUS
// ========================================

const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;

    const allowedStatuses = [
      "pending",
      "paid",
      "failed",
    ];

    // ------------------------------------
    // Validate payment status
    // ------------------------------------

    if (!allowedStatuses.includes(paymentStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment status",
      });
    }

    // ------------------------------------
    // Find order
    // ------------------------------------

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // ------------------------------------
    // Update payment status
    // ------------------------------------

    order.paymentStatus = paymentStatus;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Payment status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Update payment status error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update payment status",
    });
  }
};

// ========================================
// EXPORT
// ========================================

module.exports = {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  updatePaymentStatus,
};