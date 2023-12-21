import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUser } from '../redux/signupSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import 'bootstrap/dist/css/bootstrap.min.css';
import './signup.css';

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const message = useSelector((state) => state.signup_auths.status);

  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(createUser(userInfo));
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    if (message === 'done') {
      navigate('/home');
    } else if (message === 'failed') {
    }
  }, [message, navigate]);

  const handleChange = (e) => {
    e.preventDefault();

    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="background-image2"></div>
      <div className="card shadow p-4" style={{ width: '50%' }}>
        <div className="back-button">
          <NavLink to="/" className="btn btn-link">
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </NavLink>
        </div>
        <form onSubmit={handleSubmit} className="form" style={{ width: '100%' }}>
        <fieldset className="fieldset">
            <legend className="form-header">Sign Up</legend>
            <div className="mb-3">
              <label htmlFor="username" className="form-label" style={{width: '100%'}}>
                Name
                <input
                  className="form-control"
                  type="text"
                  name="username"
                  placeholder="username"
                  value={userInfo.username}
                  onChange={handleChange}
                  required
                  id="username"
                />
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label" style={{width: '100%'}}>
                Email
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="email"
                  value={userInfo.email}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label" style={{width: '100%'}}>
                Password
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="password"
                  value={userInfo.password}
                  onChange={handleChange}
                  required
                  id="password"
                />
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="c-password" className="form-label" style={{width: '100%'}}>
                Password Confirmation
                <input
                  className="form-control"
                  type="password"
                  name="password_confirmation"
                  placeholder="confirm password"
                  value={userInfo.password_confirmation}
                  onChange={handleChange}
                  required
                  id="c-password"
                />
              </label>
            </div>
            <button type="submit" className="btn btn-primary">Sign Up</button>
            <div className="mt-3">
              <span>Already a user? </span>
              <NavLink to="/login" className="btn btn-link">Login</NavLink>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default Signup;
