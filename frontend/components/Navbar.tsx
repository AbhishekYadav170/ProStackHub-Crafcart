// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import {
//   Search,
//   ShoppingCart,
//   User,
//   LogOut,
//   Package,
// } from "lucide-react";
// import api from "@/lib/api";

// export default function Navbar() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [cartCount, setCartCount] = useState(0);

//   // ========================================
//   // CHECK LOGIN
//   // ========================================

//   const checkLogin = () => {
//     const token = localStorage.getItem("token");

//     setIsLoggedIn(Boolean(token));

//     return Boolean(token);
//   };

//   // ========================================
//   // GET CART COUNT
//   // ========================================

//   const fetchCartCount = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         setCartCount(0);
//         return;
//       }

//       const data = await api("/cart");

//       const items = data.cart?.items || [];

//       const count = items.reduce(
//         (
//           total: number,
//           item: { quantity?: number }
//         ) => total + (item.quantity || 0),
//         0
//       );

//       setCartCount(count);
//     } catch (error) {
//       console.error(
//         "Fetch cart count error:",
//         error
//       );

//       setCartCount(0);
//     }
//   };

//   // ========================================
//   // INITIAL LOAD
//   // ========================================

//   useEffect(() => {
//     const loggedIn = checkLogin();

//     if (loggedIn) {
//       fetchCartCount();
//     }

//     // Login/logout from another tab
//     const handleStorage = () => {
//       const loggedIn = checkLogin();

//       if (loggedIn) {
//         fetchCartCount();
//       } else {
//         setCartCount(0);
//       }
//     };

//     // Cart update from other components
//     const handleCartUpdate = () => {
//       fetchCartCount();
//     };

//     window.addEventListener(
//       "storage",
//       handleStorage
//     );

//     window.addEventListener(
//       "cartUpdated",
//       handleCartUpdate
//     );

//     return () => {
//       window.removeEventListener(
//         "storage",
//         handleStorage
//       );

//       window.removeEventListener(
//         "cartUpdated",
//         handleCartUpdate
//       );
//     };
//   }, []);

//   // ========================================
//   // LOGOUT
//   // ========================================

//   const handleLogout = () => {
//     localStorage.removeItem("token");

//     // Remove old local cart
//     localStorage.removeItem("cart");

//     setIsLoggedIn(false);
//     setCartCount(0);

//     window.location.href = "/login";
//   };

//   return (
//     <header className="navbar">
//       <div className="navbar-inner">

//         {/* LOGO */}

//         <Link
//           href="/"
//           className="logo"
//         >
//           CartCraft
//         </Link>

//         {/* NAVIGATION */}

//         <nav className="nav-links">
//           <Link href="/">
//             Home
//           </Link>

//           <Link href="/products">
//             Shop
//           </Link>

//           <Link href="/categories">
//             Categories
//           </Link>
//         </nav>

//         {/* ACTIONS */}

//         <div className="nav-actions">

//           {/* SEARCH */}

//           <Link
//             href="/products"
//             className="nav-icon"
//             aria-label="Search"
//             title="Search"
//           >
//             <Search size={20} />
//           </Link>

//           {/* CART */}

//           <Link
//             href="/cart"
//             className="nav-icon"
//             aria-label="Cart"
//             title="Cart"
//           >
//             <ShoppingCart size={20} />

//             {cartCount > 0 && (
//               <span className="cart-badge">
//                 {cartCount > 99
//                   ? "99+"
//                   : cartCount}
//               </span>
//             )}
//           </Link>

//           {/* LOGGED IN */}

//           {isLoggedIn ? (
//             <>
//               {/* MY ORDERS */}

//               <Link
//                 href="/orders"
//                 className="nav-icon"
//                 aria-label="My Orders"
//                 title="My Orders"
//               >
//                 <Package size={20} />
//               </Link>

//               {/* LOGOUT */}

//               <button
//                 type="button"
//                 onClick={handleLogout}
//                 className="nav-icon"
//                 aria-label="Logout"
//                 title="Logout"
//                 style={{
//                   border: "none",
//                   background: "transparent",
//                   cursor: "pointer",
//                   padding: 0,
//                 }}
//               >
//                 <LogOut size={20} />
//               </button>
//             </>
//           ) : (
//             /* LOGIN */

//             <Link
//               href="/login"
//               className="nav-icon"
//               aria-label="Login"
//               title="Login"
//             >
//               <User size={20} />
//             </Link>
//           )}

//         </div>
//       </div>
//     </header>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, LogOut, Package } from "lucide-react";
import api from "@/lib/api";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // ========================================
  // CHECK LOGIN
  // ========================================

  const checkLogin = () => {
    const token = localStorage.getItem("token");
    const loggedIn = Boolean(token);

    setIsLoggedIn(loggedIn);

    return loggedIn;
  };

  // ========================================
  // GET CART COUNT
  // ========================================

  const fetchCartCount = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setCartCount(0);
        return;
      }

      const data = await api("/cart");

      const items = data?.cart?.items || [];

      const count = items.reduce(
        (total: number, item: { quantity?: number }) => {
          return total + Number(item?.quantity || 0);
        },
        0,
      );

      setCartCount(count);
    } catch (error) {
      console.error("Fetch cart count error:", error);

      setCartCount(0);
    }
  };

  // ========================================
  // INITIAL LOAD
  // ========================================

  useEffect(() => {
    const loggedIn = checkLogin();

    if (loggedIn) {
      fetchCartCount();
    }

    // Login / Logout event
    const handleAuthChange = () => {
      const loggedIn = checkLogin();

      if (loggedIn) {
        fetchCartCount();
      } else {
        setCartCount(0);
      }
    };

    // Another browser tab
    const handleStorage = () => {
      handleAuthChange();
    };

    // Cart update
    const handleCartUpdate = () => {
      fetchCartCount();
    };

    window.addEventListener("authChanged", handleAuthChange);

    window.addEventListener("storage", handleStorage);

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("authChanged", handleAuthChange);

      window.removeEventListener("storage", handleStorage);

      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  // ========================================
  // LOGOUT
  // ========================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");

    setIsLoggedIn(false);
    setCartCount(0);

    // Tell Navbar / other components
    window.dispatchEvent(new Event("authChanged"));

    // Redirect to login
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
          <Link href="/">Home</Link>

          <Link href="/products">Shop</Link>

          <Link href="/categories">Categories</Link>
        </nav>

        {/* ACTIONS */}

        <div className="nav-actions">
          {/* SEARCH */}

          <Link
            href="/products"
            className="nav-icon"
            aria-label="Search"
            title="Search"
          >
            <Search size={20} />
          </Link>

          {/* CART */}

          <Link
            href="/cart"
            className="nav-icon"
            aria-label="Cart"
            title="Cart"
          >
            <ShoppingCart size={20} />

            {cartCount > 0 && (
              <span className="cart-badge">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {/* AUTH */}

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
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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
