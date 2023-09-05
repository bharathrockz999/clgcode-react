import React, { useState } from 'react';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    agreeToTerms: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Combine firstName and lastName into a single name field
    const name = `${formData.firstName}${formData.lastName ? ` ${formData.lastName}` : ''}`;
  
    try {
      const response = await fetch(`/user/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: formData.email,
          password: formData.password,
          roles: 'ROLE_ADMIN', // Default role
        }),
      });
  
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        if (response.status === 400) {
          const data = await response.json();
          setError(data.error);
        } else {
          setError('An error occurred while registering. Please try again later.');
        }
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setError('An error occurred while registering. Please try again later.');
    }
  };
  


  return (
    <div className="signup-container">
      <div className="form-box">
        <h2>Signup</h2>
        {isSubmitted ? (
          <p>Thank you for signing up!</p>
        ) : (
          <>
            {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="mobile">Mobile:</label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  required
                />
                I agree to the <a href="/TermsAndConditions">Terms and Conditions</a>
              </label>
            </div>
            <div className="button-container">
              <button type="submit">Signup</button>
            </div>
          </form>
          </>
        )}
        <p>
          Already a user? <a href="/signin">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
