import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserFollowProfileCard from "./UserFollowProfileCard";
import FollowerCard from "./FollowerCard";

const FollowerList = () => {
  //Getting the ID from the URL params
  const { id } = useParams();
  // Setting the states of the followers
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const getFollowing = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_API_URL + `/api/profile/getFollowers/${id}`,
          {
            withCredentials: true,
          }
        );
        setFollowers(res.data.followers);
        console.log(res.data.follower)
      } catch (err) {
        console.log(err);
      }
    };
    getFollowing();
  }, []);

  return (
    <div>
       {followers.map((follower) => {
        return (
          <FollowerCard key={follower} user={follower}/>
        )
       })}
    </div>
  );
};

export default FollowerList;
