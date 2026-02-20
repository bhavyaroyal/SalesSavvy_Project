import React from "react";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {

  const navigate = useNavigate();

  return (
    <div style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      height:"80vh",
      flexDirection:"column",
      textAlign:"center"
    }}>

      <h1 style={{color:"green"}}>✅ Order Placed Successfully!</h1>

      <p>Your order is being processed.</p>
      <p>Thank you for shopping with Sales Savvy ❤️</p>

      <div style={{marginTop:"20px"}}>

        <button
          onClick={() => navigate("/orders")}
          style={{marginRight:"10px"}}
        >
          View Orders 📦
        </button>

        <button onClick={() => navigate("/products")}>
          Continue Shopping 🛍️
        </button>

      </div>

    </div>
  );
}

export default OrderSuccess;