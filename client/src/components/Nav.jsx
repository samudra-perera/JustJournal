import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Nav = () => {
    //Api request to logout user
    //After response need to redirect the user to the landing page '/'
  const getLogout = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_API_URL + "/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/dashboard/journals">Journal</Link>
      <Link to="/dashboard/createJournal">Create</Link>
      <Link to='/' className="w-10 btn btn-sml btn-primary" onClick={getLogout}>Log out</Link>
    </div>
  );
};

export default Nav;
