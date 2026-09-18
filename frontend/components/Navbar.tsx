"use client";

import Link from "next/link";
import {
  Search,
  ShoppingCart,
  User,
} from "lucide-react";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">

        <Link href="/" className="logo">
          CartCraft
        </Link>

        <nav className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/products">Shop</Link>
          <Link href="/categories">
            Categories
          </Link>
        </nav>

        <div className="nav-actions">

          <Link
            href="/products"
            className="nav-icon"
            aria-label="Search"
          >
            <Search size={20} />
          </Link>

          <Link
            href="/cart"
            className="nav-icon"
            aria-label="Cart"
          >
            <ShoppingCart size={20} />

            <span className="cart-badge">
              0
            </span>
          </Link>

          <Link
            href="/login"
            className="nav-icon"
            aria-label="Account"
          >
            <User size={20} />
          </Link>

        </div>

      </div>
    </header>
  );
}