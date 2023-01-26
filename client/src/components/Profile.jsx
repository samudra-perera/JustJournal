import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";

const Profile = (props) => {
  const{userID} = props
  //States for the data to be stored
  const [image, setImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [followersLength, setFollowersLength] = useState("");
  const [followingLength, setFollowingLength] = useState("");
  const [followers, setFollowers] = useState([])
  const [journals, setJournals] = useState("");
  const [id, setId] = useState('')
  const [loggedInID, setLoggedInID] = useState("")

  //API call to get a single Journal Page
  useEffect(() => {
    const getProfile = async () => {
      try {
        //Returns an object of profile data for the user entered into the params
        const res = await axios.get(
          process.env.REACT_APP_API_URL + `/getProfile/${userID}`,
          {
            withCredentials: true,
          }
        );
        //Returns an just the profileID for the logged in user
        const resLoggedIn = await axios.get(
          process.env.REACT_APP_API_URL + `/loggedInUser`,
          {
            withCredentials: true,
          }
        );
        console.log(res.data);
        console.log(resLoggedIn.data)
        setImage(res.data.profiles.imageURL);
        setFirstName(res.data.profiles.firstName);
        setLastName(res.data.profiles.lastName);
        setFollowersLength(res.data.profiles.followers.length);
        setFollowingLength(res.data.profiles.following.length);
        setFollowers(res.data.profiles.followers)
        setJournals(res.data.numOfJournals);
        setId(res.data.profiles._id)
        setLoggedInID(resLoggedIn.data)
      } catch (err) {
        console.log(err);
      }
    };
    getProfile();
  }, []);

  return (
    <div>
      <div className="card border-primary mb-3">
        <div className="card-header">
          <img src={image} className="img-thumbnail" alt="..." />
        </div>
        <div className="card-body text-primary">
          <p className="card-text">
            {firstName} {lastName}
          </p>
          <p>
            {/* Depending on whether the user is on the dashboard or if the user is on a other profile page render diff things */}
            <Link to={`/dashboard/followers/${id}`}>
              Followers: {followersLength} <br />
            </Link>
            <Link to={`/dashboard/following/${id}`}>
              Following: {followingLength} <br />
            </Link>
            Entries: {journals}
          </p>
        </div>
        <FollowButton id={id} followers={followers} loggedInID={loggedInID}/>
      </div>
    </div>
  );
};

export default Profile;

{
  /* <Link to={`/dashboard/updateJournal/${id}`}>Update</Link> */
}
