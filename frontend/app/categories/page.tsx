"use client";

import Link from "next/link";
import {
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

// const categories = [
//   {
//     name: "Electronics",
//     description: "Latest gadgets and electronic products",
//     emoji: "📱",
//     search: "electronics",
//   },
//   {
//     name: "Fashion",
//     description: "Trendy clothes and fashion products",
//     emoji: "👕",
//     search: "fashion",
//   },
//   {
//     name: "Home & Living",
//     description: "Products to make your home better",
//     emoji: "🏠",
//     search: "home",
//   },
//   {
//     name: "Beauty",
//     description: "Beauty and personal care products",
//     emoji: "✨",
//     search: "beauty",
//   },
//   {
//     name: "Sports",
//     description: "Sports and fitness essentials",
//     emoji: "⚽",
//     search: "sports",
//   },
//   {
//     name: "Books",
//     description: "Books for learning and entertainment",
//     emoji: "📚",
//     search: "books",
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
    name: "Groceries",
    description: "Daily groceries and essential items",
    emoji: "🛒",
    search: "groceries",
  },
  {
    name: "Furniture",
    description: "Stylish furniture for every room",
    emoji: "🛋️",
    search: "furniture",
  },
  {
    name: "Toys & Games",
    description: "Fun toys and games for everyone",
    emoji: "🎮",
    search: "toys",
  },
  {
    name: "Jewellery",
    description: "Elegant jewellery and accessories",
    emoji: "💎",
    search: "jewellery",
  },
  {
    name: "Footwear",
    description: "Comfortable and stylish footwear",
    emoji: "👟",
    search: "footwear",
  },
  {
    name: "Kitchen",
    description: "Useful products for your kitchen",
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
    name: "Pet Supplies",
    description: "Everything your pets need",
    emoji: "🐶",
    search: "pets",
  },
  {
    name: "Health & Wellness",
    description: "Products for a healthy lifestyle",
    emoji: "💪",
    search: "health",
  },
  {
    name: "Office & Stationery",
    description: "Office supplies and stationery products",
    emoji: "📝",
    search: "stationery",
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