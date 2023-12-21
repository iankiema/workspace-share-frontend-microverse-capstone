// // src/App.js
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from 'react-router-dom';
// import PackageList from './components/PackageList';
// import PackageDetails from './components/PackageDetails';
// // import { checkLoginStatus } from './redux/loginSlice';

// function App() {
//   // const dispatch = useDispatch();
//   // const loginStatus = useSelector((state) => state.login_auths.loggedin);

//   // const [userData, setUserData] = useState({});

//   // const retrieveUserData = () => {
//   //   // Retrieve the content from localStorage
//   //   const userDataJSON = localStorage.getItem('userData');

//   //   // Parse the JSON content
//   //   const storedUserData = JSON.parse(userDataJSON);
//   //   console.log(storedUserData.extractedUserData);
//   //   return storedUserData.extractedUserData || {};
//   // };

//   // useEffect(() => {
//   //   const fetchLoginStatus = () => {
//   //     dispatch(checkLoginStatus());
//   //   };

//   //   // Call fetchLoginStatus when the component mounts
//   //   if (loginStatus === 'empty') {
//   //     fetchLoginStatus();
//   //   }

//   //   if (loginStatus === 'true') {
//   //     setUserData(retrieveUserData());
//   //   }
//   // }, [dispatch, loginStatus]);

//   // if (loginStatus !== 'empty')
//   {
//     return (
//       <div className="body">
//         <Router>
//           <div className="pageSection">
//             <Routes>
//               <Route
//                 path="/"
//                 exact
//                 element={
//                   loginStatus === 'true' ? (
//                     <Navigate to="/home" />
//                   ) : (
//                     <Navigate to="/splash" />
//                   )
//                 }
//               />
//               <Route path="/packages" element={<PackageList />} />
//               <Route path="/packages/:slug" element={<PackageDetails />} />

//             </Routes>
//           </div>
//         </Router>
//       </div>
//     );
//   }
// }

// export default App;
