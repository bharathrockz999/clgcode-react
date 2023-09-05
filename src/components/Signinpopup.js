import React from 'react';
import { Link } from 'react-router-dom';
import './SignInPopup.css';

const SignInPopup = ({ showSignInPopup, closePopup }) => {
  return (
    showSignInPopup && (
      <div className="signin-popup">
        <div className="popup-content">
          <span className="close-button" onClick={closePopup}>
            &times;
          </span>
          <h2>SignIn Required</h2>
          <p>
            Please <Link to="/signin">Sign In</Link> to read the full article.
          </p>
        </div>
      </div>
    )
  );
};

export default SignInPopup;
