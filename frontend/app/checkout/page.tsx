"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CreditCard } from "lucide-react";
import toast from "react-hot-toast";
import api from "@/lib/api";

type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    const savedCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    setCart(savedCart);
    setLoading(false);
  }, []);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const placeOrder = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      setPlacingOrder(true);

      /*
       * IMPORTANT:
       * Backend already gets the user's cart from MongoDB.
       * So we only send shipping information here.
       */

      const orderData = {
        fullName: form.name.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        pincode: form.pincode.trim(),
        paymentMethod: "cod",
      };

      const data = await api("/orders", {
        method: "POST",
        body: JSON.stringify(orderData),
      });

      if (!data.success) {
        throw new Error(
          data.message || "Failed to place order"
        );
      }

      toast.success(
        data.message || "Order placed successfully!"
      );

      // Clear frontend cart after successful order
      localStorage.removeItem("cart");
      setCart([]);

      // Go to My Orders page
      window.location.href = "/orders";
    } catch (error) {
      console.error("Place order error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to place order"
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return (
      <main className="section">
        <div className="container">
          <p>Loading checkout...</p>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="section">
        <div
          className="container"
          style={{
            textAlign: "center",
            paddingTop: "80px",
            paddingBottom: "80px",
          }}
        >
          <h1 className="section-title">
            Your Cart is Empty
          </h1>

          <p
            style={{
              color: "#737373",
              margin: "15px 0 25px",
            }}
          >
            Add products to your cart before checkout.
          </p>

          <Link
            href="/products"
            className="primary-button"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="container">

        <Link
          href="/cart"
          className="secondary-button"
          style={{
            marginBottom: "35px",
          }}
        >
          <ArrowLeft
            size={17}
            style={{ marginRight: "8px" }}
          />

          Back to Cart
        </Link>

        <div className="section-heading">
          <p className="section-label">
            CARTCRAFT CHECKOUT
          </p>

          <h1 className="section-title">
            Checkout
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

          {/* =========================
              CUSTOMER INFORMATION
          ========================== */}

          <form
            onSubmit={placeOrder}
            style={{
              border: "1px solid #e5e5e5",
              borderRadius: "14px",
              padding: "28px",
              background: "#fff",
            }}
          >
            <h2
              style={{
                margin: "0 0 25px",
                fontSize: "24px",
              }}
            >
              Delivery Information
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "18px",
              }}
            >
              <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                style={inputStyle}
              />

              <input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
                style={inputStyle}
              />

              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                style={inputStyle}
              />

              <input
                name="pincode"
                inputMode="numeric"
                placeholder="Pincode"
                value={form.pincode}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            <input
              name="address"
              placeholder="Full Address"
              value={form.address}
              onChange={handleChange}
              required
              style={{
                ...inputStyle,
                width: "100%",
                marginTop: "18px",
              }}
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "18px",
                marginTop: "18px",
              }}
            >
              <input
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                required
                style={inputStyle}
              />

              <input
                name="state"
                placeholder="State"
                value={form.state}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            {/* =========================
                PAYMENT METHOD
            ========================== */}

            <div
              style={{
                marginTop: "35px",
              }}
            >
              <h2
                style={{
                  margin: "0 0 18px",
                  fontSize: "22px",
                }}
              >
                Payment Method
              </h2>

              <div
                style={{
                  border: "1px solid #111",
                  borderRadius: "10px",
                  padding: "18px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <CreditCard size={20} />

                <div>
                  <strong>
                    Cash on Delivery
                  </strong>

                  <p
                    style={{
                      margin: "4px 0 0",
                      color: "#737373",
                      fontSize: "13px",
                    }}
                  >
                    Pay when your order arrives.
                  </p>
                </div>
              </div>
            </div>

            {/* =========================
                PLACE ORDER
            ========================== */}

            <button
              type="submit"
              disabled={placingOrder}
              className="primary-button"
              style={{
                width: "100%",
                border: "none",
                marginTop: "30px",
                opacity: placingOrder ? 0.6 : 1,
                cursor: placingOrder
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              {placingOrder
                ? "Placing Order..."
                : "Place Order"}
            </button>
          </form>

          {/* =========================
              ORDER SUMMARY
          ========================== */}

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
                margin: "0 0 22px",
                fontSize: "23px",
              }}
            >
              Order Summary
            </h2>

            {cart.map((item) => (
              <div
                key={item._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "15px",
                  marginBottom: "15px",
                }}
              >
                <span
                  style={{
                    color: "#555",
                    fontSize: "14px",
                  }}
                >
                  {item.name} × {item.quantity}
                </span>

                <strong>
                  ₹
                  {(
                    item.price * item.quantity
                  ).toLocaleString("en-IN")}
                </strong>
              </div>
            ))}

            <div
              style={{
                borderTop: "1px solid #e5e5e5",
                paddingTop: "18px",
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-between",
                fontSize: "20px",
                fontWeight: "800",
              }}
            >
              <span>Total</span>

              <span>
                ₹
                {subtotal.toLocaleString("en-IN")}
              </span>
            </div>

            <p
              style={{
                marginTop: "15px",
                fontSize: "12px",
                color: "#737373",
              }}
            >
              Final total will be calculated securely
              by the server when your order is placed.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 14px",
  border: "1px solid #d4d4d4",
  borderRadius: "8px",
  outline: "none",
  background: "#fff",
};