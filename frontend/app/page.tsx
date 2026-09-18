import Link from "next/link";

const categories = [
  {
    icon: "👕",
    name: "Clothing",
    description: "Everyday styles",
  },
  {
    icon: "👟",
    name: "Footwear",
    description: "Walk in comfort",
  },
  {
    icon: "🎧",
    name: "Electronics",
    description: "Tech you need",
  },
  {
    icon: "⌚",
    name: "Accessories",
    description: "Complete your look",
  },
];

export default function Home() {
  return (
    <main>

      {/* HERO */}

      <section className="hero">
        <div className="hero-content">

          <p className="hero-label">
            WELCOME TO CARTCRAFT
          </p>

          <h1 className="hero-title">
            Shop Smart.
            <br />
            Live Better.
          </h1>

          <p className="hero-description">
            Discover quality products, great prices,
            and a simple shopping experience built
            for everyday life.
          </p>

          <div className="hero-actions">
            <Link
              href="/products"
              className="primary-button"
            >
              Shop Now
            </Link>

            <a
              href="#categories"
              className="secondary-button"
            >
              Explore Categories
            </a>
          </div>

        </div>
      </section>

      {/* CATEGORIES */}

      <section
        id="categories"
        className="section"
      >
        <div className="container">

          <div className="section-heading">

            <p className="section-label">
              EXPLORE
            </p>

            <h2 className="section-title">
              Shop by Category
            </h2>

          </div>

          <div className="category-grid">

            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/products?category=${category.name}`}
                className="category-card"
              >
                <div className="category-icon">
                  {category.icon}
                </div>

                <h3>{category.name}</h3>

                <p>
                  {category.description}
                </p>
              </Link>
            ))}

          </div>

        </div>
      </section>

      {/* FEATURED */}

      <section className="section">
        <div className="container">

          <div className="section-heading">

            <p className="section-label">
              TRENDING NOW
            </p>

            <h2 className="section-title">
              Featured Products
            </h2>

          </div>

          <div className="product-grid">

            <div className="product-card">
              <div className="product-info">

                <p className="product-category">
                  CartCraft Collection
                </p>

                <h3 className="product-name">
                  Discover Something New
                </h3>

                <p className="product-description">
                  Explore our complete collection
                  and find products made for you.
                </p>

                <Link
                  href="/products"
                  className="primary-button"
                >
                  Browse Products
                </Link>

              </div>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}