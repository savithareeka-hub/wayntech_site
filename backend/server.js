const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const app = express();

// ==============================
// ✅ Middleware
// ==============================
app.use(cors());
app.use(express.json());

// ==============================
// ✅ MongoDB connection
// ==============================
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));
  

// ==============================
// ✅ Models
// ==============================
const Order = require("./models/Order");

// 👉 ADD THIS MODEL
const Contact = require("./models/Contact");

// ==============================
// 📄 GENERATE INVOICE
// ==============================
const generateInvoice = (order) => {
  const dir = "invoices";

  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  const filePath = path.join(dir, `invoice-${order._id}.pdf`);

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text("WaynTech Invoice", { align: "center" });

  doc.text(`\nCustomer: ${order.customerName}`);
  doc.text(`Phone: ${order.phone}`);
  doc.text(`Email: ${order.email}`);
  doc.text(`Address: ${order.address}`);

  doc.text("\nItems:");
  order.items.forEach((item, i) => {
    doc.text(`${i + 1}. ${item.name} - ₹${item.price} x ${item.qty}`);
  });

  doc.text(`\nTotal: ₹${order.totalAmount}`);

  doc.end();

  return filePath;
};

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
// 📩 CONTACT FORM (NEW)
// ==============================
app.post("/api/contact", async (req, res) => {
  try {
    console.log("📩 CONTACT:", req.body);

    const { name, email, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({ error: "Name & message required" });
    }

    const newMessage = new Contact({
      name,
      email,
      message,
    });

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
// 📩 GET CONTACT MESSAGES (ADMIN)
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
// ❌ DELETE CONTACT MESSAGE
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
// 📦 CREATE ORDER (PUBLIC)
// ==============================
app.post("/api/orders", async (req, res) => {
  try {
    console.log("📥 ORDER RECEIVED:", req.body);

    const order = new Order(req.body);
    await order.save();

    generateInvoice(order);

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
// 📦 GET ORDERS (PROTECTED)
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
// ✏️ UPDATE STATUS
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
// 📥 DOWNLOAD INVOICE
// ==============================
app.get("/api/orders/:id/invoice", checkAuth, (req, res) => {
  const filePath = path.join("invoices", `invoice-${req.params.id}.pdf`);

  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).json({ message: "Invoice not found" });
  }
});

// ==============================
// 🚀 START SERVER
// ==============================
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
