import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProfileCreation = () => {
  //Setting the states (Turn into objects and reduce code clutter)
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
  });
  //FIle States
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");

  //CreateProfile API
  const createProfile = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + "/createProfile",
        {
          firstName: data.firstName,
          lastName: data.lastName,
          bio: data.bio,
          image: image,
        },
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  //Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    createProfile();
  };

  //Helper function to set the image as a URL to send as a req.body instead of req.file
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result);
    };
    console.log(image);
  };

  //Setting the state of the inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  useEffect(() => {
    setFile(file);
  }, [file]);

  return (
    <div>
      <form
        className="p-4 p-md-5 border rounded-3 bg-light"
        onSubmit={handleSubmit}
      >
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="firstName"
            autoComplete="off"
            onChange={handleChange}
            required
            placeholder="Enter Positive Prompt 1"
          />
          <label htmlFor="username">First Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="lastName"
            autoComplete="off"
            onChange={handleChange}
            required
            placeholder="Enter Positive Prompt 2"
          />
          <label htmlFor="username">Last Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="bio"
            autoComplete="off"
            onChange={handleChange}
            placeholder="Enter Positive Prompt 3"
          />
          <label htmlFor="username">Bio</label>
        </div>
        <div className="mb-3">
          <label htmlFor="imgUpload" className="form-label">
            Profile Picture
          </label>
          <input
            className="form-control form-control-sm"
            id="imageUpload"
            type="file"
            name="file"
            accept="image/png, image/jpeg, image/jpg, image/PNG"
            onChange={(e) => {
              setFile(e.target.files[0]);
              previewFile(e.target.files[0]);
            }}
          />
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Create Profile
        </button>
        <hr className="my-4" />
        <small className="text-muted">
          Want to make you profile later? Click{" "}
          <Link to="/dashboard">Here</Link> to start journalling!
        </small>
      </form>
    </div>
  );
};

export default ProfileCreation;
