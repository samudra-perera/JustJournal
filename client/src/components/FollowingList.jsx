import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserFollowProfileCard from "./UserFollowProfileCard";
import FollowerCard from "./FollowerCard";

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
        console.log(res.data.following)
        setFollowing(res.data.following)
      } catch (err) {
        console.log(err);
      }
    };
    getFollowing()
  }, []);

  return (
    <div>
       {following.map((following) => {
        return (
          <FollowerCard key={following} user={following}/>
        )
       })}
    </div>
  );
};

export default FollowingList;
