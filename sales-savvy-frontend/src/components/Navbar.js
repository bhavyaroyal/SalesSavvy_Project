import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCart } from "../services/cartService";
import { useSearch } from "../context/SearchContext";

const Navbar = ({ setIsLoggedIn }) => {

  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const { setSearchTerm } = useSearch();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setSearchTerm(e.target.value);
  };

  const loadCart = async () => {
    try {
      const res = await getCart();
      setCount(res.data.length);
    } catch {
      setCount(0);
    }
  };

  useEffect(() => {
    loadCart();
    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, []);

  // ✅ FIXED LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    setIsLoggedIn(false); // ⭐ IMPORTANT FIX
    navigate("/");
  };

  return (
    <div
      style={{
        background: "#111",
        color: "white",
        padding: "15px",
        display: "flex",
        alignItems: "center"
      }}
    >
      {/* LEFT */}
      <div style={{ flex: 1 }}>
        <h2>Sales Savvy</h2>
      </div>

      {/* SEARCH */}
      <div style={{ flex: 1, textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleSearch}
          style={{
            width: "60%",
            padding: "8px",
            borderRadius: "20px",
            border: "none"
          }}
        />
      </div>

      {/* MENU */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px"
        }}
      >
        <Link to="/products" style={{ color: "white" }}>
          Products
        </Link>

        <Link to="/cart" style={{ color: "white" }}>
          Cart 🛒 ({count})
        </Link>

        <button onClick={() => navigate("/orders")}>Orders 📦</button>
        <button onClick={() => navigate("/profile")}>Profile 👤</button>

        <button
          onClick={logout}
          style={{
            background: "red",
            color: "white",
            border: "none",
            padding: "6px 12px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;