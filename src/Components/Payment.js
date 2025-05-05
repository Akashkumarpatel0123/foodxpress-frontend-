import React, { useState } from "react";
import "../Style/Payment.css"; // Assuming you have a CSS file for styling

const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState("UPI");

  const order = [
    { name: "Margherita", price: 120 },
    { name: "Classic Burger", price: 150 },
  ];

  const total = order.reduce((sum, item) => sum + item.price, 0);

  const handlePayment = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: order,
          total,
          method: selectedMethod,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Payment Successful!");
      } else {
        alert(data.message || "Payment Failed!");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Server Error");
    }
  };

  return (
    <div className="payment-container">
      <h2 className="heading">Payment</h2>

      <div className="summary">
        <h3>Order Summary</h3>
        {order.map((item, index) => (
          <div className="item" key={index}>
            <span>{item.name}</span>
            <span>₹{item.price}</span>
          </div>
        ))}
        <hr />
        <div className="total">
          <strong>Total</strong>
          <strong>₹{total}</strong>
        </div>
      </div>

      <div className="methods">
        <h3>Payment Method</h3>

        <label className="method-option">
          <input
            type="radio"
            name="method"
            value="UPI"
            checked={selectedMethod === "UPI"}
            onChange={(e) => setSelectedMethod(e.target.value)}
          />
          <span>UPI</span>
          <div className="icons">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Google_Pay_Logo.svg" alt="GPay" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/f3/PhonePe_Logo.svg" alt="PhonePe" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Paytm_logo.png" alt="Paytm" />
          </div>
        </label>

        <label className="method-option">
          <input
            type="radio"
            name="method"
            value="Card"
            checked={selectedMethod === "Card"}
            onChange={(e) => setSelectedMethod(e.target.value)}
          />
          Debit/Credit Card
        </label>

        <label className="method-option">
          <input
            type="radio"
            name="method"
            value="Wallet"
            checked={selectedMethod === "Wallet"}
            onChange={(e) => setSelectedMethod(e.target.value)}
          />
          Wallet
        </label>

        <label className="method-option">
          <input
            type="radio"
            name="method"
            value="COD"
            checked={selectedMethod === "COD"}
            onChange={(e) => setSelectedMethod(e.target.value)}
          />
          Cash on Delivery
        </label>
      </div>

      <button className="pay-btn" onClick={handlePayment}>
        Pay ₹{total}
      </button>
    </div>
  );
};

export default Payment;
