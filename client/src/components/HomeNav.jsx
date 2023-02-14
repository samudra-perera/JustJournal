import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Spacer,
  Text,
} from "@chakra-ui/react";

const HomeNav = () => {
  //
  const location = useLocation();
  //Setting the activeState of the button
  //Checks the link URL params and if it equals then highlights the active class...default is the login state
  const checkClick = (str) => {
    if (str == location.pathname) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Flex as="nav" p="10px" alignItems="center">
      <Heading as="h1">Just Journal</Heading>
      <Spacer />
      <HStack spacing="20px">
        <Link to="/signup">
          <Button
            colorScheme="purple"
            isActive={checkClick("/signup")}
            variant="ghost"
          >
            Sign up
          </Button>
        </Link>
        <Link to="/">
          <Button
            colorScheme="purple"
            isActive={checkClick("/")}
            variant="ghost"
          >
            Log in
          </Button>
        </Link>
      </HStack>
    </Flex>
  );
};

export default HomeNav;
