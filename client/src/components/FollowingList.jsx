import React from "react";
import { useParams } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import axios from "../api/serverConnect";
import FollowerCard from "./FollowerCard";

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
      <div>
        {following.following.map((following) => {
          return <FollowerCard key={following} user={following} />;
        })}
      </div>
    );
  }
};

export default FollowingList;
