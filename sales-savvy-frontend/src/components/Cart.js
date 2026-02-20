import React, { useEffect, useState } from "react";
import axios from "axios";

function Cart() {

  // ---------------- STATE ----------------
  const [cartItems, setCartItems] = useState([]);
  const userId = 14; // temporary logged user

  // ---------------- LOAD CART ----------------
  const loadCart = () => {
    axios
      .get(`http://localhost:8080/api/cart/${userId}`)
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cart:", error);
      });
  };

  // load when page opens
  useEffect(() => {
    loadCart();
  }, []);

  // ---------------- TOTAL PRICE ----------------
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // ---------------- PLACE ORDER ----------------
  const placeOrder = () => {
    axios
      .post(`http://localhost:8080/api/order/place/14`)
      .then(() => {
        alert("Order Placed Successfully ✅");
        loadCart(); // refresh cart
      })
      .catch(() => alert("Order failed"));
  };

  // ---------------- CLEAR CART ----------------
  const clearCart = () => {
    axios
      .delete(`http://localhost:8080/api/cart/clear/${userId}`)
      .then(() => {
        alert("Cart Cleared 🧹");
        loadCart();
      })
      .catch(() => alert("Failed to clear cart"));
  };

  // ---------------- UI ----------------
  return (
    <div className="cart-page">
  <h2 className="cart-title">Your Cart</h2>
  <div className="cart-grid">
    {cartItems.map(item => (
      <div key={item.id} className="cart-card">
        <div className="cart-info">
          <h3>{item.product?.name}</h3>
          <p>Price: ₹{item.product?.price}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
        <button className="remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
      </div>
    ))}
  </div>
  <div className="cart-summary">
    <h3>Total Price: ₹{totalPrice}</h3>
    <button className="checkout-btn" onClick={() => navigate("/payment")}>Checkout</button>
  </div>
</div>
  );
}

export default Cart;
