const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");

// ========================================
// ADMIN DASHBOARD STATS
// ========================================

const getDashboardStats = async (req, res) => {
  try {
    // ------------------------------------
    // Basic counts
    // ------------------------------------

    const totalProducts = await Product.countDocuments();

    const totalCustomers = await User.countDocuments({
      role: "customer",
    });

    const totalOrders = await Order.countDocuments();

    const pendingOrders = await Order.countDocuments({
      orderStatus: "pending",
    });

    const confirmedOrders = await Order.countDocuments({
      orderStatus: "confirmed",
    });

    const processingOrders = await Order.countDocuments({
      orderStatus: "processing",
    });

    const shippedOrders = await Order.countDocuments({
      orderStatus: "shipped",
    });

    const deliveredOrders = await Order.countDocuments({
      orderStatus: "delivered",
    });

    const cancelledOrders = await Order.countDocuments({
      orderStatus: "cancelled",
    });

    // ------------------------------------
    // Revenue
    // ------------------------------------

    const revenueResult = await Order.aggregate([
      {
        $match: {
          orderStatus: {
            $ne: "cancelled",
          },

          paymentStatus: "paid",
        },
      },

      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    const totalRevenue =
      revenueResult.length > 0
        ? revenueResult[0].totalRevenue
        : 0;

    // ------------------------------------
    // Response
    // ------------------------------------

    res.status(200).json({
      success: true,

      stats: {
        totalProducts,
        totalCustomers,
        totalOrders,

        pendingOrders,
        confirmedOrders,
        processingOrders,
        shippedOrders,
        deliveredOrders,
        cancelledOrders,

        totalRevenue,
      },
    });
  } catch (error) {
    console.error(
      "Dashboard stats error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
    });
  }
};

module.exports = {
  getDashboardStats,
};