import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/app.css";

function Orders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // ================= FETCH ORDERS =================
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/order/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [userId, token]);

  // ================= STATUS BAR =================
  const StatusTracker = ({ status }) => {

    const steps = [
      "ORDERED",
      "PACKED",
      "SHIPPED",
      "OUT_FOR_DELIVERY",
      "DELIVERED"
    ];

    const currentIndex =
      steps.indexOf((status || "").toUpperCase());

    return (
      <div style={{ marginTop: "20px" }}>

        {/* Progress Line */}
        <div
          style={{
            position: "relative",
            height: "4px",
            background: "#ddd",
            marginBottom: "25px"
          }}
        >
          <div
            style={{
              height: "4px",
              width:
                `${((currentIndex + 1) / steps.length) * 100}%`,
              background: "#28a745",
              transition: "0.5s"
            }}
          />
        </div>

        {/* Steps */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          {steps.map((step, index) => (

            <div key={index} style={{ textAlign: "center" }}>

              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  margin: "auto",
                  background:
                    index <= currentIndex
                      ? "#28a745"
                      : "#e0e0e0",
                  color: "white",
                  lineHeight: "28px",
                  fontWeight: "bold",
                  transition: "0.3s"
                }}
              >
                ✓
              </div>

              <small style={{ fontSize: "11px" }}>
                {step.replaceAll("_", " ")}
              </small>

            </div>

          ))}
        </div>

      </div>
    );
  };

  // ================= LOADING =================
  if (loading) return <p style={{ padding: 20 }}>Loading orders...</p>;

  if (orders.length === 0)
    return <p style={{ padding: 20 }}>No orders yet 📦</p>;

  // ================= UI =================
  return (
    <div style={{ padding: "25px" }}>
      <h2>Your Orders</h2>

      {orders.map(order => (

        <div
          key={order.id}
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
            marginBottom: "20px"
          }}
        >
          <h3>Order #{order.id}</h3>

          <p>
            Status:
            <b style={{ color: "#28a745", marginLeft: "5px" }}>
              {order.status}
            </b>
          </p>

          <p>Total: ₹{order.totalPrice}</p>

          <StatusTracker status={order.status} />

        </div>

      ))}

    </div>
  );
}

export default Orders;