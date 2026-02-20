import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        alert("Invalid credentials ❌");
        return;
      }

      const data = await response.json();

      const token =
        data.token ||
        data.jwt ||
        data.accessToken ||
        data;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", "14");

      setIsLoggedIn(true);

      alert("Login Successful ✅");
      navigate("/dashboard");

    } catch {
      alert("Server error ❌");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <div className="password-box">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <span
            className="eye-icon"
            onMouseDown={(e)=>e.preventDefault()}
            onClick={()=>setShowPassword(p=>!p)}
          >
            {showPassword ? "🙈" : "👁"}
          </span>

        </div>

        <button onClick={handleLogin}>Sign In</button>

        <p className="link" onClick={()=>navigate("/register")}>
          New User? Register
        </p>

      </div>
    </div>
  );
}

export default Login;