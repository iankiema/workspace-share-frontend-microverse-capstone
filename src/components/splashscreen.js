// SplashScreen.js
import React from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './splashscreen.css';

function SplashScreen() {
  return (
    <div className="splash-screen">
      <div className="background-image"></div>
      <div className="content">
        <h1>Welcome to Executive Workspaces</h1>
        <div className="buttons">
          <Link to="/login" className="btn btn-primary">
            Log In
          </Link>
          <Link to="/signup" className="btn btn-secondary">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;
