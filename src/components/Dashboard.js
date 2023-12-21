import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = ({ handleLogout }) => {

  const handleLogoutClick = () => {
    axios.delete("http://localhost:3000/logout", {withCredentials: true})
    .then(response => {
      if (response.data.logged_out) {
        handleLogout();
      }
    })
    .catch(error => {
      console.error("Logout error", error)
    })
  }
  return (
    <div>
      <h2>Dashboard</h2>
      {/* Your dashboard content goes here */}
      
      {/* Logout link */}
      <Link to="/" onClick={handleLogoutClick}>Logout</Link>
    </div>
  );
};

export default Dashboard;