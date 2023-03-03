import React, { useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import axios from "../api/serverConnect";
import { useEffect } from "react";
import { Heading, Text } from "@chakra-ui/react";
import JournalCard from "./JournalCard";

const SearchResults = () => {
  //useLocation is used to take in the date sent from the searchbar via useNavigate()
  const { state } = useLocation();

  //id is taken from useOutletContext
  const id = useOutletContext();

  const [data, error, loading] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: `/api/journal/search/${id}?search=${state}`,
    requestConfig: {
      withCredentials: true,
    },
  });

  console.log(data.profiles);

  if (loading) {
    return <p>Loading</p>;
  } else {
    return (
      <>
        <Heading>Journals</Heading>

        <Heading>Users</Heading>
        {data.profiles[0].length === 0 ? (
          <p>No Users</p>
        ) : (
          <Heading>Found one</Heading>
        )}
      </>
    );
  }
};

export default SearchResults;
