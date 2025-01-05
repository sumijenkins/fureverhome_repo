import React, { useState } from "react";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Verilerin doğru şekilde gönderildiğinden emin olun
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Backend Error:", errorData);
        setError(errorData.message || "Login failed. Please try again.");
      } else {
        const data = await response.json();
        console.log("Login successful:", data);
        setError(""); // Clear any previous error
        // Redirect to a dashboard or homepage after successful login
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };


  return (
    <div className="login-container">
      <h1>Welcome to FurEverHome!</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <div className="show-password">
            <input
              type="checkbox"
              id="show-password"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="show-password">Show Password</label>
          </div>
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <div className="signup-link">
        <p>
          Not a member? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
