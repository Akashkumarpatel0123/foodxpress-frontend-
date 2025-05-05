import React, { useState } from 'react';
import '../Style/Notification.css'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaWhatsapp } from 'react-icons/fa';

const Notification = () => {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    enableAll: false,
    promosPush: false,
    promosWhatsapp: false,
    socialPush: false,
    socialWhatsapp: false,
    ordersPush: false,
    ordersWhatsapp: false,
  });

  const toggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="notification-container">
      <div className="notification-header">
        <button className="cancel-btn" onClick={() => navigate('/home')}>
          <FaArrowLeft /> Notification Preferences
        </button>
      </div>

      <div className="notification-section">
        <h2>Enable all</h2>
        <p>Activate all notifications</p>
        <label className="switch">
          <input type="checkbox" checked={settings.enableAll} onChange={() => toggle('enableAll')} />
          <span className="slider"></span>
        </label>
      </div>

      <hr />

      <div className="notification-section">
        <h3>Promos and offers</h3>
        <p>Receive updates about coupons, promotions and money-saving offers</p>
        <div className="toggle-row">
          <span>🔔 Push</span>
          <label className="switch">
            <input type="checkbox" checked={settings.promosPush} onChange={() => toggle('promosPush')} />
            <span className="slider"></span>
          </label>
        </div>
        <div className="toggle-row">
          <span><FaWhatsapp className="whatsapp-icon" /> WhatsApp</span>
          <label className="switch">
            <input type="checkbox" checked={settings.promosWhatsapp} onChange={() => toggle('promosWhatsapp')} />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <hr />

      <div className="notification-section">
        <h3>Social notifications</h3>
        <p>Get notified when someone follows your profile, or when you get likes and comments on reviews and photos posted by you</p>
        <div className="toggle-row">
          <span>🔔 Push</span>
          <label className="switch">
            <input type="checkbox" checked={settings.socialPush} onChange={() => toggle('socialPush')} />
            <span className="slider"></span>
          </label>
        </div>
        <div className="toggle-row">
          <span><FaWhatsapp className="whatsapp-icon" /> WhatsApp</span>
          <label className="switch">
            <input type="checkbox" checked={settings.socialWhatsapp} onChange={() => toggle('socialWhatsapp')} />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <hr />

      <div className="notification-section">
        <h3>Orders and purchases</h3>
        <p>Receive updates related to your order status, memberships, table bookings and more</p>
        <div className="toggle-row">
          <span>🔔 Push</span>
          <label className="switch">
            <input type="checkbox" checked={settings.ordersPush} onChange={() => toggle('ordersPush')} />
            <span className="slider"></span>
          </label>
        </div>
        <div className="toggle-row">
          <span><FaWhatsapp className="whatsapp-icon" /> WhatsApp</span>
          <label className="switch">
            <input type="checkbox" checked={settings.ordersWhatsapp} onChange={() => toggle('ordersWhatsapp')} />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Notification;
