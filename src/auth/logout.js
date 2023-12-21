import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/logoutSlice';
import './logout.css';

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      dispatch(logoutUser());
      window.location.href = '/login';
    } catch (error) {
      // Handle error, if any
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </div>
  );
};

export default Logout;
