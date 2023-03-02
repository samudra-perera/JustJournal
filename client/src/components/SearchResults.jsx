import React, { useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { Heading, Text } from "@chakra-ui/react";
import JournalCard from "./JournalCard";

const SearchResults = () => {
  
  //useLocation is used to take in the date sent from the searchbar via useNavigate()
  const { state } = useLocation();
    console.log(state)
      return (
        <>
          {/* <Heading>Journals</Heading>
          {data.journals.length === 0 ? (
            <Text>No Journals</Text>
          ) : (
            data.journals.map((journal) => {
              return (
                <JournalCard
                  createdAt={journal.createdAt}
                  title={journal.title}
                  posPromptOne={journal.posPromptOne}
                  key={journal._id}
                  id={journal._id}
                  firstName={data.profile[0].firstName}
                  lastName={data.profile[0].lastName}
                  profileImage={data.profile[0].imageURL}
                />
              );
            })
          )}
          <Heading>Users</Heading>
          {data.profiles.length === 0 ? (
            <Text>No Journals</Text>
          ) : (
            data.profile.map((user) => {
                return <p>{user}</p>
            })
          )} */}
        </>
      );
  
};

export default SearchResults;
