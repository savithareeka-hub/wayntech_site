import mongoose from "mongoose";

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
      image: String,
    },
  ],

  totalAmount: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    default: "Pending",
  },

}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;