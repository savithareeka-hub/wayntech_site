import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import OrderSummary from "../components/OrderSummary";

export default function Cart() {
  const { cart, removeFromCart, addToCart } = useCart();
  const navigate = useNavigate();

  // ✅ Calculate totals
  const subtotal = cart.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.qty),
    0
  );

  const totalItems = cart.reduce(
    (acc, item) => acc + Number(item.qty),
    0
  );

  // ✅ Checkout function (UPDATED)
  const handleCheckout = async () => {
    try {
      const orderData = {
        items: cart,
        total: subtotal,
        totalItems,
        createdAt: new Date(),
      };

      // 🔴 CHANGE THIS to your real backend URL
      const res = await fetch("https://your-backend-url/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Order failed");

      // ✅ Create WhatsApp message
      const message = `
🛒 *New Order - WaynTech Cards*

${cart
  .map(
    (item) =>
      `• ${item.name} (x${item.qty}) = ₹${item.price * item.qty}`
  )
  .join("\n")}

------------------------
Total Items: ${totalItems}
Total Amount: ₹${subtotal}
`;

      const encodedMessage = encodeURIComponent(message);

      const phoneNumber = "919074600471";

      // ✅ Detect Mobile
      const isMobile = /Android|iPhone|iPad|iPod/i.test(
        navigator.userAgent
      );

      if (isMobile) {
        // 📱 WhatsApp App
        window.location.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      } else {
        // 💻 WhatsApp Web
        window.open(
          `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`,
          "_blank"
        );
      }

      // ✅ Optional success page
      navigate("/success");

    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Order failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingCart size={70} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold">Cart is empty</h2>
            <Link to="/products" className="text-blue-600">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">

            {/* LEFT SIDE - CART ITEMS */}
            <div className="md:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.image || "/images/default.png"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />

                    <div>
                      <h2 className="font-semibold">{item.name}</h2>
                      <p className="text-gray-500">₹{item.price}</p>

                      {/* Quantity Controls */}
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() =>
                            addToCart({ ...item, qty: -1 })
                          }
                          className="px-2 border rounded"
                        >
                          -
                        </button>

                        <span className="px-3">{item.qty}</span>

                        <button
                          onClick={() =>
                            addToCart({ ...item, qty: 1 })
                          }
                          className="px-2 border rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="text-right">
                    <p className="font-bold text-blue-600">
                      ₹{Number(item.price) * Number(item.qty)}
                    </p>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 text-sm mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT SIDE - ORDER SUMMARY */}
            <div className="flex justify-end">
              <OrderSummary
                total={subtotal}
                onCheckout={handleCheckout}
              />
            </div>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}