import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  //States for the data to be stored
  const [image, setImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [journals, setJournals] = useState("");
  const [id, setId] = useState('')

  //API call to get a single Journal Page
  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_API_URL + "/getProfile",
          {
            withCredentials: true,
          }
        );
        console.log(res.data);
        setImage(res.data.profiles[0].imageURL);
        setFirstName(res.data.profiles[0].firstName);
        setLastName(res.data.profiles[0].lastName);
        setFollowers(res.data.profiles[0].followers.length);
        setFollowing(res.data.profiles[0].following.length);
        setJournals(res.data.numOfJournals);
        setId(res.data.profiles[0]._id)
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
            <Link to={`/dashboard/followers/${id}`}>
              Followers: {followers} <br />
            </Link>
            <Link to={`/dashboard/following/${id}`}>
              Following: {following} <br />
            </Link>
            Entries: {journals}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

{
  /* <Link to={`/dashboard/updateJournal/${id}`}>Update</Link> */
}
