// src/components/Login.js
import React, { useState } from "react";
import "../styles/Login.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [gmail, setGmail] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) { 
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (!gmail || !fullName) {
        setError("Full Name and Gmail are required.");
        return;
      }
      setError("");
      alert("Sign Up Successful! Now you can login.");
      setIsSignUp(false);
    } else {
      if (username && password) {
        onLogin(true);
      } else {
        setError("Invalid credentials. Please try again.");
      }
    }
  };

  return (
    <div className="login-page">
      {/* Header outside login container */}
      <header className="app-header">
        <h1>⚡ Welcome to Climora Weather App ⚡</h1>
        <p>Your gateway to real-time weather updates with a futuristic touch.</p>
      </header>

      <div className="login-container">
        <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div>
              <label>Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          )}
          <div>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {isSignUp && (
            <div>
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
          {isSignUp && (
            <div>
              <label>Gmail</label>
              <input
                type="email"
                value={gmail}
                onChange={(e) => setGmail(e.target.value)}
                required
              />
            </div>
          )}
          {error && <p className="error-message">{error}</p>}
          <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
        </form>
        <div>
          <button onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
