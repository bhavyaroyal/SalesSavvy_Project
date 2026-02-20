import React, { useEffect, useState } from "react";
import axios from "axios";

function Orders() {

  const [orders, setOrders] = useState([]);

  // TEMP USER ID
  const userId = 14;

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    axios
      .get(`http://localhost:8080/api/order/user/${userId}`)
      .then(res => setOrders(res.data))
      .catch(() => alert("Error loading orders"));
  };

  // -------- PAYMENT ----------
  const payNow = (order) => {

    axios.post(
      `http://localhost:8080/api/payments/${order.id}?amount=${order.totalAmount}&method=UPI`
    )
    .then(() => {
      alert("Payment Successful ✅");
      loadOrders();
    })
    .catch(() => alert("Payment Failed"));
  };

  return (
    <div>
      <h2>My Orders</h2>

      {orders.map(order => (
        <div key={order.id} style={{border:"1px solid black",margin:"10px",padding:"10px"}}>
          <p>Order ID: {order.id}</p>
          <p>Total: ₹{order.totalAmount}</p>
          <p>Status: {order.status}</p>

          {order.status === "PLACED" && (
            <button onClick={() => payNow(order)}>
              Pay Now
            </button>
          )}

        </div>
      ))}
    </div>
  );
}

export default Orders;
