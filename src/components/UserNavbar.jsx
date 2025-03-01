import React from "react";
import { Link } from "react-router-dom";
import "./UserNavbar.css";

function UserNavbar() {
  return (
    <nav className="user-navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">YogaVerse</Link>
        <div className="nav-links">
          <Link to="/dashboard" className="nav-item">Dashboard</Link>
          <Link to="/profile" className="nav-item-profile">Create Profile</Link>
          <Link to="/logout" className="nav-item logout-btn">Logout</Link>
        </div>
      </div>
    </nav>
  );
}

export default UserNavbar;
