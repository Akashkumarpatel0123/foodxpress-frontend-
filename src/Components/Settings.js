import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/Settings.css'; // Make sure the path is correct

const Settings = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`settings-container ${darkMode ? 'dark' : ''}`}>
      <div className="cancel-btn-container">
        <button className="cancel-button" onClick={() => navigate('/home')}>
          Cancel
        </button>
      </div>

      <h1 className="settings-title">Settings</h1>

      {/* 👇 Navigate to /notification on click */}
      <div className="setting-option clickable" onClick={() => navigate('/notification')}>
        <span>Notifications</span>
        <button className="secondary-btn">Manage</button>
      </div>

      <div className="setting-option">
        <span>Dark Mode</span>
        <label className="switch">
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
          <span className="slider round"></span>
        </label>
      </div>

      <div className="setting-option clickable" onClick={() => navigate('/query')}>
        <span>Related Queries</span>
        <button className="secondary-btn">View</button>
      </div>

      <div className="setting-option">
        <span>Help Desk</span>
        <button className="secondary-btn">Contact</button>
      </div>
    </div>
  );
};

export default Settings;
