import { Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import React from "react";
import Profile from "../components/Profile";
import { useOutletContext } from "react-router-dom";

const UserInformation = () => {
    const userID = useOutletContext()
    console.log(userID)
  return (
    <Tabs mt="40px" p="20px" colorScheme="purple" variant="enclosed">
      <TabList>
        <Tab _selected={{ color: "white", bg: "purple.400" }}>
          Account Information
        </Tab>
        <Tab _selected={{ color: "white", bg: "purple.400" }}>
          Profile Information
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Profile userID={userID}/>
        </TabPanel>
        <TabPanel>
          <Text>2</Text>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default UserInformation;