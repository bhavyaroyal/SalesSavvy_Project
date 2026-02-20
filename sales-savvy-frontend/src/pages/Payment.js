import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../services/orderService";

function Payment() {

  const [upiId, setUpiId] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const handlePayment = async () => {

    if (!upiId.includes("@")) {
      alert("Enter valid UPI ID");
      return;
    }

    setLoading(true);

    // Fake processing delay
    setTimeout(async () => {

      alert("Payment Successful ✅");

      await placeOrder(userId);

      navigate("/order-success");

    }, 2000);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>UPI Payment</h2>

      <input
        type="text"
        placeholder="Enter UPI ID (example@upi)"
        value={upiId}
        onChange={(e)=>setUpiId(e.target.value)}
        style={{ padding:"10px", width:"250px" }}
      />

      <br /><br />

      <button onClick={handlePayment}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}

export default Payment;