import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);

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
    const res = await fetch("https://wayntech-site.onrender.com/api/orders", {
      headers: { Authorization: "admin-token-123" },
    });
    const data = await res.json();
    setOrders(data);
  };

  // ==============================
  // 📩 FETCH MESSAGES
  // ==============================
  const fetchMessages = async () => {
    const res = await fetch("https://wayntech-site.onrender.com/api/contact", {
      headers: { Authorization: "admin-token-123" },
    });
    const data = await res.json();
    setMessages(data);
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
  // ✏️ UPDATE ORDER STATUS
  // ==============================
  const updateStatus = async (id, status) => {
    await fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "admin-token-123",
      },
      body: JSON.stringify({ status }),
    });

    fetchOrders();
  };

  // ==============================
  // ❌ DELETE ORDER
  // ==============================
  const deleteOrder = async (id) => {
    await fetch(`/api/orders/${id}`, {
      method: "DELETE",
      headers: { Authorization: "admin-token-123" },
    });

    fetchOrders();
  };

  // ==============================
  // ❌ DELETE MESSAGE
  // ==============================
  const deleteMessage = async (id) => {
    await fetch(`/api/contact/${id}`, {
      method: "DELETE",
      headers: { Authorization: "admin-token-123" },
    });

    fetchMessages();
  };

  // ==============================
  // 📄 DOWNLOAD INVOICE
  // ==============================
  const downloadInvoice = (id) => {
    window.open(`/api/orders/${id}/invoice`, "_blank");
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
                    <button onClick={() => downloadInvoice(order._id)} style={btnBlue}>
                      Invoice
                    </button>

                    <button onClick={() => deleteOrder(order._id)} style={btnRed}>
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
                <p><strong>Email:</strong> {msg.email}</p>
                <p>{msg.message}</p>

                <button onClick={() => deleteMessage(msg._id)} style={btnRed}>
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

// STYLES
const header = { display: "flex", justifyContent: "space-between" };
const table = { width: "100%", borderCollapse: "collapse" };
const th = { padding: "10px" };
const td = { padding: "10px" };
const tabBtn = { marginRight: "10px", padding: "8px" };
const btnBlue = { background: "blue", color: "#fff", padding: "6px" };
const btnRed = { background: "red", color: "#fff", padding: "6px" };
const btnLogout = { background: "#333", color: "#fff", padding: "8px" };
const card = { border: "1px solid #ddd", padding: "10px", margin: "10px 0" };
