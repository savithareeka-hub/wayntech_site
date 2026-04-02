import { useParams } from "react-router-dom";
import { products } from "../data/products";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

export default function CategoryPage() {
  const { category } = useParams();

  // ✅ safer category match
  const filtered = products.filter(
    (p) => p.category === decodeURIComponent(category)
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-6">
        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-8 text-center">
          {category}
        </h1>

        {/* EMPTY STATE */}
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
      </main>

      <Footer />
    </div>
  );
}