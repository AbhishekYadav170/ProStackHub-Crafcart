import Link from "next/link";
import { ShoppingCart } from "lucide-react";

type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  image?: string;
};

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <div className="product-card">

      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      ) : (
        <div
          className="product-image"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "50px",
          }}
        >
          🛍️
        </div>
      )}

      <div className="product-info">

        <p className="product-category">
          {product.category}
        </p>

        <h3 className="product-name">
          {product.name}
        </h3>

        {product.description && (
          <p className="product-description">
            {product.description}
          </p>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <p className="product-price">
            ₹{product.price.toLocaleString("en-IN")}
          </p>

          <Link
            href={`/products/${product._id}`}
            className="nav-icon"
            title="View product"
          >
            <ShoppingCart size={19} />
          </Link>
        </div>

      </div>

    </div>
  );
}