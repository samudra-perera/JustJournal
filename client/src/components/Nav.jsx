import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Nav = () => {
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
      <Link to="journals">Journal</Link>
      <Link to="createJournal">Create</Link>
      <button className="w-10 btn btn-sml btn-primary" onClick={getLogout}>Log out</button>
    </div>
  );
};

export default Nav;
