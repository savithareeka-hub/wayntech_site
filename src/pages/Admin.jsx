import React, { useEffect, useState } from "react";

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    // ❌ Not logged in → redirect
    if (!token) {
      window.location.href = "/admin-login";
      return;
    }

    // ✅ Fetch with token
   fetch("http://localhost:5000/api/orders", {
  headers: {
    Authorization: token,
  },
})
      .then((res) => {
        if (res.status === 401) {
          // ❌ Invalid token
          localStorage.removeItem("adminToken");
          window.location.href = "/admin-login";
          return;
        }
        return res.json();
      })
      .then((data) => {
        setOrders(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin-login";
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>📦 Admin Orders</h2>
        <button onClick={handleLogout} style={{ padding: "8px 12px" }}>
          Logout
        </button>
      </div>

      {/* LOADING */}
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              margin: "15px 0",
              borderRadius: "8px",
            }}
          >
            <h3>{order.customerName}</h3>

            <p><b>Phone:</b> {order.phone}</p>
            <p><b>Address:</b> {order.address}</p>
            <p><b>Status:</b> {order.status}</p>

            <ul>
              {order.items?.map((item, i) => (
                <li key={i}>
                  {item.name} x {item.qty} = ₹{item.price * item.qty}
                </li>
              ))}
            </ul>

            <strong>Total: ₹{order.total}</strong>
          </div>
        ))
      )}
    </div>
  );
}