import React from "react";
import {AddIcon, CalendarIcon, ViewIcon, AtSignIcon} from '@chakra-ui/icons'
import { Text, List, ListItem, ListIcon } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <List color="white" fontSize="1.2em" spacing={4}>
      <ListItem>
        <Link to="/dashboard">
        <ListIcon as={CalendarIcon} />
          Dashboard
        </Link>
      </ListItem>
      <ListItem>
        <Link to="/dashboard/journals">
        <ListIcon as={ViewIcon}/>
          Journals
        </Link>
      </ListItem>
      <ListItem>
        <Link to="/dashboard/createJournal">
        <ListIcon as={AddIcon}/>
          Create
        </Link>
      </ListItem>
      <ListItem>
        <Link>
        <ListIcon as={AddIcon}/>
          Liked Journals
        </Link>
      </ListItem>
      <ListItem>
        <Link>
        <ListIcon as={AddIcon}/>
          JournalWrapped
        </Link>
      </ListItem>
      <ListItem>
        <Link to='/dashboard/userInformation'>
        <ListIcon as={AtSignIcon}/>
          User Information
        </Link>
      </ListItem>
    </List>
  );
};

export default SideNav;
