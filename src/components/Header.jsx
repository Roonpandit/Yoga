import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header>
      <div className="navbar">
        <Link to="/" className="logo">
          <span className="logo-icon">🧘</span>
          Yogaverse
        </Link>
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-groups" className={({ isActive }) => isActive ? "active" : ""}>
              My Groups
            </NavLink>
          </li>
          <li>
            <NavLink to="/explore-asanas" className={({ isActive }) => isActive ? "active" : ""}>
              Explore Asanas
            </NavLink>
          </li>
          <li>
            <NavLink to="/challenges" className={({ isActive }) => isActive ? "active" : ""}>
              Challenges
            </NavLink>
          </li>
        </ul>
        <div className="user-profile">
          <div className="user-avatar">AS</div>
          <span>Alex Smith</span>
        </div>
      </div>
    </header>
  );
}

export default Header;