import React, { useState } from "react";
import { login } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userData = await login(username, password);
      localStorage.setItem("isAuthenticated", "true");
      window.dispatchEvent(new Event("storage"));
      navigate("/");
    } catch (error) {
      const message = error?.response?.data || "Invalid credentials!";
      alert(message);
    }
  };

  return (
    <div className="center-layout">
      <div className="auth-container">
        <h2>Login</h2>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
        <div style={{ marginTop: '12px' }}>
          <p style={{ margin: 0 }}>Don't have an account?</p>
          <Link to="/signup" className="signup-btn">Create Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
