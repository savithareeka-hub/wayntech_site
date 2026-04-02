import React from "react";
import { products } from "../data/products";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const ProductsPage = () => {

  const grouped = products.reduce((acc, p) => {
    const cat = p.category || "Others";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(p);
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Our Categories
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            
            /* ✅ FIXED: use Link */
            <Link
              key={cat}
              to={`/products/${cat}`}
              className="bg-white rounded-xl shadow hover:shadow-xl transition cursor-pointer overflow-hidden block"
            >
              {/* IMAGE */}
              <img
                src={grouped[cat][0]?.image || "https://via.placeholder.com/300"}
                className="h-48 w-full object-cover"
              />

              {/* TEXT */}
              <div className="p-4">
                <h2 className="text-lg font-semibold">{cat}</h2>

                <p className="text-sm text-gray-500 mt-1">
                  {grouped[cat].length} products available
                </p>

                <p className="text-blue-600 mt-3">
                  View Products →
                </p>
              </div>
            </Link>

          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductsPage;