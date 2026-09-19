// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { ArrowLeft, Package, MapPin } from "lucide-react";
// import toast from "react-hot-toast";
// import { useParams } from "next/navigation";
// import api from "@/lib/api";

// type OrderItem = {
//   product: string;
//   name: string;
//   image: string;
//   price: number;
//   quantity: number;
//   subtotal: number;
// };

// type ShippingAddress = {
//   fullName: string;
//   phone: string;
//   address: string;
//   city: string;
//   state: string;
//   pincode: string;
// };

// type Order = {
//   _id: string;
//   orderNumber: string;
//   items: OrderItem[];
//   shippingAddress: ShippingAddress;
//   totalAmount: number;
//   paymentMethod: "cod" | "online";
//   paymentStatus: "pending" | "paid" | "failed";
//   orderStatus:
//     | "pending"
//     | "confirmed"
//     | "processing"
//     | "shipped"
//     | "delivered"
//     | "cancelled";
//   createdAt: string;
// };

// export default function OrderDetailsPage() {
//   const params = useParams();

//   const [order, setOrder] = useState<Order | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const data = await api(`/orders/${params.id}`);

//         if (!data.success) {
//           throw new Error(
//             data.message || "Failed to fetch order"
//           );
//         }

//         setOrder(data.order);
//       } catch (error) {
//         console.error("Fetch order error:", error);

//         toast.error(
//           error instanceof Error
//             ? error.message
//             : "Failed to load order"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (params.id) {
//       fetchOrder();
//     }
//   }, [params.id]);

//   const formatDate = (date: string) => {
//     return new Date(date).toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "long",
//       year: "numeric",
//     });
//   };

//   const getStatusClass = (status: string) => {
//     switch (status) {
//       case "delivered":
//         return "status-success";

//       case "cancelled":
//         return "status-danger";

//       case "shipped":
//         return "status-info";

//       case "confirmed":
//       case "processing":
//         return "status-warning";

//       default:
//         return "status-pending";
//     }
//   };

//   if (loading) {
//     return (
//       <main className="section">
//         <div className="container">
//           <p>Loading order details...</p>
//         </div>
//       </main>
//     );
//   }

//   if (!order) {
//     return (
//       <main className="section">
//         <div
//           className="container"
//           style={{
//             textAlign: "center",
//             paddingTop: "80px",
//             paddingBottom: "80px",
//           }}
//         >
//           <Package
//             size={55}
//             strokeWidth={1.4}
//             style={{
//               marginBottom: "20px",
//             }}
//           />

//           <h1>Order Not Found</h1>

//           <p
//             style={{
//               color: "#737373",
//               margin: "12px 0 25px",
//             }}
//           >
//             We couldn't find this order.
//           </p>

//           <Link
//             href="/orders"
//             className="primary-button"
//           >
//             Back to Orders
//           </Link>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="section">
//       <div className="container">

//         {/* BACK */}

//         <Link
//           href="/orders"
//           className="secondary-button"
//           style={{
//             marginBottom: "35px",
//           }}
//         >
//           <ArrowLeft
//             size={17}
//             style={{
//               marginRight: "8px",
//             }}
//           />

//           Back to Orders
//         </Link>

//         {/* HEADER */}

//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "flex-start",
//             gap: "20px",
//             flexWrap: "wrap",
//             marginBottom: "35px",
//           }}
//         >
//           <div>
//             <p className="section-label">
//               CARTCRAFT
//             </p>

//             <h1
//               className="section-title"
//               style={{
//                 marginBottom: "10px",
//               }}
//             >
//               Order Details
//             </h1>

//             <p
//               style={{
//                 color: "#737373",
//               }}
//             >
//               Order #{order.orderNumber}
//             </p>

//             <p
//               style={{
//                 color: "#737373",
//                 marginTop: "5px",
//                 fontSize: "14px",
//               }}
//             >
//               Placed on {formatDate(order.createdAt)}
//             </p>
//           </div>

//           <span
//             className={getStatusClass(
//               order.orderStatus
//             )}
//           >
//             {order.orderStatus
//               .charAt(0)
//               .toUpperCase() +
//               order.orderStatus.slice(1)}
//           </span>
//         </div>

//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns:
//               "minmax(0, 1fr) 350px",
//             gap: "30px",
//             alignItems: "start",
//           }}
//         >

//           {/* LEFT */}

//           <div
//             style={{
//               display: "grid",
//               gap: "25px",
//             }}
//           >

//             {/* PRODUCTS */}

//             <div
//               style={{
//                 border: "1px solid #e5e5e5",
//                 borderRadius: "14px",
//                 padding: "25px",
//                 background: "#fff",
//               }}
//             >
//               <h2
//                 style={{
//                   margin: "0 0 22px",
//                   fontSize: "23px",
//                 }}
//               >
//                 Ordered Products
//               </h2>

//               <div
//                 style={{
//                   display: "grid",
//                   gap: "18px",
//                 }}
//               >
//                 {order.items.map(
//                   (item, index) => (
//                     <div
//                       key={`${item.product}-${index}`}
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "18px",
//                         paddingBottom: "18px",
//                         borderBottom:
//                           index !==
//                           order.items.length - 1
//                             ? "1px solid #eee"
//                             : "none",
//                       }}
//                     >
//                       {/* IMAGE */}

//                       <div
//                         style={{
//                           width: "85px",
//                           height: "85px",
//                           borderRadius: "10px",
//                           overflow: "hidden",
//                           background: "#f5f5f5",
//                           flexShrink: 0,
//                         }}
//                       >
//                         {item.image ? (
//                           <img
//                             src={item.image}
//                             alt={item.name}
//                             style={{
//                               width: "100%",
//                               height: "100%",
//                               objectFit: "cover",
//                             }}
//                           />
//                         ) : (
//                           <div
//                             style={{
//                               width: "100%",
//                               height: "100%",
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent:
//                                 "center",
//                               fontSize: "30px",
//                             }}
//                           >
//                             🛍️
//                           </div>
//                         )}
//                       </div>

//                       {/* INFO */}

//                       <div
//                         style={{
//                           flex: 1,
//                         }}
//                       >
//                         <strong
//                           style={{
//                             fontSize: "16px",
//                           }}
//                         >
//                           {item.name}
//                         </strong>

//                         <p
//                           style={{
//                             margin: "6px 0 0",
//                             color: "#737373",
//                             fontSize: "14px",
//                           }}
//                         >
//                           ₹
//                           {item.price.toLocaleString(
//                             "en-IN"
//                           )}{" "}
//                           × {item.quantity}
//                         </p>
//                       </div>

//                       {/* SUBTOTAL */}

//                       <strong
//                         style={{
//                           fontSize: "16px",
//                         }}
//                       >
//                         ₹
//                         {item.subtotal.toLocaleString(
//                           "en-IN"
//                         )}
//                       </strong>
//                     </div>
//                   )
//                 )}
//               </div>

//               {/* TOTAL */}

//               <div
//                 style={{
//                   borderTop:
//                     "1px solid #e5e5e5",
//                   marginTop: "20px",
//                   paddingTop: "20px",
//                   display: "flex",
//                   justifyContent:
//                     "space-between",
//                   fontSize: "21px",
//                   fontWeight: "800",
//                 }}
//               >
//                 <span>Total</span>

//                 <span>
//                   ₹
//                   {order.totalAmount.toLocaleString(
//                     "en-IN"
//                   )}
//                 </span>
//               </div>
//             </div>

//             {/* SHIPPING ADDRESS */}

//             <div
//               style={{
//                 border: "1px solid #e5e5e5",
//                 borderRadius: "14px",
//                 padding: "25px",
//                 background: "#fff",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "10px",
//                   marginBottom: "20px",
//                 }}
//               >
//                 <MapPin size={21} />

//                 <h2
//                   style={{
//                     margin: 0,
//                     fontSize: "23px",
//                   }}
//                 >
//                   Shipping Address
//                 </h2>
//               </div>

//               <strong>
//                 {order.shippingAddress.fullName}
//               </strong>

//               <p
//                 style={{
//                   color: "#555",
//                   lineHeight: "1.7",
//                   margin: "8px 0",
//                 }}
//               >
//                 {order.shippingAddress.address}
//                 <br />
//                 {order.shippingAddress.city},{" "}
//                 {order.shippingAddress.state}
//                 <br />
//                 Pincode:{" "}
//                 {order.shippingAddress.pincode}
//               </p>

//               <p
//                 style={{
//                   margin: 0,
//                   color: "#555",
//                 }}
//               >
//                 Phone:{" "}
//                 {order.shippingAddress.phone}
//               </p>
//             </div>
//           </div>

//           {/* RIGHT */}

//           <div
//             style={{
//               display: "grid",
//               gap: "20px",
//               position: "sticky",
//               top: "95px",
//             }}
//           >

//             {/* PAYMENT */}

//             <div
//               style={{
//                 border: "1px solid #e5e5e5",
//                 borderRadius: "14px",
//                 padding: "25px",
//                 background: "#fff",
//               }}
//             >
//               <h2
//                 style={{
//                   margin: "0 0 22px",
//                   fontSize: "22px",
//                 }}
//               >
//                 Payment
//               </h2>

//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent:
//                     "space-between",
//                   marginBottom: "15px",
//                 }}
//               >
//                 <span
//                   style={{
//                     color: "#737373",
//                   }}
//                 >
//                   Method
//                 </span>

//                 <strong>
//                   {order.paymentMethod ===
//                   "cod"
//                     ? "Cash on Delivery"
//                     : "Online Payment"}
//                 </strong>
//               </div>

//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent:
//                     "space-between",
//                 }}
//               >
//                 <span
//                   style={{
//                     color: "#737373",
//                   }}
//                 >
//                   Status
//                 </span>

//                 <strong>
//                   {order.paymentStatus
//                     .charAt(0)
//                     .toUpperCase() +
//                     order.paymentStatus.slice(1)}
//                 </strong>
//               </div>
//             </div>

//             {/* ORDER STATUS */}

//             <div
//               style={{
//                 border: "1px solid #e5e5e5",
//                 borderRadius: "14px",
//                 padding: "25px",
//                 background: "#fff",
//               }}
//             >
//               <h2
//                 style={{
//                   margin: "0 0 20px",
//                   fontSize: "22px",
//                 }}
//               >
//                 Order Status
//               </h2>

//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "12px",
//                 }}
//               >
//                 <span
//                   className={getStatusClass(
//                     order.orderStatus
//                   )}
//                 >
//                   {order.orderStatus
//                     .charAt(0)
//                     .toUpperCase() +
//                     order.orderStatus.slice(1)}
//                 </span>
//               </div>

//               <p
//                 style={{
//                   color: "#737373",
//                   fontSize: "14px",
//                   lineHeight: "1.6",
//                   marginTop: "15px",
//                 }}
//               >
//                 You can track the progress of
//                 your order from this page.
//               </p>
//             </div>

//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }










"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Package, MapPin, CreditCard } from "lucide-react";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import api from "@/lib/api";

type OrderItem = {
  product: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  subtotal: number;
};

type ShippingAddress = {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};

type Order = {
  _id: string;
  orderNumber: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
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

export default function OrderDetailsPage() {
  const params = useParams();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!params.id) return;

        const data = await api(`/orders/${params.id}`);

        if (!data.success) {
          throw new Error(
            data.message || "Failed to fetch order"
          );
        }

        setOrder(data.order);
      } catch (error) {
        console.error("Fetch order error:", error);

        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to load order"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [params.id]);

  // ========================================
  // FORMAT DATE
  // ========================================

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // ========================================
  // FORMAT STATUS
  // ========================================

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

  const formatStatus = (status: string) => {
    return status
      .charAt(0)
      .toUpperCase() + status.slice(1);
  };

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
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
          <p>Loading order details...</p>
        </div>
      </main>
    );
  }

  // ========================================
  // ORDER NOT FOUND
  // ========================================

  if (!order) {
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
          <Package
            size={60}
            strokeWidth={1.4}
            style={{
              marginBottom: "20px",
            }}
          />

          <h1
            style={{
              fontSize: "36px",
              marginBottom: "12px",
            }}
          >
            Order Not Found
          </h1>

          <p
            style={{
              color: "#737373",
              marginBottom: "25px",
            }}
          >
            We couldn't find the order you're looking for.
          </p>

          <Link
            href="/orders"
            className="primary-button"
          >
            Back to My Orders
          </Link>
        </div>
      </main>
    );
  }

  // ========================================
  // ORDER DETAILS
  // ========================================

  return (
    <main className="section">
      <div className="container">

        {/* BACK BUTTON */}

        <Link
          href="/orders"
          className="secondary-button"
          style={{
            marginBottom: "35px",
          }}
        >
          <ArrowLeft
            size={17}
            style={{
              marginRight: "8px",
            }}
          />

          Back to My Orders
        </Link>

        {/* PAGE HEADER */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
            marginBottom: "30px",
          }}
        >
          <div>
            <p className="section-label">
              CARTCRAFT
            </p>

            <h1
              className="section-title"
              style={{
                marginBottom: "8px",
              }}
            >
              Order Details
            </h1>

            <p
              style={{
                color: "#737373",
              }}
            >
              Order #{order.orderNumber}
            </p>
          </div>

          <span
            className={getStatusClass(
              order.orderStatus
            )}
          >
            {formatStatus(order.orderStatus)}
          </span>
        </div>

        {/* ORDER INFO */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(3, minmax(0, 1fr))",
            gap: "18px",
            marginBottom: "30px",
          }}
        >

          {/* ORDER DATE */}

          <div
            style={{
              border: "1px solid #e5e5e5",
              borderRadius: "14px",
              padding: "20px",
              background: "#fff",
            }}
          >
            <p
              style={{
                margin: "0 0 7px",
                color: "#737373",
                fontSize: "13px",
              }}
            >
              Order Date
            </p>

            <strong>
              {formatDate(order.createdAt)}
            </strong>
          </div>

          {/* PAYMENT */}

          <div
            style={{
              border: "1px solid #e5e5e5",
              borderRadius: "14px",
              padding: "20px",
              background: "#fff",
            }}
          >
            <p
              style={{
                margin: "0 0 7px",
                color: "#737373",
                fontSize: "13px",
              }}
            >
              Payment
            </p>

            <strong>
              {order.paymentMethod === "cod"
                ? "Cash on Delivery"
                : "Online Payment"}
            </strong>

            <p
              style={{
                margin: "5px 0 0",
                color: "#737373",
                fontSize: "13px",
              }}
            >
              Status: {order.paymentStatus}
            </p>
          </div>

          {/* TOTAL */}

          <div
            style={{
              border: "1px solid #e5e5e5",
              borderRadius: "14px",
              padding: "20px",
              background: "#fff",
            }}
          >
            <p
              style={{
                margin: "0 0 7px",
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

        {/* MAIN CONTENT */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(0, 1fr) 350px",
            gap: "30px",
            alignItems: "start",
          }}
        >

          {/* =========================
              ORDERED PRODUCTS
          ========================== */}

          <div
            style={{
              border: "1px solid #e5e5e5",
              borderRadius: "14px",
              padding: "25px",
              background: "#fff",
            }}
          >
            <h2
              style={{
                margin: "0 0 25px",
                fontSize: "23px",
              }}
            >
              Ordered Products
            </h2>

            <div
              style={{
                display: "grid",
                gap: "18px",
              }}
            >
              {order.items.map(
                (item, index) => (
                  <div
                    key={`${item.product}-${index}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      paddingBottom: "18px",
                      borderBottom:
                        index !==
                        order.items.length - 1
                          ? "1px solid #eee"
                          : "none",
                    }}
                  >

                    {/* IMAGE */}

                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "10px",
                        overflow: "hidden",
                        background: "#f5f5f5",
                        flexShrink: 0,
                      }}
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "30px",
                          }}
                        >
                          🛍️
                        </div>
                      )}
                    </div>

                    {/* PRODUCT INFO */}

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
                          margin: "6px 0 0",
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

                    {/* SUBTOTAL */}

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

            {/* TOTAL */}

            <div
              style={{
                borderTop: "1px solid #e5e5e5",
                marginTop: "20px",
                paddingTop: "20px",
                display: "flex",
                justifyContent: "space-between",
                fontSize: "21px",
                fontWeight: "800",
              }}
            >
              <span>Total</span>

              <span>
                ₹
                {order.totalAmount.toLocaleString(
                  "en-IN"
                )}
              </span>
            </div>
          </div>

          {/* =========================
              SHIPPING ADDRESS
          ========================== */}

          <div
            style={{
              display: "grid",
              gap: "20px",
            }}
          >

            <div
              style={{
                border: "1px solid #e5e5e5",
                borderRadius: "14px",
                padding: "25px",
                background: "#fff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "18px",
                }}
              >
                <MapPin size={20} />

                <h2
                  style={{
                    margin: 0,
                    fontSize: "21px",
                  }}
                >
                  Delivery Address
                </h2>
              </div>

              <p
                style={{
                  margin: "0 0 7px",
                  fontWeight: "700",
                }}
              >
                {order.shippingAddress.fullName}
              </p>

              <p
                style={{
                  margin: "0 0 7px",
                  color: "#555",
                  lineHeight: "1.6",
                }}
              >
                {order.shippingAddress.address}
                <br />

                {order.shippingAddress.city},{" "}
                {order.shippingAddress.state}
                <br />

                {order.shippingAddress.pincode}
              </p>

              <p
                style={{
                  margin: "12px 0 0",
                  color: "#555",
                }}
              >
                Phone:{" "}
                {order.shippingAddress.phone}
              </p>
            </div>

            {/* PAYMENT CARD */}

            <div
              style={{
                border: "1px solid #e5e5e5",
                borderRadius: "14px",
                padding: "25px",
                background: "#fff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "18px",
                }}
              >
                <CreditCard size={20} />

                <h2
                  style={{
                    margin: 0,
                    fontSize: "21px",
                  }}
                >
                  Payment Information
                </h2>
              </div>

              <p
                style={{
                  margin: "0 0 8px",
                }}
              >
                <strong>Method:</strong>{" "}
                {order.paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : "Online Payment"}
              </p>

              <p
                style={{
                  margin: 0,
                }}
              >
                <strong>Status:</strong>{" "}
                {formatStatus(
                  order.paymentStatus
                )}
              </p>
            </div>
          </div>
        </div>

        {/* BACK BUTTON */}

        <div
          style={{
            marginTop: "30px",
          }}
        >
          <Link
            href="/orders"
            className="secondary-button"
          >
            <ArrowLeft
              size={17}
              style={{
                marginRight: "8px",
              }}
            />

            Back to My Orders
          </Link>
        </div>
      </div>
    </main>
  );
}