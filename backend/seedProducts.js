// const mongoose = require("mongoose");
// require("dotenv").config();

// const Product = require("./models/Product");

// const products = [
//   {
//     name: "Classic White Sneakers",
//     description:
//       "Clean and comfortable white sneakers for everyday casual wear.",
//     price: 2499,
//     category: "Footwear",
//     image:
//       "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
//     stock: 25,
//     isActive: true,
//   },

//   {
//     name: "Premium Black Hoodie",
//     description:
//       "Soft premium cotton hoodie with a modern relaxed fit.",
//     price: 1999,
//     category: "Clothing",
//     image:
//       "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
//     stock: 30,
//     isActive: true,
//   },

//   {
//     name: "Minimal Leather Backpack",
//     description:
//       "Stylish and durable backpack suitable for work, college and travel.",
//     price: 2999,
//     category: "Bags",
//     image:
//       "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
//     stock: 15,
//     isActive: true,
//   },

//   {
//     name: "Classic Analog Watch",
//     description:
//       "Elegant analog watch with a timeless design.",
//     price: 3499,
//     category: "Accessories",
//     image:
//       "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
//     stock: 20,
//     isActive: true,
//   },

//   {
//     name: "Wireless Headphones",
//     description:
//       "Comfortable wireless headphones with immersive sound.",
//     price: 4999,
//     category: "Electronics",
//     image:
//       "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
//     stock: 18,
//     isActive: true,
//   },

//   {
//     name: "Smart Casual Shirt",
//     description:
//       "Modern casual shirt designed for comfortable everyday styling.",
//     price: 1599,
//     category: "Clothing",
//     image:
//       "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
//     stock: 40,
//     isActive: true,
//   },

//   {
//     name: "Premium Sunglasses",
//     description:
//       "Modern sunglasses with a stylish frame and comfortable fit.",
//     price: 1799,
//     category: "Accessories",
//     image:
//       "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
//     stock: 22,
//     isActive: true,
//   },

//   {
//     name: "Running Shoes",
//     description:
//       "Lightweight running shoes designed for daily workouts.",
//     price: 3299,
//     category: "Footwear",
//     image:
//       "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
//     stock: 28,
//     isActive: true,
//   },
// ];

// const seedProducts = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);

//     console.log("MongoDB connected");

//     await Product.deleteMany();

//     await Product.insertMany(products);

//     console.log(
//       `${products.length} products inserted successfully`
//     );

//     process.exit(0);
//   } catch (error) {
//     console.error("Product seeding failed:", error);

//     process.exit(1);
//   }
// };

// seedProducts();





const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");

// ========================================
// SAMPLE PRODUCTS
// ========================================

const products = [
  // ========================================
  // ELECTRONICS
  // ========================================

  {
    name: "Wireless Bluetooth Headphones",
    description:
      "Premium wireless headphones with deep bass, clear sound and long battery life.",
    price: 2499,
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    stock: 25,
    isActive: true,
  },

  {
    name: "Smart Watch Pro",
    description:
      "Modern smartwatch with fitness tracking, heart rate monitoring and notifications.",
    price: 3999,
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    stock: 18,
    isActive: true,
  },

  {
    name: "Wireless Bluetooth Speaker",
    description:
      "Portable Bluetooth speaker with powerful audio and compact design.",
    price: 1799,
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    stock: 30,
    isActive: true,
  },

  {
    name: "USB-C Fast Charger",
    description:
      "Fast charging USB-C adapter suitable for smartphones, tablets and other devices.",
    price: 899,
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0",
    stock: 40,
    isActive: true,
  },

  // ========================================
  // FASHION
  // ========================================

  {
    name: "Classic Cotton T-Shirt",
    description:
      "Comfortable premium cotton t-shirt suitable for everyday wear.",
    price: 699,
    category: "fashion",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    stock: 50,
    isActive: true,
  },

  {
    name: "Denim Jacket",
    description:
      "Stylish denim jacket with a comfortable fit for casual outfits.",
    price: 1899,
    category: "fashion",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5",
    stock: 20,
    isActive: true,
  },

  {
    name: "Casual Hoodie",
    description:
      "Warm and comfortable hoodie designed for everyday casual wear.",
    price: 1299,
    category: "fashion",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
    stock: 35,
    isActive: true,
  },

  {
    name: "Classic Sunglasses",
    description:
      "Stylish sunglasses with a modern frame and comfortable fit.",
    price: 999,
    category: "fashion",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
    stock: 28,
    isActive: true,
  },

  // ========================================
  // HOME
  // ========================================

  {
    name: "Modern Table Lamp",
    description:
      "Elegant table lamp that adds a warm and modern touch to your room.",
    price: 1499,
    category: "home",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
    stock: 22,
    isActive: true,
  },

  {
    name: "Decorative Plant Pot",
    description:
      "Minimal decorative planter suitable for living rooms, bedrooms and offices.",
    price: 599,
    category: "home",
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411",
    stock: 45,
    isActive: true,
  },

  {
    name: "Soft Cushion Set",
    description:
      "Comfortable decorative cushion set for sofas and beds.",
    price: 799,
    category: "home",
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2",
    stock: 30,
    isActive: true,
  },

  {
    name: "Minimal Wall Clock",
    description:
      "Simple modern wall clock suitable for home and office spaces.",
    price: 899,
    category: "home",
    image:
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c",
    stock: 18,
    isActive: true,
  },

  // ========================================
  // BEAUTY
  // ========================================

  {
    name: "Vitamin C Face Serum",
    description:
      "Lightweight vitamin C serum designed for a fresh and glowing look.",
    price: 799,
    category: "beauty",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be",
    stock: 35,
    isActive: true,
  },

  {
    name: "Moisturizing Face Cream",
    description:
      "Daily moisturizing cream with a lightweight and smooth texture.",
    price: 649,
    category: "beauty",
    image:
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8",
    stock: 40,
    isActive: true,
  },

  {
    name: "Perfume For Men",
    description:
      "Long-lasting fragrance with a fresh and elegant scent.",
    price: 1599,
    category: "beauty",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601",
    stock: 25,
    isActive: true,
  },

  {
    name: "Makeup Brush Set",
    description:
      "Professional-style makeup brush set for everyday makeup needs.",
    price: 899,
    category: "beauty",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348",
    stock: 20,
    isActive: true,
  },

  // ========================================
  // SPORTS
  // ========================================

  {
    name: "Premium Football",
    description:
      "Durable football designed for training, practice and recreational play.",
    price: 999,
    category: "sports",
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55",
    stock: 25,
    isActive: true,
  },

  {
    name: "Yoga Mat",
    description:
      "Comfortable non-slip yoga mat suitable for yoga and home workouts.",
    price: 799,
    category: "sports",
    image:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f",
    stock: 35,
    isActive: true,
  },

  {
    name: "Adjustable Dumbbells",
    description:
      "Compact adjustable dumbbells for strength training at home.",
    price: 2499,
    category: "sports",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61",
    stock: 15,
    isActive: true,
  },

  // ========================================
  // BOOKS
  // ========================================

  {
    name: "The Art of Programming",
    description:
      "A practical book for understanding programming concepts and problem solving.",
    price: 599,
    category: "books",
    image:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765",
    stock: 30,
    isActive: true,
  },

  {
    name: "Modern Web Development",
    description:
      "Learn modern web development concepts from frontend to backend.",
    price: 749,
    category: "books",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    stock: 22,
    isActive: true,
  },

  {
    name: "Business & Startup Guide",
    description:
      "Practical ideas and strategies for starting and growing a business.",
    price: 499,
    category: "books",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72",
    stock: 18,
    isActive: true,
  },

  // ========================================
  // GAMING
  // ========================================

  {
    name: "Wireless Gaming Controller",
    description:
      "Responsive wireless controller designed for comfortable gaming sessions.",
    price: 2199,
    category: "gaming",
    image:
      "https://images.unsplash.com/photo-1592840496694-26c035b52b7c",
    stock: 20,
    isActive: true,
  },

  {
    name: "Gaming Headset",
    description:
      "Gaming headset with clear audio and comfortable ear cushions.",
    price: 1799,
    category: "gaming",
    image:
      "https://images.unsplash.com/photo-1599669454699-248893623440",
    stock: 24,
    isActive: true,
  },

  // ========================================
  // COMPUTERS
  // ========================================

  {
    name: "Mechanical Gaming Keyboard",
    description:
      "Responsive mechanical keyboard designed for gaming and productivity.",
    price: 2299,
    category: "computers",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
    stock: 25,
    isActive: true,
  },

  {
    name: "Wireless Computer Mouse",
    description:
      "Ergonomic wireless mouse with smooth tracking and comfortable grip.",
    price: 799,
    category: "computers",
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db",
    stock: 40,
    isActive: true,
  },

  // ========================================
  // TOYS
  // ========================================

  {
    name: "Building Blocks Set",
    description:
      "Creative building block set for fun and educational play.",
    price: 899,
    category: "toys",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b",
    stock: 30,
    isActive: true,
  },

  {
    name: "Remote Control Car",
    description:
      "Fun remote control car designed for indoor and outdoor play.",
    price: 1299,
    category: "toys",
    image:
      "https://images.unsplash.com/photo-1594787318286-3d835c1d207f",
    stock: 18,
    isActive: true,
  },

  // ========================================
  // JEWELLERY
  // ========================================

  {
    name: "Elegant Necklace",
    description:
      "Minimal elegant necklace suitable for casual and special occasions.",
    price: 1299,
    category: "jewelry",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
    stock: 15,
    isActive: true,
  },

  {
    name: "Classic Bracelet",
    description:
      "Stylish bracelet designed to complement everyday outfits.",
    price: 899,
    category: "jewelry",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a",
    stock: 20,
    isActive: true,
  },

  // ========================================
  // KITCHEN
  // ========================================

  {
    name: "Stainless Steel Water Bottle",
    description:
      "Reusable stainless steel bottle suitable for home, office and travel.",
    price: 699,
    category: "kitchen",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
    stock: 35,
    isActive: true,
  },

  {
    name: "Ceramic Coffee Mug",
    description:
      "Premium ceramic mug perfect for coffee, tea and everyday use.",
    price: 399,
    category: "kitchen",
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a",
    stock: 45,
    isActive: true,
  },

  // ========================================
  // AUTOMOTIVE
  // ========================================

  {
    name: "Car Phone Holder",
    description:
      "Adjustable car phone holder for safe and convenient navigation.",
    price: 599,
    category: "automotive",
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a",
    stock: 30,
    isActive: true,
  },

  {
    name: "Car Cleaning Kit",
    description:
      "Complete cleaning kit for maintaining a clean and fresh car interior.",
    price: 999,
    category: "automotive",
    image:
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24",
    stock: 20,
    isActive: true,
  },

  // ========================================
  // ACCESSORIES
  // ========================================

  {
    name: "Classic Leather Wallet",
    description:
      "Slim and stylish wallet with multiple card and cash compartments.",
    price: 799,
    category: "accessories",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93",
    stock: 30,
    isActive: true,
  },

  {
    name: "Travel Backpack",
    description:
      "Spacious backpack suitable for college, office and travel.",
    price: 1499,
    category: "accessories",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    stock: 25,
    isActive: true,
  },
];

// ========================================
// SEED DATABASE
// ========================================

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    // Clear existing products
    await Product.deleteMany({});

    console.log("Old products removed");

    // Insert new products
    const createdProducts =
      await Product.insertMany(products);

    console.log(
      `${createdProducts.length} products inserted successfully`
    );

    // Show categories
    const categories = [
      ...new Set(
        createdProducts.map(
          (product) => product.category
        )
      ),
    ];

    console.log("\nCategories:");
    categories.forEach((category) => {
      console.log(`- ${category}`);
    });

    console.log("\nProduct seeding completed!");

    process.exit(0);
  } catch (error) {
    console.error(
      "Seed products error:",
      error
    );

    process.exit(1);
  }
};

seedProducts();