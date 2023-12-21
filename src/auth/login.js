import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { loginUser, selectLoginUser } from '../redux/loginSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';

function Login({ handleSuccessfulAuth }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginUserState = useSelector(selectLoginUser);

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(userInfo));
      if (typeof handleSuccessfulAuth === 'function') {
        handleSuccessfulAuth(); // Call the prop function if it's a function
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle the error or log it as needed
    }
  };

  useEffect(() => {
    // Check the login status from Redux state
    if (loginUserState.loggedin === 'true') {
      // Call the prop function only if the user is logged in
      handleSuccessfulAuth();
      navigate('/home');
    } else if (loginUserState.loggedin === 'false') {
      // You may handle this case differently (e.g., display an error message)
      
      console.log('User login failed.');
    }
  }, [loginUserState, handleSuccessfulAuth, navigate]);

  const handleChange = (e) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [e.target.name]: e.target.value,
    }));
  };


  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="background-image1" />
      <div className="card shadow p-4" style={{ width: '50%' }}>
        <div className="back-button">
          <NavLink to="/" className="btn btn-link">
            <FontAwesomeIcon icon={faArrowLeft} />
            {' '}
            Back
          </NavLink>
        </div>
        <form
          onSubmit={handleSubmit}
          className="form"
          style={{ width: '100%' }}
        >
          <fieldset className="fieldset">
            <legend className="form-header">Login Page</legend>
            <div className="mb-3" style={{ width: '100%' }}>
              <label
                htmlFor="email"
                className="form-label"
                style={{ width: '100%' }}
              >
                Email
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="email"
                  value={userInfo.email}
                  onChange={handleChange}
                  required
                  id="email"
                />
              </label>
            </div>
            <div className="mb-3">
              <label
                htmlFor="city"
                className="form-label"
                style={{ width: '100%' }}
              >
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
            <button type="submit" className="btn btn-primary">
              Log In
            </button>
            <div className="mt-3">
              <span>Don&apos;t have an account? </span>
              <NavLink
                to="/signup"
                activeClassName="active"
                className="btn btn-link"
              >
                Sign up
              </NavLink>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

Login.propTypes = {
  handleSuccessfulAuth: PropTypes.func.isRequired,
};

export default Login;
