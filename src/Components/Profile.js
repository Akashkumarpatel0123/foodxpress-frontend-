import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "../Style/Profile.css";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.profileImage);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
    dob: user?.dob || "",
    anniversary: user?.anniversary || "",
    gender: user?.gender || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        mobile: user.mobile || "",
        dob: user.dob || "",
        anniversary: user.anniversary || "",
        gender: user.gender || "",
      });
      setProfileImage(user.profileImage);
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateUserProfile({ ...formData, profileImage }); // Update global user data
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <button className="close-button" onClick={() => navigate("/home")}>
        &times;
      </button>

      <h2>Your Profile</h2>

      {/* Profile Image */}
      <div className="profile-picture">
        {profileImage ? (
          <img src={profileImage} alt="Profile" />
        ) : (
          <div className="initial-avatar">
            {formData.name ? formData.name.charAt(0).toUpperCase() : "?"}
          </div>
        )}
        {isEditing && (
          <input type="file" accept="image/*" onChange={handleImageChange} />
        )}
      </div>

      {/* Profile Form */}
      <div className="profile-info">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>

        <label>
          Mobile Number:
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>

        <label>
          Date of Birth:
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>

        <label>
          Anniversary:
          <input
            type="date"
            name="anniversary"
            value={formData.anniversary}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>

        <label>
          Gender:
          <div className="gender-options">
            {["Male", "Female", "Other"].map((g) => (
              <label key={g}>
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={formData.gender === g}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
                {g}
              </label>
            ))}
          </div>
        </label>

        {!isEditing ? (
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        ) : (
          <button onClick={handleSave}>Save Changes</button>
        )}
      </div>
    </div>
  );
};

export default Profile;
