// src/pages/ProductsPage.jsx

import { categories } from "../data/categories";
import { products } from "../data/products";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-center mb-10">
          Our Categories
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const count = products.filter(
              (p) => p.category === cat.name
            ).length;

            return (
              <div
                key={cat.name}
                className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
              >
                {/* ✅ CATEGORY IMAGE */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  <h2 className="text-lg font-semibold">
                    {cat.name}
                  </h2>

                  <p className="text-sm text-gray-600">
                    {cat.description}
                  </p>

                  <p className="text-sm mt-2">
                    {count} products available
                  </p>

                  <Link
                    to={`/category/${encodeURIComponent(cat.name)}`}
                    className="text-blue-600 mt-2 inline-block"
                  >
                    View Products →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}