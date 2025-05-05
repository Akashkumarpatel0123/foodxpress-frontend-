import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Component imports
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import Rating from "./Components/Rating";
import Settings from "./Components/Settings";
import Notification from "./Components/Notification";
import RelatedQuery from "./Components/RelatedQuery";
import SplashScreen from "./Components/SplashScreen";
import Payment from "./Components/Payment";
import Cart from "./Components/Cart";
import FoodList from "./Components/FoodList"; // optional, only if you're using this
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import RestaurantDashboard from "./Components/RestaurantDashboard/RestaurantDashboard";
import RestaurantMenu from "./Components/RestaurantMenu";

// Context imports
import { CartProvider } from "./context/CartContext";  // Make sure CartProvider is imported

const App = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 6000); // 6 seconds splash screen

    return () => clearTimeout(timer);
  }, []);

  return (
    <CartProvider> {/* Wrap the entire app with CartProvider */}
      <Router>
        {isSplashVisible ? (
          <SplashScreen />
        ) : (
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/rating" element={<Rating />} />
            <Route path="/setting" element={<Settings />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/query" element={<RelatedQuery />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/food" element={<FoodList />} /> {/* Optional route */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/restaurant-dashboard" element={<RestaurantDashboard />} />
            <Route path="/restaurant/:id" element={<RestaurantMenu />} />
          </Routes>
        )}
      </Router>
    </CartProvider>
  );
};

export default App;
