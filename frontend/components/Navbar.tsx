// "use client";

// import Link from "next/link";
// import {
//   Search,
//   ShoppingCart,
//   User,
// } from "lucide-react";

// export default function Navbar() {
//   return (
//     <header className="navbar">
//       <div className="navbar-inner">

//         <Link href="/" className="logo">
//           CartCraft
//         </Link>

//         <nav className="nav-links">
//           <Link href="/">Home</Link>
//           <Link href="/products">Shop</Link>
//           <Link href="/categories">
//             Categories
//           </Link>
//         </nav>

//         <div className="nav-actions">

//           <Link
//             href="/products"
//             className="nav-icon"
//             aria-label="Search"
//           >
//             <Search size={20} />
//           </Link>

//           <Link
//             href="/cart"
//             className="nav-icon"
//             aria-label="Cart"
//           >
//             <ShoppingCart size={20} />

//             <span className="cart-badge">
//               0
//             </span>
//           </Link>

//           <Link
//             href="/login"
//             className="nav-icon"
//             aria-label="Account"
//           >
//             <User size={20} />
//           </Link>

//         </div>

//       </div>
//     </header>
//   );
// }







"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  User,
  LogOut,
  Package,
} from "lucide-react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ========================================
  // CHECK LOGIN
  // ========================================

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");

      setIsLoggedIn(Boolean(token));
    };

    checkLogin();

    window.addEventListener(
      "storage",
      checkLogin
    );

    return () => {
      window.removeEventListener(
        "storage",
        checkLogin
      );
    };
  }, []);

  // ========================================
  // LOGOUT
  // ========================================

  const handleLogout = () => {
    localStorage.removeItem("token");

    // Remove old cart data also
    localStorage.removeItem("cart");

    setIsLoggedIn(false);

    window.location.href = "/login";
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">

        {/* LOGO */}

        <Link href="/" className="logo">
          CartCraft
        </Link>

        {/* NAVIGATION */}

        <nav className="nav-links">
          <Link href="/">
            Home
          </Link>

          <Link href="/products">
            Shop
          </Link>

          <Link href="/categories">
            Categories
          </Link>
        </nav>

        {/* ACTIONS */}

        <div className="nav-actions">

          {/* SEARCH */}

          <Link
            href="/products"
            className="nav-icon"
            aria-label="Search"
          >
            <Search size={20} />
          </Link>

          {/* CART */}

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

          {/* USER */}

          {isLoggedIn ? (
            <>
              {/* MY ORDERS */}

              <Link
                href="/orders"
                className="nav-icon"
                aria-label="My Orders"
                title="My Orders"
              >
                <Package size={20} />
              </Link>

              {/* LOGOUT */}

              <button
                type="button"
                onClick={handleLogout}
                className="nav-icon"
                aria-label="Logout"
                title="Logout"
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                <LogOut size={20} />
              </button>
            </>
          ) : (
            /* LOGIN */

            <Link
              href="/login"
              className="nav-icon"
              aria-label="Login"
              title="Login"
            >
              <User size={20} />
            </Link>
          )}

        </div>
      </div>
    </header>
  );
}
