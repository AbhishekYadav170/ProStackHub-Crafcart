const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product");

// ========================================
// GENERATE ORDER NUMBER
// ========================================

const generateOrderNumber = () => {
  const timestamp = Date.now();

  const random = Math.floor(
    1000 + Math.random() * 9000
  );

  return `CC-${timestamp}-${random}`;
};

// ========================================
// CREATE ORDER
// ========================================

const createOrder = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      address,
      city,
      state,
      pincode,
      paymentMethod = "cod",
    } = req.body;

    // ------------------------------------
    // Validate shipping address
    // ------------------------------------

    if (
      !fullName ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !pincode
    ) {
      return res.status(400).json({
        success: false,
        message: "Complete shipping address is required",
      });
    }

    // ------------------------------------
    // Validate payment method
    // ------------------------------------

    if (!["cod", "online"].includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method",
      });
    }

    // ------------------------------------
    // Get user's cart
    // ------------------------------------

    const cart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty",
      });
    }

    // ------------------------------------
    // Check stock
    // ------------------------------------

    for (const item of cart.items) {
      const product = item.product;

      if (!product || !product.isActive) {
        return res.status(400).json({
          success: false,
          message: "One of the products is no longer available",
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `${product.name} has only ${product.stock} item(s) left`,
        });
      }
    }

    // ------------------------------------
    // Prepare order items
    // ------------------------------------

    const orderItems = cart.items.map((item) => {
      const product = item.product;

      const subtotal = product.price * item.quantity;

      return {
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: item.quantity,
        subtotal,
      };
    });

    // ------------------------------------
    // Calculate total
    // ------------------------------------

    const totalAmount = orderItems.reduce(
      (total, item) => total + item.subtotal,
      0
    );

    // ------------------------------------
    // Create order
    // ------------------------------------

    const order = await Order.create({
      user: req.user._id,

      items: orderItems,

      shippingAddress: {
        fullName,
        phone,
        address,
        city,
        state,
        pincode,
      },

      totalAmount,

      paymentMethod,

      paymentStatus:
        paymentMethod === "cod" ? "pending" : "pending",

      orderStatus: "pending",

      orderNumber: generateOrderNumber(),
    });

    // ------------------------------------
    // Reduce product stock
    // ------------------------------------

    for (const item of cart.items) {
      await Product.findByIdAndUpdate(
        item.product._id,
        {
          $inc: {
            stock: -item.quantity,
          },
        }
      );
    }

    // ------------------------------------
    // Clear cart
    // ------------------------------------

    cart.items = [];

    await cart.save();

    // ------------------------------------
    // Response
    // ------------------------------------

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
};

// ========================================
// GET MY ORDERS
// ========================================

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get my orders error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

// ========================================
// GET SINGLE MY ORDER
// ========================================

const getMyOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

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

module.exports = {
  createOrder,
  getMyOrders,
  getMyOrderById,
};