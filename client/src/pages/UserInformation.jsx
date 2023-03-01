import { Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import React from "react";
import Profile from "../components/Profile";
import { Outlet, useOutletContext } from "react-router-dom";
import AccountInformation from "../components/AccountInformation";

const UserInformation = () => {
    const userID = useOutletContext()
    console.log(userID)
  return (
    <Tabs mt="10px" p="20px" colorScheme="purple" variant="enclosed">
      <TabList>
        <Tab _selected={{ color: "white", bg: "purple.400" }}>
          Profile Information
        </Tab>
        <Tab _selected={{ color: "white", bg: "purple.400" }}>
          Account Information
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Profile userID={userID}/>
          <Outlet/>
        </TabPanel>
        <TabPanel>
          <AccountInformation/>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default UserInformation;
