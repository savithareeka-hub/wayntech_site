import Order from "../models/Order.js";
import { sendEmail } from "../utils/sendEmail.js";
import { generateInvoice } from "../utils/generateInvoice.js";

import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// ✅ Fix __dirname (ES module)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==============================
// 📦 CREATE ORDER
// ==============================
export const createOrder = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const order = await Order.create(req.body);

    // ✅ Ensure invoice folder exists
    const invoiceDir = path.join(__dirname, "../invoices");
    if (!fs.existsSync(invoiceDir)) {
      fs.mkdirSync(invoiceDir, { recursive: true });
    }

    const filePath = path.join(
      invoiceDir,
      `invoice-${order._id}.pdf`
    );

    // ✅ Generate invoice (safe)
    try {
      await generateInvoice(order, filePath);
    } catch (err) {
      console.log("Invoice error:", err.message);
    }

    // ✅ Email to customer (safe)
    try {
      if (order.email) {
        await sendEmail(
          order.email,
          "Order Confirmation - WaynTech",
          `<h2>Thanks ${order.customerName}</h2>`
        );
      }
    } catch (err) {
      console.log("Email error:", err.message);
    }

    // ✅ Email to admin (safe)
    try {
      await sendEmail(
        "wayntechmndy@gmail.com",
        "New Order",
        `<h3>New order received</h3>`
      );
    } catch (err) {
      console.log("Admin email error:", err.message);
    }

    res.status(201).json(order);

  } catch (error) {
    console.error("ORDER ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

// ==============================
// 📦 GET ORDERS
// ==============================
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: error.message });
  }
};

// ==============================
// ✏️ UPDATE STATUS
// ==============================
export const updateOrderStatus = async (req, res) => {
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
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: error.message });
  }
};

// ==============================
// ❌ DELETE ORDER (FIXED)
// ==============================
export const deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: error.message });
  }
};