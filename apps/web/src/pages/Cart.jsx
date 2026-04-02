import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, addToCart } = useCart();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  // ✅ WhatsApp Checkout
  const handleCheckout = () => {
    if (!customer.name || !customer.phone || !customer.address) {
      alert("Please fill all details");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const phone = "919074600471";

    let message = `Hello WaynTech,\n\n🛒 New Order:\n\n`;

    message += `👤 Name: ${customer.name}\n`;
    message += `📞 Phone: ${customer.phone}\n`;
    message += `📍 Address: ${customer.address}\n\n`;

    message += `📦 Products:\n\n`;

    cart.forEach((item, i) => {
      message += `${i + 1}. ${item.name}\n`;
      message += `   Qty: ${item.qty}\n`;
      message += `   Price: ₹${item.price * item.qty}\n`;
      message += `   Image: ${item.image}\n\n`;
    });

    message += `💰 Total: ₹${subtotal}`;

    const url = `https://wa.me/919074600471?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {/* EMPTY CART */}
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20">
            <ShoppingCart size={70} className="text-gray-400 mb-4" />

            <h2 className="text-2xl font-bold mb-2">
              Your cart is empty
            </h2>

            <p className="text-gray-500 mb-6">
              Start shopping to add items
            </p>

            <Link
              to="/products"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">

            {/* LEFT - CART ITEMS */}
            <div className="md:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 object-cover rounded-lg"
                    />

                    <div>
                      <h2 className="font-semibold">{item.name}</h2>

                      <p className="text-sm text-gray-500">
                        ₹{item.price} each
                      </p>

                      {/* QTY CONTROLS */}
                      <div className="flex items-center border rounded-lg w-fit mt-2">
                        <button
                          onClick={() =>
                            addToCart({ ...item, qty: -1 })
                          }
                          className="px-3 text-lg"
                        >
                          -
                        </button>

                        <span className="px-3">{item.qty}</span>

                        <button
                          onClick={() =>
                            addToCart({ ...item, qty: 1 })
                          }
                          className="px-3 text-lg"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-600">
                      ₹{item.price * item.qty}
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

            {/* RIGHT - SUMMARY */}
            <div className="bg-white rounded-xl shadow p-6 h-fit">
              <h2 className="text-xl font-semibold mb-4">
                Order Summary
              </h2>

              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between text-gray-600 mt-2">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-blue-600">₹{subtotal}</span>
              </div>

              {/* CUSTOMER FORM */}
              <div className="mt-6 p-4 border rounded">
                <h2 className="text-lg font-bold mb-3">
                  Customer Details
                </h2>

                <input
                  className="border p-2 w-full mb-2"
                  placeholder="Name"
                  onChange={(e) =>
                    setCustomer({
                      ...customer,
                      name: e.target.value,
                    })
                  }
                />

                <input
                  className="border p-2 w-full mb-2"
                  placeholder="Phone"
                  onChange={(e) =>
                    setCustomer({
                      ...customer,
                      phone: e.target.value,
                    })
                  }
                />

                <textarea
                  className="border p-2 w-full mb-2"
                  placeholder="Address"
                  onChange={(e) =>
                    setCustomer({
                      ...customer,
                      address: e.target.value,
                    })
                  }
                />
              </div>

              {/* WHATSAPP BUTTON */}
              <button
                onClick={handleCheckout}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded mt-4 w-full text-lg font-semibold"
              >
                📲 Order via WhatsApp
              </button>

              <Link
                to="/products"
                className="w-full border py-3 rounded-lg mt-3 text-center block"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}