import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { state: product } = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const images = product?.images || [];

  const [selectedImage, setSelectedImage] = useState(images[0] || "");
  const [zoomStyle, setZoomStyle] = useState({
    transform: "scale(1)",
  });

  const minQty = product.minQty || 1;
  const maxQty = product.maxQty || 100;
  const [qty, setQty] = useState(minQty);

  // ✅ PRICE CALCULATION (DISCOUNT SLAB)
  const getPrice = () => {
    if (!product.discountSlabs) return product.price;

    let finalPrice = product.price;

    product.discountSlabs.forEach((slab) => {
      if (qty >= slab.min) {
        finalPrice = slab.price;
      }
    });

    return finalPrice;
  };

  // ❌ NO PRODUCT
  if (!product) {
    return (
      <>
        <Header />
        <h2 className="p-5">No product data found</h2>
      </>
    );
  }

  // 🔍 ZOOM
  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(1.8)",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transform: "scale(1)",
      transformOrigin: "center",
    });
  };

  return (
    <>
      <Header />

      <div className="p-4 md:p-6 max-w-7xl mx-auto overflow-x-hidden">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-blue-600 hover:underline"
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

          {/* LEFT */}
          <div className="flex flex-col items-center w-full">

            <div
              className="w-full max-w-[600px] aspect-[3/2] bg-gray-100 rounded-xl overflow-hidden"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleMouseLeave}
            >
              <img
                src={selectedImage}
                alt={product.name}
                style={zoomStyle}
                className="w-full h-full object-contain transition-transform duration-200"
              />
            </div>

            <div className="w-full max-w-[600px]">
              <div className="flex gap-2 md:gap-3 mt-4 flex-wrap justify-center md:justify-start">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt=""
                    onClick={() => setSelectedImage(img)}
                    className={`w-14 h-14 md:w-20 md:h-20 object-cover rounded cursor-pointer border ${
                      selectedImage === img
                        ? "border-blue-500 scale-105"
                        : "border-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT */}
          <div className="w-full break-words">

            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {product.name}
            </h1>

            <p className="text-gray-600 mb-4">
              {product.description}
            </p>

            {/* DETAILS */}
            <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm leading-relaxed">
              {product.details?.length > 0 ? (
                product.details.map((item, index) => (
                  <li key={index} className="break-words whitespace-normal">
                    {item}
                  </li>
                ))
              ) : (
                <li>No additional details available</li>
              )}
            </ul>

            {/* PRICE */}
            <h2 className="text-2xl font-bold mt-6">
              ₹{getPrice()} / piece
            </h2>

            <p className="text-lg font-semibold mt-2">
              Total: ₹{getPrice() * qty}
            </p>

            <p className="text-sm text-red-500 mt-1">
              Minimum order: {minQty} Pcs
            </p>

            {/* QUANTITY */}
            <div className="mt-5 w-full max-w-sm">

              <label className="text-sm font-medium text-gray-700">
                Quantity
              </label>

              <input
                type="range"
                min={minQty}
                max={maxQty}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="w-full mt-2"
              />

              <p className="text-sm text-gray-500 mt-1">
                Selected: {qty}
              </p>

              <div className="flex items-center gap-3 mt-3">

                <button
                  onClick={() => setQty(prev => (prev > minQty ? prev - 1 : minQty))}
                  className="px-3 py-1 border rounded"
                >
                  −
                </button>

                <input
                  type="number"
                  value={qty}
                  min={minQty}
                  max={maxQty}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= minQty && value <= maxQty) {
                      setQty(value);
                    }
                  }}
                  className="w-20 text-center border rounded py-1"
                />

                <button
                  onClick={() => setQty(prev => (prev < maxQty ? prev + 1 : maxQty))}
                  className="px-3 py-1 border rounded"
                >
                  +
                </button>

              </div>

            </div>

            {/* 🔥 DISCOUNT TABLE */}
            {product.discountSlabs && (
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Bulk Pricing</h3>

                <div className="border rounded-lg overflow-hidden text-sm">
                  {product.discountSlabs.map((slab, index) => (
                    <div
                      key={index}
                      className={`flex justify-between px-4 py-2 ${
                        qty >= slab.min ? "bg-green-100 font-semibold" : ""
                      }`}
                    >
                      <span>{slab.min}+ pcs</span>
                      <span>₹{slab.price} / piece</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ADD TO CART */}
            <button
              onClick={() => {
                addToCart({
                  ...product,
                  qty,
                  image: selectedImage,
                  price: getPrice(),
                });
              }}
              className="mt-6 w-full md:w-auto px-8 py-3 bg-black text-white rounded hover:bg-gray-800"
            >
              Add to Cart
            </button>

          </div>

        </div>
      </div>
    </>
  );
}