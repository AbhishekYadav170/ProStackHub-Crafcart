// "use client";

// import { useEffect, useState } from "react";
// import ProductCard from "@/components/ProductCard";
// import api from "@/lib/api";

// type Product = {
//   _id: string;
//   name: string;
//   price: number;
//   category: string;
//   description?: string;
//   image?: string;
// };

// export default function ProductsPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);

//         const data = await api("/products");

//         setProducts(data.products || []);
//       } catch (error) {
//         console.error(error);

//         setError(
//           "Unable to load products. Please try again."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <main>

//       <section className="section">
//         <div className="container">

//           <div className="section-heading">
//             <p className="section-label">
//               CARTCRAFT STORE
//             </p>

//             <h1 className="section-title">
//               All Products
//             </h1>
//           </div>

//           {loading && (
//             <p>Loading products...</p>
//           )}

//           {error && (
//             <p>{error}</p>
//           )}

//           {!loading &&
//             !error &&
//             products.length === 0 && (
//               <p>No products found.</p>
//             )}

//           {!loading &&
//             !error &&
//             products.length > 0 && (
//               <div className="product-grid">

//                 {products.map((product) => (
//                   <ProductCard
//                     key={product._id}
//                     product={product}
//                   />
//                 ))}

//               </div>
//             )}

//         </div>
//       </section>

//     </main>
//   );
// }





"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart, SlidersHorizontal } from "lucide-react";
import toast from "react-hot-toast";
import api from "@/lib/api";

type Product = {
  _id: string;
  name: string;
  price: number;
  category?: string;
  image?: string;
  stock?: number;
  description?: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] =
    useState("all");

  // ========================================
  // GET CATEGORY FROM URL
  // ========================================

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    const category =
      params.get("category");

    setSelectedCategory(
      category ? category : "all"
    );
  }, []);

  // ========================================
  // FETCH PRODUCTS
  // ========================================

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const data = await api("/products");

      if (!data.success) {
        throw new Error(
          data.message || "Failed to fetch products"
        );
      }

      setProducts(data.products || []);
    } catch (error) {
      console.error(
        "Fetch products error:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to load products"
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // CATEGORY FILTER
  // ========================================

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (product) =>
            product.category?.toLowerCase() ===
            selectedCategory.toLowerCase()
        );

  // ========================================
  // CHANGE CATEGORY
  // ========================================

  const handleCategoryChange = (
    category: string
  ) => {
    setSelectedCategory(category);

    if (category === "all") {
      window.history.pushState(
        {},
        "",
        "/products"
      );
    } else {
      window.history.pushState(
        {},
        "",
        `/products?category=${encodeURIComponent(
          category
        )}`
      );
    }
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
          <p>Loading products...</p>
        </div>
      </main>
    );
  }

  // ========================================
  // PRODUCTS PAGE
  // ========================================

  return (
    <main className="section">
      <div className="container">

        {/* HEADER */}

        <div className="section-heading">
          <p className="section-label">
            CARTCRAFT
          </p>

          <h1 className="section-title">
            {selectedCategory === "all"
              ? "All Products"
              : selectedCategory}
          </h1>

          <p>
            Discover our collection of quality
            products.
          </p>
        </div>

        {/* CATEGORY FILTER */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "35px",
          }}
        >
          <SlidersHorizontal size={18} />

          <button
            type="button"
            onClick={() =>
              handleCategoryChange("all")
            }
            className={
              selectedCategory === "all"
                ? "primary-button"
                : "secondary-button"
            }
          >
            All Products
          </button>

          <button
            type="button"
            onClick={() =>
              handleCategoryChange("electronics")
            }
            className={
              selectedCategory === "electronics"
                ? "primary-button"
                : "secondary-button"
            }
          >
            Electronics
          </button>

          <button
            type="button"
            onClick={() =>
              handleCategoryChange("fashion")
            }
            className={
              selectedCategory === "fashion"
                ? "primary-button"
                : "secondary-button"
            }
          >
            Fashion
          </button>

          <button
            type="button"
            onClick={() =>
              handleCategoryChange("beauty")
            }
            className={
              selectedCategory === "beauty"
                ? "primary-button"
                : "secondary-button"
            }
          >
            Beauty
          </button>

          <button
            type="button"
            onClick={() =>
              handleCategoryChange("home")
            }
            className={
              selectedCategory === "home"
                ? "primary-button"
                : "secondary-button"
            }
          >
            Home
          </button>
        </div>

        {/* PRODUCT COUNT */}

        <p
          style={{
            color: "#737373",
            marginBottom: "20px",
          }}
        >
          {filteredProducts.length} product
          {filteredProducts.length !== 1
            ? "s"
            : ""}{" "}
          found
        </p>

        {/* NO PRODUCTS */}

        {filteredProducts.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "70px 20px",
              border: "1px solid #e5e5e5",
              borderRadius: "14px",
            }}
          >
            <h2>
              No Products Found
            </h2>

            <p
              style={{
                color: "#737373",
                margin: "10px 0 25px",
              }}
            >
              There are no products in this
              category yet.
            </p>

            <button
              type="button"
              onClick={() =>
                handleCategoryChange("all")
              }
              className="primary-button"
            >
              View All Products
            </button>
          </div>
        ) : (
          /* PRODUCT GRID */

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "25px",
            }}
          >
            {filteredProducts.map(
              (product) => (
                <div
                  key={product._id}
                  style={{
                    border:
                      "1px solid #e5e5e5",
                    borderRadius: "14px",
                    overflow: "hidden",
                    background: "#fff",
                  }}
                >

                  {/* IMAGE */}

                  <Link
                    href={`/products/${product._id}`}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "240px",
                        background: "#f5f5f5",
                        overflow: "hidden",
                      }}
                    >
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
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
                            alignItems:
                              "center",
                            justifyContent:
                              "center",
                            fontSize: "50px",
                          }}
                        >
                          🛍️
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* PRODUCT INFORMATION */}

                  <div
                    style={{
                      padding: "18px",
                    }}
                  >

                    {product.category && (
                      <p
                        className="product-category"
                        style={{
                          marginBottom: "6px",
                        }}
                      >
                        {product.category}
                      </p>
                    )}

                    <Link
                      href={`/products/${product._id}`}
                      style={{
                        color: "inherit",
                        textDecoration:
                          "none",
                      }}
                    >
                      <h3
                        style={{
                          margin:
                            "0 0 10px",
                          fontSize: "19px",
                        }}
                      >
                        {product.name}
                      </h3>
                    </Link>

                    <p
                      style={{
                        fontWeight: "800",
                        fontSize: "19px",
                        margin:
                          "0 0 15px",
                      }}
                    >
                      ₹
                      {product.price.toLocaleString(
                        "en-IN"
                      )}
                    </p>

                    {/* STOCK */}

                    {typeof product.stock ===
                      "number" && (
                      <p
                        style={{
                          fontSize: "13px",
                          color:
                            product.stock > 0
                              ? "#16a34a"
                              : "#dc2626",
                          marginBottom:
                            "15px",
                        }}
                      >
                        {product.stock > 0
                          ? `${product.stock} in stock`
                          : "Out of stock"}
                      </p>
                    )}

                    <Link
                      href={`/products/${product._id}`}
                      className="primary-button"
                      style={{
                        width: "100%",
                      }}
                    >
                      <ShoppingCart
                        size={17}
                        style={{
                          marginRight: "7px",
                        }}
                      />
                      View Product
                    </Link>

                  </div>
                </div>
              )
            )}
          </div>
        )}

      </div>
    </main>
  );
}