import React, { useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { Heading, Text } from "@chakra-ui/react";
import JournalCard from "./JournalCard";

const SearchResults = () => {
  //State to store the response from the server
  const [profiles, setProfiles] = useState([])
  const [journals, setJournals] = useState([])
  //useLocation is used to take in the date sent from the searchbar via useNavigate()
  const { state } = useLocation();

  //id is taken from useOutletContext
  const id = useOutletContext();

  //Changed from setTimeout to useEffect, there is a small problem of searching while on the /searchResults page not working, but fix that later
  useEffect(() => {
    const getSearch = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_API_URL +
            `/api/journal/search/${id}?search=${state}`,
          {
            withCredentials: true,
          }
        );
        setProfiles(res.data.profiles)
        setJournals(res.data.journals)
      } catch (err) {
        console.log(err);
      }
    };
    getSearch();
  }, []);
  return (
    <>
        <Heading>Journals</Heading>
        {journals.length === 0 ? <p>No Journals</p> : <p>Found ones</p>}
        <Heading>Users</Heading>
        {profiles.length === 0 ? <p>No Journals</p> : <p>Found ones</p>}
    </>
  )
};

export default SearchResults;
