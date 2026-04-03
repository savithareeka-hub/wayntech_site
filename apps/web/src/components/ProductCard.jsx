import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const increase = () => setQty(qty + 1);
  const decrease = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const handleAdd = () => {
    addToCart({ ...product, qty });
  };

  return (
    <div className="bg-white rounded-xl shadow p-4">

      {/* SMALL IMAGE */}
      <img
        src={product.image}
        className="h-32 w-full object-cover rounded-lg mb-3"
      />

      {/* NAME */}
      <h3 className="font-semibold text-md">
        {product.name}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-500 mt-1">
        {product.description || "Custom printed product"}
      </p>

      {/* PRICE */}
      <p className="text-xl font-bold text-blue-600 mt-2">
        ₹{product.price}
      </p>

      {/* QTY + BUTTON */}
      <div className="flex items-center gap-3 mt-4">

        {/* QTY */}
        <div className="flex items-center border rounded-lg px-2 py-1">
          <button onClick={decrease} className="px-2 text-lg">-</button>
          <span className="px-2">{qty}</span>
          <button onClick={increase} className="px-2 text-lg">+</button>
        </div>

        {/* ADD TO CART */}
        <button
  onClick={handleAdd}
  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
>
  Add to Cart
</button>

      </div>
    </div>
  );
}