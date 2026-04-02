import React, { useState } from "react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
  if (
    username.trim() === "admin" &&
    password.trim() === "1234"
  ) {
    localStorage.setItem("admin", "true");
    window.location.href = "/admin";
  } else {
    alert("Invalid login");
  }
};

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-4">Admin Login</h1>

      <input
        placeholder="Username"
        className="border p-2 block mb-3"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 block mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login} className="bg-black text-white px-4 py-2">
        Login
      </button>
    </div>
  );
}