import React from "react";
import { Outlet, Link } from "react-router-dom";
import Nav from "../components/Nav";
import Profile from "../components/Profile";

const Dashboard = () => {
  return (
    <div>
      <Link to='/dashboard'>Dashboard</Link>
      <div>
        <Nav />
        <Profile />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
