import React from "react";
import { GridItem, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <GridItem as="aside" bg="purple.400" minHeight="100vh" p={5} colSpan="1">
      <Link to="/dashboard">
        <Text>Dashboard</Text>
      </Link>
      <Link to="/dashboard/journals">
        <Text>Journals</Text>
      </Link>
      <Link to="/dashboard/createJournal">
        <Text>Create</Text>
      </Link>
    </GridItem>
  );
};

export default SideNav;
