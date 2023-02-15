import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Button,
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Spacer,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";

const HomeNav = () => {
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

  //Toggling the mobileNav
  const [mobile, setMobile] = useState(false);

  return (
    <>
      <Flex
        as="nav"
        px={8}
        py={4}
        alignItems="center"
        justify="center"
        w="100%"
        bg="white"
        zIndex="100"
        height="8vh"
        display={["none", "none", "flex", "flex"]}
      >
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
          <Link to="/howToUse">
            <Button
              colorScheme="purple"
              isActive={checkClick("/howToUse")}
              variant="ghost"
            >
              How it works
            </Button>
          </Link>
        </HStack>
      </Flex>
      {/* This is where the mobile Navigation portion Begins */}
      <Flex
        as="nav"
        alignItems="center"
        justify="space-between"
        w="100%"
        bg="white"
        zIndex="100"
        height="8vh"
        display={["flex", "flex", "none", "none"]}
      >
        <Heading as="h1" px={6}>Just Journal</Heading>
        <IconButton
          icon={<HamburgerIcon />}
          aria-label="Open Menu"
          size="lg"
          mt={2}
          mr={2}
          color="purple.400"
          rounded="lg"
          bg="purple.100"
          onClick={() => setMobile(true)}
          display={mobile ? "none" : "flex"}
        />
      </Flex>
      <Flex
        w="100vw"
        bgColor="gray.50"
        zIndex={120}
        pos="fixed"
        top="0"
        left="0"
        display={mobile ? "flex" : "none"}
        flexDir="column"
        overflowY="auto"
      >
        <Flex justify="end">
          <IconButton
            aria-label="Close Menu"
            mt={2}
            mr={2}
            size="lg"
            icon={<CloseIcon />}
            onClick={() => setMobile(false)}
            zIndex={200}
          />
        </Flex>
        <Flex flexDir="column" align="center">
          <Link to="/signup">
            <Button colorScheme="purple" variant="ghost" onClick={() => setMobile(false)}>
              Sign up
            </Button>
          </Link>
          <Link to="/">
            <Button colorScheme="purple" variant="ghost" onClick={() => setMobile(false)}>
              Log in
            </Button>
          </Link>
          <Link to="/howToUse">
            <Button colorScheme="purple" variant="ghost" onClick={() => setMobile(false)}>
              How it works
            </Button>
          </Link>
        </Flex>
      </Flex>
    </>
  );
};

export default HomeNav;
