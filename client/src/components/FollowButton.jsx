//This button controls the follow and following interaction for the profiles
//Simple logic on render
//If user is not following render the follow button
//If the user is following render the unfollow button
import React, { useEffect } from "react";
import axios from "axios";

const FollowButton = ({id}) => {
    console.log(id)
  //The logic for the follow
  const updateFollow = async () => {
    try {
      const res = axios.put(
        process.env.REACT_APP_API_URL + `/api/profile//follow`,
        {
            _id: id
        },
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  //The logic for the unfollow
  const updateUnFollow = async () => {
    try {
      const res = axios.put(
        process.env.REACT_APP_API_URL + "/api/profile/unfollow",
        {},
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return <button onClick={updateFollow}>Follow</button>;
};

export default FollowButton;
