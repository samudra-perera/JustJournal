import React from "react";
import {
  AddIcon,
  CalendarIcon,
  ViewIcon,
  AtSignIcon,
  ArrowForwardIcon,
  SearchIcon
} from "@chakra-ui/icons";
import { Heading, List, ListItem, ListIcon } from "@chakra-ui/react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const SideNav = (props) => {
  const {id} = props
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
    <List color="white" fontSize="1em" spacing={4} pt={2}>
      <ListItem>
        <Heading as="h1" size={"lg"} borderBottom={"2px"}>
          Just Journal
        </Heading>
      </ListItem>
      <ListItem>
        <Link to="/dashboard">
          <ListIcon as={CalendarIcon} />
          Dashboard
        </Link>
      </ListItem>
      <ListItem>
        <Link to="/dashboard/journals">
          <ListIcon as={ViewIcon} />
          Journals
        </Link>
      </ListItem>
      <ListItem>
        <Link to="/dashboard/createJournal">
          <ListIcon as={AddIcon} />
          Create
        </Link>
      </ListItem>
      <ListItem>
        <Link to="/dashboard/favourites">
          <ListIcon as={AddIcon} />
          Favourite Journals
        </Link>
      </ListItem>
      <ListItem>
        <Link>
          <ListIcon as={AddIcon} />
          JournalWrapped
        </Link>
      </ListItem>
      <ListItem>
        <Link to="/dashboard/userInformation">
          <ListIcon as={AtSignIcon} />
          User Information
        </Link>
      </ListItem>
      <ListItem>
        <Link>
          <ListIcon as={SearchIcon} />
          <SearchBar id={id}/>
        </Link>
      </ListItem>
      <ListItem>
        <Link to="/" onClick={getLogout}>
          <ListIcon as={ArrowForwardIcon} />
          Logout
        </Link>
      </ListItem>
    </List>
  );
};

export default SideNav;
