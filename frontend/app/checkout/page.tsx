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

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    setCart(savedCart);
  }, []);

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        items: cart.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price,
        })),

        shippingAddress: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
        },

        paymentMethod: "cod",

        totalAmount: subtotal,
      };

      const data = await api("/orders", {
        method: "POST",
        body: JSON.stringify(orderData),
      });

      toast.success(
        data.message || "Order placed successfully!"
      );

      localStorage.removeItem("cart");

      window.location.href = "/orders";

    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to place order"
      );
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <main className="section">
        <div className="container">

          <h1 className="section-title">
            Your cart is empty
          </h1>

          <p
            style={{
              color: "#737373",
              margin: "15px 0 25px",
            }}
          >
            Add some products before checkout.
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

          {/* CUSTOMER FORM */}

          <form
            onSubmit={placeOrder}
            style={{
              border: "1px solid #e5e5e5",
              borderRadius: "14px",
              padding: "28px",
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
                gridTemplateColumns:
                  "1fr 1fr",
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
                gridTemplateColumns:
                  "1fr 1fr",
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

            {/* PAYMENT */}

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

            <button
              type="submit"
              disabled={loading}
              className="primary-button"
              style={{
                width: "100%",
                border: "none",
                marginTop: "30px",
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading
                ? "Placing Order..."
                : "Place Order"}
            </button>

          </form>

          {/* ORDER SUMMARY */}

          <div
            style={{
              border: "1px solid #e5e5e5",
              borderRadius: "14px",
              padding: "25px",
              position: "sticky",
              top: "95px",
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
                  justifyContent:
                    "space-between",
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
                    item.price *
                    item.quantity
                  ).toLocaleString("en-IN")}
                </strong>

              </div>
            ))}

            <div
              style={{
                borderTop:
                  "1px solid #e5e5e5",
                paddingTop: "18px",
                marginTop: "20px",
                display: "flex",
                justifyContent:
                  "space-between",
                fontSize: "20px",
                fontWeight: "800",
              }}
            >
              <span>Total</span>

              <span>
                ₹
                {subtotal.toLocaleString(
                  "en-IN"
                )}
              </span>
            </div>

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