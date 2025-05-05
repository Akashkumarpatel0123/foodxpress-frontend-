import React from 'react';
import { useNavigate } from 'react-router-dom';
import waitTimeImg from '../assets/images/wait-time.png';
import courtesyImg from '../assets/images/courtesy.png';
import generosityImg from '../assets/images/generosity.png';
import '../Style/Rating.css';

const Rating = () => {
  const navigate = useNavigate();

  return (
    <div className="rating-container">
      <div className="cancel-btn-container">
        <button className="cancel-btn" onClick={() => navigate('/home')}>Cancel</button>
      </div>

      <h1 className="rating-title">Understanding your rating</h1>
      <p className="rating-description">
        To foster mutual respect within the FoodXpress community, delivery partners will now rate you on a scale of 1 to 5 after each delivery, just like you rate them. We request that you think about what can affect your delivery partner's happiness and become a 5-star customer.
      </p>

      <div className="rating-section">
        <img src={waitTimeImg} alt="Short wait time" />
        <div>
          <h2>Short wait times</h2>
          <p>Make sure that the address entered by you is accurate and prevent drop-off delays.</p>
        </div>
      </div>

      <div className="rating-section">
        <img src={courtesyImg} alt="Courtesy" />
        <div>
          <h2>Courtesy</h2>
          <p>Being polite and kind goes a long way.</p>
        </div>
      </div>

      <div className="rating-section">
        <img src={generosityImg} alt="Generosity" />
        <div>
          <h2>Generosity</h2>
          <p>Support delivery partners by giving them a generous tip, if you can afford it.</p>
        </div>
      </div>

      <div className="rating-calc">
        <h2>How is your rating calculated</h2>
        <p>Your rating will show once you receive ratings on minimum 5 food orders. It is calculated as an average of all your past ratings.</p>
        <p>A consistently good rating means you create joyful experiences for people. More power to you!</p>
      </div>

      <div className="rating-buttons">
        <button className="okay-button">Okay</button>
      </div>
    </div>
  );
};

export default Rating;
