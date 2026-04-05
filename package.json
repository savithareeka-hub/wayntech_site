import React, { useEffect, useState } from "react";

const AdminContacts = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        headers: {
          Authorization: "admin-token-123",
        },
      });

      const data = await res.json();
      setMessages(data);

    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      await fetch(`http://localhost:5000/api/contact/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "admin-token-123",
        },
      });

      fetchMessages(); // refresh

    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📩 Contact Messages</h2>

      {messages.length === 0 ? (
        <p>No messages found</p>
      ) : (
        messages.map((msg) => (
          <div
            key={msg._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <h4>{msg.name}</h4>
            <p><strong>Email:</strong> {msg.email}</p>
            <p>{msg.message}</p>

            <small>
              {new Date(msg.createdAt).toLocaleString()}
            </small>

            <br /><br />

            <button
              onClick={() => deleteMessage(msg._id)}
              style={{
                background: "red",
                color: "#fff",
                border: "none",
                padding: "8px 12px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminContacts;