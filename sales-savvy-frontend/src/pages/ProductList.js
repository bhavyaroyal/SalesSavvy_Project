import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/app.css";
import { useSearch } from "../context/SearchContext";
import { useNavigate } from "react-router-dom";
import { addItemToCart } from "../services/cartService";

function ProductList() {

  const [products, setProducts] = useState([]);

  const navigate = useNavigate(); // ✅ FIX 1
  const [addedItems, setAddedItems] = useState({});


  

  const token = localStorage.getItem("token");

  // ✅ search from navbar
  const { searchTerm } = useSearch();

  // ================= FETCH PRODUCTS =================
  useEffect(() => {

    axios.get("http://localhost:8080/api/products", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setProducts(res.data))
    .catch(err => console.error(err));

  }, [token]);

  // ================= ADD TO CART =================
  const addToCart = async (productId) => {
    try {
  
      await addItemToCart(productId);
  
      setAddedItems(prev => ({
        ...prev,
        [productId]: true
      }));
  
      // update navbar count
      window.dispatchEvent(new Event("cartUpdated"));
  
      alert("Added to cart ✅");
  
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart ❌");
    }
  };

  // ================= FILTER PRODUCTS =================
  const filteredProducts = products.filter(product =>
    product.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // ================= UI =================
  return (
    <div className="product-page">

      <h2 className="page-title">Products</h2>

      {filteredProducts.length === 0 ? (

        <div className="empty-state">
          <h3>🔍 No Products Found</h3>
          <p>Try searching something else</p>
        </div>

      ) : (

        <div className="product-grid">

          {filteredProducts.map(product => (

            <div key={product.id} className="product-card">

              <div className="product-image">📱</div>

              {/* ✅ Mobile name shown as title */}
              <h3>{product.name}</h3>

              {/* ✅ Description below */}
              <p className="category">{product.description}</p>

              <p className="price">₹{product.price}</p>

              {/* ✅ Add / View Cart Toggle */}
              {addedItems[product.id] ? (
                <button
                  onClick={() => navigate("/cart")}
                  className="view-cart-btn"
                >
                  🛒 View Cart
                </button>
              ) : (
                <button
                  className="add-btn"
                  onClick={() => addToCart(product.id)}
                >
                  Add to Cart
                </button>
              )}

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default ProductList;