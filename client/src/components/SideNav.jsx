import React from "react";
import { GridItem } from "@chakra-ui/react";

const SideNav = () => {
  return (
    <GridItem as='aside' bg='purple.400' minHeight='100vh' p={5} colSpan='1'>
        <span>Sidebar</span>
    </GridItem>
  )
};

export default SideNav;
