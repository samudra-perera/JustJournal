import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
//Add Key 

const FollowerCard = (props) => {
  const { user } = props;
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_API_URL + `/api/profile/userInfo/${user}`,
          {
            withCredentials: true,
          }
        );
        setUserName(res.data.userName);
        setProfilePic(res.data.profilePic);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUserInfo();
  }, []);

  return (
    <div>
      <Link to={`/profiles/${user}`}>{userName}</Link>

      <img src={profilePic} />
    </div>
  );
};

export default FollowerCard;
