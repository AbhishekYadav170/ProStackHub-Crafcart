"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import api from "@/lib/api";

type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  image?: string;
  stock?: number;
};

export default function ProductDetailsPage() {
  const params = useParams();

  const [product, setProduct] = useState<Product | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const data = await api(`/products/${params.id}`);

        setProduct(data.product);
      } catch (error) {
        console.error(error);

        setError("Product not found.");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  // const addToCart = () => {
  //   if (!product) return;

  //   const existingCart = JSON.parse(
  //     localStorage.getItem("cart") || "[]"
  //   );

  //   const existingProduct = existingCart.find(
  //     (item: Product & { quantity: number }) =>
  //       item._id === product._id
  //   );

  //   let updatedCart;

  //   if (existingProduct) {
  //     updatedCart = existingCart.map(
  //       (item: Product & { quantity: number }) =>
  //         item._id === product._id
  //           ? {
  //               ...item,
  //               quantity: item.quantity + 1,
  //             }
  //           : item
  //     );
  //   } else {
  //     updatedCart = [
  //       ...existingCart,
  //       {
  //         ...product,
  //         quantity: 1,
  //       },
  //     ];
  //   }

  //   localStorage.setItem(
  //     "cart",
  //     JSON.stringify(updatedCart)
  //   );

  //   toast.success("Product added to cart!");
  // };

  const addToCart = async () => {
    if (!product) return;

    try {
      await api("/cart", {
        method: "POST",
        body: JSON.stringify({
          productId: product._id,
          quantity: 1,
        }),
      });

      toast.success("Product added to cart!");
    } catch (error) {
      console.error("Add to cart error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to add product to cart",
      );
    }
  };

  if (loading) {
    return (
      <main className="section">
        <div className="container">
          <p>Loading product...</p>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="section">
        <div className="container">
          <p>{error || "Product not found."}</p>

          <br />

          <Link href="/products" className="primary-button">
            Back to Products
          </Link>
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
          <ArrowLeft size={17} style={{ marginRight: "8px" }} />
          Back to Products
        </Link>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            gap: "50px",
            alignItems: "center",
          }}
        >
          {/* PRODUCT IMAGE */}

          <div>
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "500px",
                  objectFit: "cover",
                  borderRadius: "16px",
                  background: "#f5f5f5",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "500px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "16px",
                  background: "#f5f5f5",
                  fontSize: "100px",
                }}
              >
                🛍️
              </div>
            )}
          </div>

          {/* PRODUCT INFORMATION */}

          <div>
            <p className="product-category">{product.category}</p>

            <h1
              style={{
                fontSize: "48px",
                lineHeight: "1.05",
                letterSpacing: "-2px",
                margin: "10px 0 20px",
              }}
            >
              {product.name}
            </h1>

            <p
              style={{
                fontSize: "28px",
                fontWeight: "800",
                marginBottom: "20px",
              }}
            >
              ₹{product.price.toLocaleString("en-IN")}
            </p>

            <p
              style={{
                color: "#737373",
                lineHeight: "1.8",
                fontSize: "16px",
                marginBottom: "30px",
              }}
            >
              {product.description || "Premium quality product from CartCraft."}
            </p>

            {product.stock !== undefined && (
              <p
                style={{
                  marginBottom: "25px",
                  fontWeight: "600",
                }}
              >
                {product.stock > 0
                  ? `${product.stock} items available`
                  : "Out of stock"}
              </p>
            )}

            <button
              onClick={addToCart}
              className="primary-button"
              style={{
                border: "none",
                width: "100%",
                gap: "10px",
              }}
            >
              <ShoppingCart size={19} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
