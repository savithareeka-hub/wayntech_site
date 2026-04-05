import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin-dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://wayntech-site.onrender.com/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", "admin-token-123");
        navigate("/admin-dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div style={container}>
      
      {/* 🏠 HOME BUTTON */}
      <button style={homeBtn} onClick={() => navigate("/")}>
        ⬅ Home
      </button>

      <div style={card}>
        <h2 style={title}>Admin Panel</h2>
        <p style={subtitle}>Login to continue</p>

        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={input}
            required
          />

          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={input}
            required
          />

          <button type="submit" style={button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

// 🎨 STYLES

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  position: "relative",
};

const homeBtn = {
  position: "absolute",
  top: "20px",
  left: "20px",
  padding: "8px 14px",
  background: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
};

const card = {
  background: "#fff",
  padding: "40px",
  borderRadius: "12px",
  width: "320px",
  textAlign: "center",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
};

const title = {
  marginBottom: "10px",
};

const subtitle = {
  marginBottom: "20px",
  color: "#777",
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  outline: "none",
};

const button = {
  width: "100%",
  padding: "10px",
  background: "#667eea",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};