import React, { useState, useEffect } from "react";
import axios from "axios";

const FollowerCard = (props) => {
  const { user } = props;
  const [userName, setUserName] = useState('');
  const [profilePic, setProfilePic] = useState('')
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_API_URL + `/api/profile/userInfo/${user}`,
          {
            withCredentials: true,
          }
        );
        setUserName(res.data.userName.userName)
        setProfilePic(res.data.profilePic.imageURL)
        console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getUserInfo()
  }, []);

  return <div>
  {userName}
  <img src={profilePic} />
  </div>;
};

export default FollowerCard;
