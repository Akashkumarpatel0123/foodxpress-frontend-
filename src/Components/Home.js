import React, { useEffect, useState } from "react";
import "../Style/Home.css";
import { FaMapMarkerAlt, FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

// Food icons
import pizza from "../assets/foodIcons/pizza.jpg";
import burger from "../assets/foodIcons/Burger.jpg";
import biryani from "../assets/foodIcons/Biryani.jpg";
import chinese from "../assets/foodIcons/Chinese.jpg";
import southindian from "../assets/foodIcons/South Indian.jpg";
import desserts from "../assets/foodIcons/Desserts.jpg";

// Restaurant images
import restaurant1 from "../assets/images/aloo-paratha-gobi-paratha-also-known-as-potato-cauliflower-stuffed-flatbread-dish-originating-from-indian-subcontinent.jpg";
import restaurant2 from "../assets/images/chicken-skewers-with-slices-sweet-peppers-dill.jpg";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isVeg, setIsVeg] = useState(true);
  const [location, setLocation] = useState("Fetching location...");
  const [userName, setUserName] = useState("Guest");
  const [cartItems, setCartItems] = useState([]);  // ✅ FIXED MISSING STATE
  const navigate = useNavigate();

  const categories = [
    { name: "Pizza", image: pizza },
    { name: "Burger", image: burger },
    { name: "Biryani", image: biryani },
    { name: "Chinese", image: chinese },
    { name: "South Indian", image: southindian },
    { name: "Desserts", image: desserts },
  ];

  const restaurants = [
    {
      id: "1",
      name: "Aloo Paratha Corner",
      image: restaurant1,
      time: "15-20 min",
    },
    {
      id: "2",
      name: "Chicken Skewers Grill",
      image: restaurant2,
      time: "20-25 min",
    },
  ];

  useEffect(() => {
    // Fetch cart items from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const handleAddToCart = (item) => {
    const updatedCart = [...cartItems, item];
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    const getLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const response = await fetch(
                `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=dc2760c39af4431bbf58dcc2eda40fc5`
              );
              const data = await response.json();
              const place = data?.results?.[0]?.components;
              const city = place.city || place.town || place.village || "";
              const state = place.state || "";
              setLocation(`${city}, ${state}`);
            } catch (error) {
              setLocation("Location not found");
              console.error("Error fetching location:", error);
            }
          },
          () => {
            setLocation("Permission denied");
          }
        );
      } else {
        setLocation("Geolocation not supported");
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const name = user.displayName || user.email?.split("@")[0] || "Guest";
        setUserName(name);
      } else {
        setUserName("Guest");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("✅ User signed out successfully");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("❌ Logout failed:", error.message);
    }
  };

  const handleRestaurantClick = (id) => {
    navigate(`/restaurant/${id}`);
  };

  return (
    <div className="home">
      <div className="cart" onClick={() => navigate("/cart")}>
        <FaShoppingCart className="cart-icon" />
        <span className="cart-text">
          {cartItems.length > 0 ? `Cart (${cartItems.length})` : "Your Cart is empty"}
        </span>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>
          ✕
        </button>
        <ul>
          <li className="profile" onClick={() => navigate("/profile")}>
            Your Profile
          </li>
          <li>
            Veg Mode
            <label className="switch">
              <input
                type="checkbox"
                checked={!isVeg}
                onChange={() => setIsVeg(!isVeg)}
              />
              <span className="slider round"></span>
            </label>
          </li>
          <li className="rating" onClick={() => navigate("/rating")}>
            Your Rating
          </li>
          <li>
            Food Xpress <span className="join-tag">(Join Restaurant)</span>
          </li>
          <li className="rating" onClick={() => navigate("/setting")}>
            Settings
          </li>
          <li onClick={handleLogout}>Logout</li>
          <li>Send Feedback</li>
        </ul>
      </div>

      {/* Header */}
      <div className="home-header">
        <div className="location">
          <FaMapMarkerAlt />
          <span>Delivery to</span>
          <strong> {location}</strong>
        </div>
        <div className="profile" onClick={() => setSidebarOpen(true)}>
          <FaUserCircle className="profile-icon" />
          <span className="profile-name">{userName}</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for restaurants, cuisines, dishes..."
        />
      </div>

      {/* Categories */}
      <h2>What's on your mind?</h2>
      <div className="categories">
        {categories.map((item, index) => (
          <div className="category" key={index}>
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>

      {/* Offers */}
      <h2>Offers For You</h2>
      <div className="offers">
        <div className="offer-card">
          <p>
            <strong>50% OFF</strong>
            <br />
            Up to ₹100 | Use code WELCOME
          </p>
        </div>
        <div className="offer-card">
          <p>
            <strong>FREE DELIVERY</strong>
            <br />
            On orders above ₹299
          </p>
        </div>
      </div>

      {/* Nearby Restaurants */}
      <h2>Restaurants Near You</h2>
      <div className="restaurants">
        {restaurants.map((rest) => (
          <div
            key={rest.id}
            className="restaurant-card"
            onClick={() => handleRestaurantClick(rest.id)}
            style={{ cursor: "pointer" }}
          >
            <img src={rest.image} alt={rest.name} />
            <span className="time">{rest.time}</span>
            <p>{rest.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
