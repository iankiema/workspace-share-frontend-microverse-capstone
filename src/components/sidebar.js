import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faGooglePlusG,
  faLinkedinIn,
  faPinterestP,
} from '@fortawesome/free-brands-svg-icons';
import Logout from '../auth/logout';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sidebar.css';

function Sidebar() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      toggleMenu();
    }
  };

  return (
    <div>
      <button
        className="menu-bar"
        onClick={toggleMenu}
        onKeyPress={handleKeyPress}
        tabIndex="0" // Make it focusable
        aria-label="Toggle menu"
        type="button"
      >
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </button>
      <nav className={`sidebar ${showMenu ? 'show' : ''}`}>
        <div className="sidebar-header">
          <h3 className="logo-text">Executive Workspaces</h3>
        </div>
        <ul className="list-unstyled components">
          <li>
            <NavLink to="/home" onClick={toggleMenu} className="nav-link">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/packages" onClick={toggleMenu} className="nav-link">
              Packages
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/reservations"
              onClick={toggleMenu}
              className="nav-link"
            >
              Reservations
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/book-reservation"
              onClick={toggleMenu}
              className="nav-link"
            >
              Book Now
            </NavLink>
          </li>
          <li>
            <Logout onClick={toggleMenu} />
          </li>
        </ul>
        <div className="social-media-icons-container">
          <FontAwesomeIcon icon={faFacebookF} />
          <FontAwesomeIcon icon={faTwitter} />
          <FontAwesomeIcon icon={faGooglePlusG} />
          <FontAwesomeIcon icon={faLinkedinIn} />
          <FontAwesomeIcon icon={faPinterestP} />
        </div>
        <div className="copyright-info">
          &copy; 2023 Executive Workspaces LLC
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
