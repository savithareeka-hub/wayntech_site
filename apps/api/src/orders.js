const Order = require("../../models/Order"); // adjust path if needed

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const orders = await Order.find().sort({ createdAt: -1 });

      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching orders" });
    }
  }

  if (req.method === "POST") {
    try {
      const newOrder = new Order(req.body);
      await newOrder.save();

      return res.status(200).json({
        message: "Order saved",
        order: newOrder,
      });
    } catch (error) {
      return res.status(500).json({ message: "Error saving order" });
    }
  }

  res.status(405).end();
}
