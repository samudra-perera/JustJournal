import { Flex, Box, Center, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import HomeNav from "../components/HomeNav";

//Use Chakra Grid system to dea;l with the seperation

const Home = () => {
  return (
    <>
      <Flex direction="column">
        <HomeNav />
        <Outlet />
      </Flex>
    </>
  );
};

export default Home;
