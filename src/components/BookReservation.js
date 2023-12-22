import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './sidebar';
import { loginUser } from '../redux/loginSlice';

function BookReservation() {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [packages, setPackages] = useState([]);

  const dispatch = useDispatch();
  const packageDetails = useSelector((state) => state.packageDetails);

  const retrieveUserData = () => {
    // Retrieve the content from localStorage
    const userDataJSON = localStorage.getItem('data');

    // Parse the JSON content
    const storedUserData = JSON.parse(userDataJSON);
    console.log(storedUserData.extractedUserData);
    return storedUserData.extractedUserData || {};
  };

  useEffect(() => {
    async function getPackages() {
      try {
        const response = await fetch('http://localhost:3000/api/v1/packages');
        const responseData = await response.json();

        if (responseData.data && Array.isArray(responseData.data)) {
          setPackages(responseData.data);
        } else {
          console.error('Invalid data format:', responseData);
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    }

    getPackages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = retrieveUserData().token;
      const userId = retrieveUserData().id; // Retrieve user ID from local storage
      console.log('token:', token);
      console.log('userId:', userId);

      // Send reservation data to the server
      const response = await fetch('http://localhost:3000/api/v1/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          location,
          date,
          package: packageDetails, // Use the packageDetails from the state
          userId,
        }),
      });

      const responseData = await response.json();
      console.log('Reservation created:', responseData);

      // Dispatch the loginUser action to update the login state (if needed)
      dispatch(loginUser(responseData.data));
    } catch (error) {
      console.error('Error creating reservation:', error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row align-items-center">
        <div className="col-lg-3">
          <Navbar />
        </div>

        <div className="col-lg-9 d-flex justify-content-center vh-100">
          <div className="card shadow my-auto">
            <div className="card-body">
              <h2 className="card-title">Book Reservation</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">
                    Location:
                    <input
                      type="text"
                      className="form-control"
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </label>
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    Date:
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </label>
                </div>
                <button type="submit" className="btn btn-primary">
                  Book Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookReservation;
