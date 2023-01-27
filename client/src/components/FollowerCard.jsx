import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
import {useAxios} from '../hooks/useAxios'
import axios from '../api/serverConnect'

const FollowerCard = (props) => {
  const { user } = props;
  const [userInfo, error, loading] = useAxios({
    axiosInstance: axios,
    method: 'GET',
    url: `/api/profile/userInfo/${user}`,
    requestConfig: {
      withCredentials: true
    }
  })

  return (
    <div>
      <Link to={`/profiles/${user}`}>{userInfo.userName}</Link>

      <img src={userInfo.profilePic} />
    </div>
  );
};

export default FollowerCard;
