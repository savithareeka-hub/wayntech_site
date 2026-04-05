let orders = []; // temporary storage (later we upgrade to DB)

export default function handler(req, res) {
  if (req.method === "POST") {
    const newOrder = {
      id: Date.now(),
      ...req.body,
    };

    orders.push(newOrder);

    return res.status(200).json({
      message: "Order saved",
      order: newOrder,
    });
  }

  if (req.method === "GET") {
    return res.status(200).json(orders);
  }

  res.status(405).end();
}