import React from "react";
import { Link, useNavigate } from "react-router-dom";

//The signup page is gonna send the data for the user Schema and the profile Schema
//In a seperate page within the dashboard the user will be able to add things to their profile ie bio, picture etc


const Signup = () => {
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()

    //When the sign up is completed send the user to the profile creation page
    navigate('/profile')

    //If the sign up does not pass send the user back to the signup page with an error of the issue (ie: user already exists etc;)

    //
  }
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
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
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
