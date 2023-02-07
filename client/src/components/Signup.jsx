import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
//The signup page is gonna send the data for the user Schema and the profile Schema
//In a seperate page within the dashboard the user will be able to add things to their profile ie bio, picture etc

const Signup = () => {
  //Signup States
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    matchPassword: "",
  });

  const navigate = useNavigate();
  //createUser API Request
  const createUser = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + "/signup",
        {
          email: user.email,
          userName: user.username,
          password: user.password,
          confirmPassword: user.matchPassword,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      //If the respose has user added
      //When the sign up is completed send the user to the profile creation page
      // navigate("/profile");
      if (res.data.status === 200) {
        navigate("/createProfile");
      }
    } catch (err) {
      console.log(err);
      //If the sign up does not pass send the user back to the signup page with an error of the issue (ie: user already exists etc;)
      // navigate('/signup')
      navigate("/signup");
    }
  };

  //Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    createUser();
  };

  //Setting the state of the input object
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  //Sending the POST request

  return (
    <div className="col-md-10 mx-auto col-lg-5">
      <form
        className="p-4 p-md-5 border rounded-3 bg-light"
        onSubmit={handleSubmit}
      >
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            name="email"
            autoComplete="off"
            onChange={handleChange}
            required
            placeholder="name@example.com"
          />
          <label htmlFor="email">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="username"
            autoComplete="off"
            onChange={handleChange}
            required
            placeholder="name@example.com"
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            name="password"
            required
            autoComplete="off"
            onChange={handleChange}
            placeholder="Password"
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            name="matchPassword"
            required
            autoComplete="off"
            onChange={handleChange}
            placeholder="Confirm Password"
          />
          <label htmlFor="matchPassword">Confirm Password</label>
        </div>
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign Up
        </button>
        <hr className="my-4" />
        <small className="text-muted">
          Already have an account? Click <Link to="/">Here</Link> to go back!
        </small>
      </form>
    </div>
  );
};

export default Signup;
