import React from "react";
import "./OrderSummary.css";

export default function OrderSummary({ total, onCheckout }) {
  return (
    <div className="order-summary">
      <h3>Order Summary</h3>

      <div className="summary-row">
        <span>Subtotal</span>
        <span>₹{total.toFixed(2)}</span>
      </div>

      <div className="summary-row">
        <span>Shipping</span>
        <span className="shipping-text">Calculated at checkout</span>
      </div>

      <hr />

      <div className="summary-total">
        <span>Total</span>
        <span className="total-price">₹{total.toFixed(2)}</span>
      </div>

      <button className="checkout-btn" onClick={onCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
}