// src/pages/ProductsPage.jsx

import { categories } from "../data/categories";
import { products } from "../data/products";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10">
        
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">
          Our Categories
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => {
            const count = products.filter(
              (p) => p.category === cat.name
            ).length;

            return (
              <div
                key={cat.name}
                className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300"
              >
                
                {/* Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-40 sm:h-48 object-cover"
                />

                {/* Content */}
                <div className="p-4 flex flex-col justify-between h-full">
                  
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold">
                      {cat.name}
                    </h2>

                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {cat.description}
                    </p>

                    <p className="text-xs text-gray-500 mt-2">
                      {count} products available
                    </p>
                  </div>

                  {/* Button */}
                  <Link
                    to={`/category/${encodeURIComponent(cat.name)}`}
                    className="mt-4 inline-block text-center bg-blue-600 text-white py-2 rounded-md text-sm sm:text-base hover:bg-blue-700 transition"
                  >
                    View Products
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