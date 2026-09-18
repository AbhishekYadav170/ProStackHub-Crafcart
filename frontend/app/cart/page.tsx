"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
} from "lucide-react";
import toast from "react-hot-toast";

type CartProduct = {
  _id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  image?: string;
  quantity: number;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartProduct[]>([]);

  useEffect(() => {
    const savedCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    setCart(savedCart);
  }, []);

  const saveCart = (updatedCart: CartProduct[]) => {
    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const increaseQuantity = (id: string) => {
    const updatedCart = cart.map((item) =>
      item._id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );

    saveCart(updatedCart);
  };

  const decreaseQuantity = (id: string) => {
    const updatedCart = cart
      .map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    saveCart(updatedCart);
  };

  const removeItem = (id: string) => {
    const updatedCart = cart.filter(
      (item) => item._id !== id
    );

    saveCart(updatedCart);

    toast.success("Product removed from cart");
  };

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 0 : 0;

  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <main className="section">
        <div
          className="container"
          style={{
            textAlign: "center",
            paddingTop: "100px",
            paddingBottom: "100px",
          }}
        >
          <ShoppingBag
            size={70}
            strokeWidth={1.3}
            style={{
              margin: "0 auto 25px",
            }}
          />

          <h1
            style={{
              fontSize: "42px",
              marginBottom: "12px",
            }}
          >
            Your Cart is Empty
          </h1>

          <p
            style={{
              color: "#737373",
              marginBottom: "30px",
            }}
          >
            Looks like you haven't added
            anything to your cart yet.
          </p>

          <Link
            href="/products"
            className="primary-button"
          >
            Start Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="container">

        <div className="section-heading">
          <p className="section-label">
            CARTCRAFT
          </p>

          <h1 className="section-title">
            Your Cart
          </h1>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(0, 1fr) 350px",
            gap: "35px",
            alignItems: "start",
          }}
        >

          {/* CART ITEMS */}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >

            {cart.map((item) => (
              <div
                key={item._id}
                style={{
                  display: "flex",
                  gap: "20px",
                  padding: "18px",
                  border: "1px solid #e5e5e5",
                  borderRadius: "14px",
                  background: "#fff",
                }}
              >

                {/* IMAGE */}

                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "130px",
                      height: "130px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      background: "#f5f5f5",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "130px",
                      height: "130px",
                      borderRadius: "10px",
                      background: "#f5f5f5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "45px",
                      flexShrink: 0,
                    }}
                  >
                    🛍️
                  </div>
                )}

                {/* INFORMATION */}

                <div
                  style={{
                    flex: 1,
                  }}
                >

                  <p className="product-category">
                    {item.category}
                  </p>

                  <h3
                    style={{
                      margin: "5px 0",
                      fontSize: "19px",
                    }}
                  >
                    {item.name}
                  </h3>

                  <p
                    style={{
                      margin: "8px 0 18px",
                      fontWeight: "700",
                    }}
                  >
                    ₹
                    {item.price.toLocaleString(
                      "en-IN"
                    )}
                  </p>

                  {/* QUANTITY */}

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >

                    <button
                      onClick={() =>
                        decreaseQuantity(item._id)
                      }
                      className="nav-icon"
                      style={{
                        border: "1px solid #ddd",
                      }}
                    >
                      <Minus size={15} />
                    </button>

                    <span
                      style={{
                        minWidth: "25px",
                        textAlign: "center",
                        fontWeight: "700",
                      }}
                    >
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(item._id)
                      }
                      className="nav-icon"
                      style={{
                        border: "1px solid #ddd",
                      }}
                    >
                      <Plus size={15} />
                    </button>

                  </div>

                </div>

                {/* REMOVE */}

                <button
                  onClick={() =>
                    removeItem(item._id)
                  }
                  className="nav-icon"
                  style={{
                    alignSelf: "flex-start",
                    color: "#dc2626",
                  }}
                  title="Remove product"
                >
                  <Trash2 size={19} />
                </button>

              </div>
            ))}

          </div>

          {/* ORDER SUMMARY */}

          <div
            style={{
              border: "1px solid #e5e5e5",
              borderRadius: "14px",
              padding: "25px",
              position: "sticky",
              top: "95px",
              background: "#fff",
            }}
          >

            <h2
              style={{
                margin: "0 0 25px",
                fontSize: "23px",
              }}
            >
              Order Summary
            </h2>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "15px",
                color: "#555",
              }}
            >
              <span>Subtotal</span>

              <strong>
                ₹
                {subtotal.toLocaleString(
                  "en-IN"
                )}
              </strong>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
                color: "#555",
              }}
            >
              <span>Shipping</span>

              <strong>
                Free
              </strong>
            </div>

            <div
              style={{
                borderTop:
                  "1px solid #e5e5e5",
                paddingTop: "18px",
                display: "flex",
                justifyContent: "space-between",
                fontSize: "20px",
                fontWeight: "800",
              }}
            >
              <span>Total</span>

              <span>
                ₹
                {total.toLocaleString(
                  "en-IN"
                )}
              </span>
            </div>

            <Link
              href="/checkout"
              className="primary-button"
              style={{
                width: "100%",
                marginTop: "25px",
              }}
            >
              Proceed to Checkout
            </Link>

            <Link
              href="/products"
              className="secondary-button"
              style={{
                width: "100%",
                marginTop: "10px",
              }}
            >
              Continue Shopping
            </Link>

          </div>

        </div>

      </div>
    </main>
  );
}