import axios from "axios";
import React from "react";
import { Navigate } from "react-router-dom";

//This is the protected routes for the authorized users to access their own profiles and their profile information
// Need to verify that sessions exist and that the user is validated
const ProtectedRoute = ({ children }) => {
  //Need a get user route here to get the user after login
//   const getUser = async () => {
//     try {
//       const res = await axios.get(process.env.REACT_APP_API_URL + "/user", {
//         withCredentials: true,
//       });
//       console.log(res);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   getUser()
  const user = true;
  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
