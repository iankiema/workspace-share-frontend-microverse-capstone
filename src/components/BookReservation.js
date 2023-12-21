// import { useState, useEffect } from 'react';
// import Navbar from './sidebar';
// import { loginUser } from '../redux/loginSlice';

// function BookReservation() {
//   const [location, setLocation] = useState('');
//   const [date, setDate] = useState('');
//   const [selectedPackage, setSelectedPackage] = useState('');
//   const [packages, setPackages] = useState([]);

//   useEffect(() => {
//     async function getPackages() {
//       try {
//         const response = await fetch('http://localhost:3000/api/v1/packages');
//         const responseData = await response.json();

//         if (responseData.data && Array.isArray(responseData.data)) {
//           setPackages(responseData.data);
//         } else {
//           console.error('Invalid data format:', responseData);
//         }
//       } catch (error) {
//         console.error('Error fetching packages:', error);
//       }
//     }

//     getPackages();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const { token } = loginUser.data;
//       console.log('token:', token);
//       const response = await fetch(
//         'http://localhost:3000/api/v1/reservations',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ location, date, package: selectedPackage }),
//         },
//       );

//       const responseData = await response.json();

//       console.log('Reservation created:', responseData);
//     } catch (error) {
//       console.error('Error creating reservation:', error);
//     }
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row align-items-center">
//         {' '}
//         {/* Center both horizontally and vertically */}
//         <div className="col-lg-3">
//           <Navbar />
//         </div>
//         <div className="col-lg-9 d-flex justify-content-center vh-100">
//           {' '}
//           {/* Center horizontally */}
//           <div className="card shadow my-auto">
//             <div className="card-body">
//               <h2 className="card-title">Book Reservation</h2>
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <label htmlFor="location" className="form-label">
//                     Location:
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="location"
//                       value={location}
//                       onChange={(e) => setLocation(e.target.value)}
//                     />
//                   </label>
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="date" className="form-label">
//                     Date:
//                     <input
//                       type="date"
//                       className="form-control"
//                       id="date"
//                       value={date}
//                       onChange={(e) => setDate(e.target.value)}
//                     />
//                   </label>
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="package" className="form-label">
//                     Select Package:
//                     <select
//                       className="form-select"
//                       id="package"
//                       value={selectedPackage}
//                       onChange={(e) => setSelectedPackage(e.target.value)}
//                     >
//                       <option value="">Select a package</option>
//                       {packages.map((pack) => (
//                         <option key={pack.id} value={pack.attributes.slug}>
//                           {pack.attributes.name}
//                         </option>
//                       ))}
//                     </select>
//                   </label>
//                 </div>
//                 <button type="submit" className="btn btn-primary">
//                   Book Now
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BookReservation;
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './sidebar';
import { loginUser } from '../redux/loginSlice';
import { checkLoginStatus } from '../redux/loginSlice';

function BookReservation() {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [packages, setPackages] = useState([]);
  const [bookingInformation, setBookingInformation] = useState([]);

  const dispatch = useDispatch();
  const loginUserState = useSelector((state) => state.login_auths.loggedin);

  const [data, setData] = useState({}) 

  const retrieveUserData = () => {
    // Retrieve the content from localStorage
    const userDataJSON = localStorage.getItem('data', data);

    // Parse the JSON content
    const storedUserData = JSON.parse(userDataJSON);
    console.log(storedUserData.extractedUserData);
    return storedUserData.extractedUserData || {};
  };

  useEffect(() => {

    async function getPackages() {
        dispatch(checkLoginStatus());
        if (loginStatus === 'true') {
          setUserData(retrieveUserData());
        }
      }, [dispatch, loginStatus]);
    else {
      
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
  }
    getPackages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (loginUserState.status === '200') {
        setData
        const token = loginUserState.data.token;
        console.log("token:", token);

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
            package: selectedPackage,
            bookingInformation,
          }),
        });

        const responseData = await response.json();
        console.log('Reservation created:', responseData);

        // Add the booking information to the state
        setBookingInformation((prevBookingInfo) => [...prevBookingInfo, responseData.data]);

        // Dispatch the loginUser action to update the login state (if needed)
        dispatch(loginUser(responseData.data));
      } else {
        console.error('User is not logged in.');
      }
    } catch (error) {
      console.error('Error creating reservation:', error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row align-items-center"> {/* Center both horizontally and vertically */}
        <div className="col-lg-3">
          <Navbar />
        </div>

        <div className="col-lg-9 d-flex justify-content-center vh-100"> {/* Center horizontally */}
          <div className="card shadow my-auto">
            <div className="card-body">
              <h2 className="card-title">Book Reservation</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">
                    Location:
                    <input type="text" className="form-control" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                  </label>
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    Date:
                    <input type="date" className="form-control" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
                  </label>
                </div>
                <div className="mb-3">
                  <label htmlFor="package" className="form-label">
                    Select Package:
                    <select className="form-select" id="package" value={selectedPackage} onChange={(e) => setSelectedPackage(e.target.value)}>
                      <option value="">Select a package</option>
                      {packages.map((pack) => (
                        <option key={pack.id} value={pack.attributes.slug}>
                          {pack.attributes.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <button type="submit" className="btn btn-primary">Book Now</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookReservation;
