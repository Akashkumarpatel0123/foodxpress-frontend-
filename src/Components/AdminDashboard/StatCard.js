import React from 'react';
import './AdminDashboard.css';

const StatCard = ({ title, value, color }) => (
  <div className="stat-card" style={{ borderLeft: `5px solid ${color}` }}>
    <h2>{value}</h2>
    <p>{title}</p>
  </div>
);

export default StatCard;
