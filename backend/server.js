import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import Order from "./models/Order.js";
import Contact from "./models/Contact.js";

const app = express();

// ==============================
// ⚙️ MIDDLEWARE
// ==============================
app.use(cors());
app.use(express.json());

// ==============================
// 🔐 SIMPLE ADMIN AUTH
// ==============================
const checkAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token !== "admin-token-123") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};

// ==============================
// 📦 CREATE ORDER
// ==============================
app.post("/api/orders", async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ==============================
// 📦 GET ORDERS
// ==============================
app.get("/api/orders", checkAuth, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Fetch orders error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ==============================
// ✏️ UPDATE ORDER STATUS
// ==============================
app.put("/api/orders/:id", checkAuth, async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ==============================
// ❌ DELETE ORDER (FIXED)
// ==============================
app.delete("/api/orders/:id", checkAuth, async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Order deleted successfully",
    });

  } catch (err) {
    console.error("Delete order error:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// ==============================
// 📩 GET CONTACT MESSAGES
// ==============================
app.get("/api/contact", checkAuth, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error("Fetch messages error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ==============================
// 📩 SAVE CONTACT MESSAGE
// ==============================
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({ error: "Name and message required" });
    }

    const newMessage = await Contact.create({ name, email, message });

    res.status(201).json({
      success: true,
      message: "Message saved",
      data: newMessage,
    });
  } catch (err) {
    console.error("Save message error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ==============================
// ❌ DELETE MESSAGE (FIXED)
// ==============================
app.delete("/api/contact/:id", checkAuth, async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: "Message not found",
      });
    }

    res.json({
      success: true,
      message: "Message deleted successfully",
    });

  } catch (err) {
    console.error("Delete message error:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// ==============================
// 🌐 ROOT
// ==============================
app.get("/", (req, res) => {
  res.send("🚀 WaynTech API Running");
});

// ==============================
// 🔌 CONNECT DB + START SERVER
// ==============================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(5000, () => {
      console.log("🚀 Server running on port 5000");
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err);
  });