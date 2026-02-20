import axios from "axios";

const API = "http://localhost:8080/api/order";

// ==========================
// PLACE ORDER
// ==========================
export const placeOrder = async (userId) => {

  const token = localStorage.getItem("token");

  return axios.post(
    `${API}/place/${userId}`,
    {}, // ✅ EMPTY BODY (backend expects nothing)
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};