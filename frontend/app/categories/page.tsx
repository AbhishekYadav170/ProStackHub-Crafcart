"use client";

import Link from "next/link";
import {
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

// const categories = [
//   {
//     name: "Electronics",
//     description: "Latest gadgets, devices and electronic products",
//     emoji: "📱",
//     search: "electronics",
//   },
//   {
//     name: "Fashion",
//     description: "Trendy clothes, footwear and fashion accessories",
//     emoji: "👕",
//     search: "fashion",
//   },
//   {
//     name: "Home & Living",
//     description: "Furniture, decor and useful home essentials",
//     emoji: "🏠",
//     search: "home",
//   },
//   {
//     name: "Beauty",
//     description: "Beauty, skincare and personal care products",
//     emoji: "✨",
//     search: "beauty",
//   },
//   {
//     name: "Sports & Fitness",
//     description: "Sports equipment and fitness essentials",
//     emoji: "⚽",
//     search: "sports",
//   },
//   {
//     name: "Books",
//     description: "Books for learning, knowledge and entertainment",
//     emoji: "📚",
//     search: "books",
//   },
//   {
//     name: "Grocery",
//     description: "Daily essentials, food and household groceries",
//     emoji: "🛒",
//     search: "grocery",
//   },
//   {
//     name: "Toys & Games",
//     description: "Fun toys, games and entertainment products",
//     emoji: "🧸",
//     search: "toys",
//   },
//   {
//     name: "Jewelry",
//     description: "Beautiful jewelry and fashion accessories",
//     emoji: "💎",
//     search: "jewelry",
//   },
//   {
//     name: "Footwear",
//     description: "Shoes, sneakers, sandals and more",
//     emoji: "👟",
//     search: "footwear",
//   },
//   {
//     name: "Automotive",
//     description: "Car, bike accessories and automotive essentials",
//     emoji: "🚗",
//     search: "automotive",
//   },
//   {
//     name: "Health & Wellness",
//     description: "Health, wellness and personal care essentials",
//     emoji: "💊",
//     search: "health",
//   },
//   {
//     name: "Pet Supplies",
//     description: "Food, toys and accessories for your pets",
//     emoji: "🐶",
//     search: "pets",
//   },
//   {
//     name: "Kitchen",
//     description: "Kitchen tools, appliances and cooking essentials",
//     emoji: "🍳",
//     search: "kitchen",
//   },
//   {
//     name: "Office & Stationery",
//     description: "Office supplies, stationery and study essentials",
//     emoji: "📒",
//     search: "office",
//   },
//   {
//     name: "Travel",
//     description: "Travel bags, accessories and useful travel products",
//     emoji: "✈️",
//     search: "travel",
//   },
// ];
const categories = [
  {
    name: "Electronics",
    description: "Latest gadgets and electronic products",
    emoji: "📱",
    search: "electronics",
  },
  {
    name: "Fashion",
    description: "Trendy clothes and fashion products",
    emoji: "👕",
    search: "fashion",
  },
  {
    name: "Home & Living",
    description: "Products to make your home better",
    emoji: "🏠",
    search: "home",
  },
  {
    name: "Beauty",
    description: "Beauty and personal care products",
    emoji: "✨",
    search: "beauty",
  },
  {
    name: "Sports",
    description: "Sports and fitness essentials",
    emoji: "⚽",
    search: "sports",
  },
  {
    name: "Books",
    description: "Books for learning and entertainment",
    emoji: "📚",
    search: "books",
  },
  {
    name: "Gaming",
    description: "Gaming consoles, accessories and more",
    emoji: "🎮",
    search: "gaming",
  },
  {
    name: "Computers",
    description: "Laptops, computers and accessories",
    emoji: "💻",
    search: "computers",
  },
  {
    name: "Toys & Kids",
    description: "Fun and educational products for kids",
    emoji: "🧸",
    search: "toys",
  },
  {
    name: "Kitchen",
    description: "Useful kitchen and cooking products",
    emoji: "🍳",
    search: "kitchen",
  },
  {
    name: "Automotive",
    description: "Car and bike accessories",
    emoji: "🚗",
    search: "automotive",
  },
  {
    name: "Accessories",
    description: "Bags, watches and everyday accessories",
    emoji: "👜",
    search: "accessories",
  },
];
export default function CategoriesPage() {
  return (
    <main className="section">
      <div className="container">

        {/* HEADER */}

        <div className="section-heading">
          <p className="section-label">
            CARTCRAFT
          </p>

          <h1 className="section-title">
            Shop by Category
          </h1>

          <p>
            Explore our products by category.
          </p>
        </div>

        {/* CATEGORIES */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginTop: "35px",
          }}
        >
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/products?category=${category.search}`}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div
                style={{
                  border: "1px solid #e5e5e5",
                  borderRadius: "16px",
                  padding: "28px 22px",
                  background: "#fff",
                  transition:
                    "transform 0.2s ease, box-shadow 0.2s ease",
                  height: "100%",
                }}
              >

                {/* ICON */}

                <div
                  style={{
                    width: "65px",
                    height: "65px",
                    borderRadius: "14px",
                    background: "#f5f5f5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "32px",
                    marginBottom: "20px",
                  }}
                >
                  {category.emoji}
                </div>

                {/* NAME */}

                <h2
                  style={{
                    fontSize: "20px",
                    margin: "0 0 10px",
                  }}
                >
                  {category.name}
                </h2>

                {/* DESCRIPTION */}

                <p
                  style={{
                    color: "#737373",
                    fontSize: "14px",
                    lineHeight: "1.6",
                    marginBottom: "20px",
                  }}
                >
                  {category.description}
                </p>

                {/* LINK */}

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  <span>
                    Explore Products
                  </span>

                  <ArrowRight size={16} />
                </div>

              </div>
            </Link>
          ))}
        </div>

        {/* ALL PRODUCTS */}

        <div
          style={{
            textAlign: "center",
            marginTop: "45px",
          }}
        >
          <Link
            href="/products"
            className="primary-button"
          >
            <ShoppingBag
              size={17}
              style={{
                marginRight: "8px",
              }}
            />

            View All Products
          </Link>
        </div>

      </div>
    </main>
  );
}