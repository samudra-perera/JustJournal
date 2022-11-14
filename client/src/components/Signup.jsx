import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
//The signup page is gonna send the data for the user Schema and the profile Schema
//In a seperate page within the dashboard the user will be able to add things to their profile ie bio, picture etc

const Signup = () => {
  //Email States
  const [email, setEmail] = useState("");
  //User States
  const [username, setUsername] = useState("");
  //Password States
  const [password, setPassword] = useState("");
  //Confirm Password States
  const [matchPassword, setMatchPassword] = useState("");

  const navigate = useNavigate();
  //createUser API Request
  const createUser = async () => {
    try {
      const res = await axios.post(process.env.REACT_APP_API_URL + "/signup", {
        email: email,
        userName: username,
        password: password,
        confirmPassword: matchPassword,
      });
      console.log(res.data);
      //If the respose has user added
      //When the sign up is completed send the user to the profile creation page
      // navigate("/profile");
      if (res.data.status === 200) {
        navigate("/profile");
      }
    } catch (err) {
      console.log(err);
      //If the sign up does not pass send the user back to the signup page with an error of the issue (ie: user already exists etc;)
      // navigate('/signup')
      navigate("/signup");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser();
  };

  //Setting the state of the email
  useEffect(() => {
    console.log(email);
    setEmail(email);
  }, [email]);

  //Setting the state of the username
  useEffect(() => {
    console.log(username);
    setUsername(username); //Set the state
  }, [username]);

  //Setting the state of the password
  useEffect(() => {
    setPassword(password);
  }, [password]);

  //Setting the state of the matchpassword
  useEffect(() => {
    setMatchPassword(matchPassword); //The password validation is done on the serverside using the Auth controllers (post signup)
  }, [matchPassword]);

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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setUsername(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
            onChange={(e) => setMatchPassword(e.target.value)}
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
          Alread have an account? Click <Link to="/">Here</Link> to go back!
        </small>
      </form>
    </div>
  );
};

export default Signup;
