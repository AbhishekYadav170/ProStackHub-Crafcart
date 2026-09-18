"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Package, ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";
import api from "@/lib/api";

type OrderItem = {
  product: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  subtotal: number;
};

type Order = {
  _id: string;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: "cod" | "online";
  paymentStatus: "pending" | "paid" | "failed";
  orderStatus:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  createdAt: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await api("/orders/my-orders");

      if (!data.success) {
        throw new Error(
          data.message || "Failed to fetch orders"
        );
      }

      setOrders(data.orders || []);
    } catch (error) {
      console.error("Fetch orders error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to load orders"
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "delivered":
        return "status-success";

      case "cancelled":
        return "status-danger";

      case "shipped":
        return "status-info";

      case "confirmed":
      case "processing":
        return "status-warning";

      default:
        return "status-pending";
    }
  };

  if (loading) {
    return (
      <main className="section">
        <div className="container">
          <p>Loading your orders...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="container">

        <Link
          href="/products"
          className="secondary-button"
          style={{
            marginBottom: "35px",
          }}
        >
          <ArrowLeft
            size={17}
            style={{ marginRight: "8px" }}
          />
          Continue Shopping
        </Link>

        <div className="section-heading">
          <p className="section-label">
            CARTCRAFT
          </p>

          <h1 className="section-title">
            My Orders
          </h1>

          <p>
            Track and manage your recent orders.
          </p>
        </div>

        {orders.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "70px 20px",
              border: "1px solid #e5e5e5",
              borderRadius: "14px",
            }}
          >
            <ShoppingBag
              size={48}
              strokeWidth={1.5}
              style={{
                marginBottom: "15px",
              }}
            />

            <h2>
              No Orders Yet
            </h2>

            <p
              style={{
                color: "#737373",
                margin: "10px 0 25px",
              }}
            >
              You haven't placed any orders yet.
            </p>

            <Link
              href="/products"
              className="primary-button"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "22px",
            }}
          >
            {orders.map((order) => (
              <div
                key={order._id}
                style={{
                  border: "1px solid #e5e5e5",
                  borderRadius: "14px",
                  padding: "24px",
                  background: "#fff",
                }}
              >

                {/* ORDER HEADER */}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "20px",
                    flexWrap: "wrap",
                    borderBottom:
                      "1px solid #eee",
                    paddingBottom: "18px",
                    marginBottom: "20px",
                  }}
                >
                  <div>
                    <p
                      style={{
                        margin: 0,
                        color: "#737373",
                        fontSize: "13px",
                      }}
                    >
                      Order Number
                    </p>

                    <strong>
                      {order.orderNumber}
                    </strong>

                    <p
                      style={{
                        margin: "5px 0 0",
                        color: "#737373",
                        fontSize: "13px",
                      }}
                    >
                      {formatDate(order.createdAt)}
                    </p>
                  </div>

                  <span
                    className={getStatusClass(
                      order.orderStatus
                    )}
                  >
                    {order.orderStatus
                      .charAt(0)
                      .toUpperCase() +
                      order.orderStatus.slice(1)}
                  </span>
                </div>

                {/* PRODUCTS */}

                <div
                  style={{
                    display: "grid",
                    gap: "15px",
                  }}
                >
                  {order.items.map(
                    (item, index) => (
                      <div
                        key={`${item.product}-${index}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "15px",
                        }}
                      >
                        <div
                          style={{
                            width: "65px",
                            height: "65px",
                            borderRadius: "8px",
                            overflow: "hidden",
                            background: "#f5f5f5",
                            flexShrink: 0,
                          }}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>

                        <div
                          style={{
                            flex: 1,
                          }}
                        >
                          <strong>
                            {item.name}
                          </strong>

                          <p
                            style={{
                              margin: "5px 0 0",
                              color: "#737373",
                              fontSize: "14px",
                            }}
                          >
                            ₹
                            {item.price.toLocaleString(
                              "en-IN"
                            )}{" "}
                            × {item.quantity}
                          </p>
                        </div>

                        <strong>
                          ₹
                          {item.subtotal.toLocaleString(
                            "en-IN"
                          )}
                        </strong>
                      </div>
                    )
                  )}
                </div>

                {/* ORDER FOOTER */}

                <div
                  style={{
                    borderTop:
                      "1px solid #eee",
                    marginTop: "20px",
                    paddingTop: "18px",
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                    gap: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <p
                      style={{
                        margin: 0,
                        color: "#737373",
                        fontSize: "13px",
                      }}
                    >
                      Payment
                    </p>

                    <strong>
                      {order.paymentMethod ===
                      "cod"
                        ? "Cash on Delivery"
                        : "Online Payment"}
                    </strong>

                    <span
                      style={{
                        marginLeft: "10px",
                        fontSize: "13px",
                      }}
                    >
                      ({order.paymentStatus})
                    </span>
                  </div>

                  <div
                    style={{
                      textAlign: "right",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        color: "#737373",
                        fontSize: "13px",
                      }}
                    >
                      Total Amount
                    </p>

                    <strong
                      style={{
                        fontSize: "22px",
                      }}
                    >
                      ₹
                      {order.totalAmount.toLocaleString(
                        "en-IN"
                      )}
                    </strong>
                  </div>
                </div>

                {/* VIEW DETAILS */}

                <div
                  style={{
                    marginTop: "20px",
                  }}
                >
                  <Link
                    href={`/orders/${order._id}`}
                    className="secondary-button"
                  >
                    <Package
                      size={17}
                      style={{
                        marginRight: "8px",
                      }}
                    />
                    View Order Details
                  </Link>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}