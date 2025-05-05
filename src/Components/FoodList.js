import React, { useEffect, useState } from "react";
import "../Style/FoodList.css"; // Ensure you have this CSS file for styling
const FoodList = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/food");
        const data = await response.json();
        setFoods(data);
      } catch (error) {
        console.error("Error fetching food:", error);
      }
    };

    fetchFood();
  }, []);

  return (
    <div className="food-list">
      <h2>Available Foods</h2>
      <div className="food-grid">
        {foods.map((food) => (
          <div className="food-card" key={food._id}>
            <img src={food.image} alt={food.name} />
            <h3>{food.name}</h3>
            <p>{food.description}</p>
            <p>₹{food.price}</p>
            <span className="badge">{food.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodList;
