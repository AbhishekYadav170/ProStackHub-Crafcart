const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");

const products = [
  {
    name: "Classic White Sneakers",
    description:
      "Clean and comfortable white sneakers for everyday casual wear.",
    price: 2499,
    category: "Footwear",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    stock: 25,
    isActive: true,
  },

  {
    name: "Premium Black Hoodie",
    description:
      "Soft premium cotton hoodie with a modern relaxed fit.",
    price: 1999,
    category: "Clothing",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
    stock: 30,
    isActive: true,
  },

  {
    name: "Minimal Leather Backpack",
    description:
      "Stylish and durable backpack suitable for work, college and travel.",
    price: 2999,
    category: "Bags",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    stock: 15,
    isActive: true,
  },

  {
    name: "Classic Analog Watch",
    description:
      "Elegant analog watch with a timeless design.",
    price: 3499,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    stock: 20,
    isActive: true,
  },

  {
    name: "Wireless Headphones",
    description:
      "Comfortable wireless headphones with immersive sound.",
    price: 4999,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    stock: 18,
    isActive: true,
  },

  {
    name: "Smart Casual Shirt",
    description:
      "Modern casual shirt designed for comfortable everyday styling.",
    price: 1599,
    category: "Clothing",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
    stock: 40,
    isActive: true,
  },

  {
    name: "Premium Sunglasses",
    description:
      "Modern sunglasses with a stylish frame and comfortable fit.",
    price: 1799,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
    stock: 22,
    isActive: true,
  },

  {
    name: "Running Shoes",
    description:
      "Lightweight running shoes designed for daily workouts.",
    price: 3299,
    category: "Footwear",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    stock: 28,
    isActive: true,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log(
      `${products.length} products inserted successfully`
    );

    process.exit(0);
  } catch (error) {
    console.error("Product seeding failed:", error);

    process.exit(1);
  }
};

seedProducts();