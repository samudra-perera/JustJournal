import { Flex, Box, Center, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import HomeNav from "../components/HomeNav";

//Use Chakra Grid system to dea;l with the seperation

const Home = () => {
  return (
    <>
      <HomeNav />
      <Flex align="center" height="100vh" p={8}>
        <Flex flexWrap="wrap" direction="column">
          <Box>
            <Heading as="h2" size="2xl">
              Welcome to Just Journal
            </Heading>
          </Box>
          <Box>
            <Text>
              Below is an example form built entirely with Bootstrap’s form
              controls. Each required form group has a validation state that can
              be triggered by attempting to submit the form without completing
              it.
            </Text>
          </Box>
        </Flex>

        <Center>
          <Outlet />
        </Center>
      </Flex>
    </>
  );
};

export default Home;
