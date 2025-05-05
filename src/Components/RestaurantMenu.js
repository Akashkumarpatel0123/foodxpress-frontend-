import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Style/RestaurantMenu.css";

import parathaImg from '../assets/images/aloo-paratha-gobi-paratha-also-known-as-potato-cauliflower-stuffed-flatbread-dish-originating-from-indian-subcontinent.jpg';
import chickenImg from '../assets/images/chicken-skewers-with-slices-sweet-peppers-dill.jpg';

const mockRestaurants = [
  {
    id: "1",
    name: "Aloo Paratha Corner",
    description: "Authentic North Indian stuffed flatbreads with rich butter and homemade pickles.",
    image: parathaImg,
    menu: [
      { id: "m1", name: "Aloo Paratha", price: 60 },
      { id: "m2", name: "Gobi Paratha", price: 70 },
      { id: "m3", name: "Paneer Paratha", price: 80 },
    ],
  },
  {
    id: "2",
    name: "Chicken Skewers Grill",
    description: "Delicious grilled chicken skewers with spicy dips and salads.",
    image: chickenImg,
    menu: [
      { id: "m1", name: "Chicken Skewers (6 pcs)", price: 180 },
      { id: "m2", name: "Peri Peri Chicken", price: 200 },
      { id: "m3", name: "Chicken Tikka", price: 220 },
    ],
  },
];

const RestaurantMenu = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
    const found = mockRestaurants.find((rest) => rest.id === id);
    if (found) {
      setRestaurant(found);
    } else {
      console.warn(`Restaurant with ID ${id} not found.`);
      navigate("/"); // Redirect back home if not found
    }
  }, [id, navigate]);

  // Handle Add to Cart
  const handleAddToCart = (item) => {
    const uniqueItemId = `${restaurant.id}-${item.id}`; // Combine restaurant id + item id for uniqueness

    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.uniqueId === uniqueItemId);
      if (existing) {
        // If item exists, increase the quantity
        return prevCart.map((i) =>
          i.uniqueId === uniqueItemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // If item doesn't exist, add it to the cart with quantity 1
        return [
          ...prevCart,
          { ...item, quantity: 1, uniqueId: uniqueItemId, restaurantId: restaurant.id },
        ];
      }
    });

    setShowCart(true); // Show cart when something is added
  };

  // Save the updated cart to localStorage
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  if (!restaurant) {
    return <div className="restaurant-menu">Loading...</div>;
  }

  return (
    <div className="restaurant-menu">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="restaurant-header">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="restaurant-image"
        />
        <div className="restaurant-info">
          <h1>{restaurant.name}</h1>
          <p>{restaurant.description}</p>
        </div>
      </div>

      <h2>Menu</h2>
      <div className="menu-list">
        {restaurant.menu.map((item) => (
          <div className="menu-item" key={item.id}>
            <div className="menu-details">
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
            </div>
            <button className="add-btn" onClick={() => handleAddToCart(item)}>
              Add +
            </button>
          </div>
        ))}
      </div>

      {showCart && (
        <div className="cart-popup">
          <h3>Your Cart</h3>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {cart.map((item) => (
                <li key={item.uniqueId}> {/* Use uniqueId as the key */}
                  {item.name} × {item.quantity} — ₹{item.price * item.quantity}
                </li>
              ))}
            </ul>
          )}
          <p>
            Total: ₹
            {cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
          </p>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;
