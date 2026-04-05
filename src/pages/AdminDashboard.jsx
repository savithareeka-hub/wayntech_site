import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const BASE_URL = "https://wayntech-site.onrender.com";

  // ==============================
  // 🔐 PROTECT ADMIN PAGE
  // ==============================
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin-login");
    }
  }, [navigate]);

  // ==============================
  // 📦 FETCH ORDERS
  // ==============================
  const fetchOrders = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/orders`, {
        headers: { Authorization: "admin-token-123" },
      });
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Fetch orders error:", err);
    }
  };

  // ==============================
  // 📩 FETCH MESSAGES
  // ==============================
  const fetchMessages = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/contact`, {
        headers: { Authorization: "admin-token-123" },
      });
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error("Fetch messages error:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchMessages();
  }, []);

  // ==============================
  // 🚪 LOGOUT
  // ==============================
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  // ==============================
  // ✏️ UPDATE STATUS
  // ==============================
  const updateStatus = async (id, status) => {
    try {
      await fetch(`${BASE_URL}/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "admin-token-123",
        },
        body: JSON.stringify({ status }),
      });

      fetchOrders();
    } catch (err) {
      console.error("Update status error:", err);
    }
  };

  // ==============================
  // ❌ DELETE ORDER
  // ==============================
  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;

    try {
      const res = await fetch(`${BASE_URL}/api/orders/${id}`, {
        method: "DELETE",
        headers: { Authorization: "admin-token-123" },
      });

      const data = await res.json();
      console.log("Delete order:", data);

      if (!res.ok) {
        alert("Failed to delete order");
        return;
      }

      fetchOrders();
    } catch (err) {
      console.error("Delete order error:", err);
    }
  };

  // ==============================
  // ❌ DELETE MESSAGE
  // ==============================
  const deleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      const res = await fetch(`${BASE_URL}/api/contact/${id}`, {
        method: "DELETE",
        headers: { Authorization: "admin-token-123" },
      });

      const data = await res.json();
      console.log("Delete message:", data);

      if (!res.ok) {
        alert("Failed to delete message");
        return;
      }

      fetchMessages();
    } catch (err) {
      console.error("Delete message error:", err);
    }
  };

  // ==============================
  // 📄 DOWNLOAD INVOICE
  // ==============================
  const downloadInvoice = (id) => {
    window.open(`${BASE_URL}/api/orders/${id}/invoice`, "_blank");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      {/* HEADER */}
      <div style={header}>
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout} style={btnLogout}>
          🚪 Logout
        </button>
      </div>

      {/* TABS */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setActiveTab("orders")} style={tabBtn}>
          📦 Orders
        </button>
        <button onClick={() => setActiveTab("messages")} style={tabBtn}>
          📩 Messages
        </button>
      </div>

      {/* ORDERS */}
      {activeTab === "orders" && (
        <div style={{ overflowX: "auto" }}>
          <table style={table}>
            <thead>
              <tr style={{ background: "#f5f5f5" }}>
                <th style={th}>Customer</th>
                <th style={th}>Phone</th>
                <th style={th}>Items</th>
                <th style={th}>Total</th>
                <th style={th}>Status</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td style={td}>
                    <strong>{order.customerName}</strong>
                    <br />
                    <small>{order.address}</small>
                  </td>

                  <td style={td}>{order.phone}</td>

                  <td style={td}>
                    {order.items?.map((item, i) => (
                      <div key={i}>
                        {item.name} × {item.qty}
                      </div>
                    ))}
                  </td>

                  <td style={td}>₹{order.totalAmount}</td>

                  <td style={td}>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(order._id, e.target.value)
                      }
                    >
                      <option>Pending</option>
                      <option>Completed</option>
                      <option>Shipped</option>
                    </select>
                  </td>

                  <td style={td}>
                    <button
                      onClick={() => downloadInvoice(order._id)}
                      style={btnBlue}
                    >
                      Invoice
                    </button>

                    <button
                      onClick={() => deleteOrder(order._id)}
                      style={btnRed}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MESSAGES */}
      {activeTab === "messages" && (
        <div>
          {messages.length === 0 ? (
            <p>No messages</p>
          ) : (
            messages.map((msg) => (
              <div key={msg._id} style={card}>
                <h4>{msg.name}</h4>
                <p>
                  <strong>Email:</strong> {msg.email}
                </p>
                <p>{msg.message}</p>

                <button
                  onClick={() => deleteMessage(msg._id)}
                  style={btnRed}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// ==============================
// 🎨 STYLES
// ==============================
const header = { display: "flex", justifyContent: "space-between" };
const table = { width: "100%", borderCollapse: "collapse" };
const th = { padding: "10px", textAlign: "left" };
const td = { padding: "10px", borderTop: "1px solid #ddd" };
const tabBtn = { marginRight: "10px", padding: "8px", cursor: "pointer" };
const btnBlue = {
  background: "blue",
  color: "#fff",
  padding: "6px",
  marginRight: "5px",
  cursor: "pointer",
};
const btnRed = {
  background: "red",
  color: "#fff",
  padding: "6px",
  cursor: "pointer",
};
const btnLogout = {
  background: "#333",
  color: "#fff",
  padding: "8px",
  cursor: "pointer",
};
const card = {
  border: "1px solid #ddd",
  padding: "10px",
  margin: "10px 0",
};