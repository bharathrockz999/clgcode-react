import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Signin.css';
// import API_BASE_URL from './apiConfig';
const Signin = () => {
  const [formData, setFormData] = useState({
    userType: 'Student',
    username: '',
    password: '',
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/user/authenticate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });
    
      if (response.ok) { 
        const token = await response.text();  
    
        if (token) {
          localStorage.setItem('authToken', token);
          history.push('/feedspage');
        } else {
          console.error('No token found in response:', token);
          alert('Authentication failed. Please try again.');
        }
      } else { 
        console.error('Authentication failed with status:', response.status);
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
    
  };
    

  return (
    <div className="signin-container">
      <div className="form-box">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userType">User Type:</label>
            <select
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
            >
              <option value="Admin">Admin</option>
              <option value="Student/Faculty">Student/Faculty</option>
              {/* <option value="Guest">Guest</option> */}
            </select>
          </div>
          <div className="form-group">
          <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
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
          <div className="button-container">
            <button type="submit">Sign In</button>
          </div>
        </form>
        <p>
          Not a user? <a href="/signup">Sign Up</a>
        </p>
        <p>
          Forget password? <a href="/reset-password">Reset Password</a>
        </p>
      </div>
    </div>
  );
};

export default Signin;


 
