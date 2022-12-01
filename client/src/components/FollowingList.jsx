import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserFollowProfileCard from "./UserFollowProfileCard";

const FollowingList = () => {
  //Getting the ID from the URL params
  const { id } = useParams();
  // Setting the states of the followers
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const getFollowing = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_API_URL + `/api/profile/getFollowing/${id}`,
          {
            withCredentials: true,
          }
        );
        setFollowing(res.data)
        //console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getFollowing()
  }, []);

  return (
    <div>
      <UserFollowProfileCard follDash={following.following} />
    </div>
  );
};

export default FollowingList;
