import React from "react";
import { useParams } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import axios from "../api/serverConnect";
import FollowerCard from "./FollowerCard";
import { SimpleGrid } from "@chakra-ui/react";

const FollowerList = () => {
  //Getting the ID from the URL params
  const { id } = useParams();
  //Calling the useAxios custom hook to get the followers information
  const [followers, error, loading] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: `/api/profile/getFollowers/${id}`,
    requestConfig: {
      withCredentials: true,
    },
  });

  //If the followers array is empty (no followers) display nothing else map through and display each follower card
  if (followers.followers === undefined) {
    return;
  } else {
    return (
      <>
        <div>
          {followers.followers.map((follower) => {
            return <FollowerCard key={follower} user={follower} />;
          })}
        </div>
      </>
    );
  }
};

export default FollowerList;
