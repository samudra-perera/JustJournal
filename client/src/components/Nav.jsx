import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Spacer,
  Text,
} from "@chakra-ui/react";

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
    <Flex as="nav" p="10px" alignItems="center">
      <Heading as="h1">Just Journal</Heading>
      <Spacer />
      <HStack spacing="20px">
        <Box bg="gray.200" p="10px">
          SP
        </Box>
        <Text>Samudra@gmail.com</Text>
        <Link to="/dashboard">
          <Text>Dashboard</Text>
        </Link>
        <Link to="/dashboard/journals">
          <Text>Journal</Text>
        </Link>
        <Link to="/dashboard/createJournal">
          <Text>Create</Text>
        </Link>
        <Link to="/" onClick={getLogout}>
          <Button colorScheme="purple">logout</Button>
        </Link>
      </HStack>
    </Flex>
  );
};

export default Nav;
