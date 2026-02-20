import axios from "axios";

const API_URL = "http://localhost:8080/api";


// ================= ADD TO CART =================
export const addItemToCart = async (productId) => {

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  return axios.post(
    `${API_URL}/cart/add`,
    {
      userId: Number(userId),
      productId: productId,
      quantity: 1
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

// ================= GET CART =================
export const getCart = async () => {

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  return axios.get(
    `${API_URL}/cart/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};