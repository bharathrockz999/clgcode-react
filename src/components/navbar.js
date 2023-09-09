
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logoImage from './logo2.png';
import { useAuth } from '../AuthContext';
import Signin from './Signin';
import Signup from './Signup';
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JavaScript

const Navbar = () => {
  const { authState, dispatch } = useAuth();
  const history = useHistory();
  const isAuthenticated = authState.isAuthenticated;
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('authToken');
    history.push('/#');
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/feedspage');
      setShowLoginPopup(false);
      setShowSignupPopup(false);
    }
  }, [isAuthenticated, history]);

  const openLoginPopup = () => {
    setShowLoginPopup(true);
  };

  const closeLoginPopup = () => {
    setShowLoginPopup(false);
  };

  const openSignupPopup = () => {
    setShowSignupPopup(true);
  };

  const closeSignupPopup = () => {
    setShowSignupPopup(false);
  };
  const closePopupStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
    width: '36px',
    height: '36px',
    backgroundColor: 'transparent',
    border: 'none',
    padding: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '24px',
    color: '#f44336', // Red color for the close icon
    transition: 'color 0.3s ease',
  };
  
  const closePopupHoverStyle = {
    color: '#d32f2f', // Darker red color on hover
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              src={logoImage}
              alt="Your Logo"
              className="logo-img"
            />
            <span className="logo-title">Professional Based Learning</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/#">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>

              {isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/feedspage">
                      Feeds
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/statistics">
                      Statistics
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/notifications">
                      Notifications
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button onClick={handleLogout} className="btn btn-danger">
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <button
                      onClick={openLoginPopup}
                      className="nav-link"
                    >
                      Login
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      onClick={openSignupPopup}
                      className="nav-link"
                    >
                      Signup
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {showLoginPopup && (
        <div className="popup-container">
          <div className="popup">
            <span style={closePopupStyle} onClick={closeLoginPopup}>
              &times;
            </span>
            {/* Include the Signin component */}
            <Signin closePopup={closeLoginPopup} />
          </div>
        </div>
      )}

      {showSignupPopup && (
        <div className="popup-container">
          <div className="popup">
            <span style={closePopupStyle} onClick={closeSignupPopup}>
              &times;
            </span>
            <Signup closePopup={closeSignupPopup} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
