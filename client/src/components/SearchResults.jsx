import React, { useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { Heading, SimpleGrid } from "@chakra-ui/react";
import SearchJournalCard from "./SearchJournalCard";
import FollowerCard from "./FollowerCard";

const SearchResults = () => {
  //State to store the response from the server
  const [profiles, setProfiles] = useState([]);
  const [journals, setJournals] = useState([]);
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
        setProfiles(res.data.profiles);
        setJournals(res.data.journals);
      } catch (err) {
        console.log(err);
      }
    };
    getSearch();
  }, []);
  console.log(profiles[0])
  return (
    <>
      <Heading>Journals</Heading>
      {journals.length === 0 ? (
        <p>Could not find any journals with that search</p>
      ) : (
        <SimpleGrid minChildWidth="250px" spacing={10}>
          {journals.map((journal) => {
            return (
              <SearchJournalCard
                title={journal.title}
                id={journal._id}
                posPromptOne={journal.posPromptOne}
              />
            );
          })}
        </SimpleGrid>
      )}
      <Heading>Users</Heading>
      {profiles.length === 0 ? (
        <p>Could not find any users with that username</p>
      ) : (
        <SimpleGrid minChildWidth="250px" spacing={10}>
          {profiles[0].map((follower) => {
            return <FollowerCard user={follower.user}/>;
          })}
        </SimpleGrid>
      )}
    </>
  );
};

export default SearchResults;
