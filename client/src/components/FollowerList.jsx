import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserFollowProfileCard from "./UserFollowProfileCard";

const FollowerList = () => {
  //Getting the ID from the URL params
  const { id } = useParams();
  // Setting the states of the followers
  const [followers, setFollowers] = useState([])

  //API Call to get a single
  useEffect(() => {
    const getFollowers = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_API_URL + `/api/profile/getFollowers/${id}`,
          {
            withCredentials: true,
          }
        );
          setFollowers(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getFollowers()
  }, []);
  return <div>
    <UserFollowProfileCard follDash={followers}/>
  </div>;
};

export default FollowerList;
