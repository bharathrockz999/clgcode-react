// src/components/Navbar.js

import React,{useEffect, useState} from 'react';
import { Redirect,Link, useHistory } from 'react-router-dom';
import './Navbar.css';
import logoImage from './logo2.png';  
import { useAuth } from '../AuthContext';
import { checkAuthentication } from './auth';

const Navbar = () => {
  const { authState, dispatch } = useAuth();
  const history = useHistory();
  const isAuthenticated = authState.isAuthenticated;
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('authToken');
    history.push('/signin');
    // window.location.reload();
  };
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/feedspage'); 
    }
  }, [isAuthenticated, history]);
  
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logoImage} alt="Your Logo" />
        <h1 className="logo-title">Professional Based Learning</h1>
      </div>
      <div className={`nav-links ${showMenu ? 'show-menu' : ''}`}>
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
          
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/feedspage">Feeds</Link>
              </li>
              {/* <li>
                <Link to="/postProject">Post Your Project</Link>
              </li> */}
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/statistics">Statistics</Link>
              </li>
              <li>
                <Link to="/notifications">Notifications</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="sign-out-button">
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

