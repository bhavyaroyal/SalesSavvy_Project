import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import OrderSuccess from "./pages/OrderSuccess";
import Payment from "./pages/Payment";

import Navbar from "./components/Navbar";

import ProtectedRoute from "./components/ProtectedRoute";


// ✅ CONTROL NAVBAR VISIBILITY
function AppContent({ isLoggedIn, setIsLoggedIn }) {

  const location = useLocation();

  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/register";

  return (
    <>
      {/* SHOW NAVBAR ONLY AFTER LOGIN */}
      {isLoggedIn && !hideNavbar && (
        <Navbar setIsLoggedIn={setIsLoggedIn} />
      )}

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route
          path="/"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />

        <Route path="/register" element={<Register />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="/payment" element={<Payment />} />
        <Route path="/order-success" element={<OrderSuccess />} />

      </Routes>
    </>
  );
}


// ✅ MAIN APP
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <AppContent
      isLoggedIn={isLoggedIn}
      setIsLoggedIn={setIsLoggedIn}
    />
  );
}

export default App;