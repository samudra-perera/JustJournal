import axios from "axios";
import React, { useEffect, useState } from "react";
import EditProfileModal from "./EditProfileModal";

const Profile = () => {
  //States for the data to be stored
  const [image, setImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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
        setImage(res.data[0].imageURL);
        setFirstName(res.data[0].firstName);
        setLastName(res.data[0].lastName);
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
        </div>
        <EditProfileModal firstName={firstName} lastName={lastName}/>
      </div>
    </div>
  );
};

export default Profile;
