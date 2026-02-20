import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

function Profile() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const token = localStorage.getItem("token");

  // form state
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });

  // ================= FETCH PROFILE =================
  useEffect(() => {
    axios.get("http://localhost:8080/api/profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setUser(res.data);
      setFormData({
        name: res.data.name,
        email: res.data.email
      });
      setLoading(false);
    })
    .catch(() => setLoading(false));
  }, [token]);

  // ================= INPUT CHANGE =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ================= SAVE PROFILE =================
  const saveProfile = () => {

    axios.put(
      "http://localhost:8080/api/profile",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(res => {
      setUser(res.data);
      setEditMode(false);
      alert("✅ Profile Updated");
    })
    .catch(() => alert("❌ Update Failed"));
  };

  if (loading) return <h2>Loading...</h2>;
  if (!user) return <h2>Error loading profile</h2>;

  return (
    <div className="profile-container">

      <div className="profile-card">

        <h1>My Profile 👤</h1>

        {editMode ? (
          <>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input"
            />

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input"
            />

            <div className="btn-group">
              <button className="save-btn" onClick={saveProfile}>
                Save 💾
              </button>

              <button
                className="cancel-btn"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p><b>Name:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Role:</b> {user.role}</p>

            <button
              className="edit-btn"
              onClick={() => setEditMode(true)}
            >
              Edit Profile ✏️
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default Profile;