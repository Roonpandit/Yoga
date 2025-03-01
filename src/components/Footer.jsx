import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <p>© 2025 Yogaverse - Gamify Your Wellness Journey</p>
        <ul className="footer-links">
          <li><a href="#">About</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
          <li><a href="#">Help Center</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;