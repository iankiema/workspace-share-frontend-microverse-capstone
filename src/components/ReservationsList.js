import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './sidebar';

function ReservationsList() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    async function getReservations() {
      try {
        const response = await fetch(
          'http://localhost:3000/api/v1/reservations',
        );
        const responseData = await response.json();

        if (responseData.data && Array.isArray(responseData.data)) {
          setReservations(responseData.data);
        } else {
          console.error('Invalid data format:', responseData);
        }
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    }
    getReservations();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/v1/reservations/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setReservations((prevReservations) => prevReservations.filter((res) => res.id !== id));
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-3">
          <Navbar />
        </div>

        <div className="col-lg-9">
          <h2>Reservations</h2>

          {reservations.length > 0 ? (
            reservations.map((res) => (
              <div key={res.id}>
                <p>
                  Location:
                  {res.attributes.location}
                </p>
                <p>
                  Date:
                  {res.attributes.date}
                </p>

                <button type="button" onClick={() => handleDelete(res.id)}>
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>
              You do not have any reservations at the moment. Visit the
              {' '}
              <Link to="/book-reservation">Book Now Page</Link>
              {' '}
              to create one.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReservationsList;
