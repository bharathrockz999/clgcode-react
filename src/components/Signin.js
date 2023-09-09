import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Signin.css';

const Signin = ({ closePopup })  => {
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
          closePopup();
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
    <div className="container mt-5">
      <div className="container auth-container" style={{ maxWidth: '900px' }}>
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form
              style={{ maxWidth: '400px', margin: '0 auto' }}
              onSubmit={handleSubmit} // Add onSubmit event handler
            >
              {/* Username input */}
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3">
                  Username
                </label>
                <input
                  type="text"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid username"
                  name="username" // Add name attribute
                  value={formData.username} // Connect to state
                  onChange={handleChange} // Add onChange event handler
                />
              </div>

              {/* Password input */}
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form3Example4">
                  Password
                </label>
                <input
                  type="password"
                  id="form3Example4"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  name="password" // Add name attribute
                  value={formData.password} // Connect to state
                  onChange={handleChange} // Add onChange event handler
                />
              </div>

              <div className="d-flex justify-content-between align-items-center">
                {/* Checkbox */}
                <div className="form-check mb-0">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value=""
                    id="form2Example3"
                  />
                  <label className="form-check-label" htmlFor="form2Example3">
                    Remember me
                  </label>
                </div>
                <a href="#!" className="text-body">
                  Forgot password?
                </a>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                >
                  Login
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?{' '}
                  <a href="/signup" className="link-danger">
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
        <div className="text-white mb-3 mb-md-0">
          Copyright © 2023. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Signin;
