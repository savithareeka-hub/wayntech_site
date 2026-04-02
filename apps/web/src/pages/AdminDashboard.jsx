import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  // form states
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  // load orders
  useEffect(() => {
    if (!localStorage.getItem("admin")) {
      window.location.href = "/admin/login";
    } else {
      const stored = JSON.parse(localStorage.getItem("orders") || "[]");
      setOrders(stored);
    }
  }, []);

  // add product (optional - just UI for now)
  const addProduct = () => {
    alert("Product added (static demo)");
    setName("");
    setPrice("");
    setCategory("");
  };

  // update order status
  const updateStatus = (id) => {
    const updated = orders.map((o) =>
      o.id === id ? { ...o, status: "Completed" } : o
    );

    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6">Admin Panel</h1>

      {/* ADD PRODUCT */}
      <div className="mb-6 border p-4 rounded">
        <h2 className="text-xl mb-3">Add Product</h2>

        <input
          placeholder="Name"
          className="border p-2 mr-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Price"
          className="border p-2 mr-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          placeholder="Category"
          className="border p-2 mr-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button
          onClick={addProduct}
          className="bg-black text-white px-4 py-2"
        >
          Add
        </button>
      </div>

      {/* ORDERS */}
      <h2 className="text-xl mt-6 mb-3">Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((o) => (
          <div key={o.id} className="border p-4 mb-4 rounded">
            <p><b>Order ID:</b> {o.id}</p>
            <p><b>Customer:</b> {o.customer?.name}</p>
            <p><b>Email:</b> {o.customer?.email}</p>
            <p><b>Total:</b> ₹{o.total}</p>
            <p><b>Status:</b> {o.status}</p>
            <p><b>Date:</b> {o.date}</p>

            {/* ITEMS */}
            <div className="mt-2">
              <b>Items:</b>
              {o.items.map((item, i) => (
                <div key={i} className="ml-4">
                  - {item.name} (Qty: {item.qty})
                </div>
              ))}
            </div>

            <button
              onClick={() => updateStatus(o.id)}
              className="bg-green-600 text-white px-3 py-1 mt-3"
            >
              Mark Completed
            </button>
          </div>
        ))
      )}
    </div>
  );
}