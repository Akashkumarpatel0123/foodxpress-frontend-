// src/components/SplashScreen.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/SplashScreen.css"; // Optional: Add your custom CSS for splash screen

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to the home page after 3 seconds
    const timer = setTimeout(() => {
      navigate("/");  // Replace with the route you want
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer
  }, [navigate]);

  return (
    <div className="splash-container">
      <h1 className="company-name">FoodXpress</h1>
    </div>
  );
};

export default SplashScreen;
