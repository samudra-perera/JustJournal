import axios from "axios";
import React, { useEffect, useState } from "react";

const Profile = () => {
  //States for the data to be stored
  const [profile, setProfile] = useState([]);

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
        console.log(res.data)
        setProfile(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getProfile()
  }, []);

  return (
    <div>
      <div className="card border-primary mb-3">
        <div className="card-header">
        <img src={profile[0].imageURL} className="img-thumbnail" alt="..."/>
        </div>
        <div className="card-body text-primary">
          <p className="card-text">{profile[0].firstName} {profile[0].lastName}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
