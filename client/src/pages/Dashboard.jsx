import axios from "axios";
import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import Nav from "../components/Nav";
import Profile from "../components/Profile";

// Added Spinner on the parent profile element to stop incorrectly rendered children components
const Dashboard = () => {
  const [id, setID] = useState("");
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_API_URL + "/user", {
          withCredentials: true,
        });
        setID(res.data._id)
      } catch (err) {
        console.log(err);
      }
    };
    getUser()
  });
  return (
    <div>
      <Link to="/dashboard">Dashboard</Link>
      <div>
        <Nav />
        {id ? <Profile userID={id}/> : <p>Spinner</p>}
        {id ? <Outlet context={id}/> : <p>Spinner</p>}
      </div>
    </div>
  );
};

export default Dashboard;
