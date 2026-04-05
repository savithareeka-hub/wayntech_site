import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const total = cart.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.qty),
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.address) {
      alert("Please fill required fields");
      return;
    }

    try {
      setLoading(true);

      // ✅ Save order first
      const res = await fetch("https://wayntech-site.onrender.com/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: form.name,
          phone: form.phone,
          email: form.email,
          address: form.address,
          items: cart,
          totalAmount: total,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Order failed");
      }

      // ✅ Detect Mobile ONLY
      const isMobile = /Android|iPhone|iPad|iPod/i.test(
        navigator.userAgent
      );

      if (isMobile) {
        // ✅ Build WhatsApp message
        const message = `
🛒 *New Order - WaynTech Cards*

👤 Name: ${form.name}
📞 Phone: ${form.phone}
📧 Email: ${form.email}
📍 Address: ${form.address}

${cart
  .map(
    (item) =>
      `• ${item.name} (x${item.qty}) = ₹${item.price * item.qty}`
  )
  .join("\n")}

------------------------
Total Amount: ₹${total}
`;

        const encodedMessage = encodeURIComponent(message);
        const phoneNumber = "919074600471";

        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        // 📱 Open WhatsApp ONLY on mobile
        window.location.href = whatsappURL;
      } else {
        // 💻 PC → just success message
        alert("✅ Order placed successfully!");
        navigate("/"); // or /success page
      }

      clearCart();

    } catch (error) {
      console.error("Checkout Error:", error);
      alert("❌ Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto p-6 w-full">

        <button
          onClick={() => navigate("/cart")}
          className="mb-4 text-gray-600"
        >
          ← Back to Cart
        </button>

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid md:grid-cols-3 gap-6">

          {/* FORM */}
          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-semibold mb-4">
              Customer Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded p-3"
                placeholder="Full Name *"
              />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded p-3"
                placeholder="Email"
              />

              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded p-3"
                placeholder="Phone *"
              />

              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full border rounded p-3"
                rows={4}
                placeholder="Address *"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white py-3 rounded-lg"
              >
                {loading ? "Processing..." : "Place Order"}
              </button>
            </form>
          </div>

          {/* SUMMARY */}
          <div className="bg-white p-6 rounded-xl shadow h-fit">

            <h2 className="text-lg font-semibold mb-4">
              Order Summary
            </h2>

            {cart.map((item) => (
              <div key={item.id} className="flex justify-between mb-2">
                <span>{item.name} x{item.qty}</span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}

            <hr className="my-3" />

            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}