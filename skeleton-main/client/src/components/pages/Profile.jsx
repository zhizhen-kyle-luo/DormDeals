import React from "react";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="Profile-container">
      <div className="Profile-banner">
        <img 
          src="/mit-dome.jpg" 
          alt="MIT Dome" 
          className="Profile-bannerImage"
        />
      </div>
      <div className="Profile-content">
        <div className="Profile-avatarContainer">
          <img 
            src="/default-profile.png" 
            alt="Profile" 
            className="Profile-avatar"
          />
        </div>
        <div className="Profile-info">
          <h1>Kyle Luo</h1>
          <p className="Profile-description">Description Here</p>
          <p className="Profile-email">Email Here</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
