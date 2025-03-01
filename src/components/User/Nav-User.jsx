import { Link } from 'react-router-dom';
import './Nav-User.css';

function NavUser() {
  return (
    <nav className="nav-user">
      <div className="navbars-container">
        <Link to="/" className="navbars-logo">
          YogaVerse
        </Link>
                <ul className="nav-links">
                  <li>
                    <Link to="/users" >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/my-groups">
                      My Groups
                    </Link>
                  </li>
                  <li>
                    <Link to="/explore-asanas" >
                      Explore Asanas
                    </Link>
                  </li>
                  <li>
                    <Link to="/challenges" >
                      Challenges
                    </Link>
                  </li>
                </ul>
        <div className="nav-buttons">
          <Link to="/" className="nav-button-signup">Log Out</Link>
        </div>
      </div>
    </nav>
  );
}

export default NavUser;