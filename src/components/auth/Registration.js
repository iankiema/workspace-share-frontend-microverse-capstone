import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Registration(props) {
  const [state, setState] = useState({
    email: '',
    password: '',
    password_confirmation: '',
    registrationErrors: '',
  });


  const handleSubmit = (event) => {
    const { email, password, password_confirmation } = state;

    axios
      .post("http://localhost:3001/registrations", {
        user: { email, password, password_confirmation },
      }, { withCredentials: true })
      .then(response => {
        if (response.data.status === 'created') {
          props.handleSuccessfulAuth(response.data);
          setState({ ...state, redirectToDashboard: true });
        }
      })
      .catch(error => {
        console.error("Registration error", error);
      });

    event.preventDefault();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  if (state.redirectToDashboard) {
    window.location.href = "/dashboard"; // Use this for redirection
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={state.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password_confirmation"
          placeholder="Password confirmation"
          value={state.password_confirmation}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>

      <Link to="/login">Login</Link>
    </div>
  );
}
