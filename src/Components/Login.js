import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style/Login.css";
import { auth, provider, signInWithPopup } from "../firebase";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { setUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
    role: "user",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      const role = data.user?.role || "user";
      const redirectPaths = {
        admin: "/admin-dashboard",
        restaurant: "/restaurant-dashboard",
        user: "/home",
      };

      setUser(data.user);
      updateUserProfile(data.user);

      if (formData.rememberMe) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
      }

      // Navigate based on the role
      navigate(redirectPaths[role] || "/home");
    } catch (error) {
      setErrorMessage(error.message || "Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const response = await fetch("http://localhost:5000/api/auth/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL,
          role: formData.role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Google login failed");
      }

      const role = data.user?.role || "user";
      const redirectPaths = {
        admin: "/admin-dashboard",
        restaurant: "/restaurant-dashboard",
        user: "/home",
      };

      setUser(data.user);
      updateUserProfile(data.user);

      if (formData.rememberMe) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
      }

      // Navigate based on the role
      navigate(redirectPaths[role] || "/home");
    } catch (error) {
      setErrorMessage(error.message || "Failed to login with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="skip-btn-container">
        <Link to="/home" className="skip-btn">Skip</Link>
      </div>

      <div className="left-panel">
        <h1>FoodXpress</h1>
        <p>Your favorite food, delivered fast</p>

        <div className="tab-container">
          <button className="tab active">Login</button>
          <Link to="/register">
            <button className="tab">Register</button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="form-container">
          <h2>Welcome back 👋</h2>
          <p>Login to your account to continue</p>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="username"
          />

          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <div className="user-type-container">
            <label htmlFor="role">Login as:</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="user">Regular User</option>
              <option value="admin">Administrator</option>
              <option value="restaurant">Restaurant Owner</option>
            </select>
          </div>

          <div className="remember-me">
            <label>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              Remember Me
            </label>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="register-link">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>

          <div className="social-login">
            <p>Or login with:</p>
            <button
              type="button"
              className="google-btn"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              {loading ? "Processing..." : "Continue with Google"}
            </button>
          </div>
        </form>
      </div>

      <div className="right-panel">
        <h1>Order delicious food online!</h1>
        <p>
          Discover amazing restaurants and get your favorite food delivered to
          your doorstep with FoodXpress.
        </p>
        <ul>
          <li>Choose from 1000+ restaurants</li>
          <li>Fast delivery in under 30 minutes</li>
          <li>Exclusive discounts for members</li>
        </ul>
      </div>
    </div>
  );
};

export default Login;
