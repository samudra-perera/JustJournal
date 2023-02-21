import React from "react";
import { useParams } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import axios from "../api/serverConnect";
import FollowerCard from "./FollowerCard";
import { SimpleGrid, Text } from "@chakra-ui/react";

const FollowingList = () => {
  //Getting the ID from the URL params
  const { id } = useParams();
  //Calling the useAxios custom hook to get the followers information
  const [following, error, loading] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: `/api/profile/getFollowing/${id}`,
    requestConfig: {
      withCredentials: true,
    },
  });

  //If the followers array is empty (no followers) display nothing else map through and display each follower card
  if (following.following === undefined) {
    return;
  } else {
    return (
      <>
        <Text as="h1" fontSize="4xl" pb={4}>
          Following
        </Text>
        <SimpleGrid minChildWidth="250px" spacing={10}>
          {following.following.map((following) => {
            return <FollowerCard key={following} user={following} />;
          })}
        </SimpleGrid>
      </>
    );
  }
};

export default FollowingList;
