import axios from "axios";
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Grid, GridItem } from "@chakra-ui/react";
import Nav from "../components/Nav";
import Profile from "../components/Profile";
import SideNav from "../components/SideNav";
import { Footer } from "../components/Footer";

// Added Spinner on the parent profile element to stop incorrectly rendered children components
//If a user created an account but did not create a profile yet reroute them to the profile page
const Dashboard = () => {
  const [id, setID] = useState("");
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_API_URL + "/user", {
          withCredentials: true,
        });
        setID(res.data._id);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  });
  //Add array for maxwidth for the sidenav
  return (
    <>
      <Grid templateColumns="repeat(6, 1fr)" bg="gray.50">
        <GridItem
          as="aside"
          bg="purple.400"
          minHeight="100vh"
          p={5}
          colSpan="1"
          maxWidth="20vw"
        >
          <SideNav />
        </GridItem>
        <GridItem colSpan="5" as="main" p={7}>
          {id ? <Outlet context={id} /> : <p>Spinner</p>}
        </GridItem>
      </Grid>
      <Footer />
    </>
  );
};

export default Dashboard;
