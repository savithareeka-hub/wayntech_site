import React, { useEffect, useState } from "react";

export default function Admin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border p-4 rounded-lg shadow"
            >
              <h2 className="font-bold text-lg">
                Order ID: {order.id}
              </h2>

              <p>👤 {order.customer.name}</p>
              <p>📞 {order.customer.phone}</p>
              <p>📍 {order.customer.address}</p>

              <div className="mt-3">
                <h3 className="font-semibold">Products:</h3>

                {order.cart.map((item, i) => (
                  <div key={i} className="text-sm">
                    {item.name} x {item.qty} = ₹
                    {item.price * item.qty}
                  </div>
                ))}
              </div>

              <p className="mt-3 font-bold">
                Total: ₹{order.total}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}