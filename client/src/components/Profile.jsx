//This component contains the profile section of the user
import React from "react";
import { useAxios } from "../hooks/useAxios";
import axios from '../api/serverConnect'
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";

const Profile = (props) => {
  const { userID } = props;
  //Requesting the profile information
  const [profile, error, loading] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: `/getProfile/${userID}`,
    requestConfig: {
      withCredentials: true,
    },
  });
  //Requesting the loggedIn user information
  const [loggedInID] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: `/loggedInUser`,
    requestConfig: {
      withCredentials: true,
    },
  });

  if (profile.profiles === undefined) {
    return;
  } else {
    return (
      <div>
        <div className="card border-primary mb-3">
          <div className="card-header">
            <img
              src={profile.profiles.imageURL}
              className="img-thumbnail"
              alt="..."
            />
          </div>
          <div className="card-body text-primary">
            <p className="card-text">
              {profile.profiles.firstName} {profile.profiles.lastName}
            </p>
            <p>
              <Link to={`followers/${profile.profiles._id}`}>
                Followers: {profile.profiles.followers.length} <br />
              </Link>
              <Link to={`following/${profile.profiles._id}`}>
                Following: {profile.profiles.following.length} <br />
              </Link>
              Entries: {profile.numOfJournals}
            </p>
          </div>
          <FollowButton
            id={profile.profiles._id}
            followers={profile.profiles.followers}
            loggedInID={loggedInID}
          />
        </div>
      </div>
    );
  }
};

export default Profile;
