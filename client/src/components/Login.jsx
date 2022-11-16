import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  //Email States
  const [email, setEmail] = useState("");
  //Password State
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  //API Request for login
  const postLogin = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + "/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      if(res.data.status === 200) {
        navigate('/dashboard')
      } 
    } catch (err) {
      console.log(err)
      navigate('/')
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postLogin();
    //On submission ...
    //If the login user is verified send to the dashboard
    navigate("/dashboard");

    //If the login attempt does not work send them to the index page
  };

  //Setting the state of the email
  useEffect(() => {
    setEmail(email)
  }, [email])

  //Setting the state of the password
  useEffect(() => {
    setPassword(password)
  }, [password])

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
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            name="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            required
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
          Login
        </button>
        <hr className="my-4" />
        <small className="text-muted">
          Don't have an account? Click <Link to="/signup">Sign up</Link> to make
          one!.
        </small>
      </form>
    </div>
  );
};

export default Login;
