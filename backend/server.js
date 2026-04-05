const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// ✅ IMPORT MODELS
const Order = require("./models/Order");
const Contact = require("./models/Contact");

const app = express();

// ==============================
// ✅ Middleware
// ==============================
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// ==============================
// ✅ HEALTH CHECK (IMPORTANT for Railway)
// ==============================
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// ==============================
// ✅ MongoDB Connection
// ==============================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// ==============================
// 🔐 ADMIN LOGIN
// ==============================
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "123456") {
    return res.json({
      success: true,
      token: "admin-token-123",
    });
  }

  res.status(401).json({ success: false });
});

// ==============================
// 🔒 AUTH MIDDLEWARE
// ==============================
const checkAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token === "admin-token-123") {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// ==============================
// 📩 CONTACT FORM
// ==============================
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({ error: "Name & message required" });
    }

    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    res.json({
      success: true,
      message: "Message saved successfully",
    });

  } catch (err) {
    console.error("❌ CONTACT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// ==============================
// 📩 GET CONTACT (ADMIN)
// ==============================
app.get("/api/contact", checkAuth, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error("❌ FETCH CONTACT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// ==============================
// ❌ DELETE CONTACT
// ==============================
app.delete("/api/contact/:id", checkAuth, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Message deleted" });
  } catch (err) {
    console.error("❌ DELETE CONTACT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// ==============================
// 📦 CREATE ORDER
// ==============================
app.post("/api/orders", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();

    res.json({
      success: true,
      message: "Order saved successfully",
    });

  } catch (err) {
    console.error("❌ ORDER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// ==============================
// 📦 GET ORDERS (ADMIN)
// ==============================
app.get("/api/orders", checkAuth, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("❌ FETCH ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// ==============================
// ✏️ UPDATE ORDER STATUS
// ==============================
app.put("/api/orders/:id", checkAuth, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(order);
  } catch (err) {
    console.error("❌ UPDATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// ==============================
// ❌ DELETE ORDER
// ==============================
app.delete("/api/orders/:id", checkAuth, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (err) {
    console.error("❌ DELETE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// ==============================
// 🚀 START SERVER
// ==============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// ==============================
// ❗ GLOBAL ERROR HANDLING (SAFE)
// ==============================
process.on("uncaughtException", err => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", err => {
  console.error("Unhandled Rejection:", err);
});