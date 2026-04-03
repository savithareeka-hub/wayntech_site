// src/pages/CategoryPage.jsx

import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

export default function CategoryPage() {
  const { category } = useParams();
  const decodedCategory = decodeURIComponent(category);

  const filtered = products.filter(
    (p) => p.category === decodedCategory
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-center mb-6">
          {decodedCategory}
        </h1>

        <div className="mb-6 text-center text-gray-500">
          {filtered.length} products found
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-500">
            No products found
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link to="/products" className="text-blue-600">
            ← Back to Categories
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}