import React from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  return (
    <div className="dashboard">

      <h1 className="title">🚀 Welcome to Sales Savvy</h1>
      <p className="subtitle">Your Smart Shopping Dashboard</p>

      <div className="stats">

        <div
          className="box products"
          onClick={() => navigate("/products")}
        >
          🛍 Products
        </div>

        <div
          className="box cart"
          onClick={() => navigate("/cart")}
        >
          🛒 Cart
        </div>

        <div
          className="box orders"
          onClick={() => navigate("/orders")}
        >
          📦 Orders
        </div>

        <div
          className="box profile"
          onClick={() => navigate("/profile")}
        >
          👤 Profile
        </div>

      </div>

    </div>
  );
}

export default Dashboard;