"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import api from "@/lib/api";

type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  image?: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const data = await api("/products");

        setProducts(data.products || []);
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load products. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main>

      <section className="section">
        <div className="container">

          <div className="section-heading">
            <p className="section-label">
              CARTCRAFT STORE
            </p>

            <h1 className="section-title">
              All Products
            </h1>
          </div>

          {loading && (
            <p>Loading products...</p>
          )}

          {error && (
            <p>{error}</p>
          )}

          {!loading &&
            !error &&
            products.length === 0 && (
              <p>No products found.</p>
            )}

          {!loading &&
            !error &&
            products.length > 0 && (
              <div className="product-grid">

                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                  />
                ))}

              </div>
            )}

        </div>
      </section>

    </main>
  );
}