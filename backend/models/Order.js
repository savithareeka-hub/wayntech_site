const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    default: "",
  },

  address: {
    type: String,
    required: true,
  },

  items: [
    {
      name: String,
      qty: Number,
      price: Number,
      image: String, // optional (for future UI)
    },
  ],

  totalAmount: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    default: "Pending", // Pending | Completed
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
