import React from "react";
import { Outlet, Link } from "react-router-dom";
import Nav from "../components/Nav";

const Dashboard = () => {
  return (
    <div>
      <div>Dashboard</div>
      <div>
        <Nav />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
