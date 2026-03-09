import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "../styles/app.css"; // make sure app.css exists inside src/styles/
import { placeOrder  } from "../services/orderService";
import { useNavigate } from "react-router-dom";
import "../styles/cart.css"; 

function Cart() {

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Get userId from localStorage (set during login)
  const userId = localStorage.getItem("userId");

  // GET TOKEN
  const token = localStorage.getItem("token");

  // -----------------------------
// CALCULATE TOTAL PRICE
// -----------------------------
const totalPrice = cartItems.reduce(
  (total, item) =>
    total + (item.product?.price || 0) * item.quantity,
  0
);

  // -----------------------------
  // FETCH CART ITEMS
  // -----------------------------
  const fetchCart = useCallback(() => {
    axios.get(`http://localhost:8080/api/cart/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      setCartItems(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Error fetching cart:", err);
      setLoading(false);
    });
  }, [userId, token]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // -----------------------------
  // INCREASE QUANTITY
  // -----------------------------
  const increaseQuantity = (cartItem) => {
    const updatedQuantity = cartItem.quantity + 1;
    axios.put(`http://localhost:8080/api/cart/update/${cartItem.id}`, {
      quantity: updatedQuantity
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => fetchCart())
    .catch(err => console.error(err));
  };

  // -----------------------------
  // DECREASE QUANTITY
  // -----------------------------
  const decreaseQuantity = (cartItem) => {
    if (cartItem.quantity <= 1) return; // min 1
    const updatedQuantity = cartItem.quantity - 1;
    axios.put(`http://localhost:8080/api/cart/update/${cartItem.id}`, {
      quantity: updatedQuantity
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => fetchCart())
    .catch(err => console.error(err));
  };

  // -----------------------------
  // REMOVE ITEM
  // -----------------------------
  const removeItem = (cartItemId) => {
    axios.delete(`http://localhost:8080/api/cart/${cartItemId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => fetchCart())
    .catch(err => console.error(err));
  };


  const handleCheckout = async () => {
    try {
  
      const userId = localStorage.getItem("userId");
  
      await placeOrder(userId);
  
      // clear cart UI
      setCartItems([]);
  
      // GO TO SUCCESS PAGE
      navigate("/order-success");
  
    } catch (error) {
      console.error(error);
      alert("Order failed");
    }
  };
  // -----------------------------
  // RENDER
  // -----------------------------
  if (loading) return <p>Loading Cart...</p>;

  if (cartItems.length === 0) return <p>Your cart is empty 🛒</p>;

  return (
    <div className="cart-page">
    <h2 className="cart-title">Your Cart</h2>
    <div className="cart-grid">
      {cartItems.map(item => (
        <div key={item.id} className="cart-card">
          <div className="cart-info">
            <h3>{item.product?.name}</h3>
            <p>Price: ₹{item.product?.price}</p>
            <p>
  Quantity:
  <button className="qty-btn" onClick={() => decreaseQuantity(item)}>-</button>
  <span style={{ margin: "0 10px" }}>{item.quantity}</span>
  <button className="qty-btn" onClick={() => increaseQuantity(item)}>+</button>
</p>
          </div>
          <button className="remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
    </div>
    <div className="cart-summary">
      <h3>Total Price: ₹{totalPrice}</h3>
      <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
    </div>
  </div>
  );
}

export default Cart;
