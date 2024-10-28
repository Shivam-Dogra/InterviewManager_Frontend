import React from 'react';
import '../App.css';

const TopNavbar = ({ username })  => {
  return (
    <nav className="top-navbar">
      <div className="left">
        <h2>Interview Manager 🧑‍💼 🗒️ </h2>
      </div>
      <div className="right">
        <div className="user-info">
        <span className="username">
          <i className="fas fa-user-circle"></i> {/* Font Awesome user icon */}
          Welcome, {username} </span>
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="profile-img"
          />
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
