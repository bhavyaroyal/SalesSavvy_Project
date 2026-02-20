import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [role,setRole]=useState("");
  const [showPassword,setShowPassword]=useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/register",{
        method:"POST",
        headers:{ "Content-Type":"application/json"},
        body:JSON.stringify({username,email,password,role})
      });

      if(!res.ok) throw new Error();

      alert("Registration Successful ✅");
      navigate("/");

    } catch {
      alert("Registration Failed ❌");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2>Register</h2>

        <form onSubmit={handleRegister}>

          <input
            placeholder="Username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <div className="password-box">

            <input
              type={showPassword?"text":"password"}
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />

            <span
              className="eye-icon"
              onMouseDown={(e)=>e.preventDefault()}
              onClick={()=>setShowPassword(p=>!p)}
            >
              {showPassword ? "🙈":"👁"}
            </span>

          </div>

          <select
            value={role}
            onChange={(e)=>setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>

          <button type="submit">Sign Up</button>

        </form>

        <p className="link" onClick={()=>navigate("/")}>
          Already registered? Login
        </p>

      </div>
    </div>
  );
}

export default Register;