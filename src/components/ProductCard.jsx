import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // ✅ MIN QTY FROM DATA
  const minQty = product.minQty || 1;

  // ✅ START FROM MIN QTY
  const [qty, setQty] = useState(minQty);

  // ➕ INCREASE
  const increase = () => setQty((prev) => prev + 1);

  // ➖ DECREASE (NOT BELOW MIN)
  const decrease = () => {
    if (qty > minQty) setQty((prev) => prev - 1);
  };

  // 🛒 ADD TO CART
  const handleAdd = () => {
    addToCart({ ...product, qty });
  };

  // 🔍 GO TO DETAILS
  const goToDetails = () => {
    navigate("/product-details", { state: product });
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col justify-between hover:shadow-md transition">

      {/* IMAGE */}
      <img
        src={product.images?.[0]}
        alt={product.name}
        className="h-32 w-full object-cover rounded-lg mb-3 cursor-pointer"
        onClick={goToDetails}
      />

      {/* NAME */}
      <h3
        className="font-semibold text-md cursor-pointer hover:text-blue-600"
        onClick={goToDetails}
      >
        {product.name}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
        {product.description || "Custom printed product"}
      </p>

      {/* SEE DETAILS */}
      <p
        onClick={goToDetails}
        className="text-blue-600 text-sm mt-1 cursor-pointer hover:underline"
      >
        See Details →
      </p>

      {/* PRICE */}
      <p className="text-xl font-bold text-blue-600 mt-2">
        ₹{product.price}
      </p>

      {/* MIN QTY */}
      <p className="text-xs text-red-500 mt-1">
        Minimum Order: {minQty} Pcs
      </p>

      {/* ✅ FIXED QTY + CART SECTION */}
      <div className="flex flex-col gap-2 mt-4 sm:flex-row sm:items-center sm:justify-between">

        {/* QTY CONTROL */}
        <div className="flex items-center justify-between border rounded-lg px-2 py-1 w-full sm:w-auto">
          <button
            onClick={decrease}
            className="px-2 text-lg font-semibold"
          >
            -
          </button>

          <span className="px-3 font-medium">{qty}</span>

          <button
            onClick={increase}
            className="px-2 text-lg font-semibold"
          >
            +
          </button>
        </div>

        {/* ADD TO CART BUTTON */}
        <button
          onClick={handleAdd}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg hover:bg-blue-700 text-sm sm:text-base w-full sm:w-auto transition active:scale-95"
        >
          <ShoppingCart size={18} />

          {/* ❌ Hidden on mobile, visible on desktop */}
          <span className="hidden sm:inline">
            Add to Cart
          </span>
        </button>

      </div>
    </div>
  );
}