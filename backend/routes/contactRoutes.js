const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// ==============================
// POST: Save contact message
// ==============================
router.post("/", async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const { name, email, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({ error: "Name and message required" });
    }

    const newMessage = new Contact({
      name,
      email,
      message,
    });

    await newMessage.save();

    res.status(201).json({ success: true, message: "Message saved!" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


// ==============================
// ❌ DELETE MESSAGE (ADD THIS)
// ==============================
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Message deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;