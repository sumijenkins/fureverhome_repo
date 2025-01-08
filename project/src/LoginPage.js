import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate importu
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate(); // useNavigate hook'u

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
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log("Login successful:", data);
        setError(""); // Clear any previous error

        setUserName(data.userName);
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user.name);  // Kullanıcı adı kaydedildi
        localStorage.setItem("email", data.user.email);  // Kullanıcı emaili kaydedildi
        // Yönlendirme işlemi: Login başarılıysa dashboard'a yönlendir
        navigate("/dashboard"); // Dashboard sayfasına yönlendir
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
