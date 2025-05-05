import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style/Register.css";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    const { name, email, password, confirmPassword, role } = formData;

    if (!name || !email || !password || !confirmPassword) {
      return alert("❌ Please fill in all fields");
    }

    if (password !== confirmPassword) {
      return alert("❌ Password and Confirm Password do not match");
    }

    if (password.length < 6) {
      return alert("❌ Password must be at least 6 characters long");
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();
      if (!res.ok) {
        return alert(`❌ ${data.message || "Registration failed"}`);
      }

      alert(`✅ ${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully!`);

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      console.log("✅ Firebase user created!");

      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "restaurant") {
        navigate("/restaurant-dashboard");
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.error("❌ Register error:", err);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <div className="skip-btn-container">
        <Link to="/home" className="skip-btn">Skip</Link>
      </div>

      <div className="left-panel">
        <h1>FoodXpress</h1>
        <p>Your favorite food, delivered fast</p>
        <div className="tab-container">
          <Link to="/login"><button className="tab">Login</button></Link>
          <button className="tab active">Register</button>
        </div>

        <div className="form-container">
          <h2>Create Account</h2>
          <p>Fill in the details to register</p>

          <input
            type="text"
            placeholder="Enter your username"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Confirm your password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <div className="user-type-container">
            <select
              name="role"
              className="user-type-select"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="restaurant">Restaurant</option>
            </select>
          </div>

          <button className="register-btn" onClick={handleRegister}>
            Register
          </button>

          <p className="login-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>

      <div className="right-panel">
        <h1>Delicious food, just a tap away!</h1>
        <p>
          Sign up now and enjoy exclusive discounts, lightning-fast delivery,
          and the best restaurants in town.
        </p>
        <ul>
          <li>Easy signup process</li>
          <li>Verified restaurants only</li>
          <li>24/7 customer support</li>
          <li>Track orders in real-time</li>
        </ul>
      </div>
    </div>
  );
};

export default Register;
