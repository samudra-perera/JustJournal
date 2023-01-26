//This button controls the follow and following interaction for the profiles
//Simple logic on render
//If user is not following render the follow button
//If the user is following render the unfollow button
//Do not render for the loggedin users profile
import React from "react";
import axios from "axios";


const FollowButton = (props) => {
    //on default set to false to render the follow button
    const {id, followers, loggedInID} = props
    
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

  //Search the follower Array to see if the loggedIn user is following the viewed profile...if following render the unfollow button
  if(followers.includes(loggedInID)) {
    return <button onClick={updateUnFollow}>unfollow</button>
  } else if (id === loggedInID) {
    //If we are viewing our own profile component do not render a follow button(cause we should be able to follow ourself)
    return 
  } else {
    //If we do not follow the profile, render the follow button
    return <button onClick={updateFollow}>follow</button>
  }
};

export default FollowButton;
