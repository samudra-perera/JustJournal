import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()

    //On submission ...
    //If the login user is verified send to the dashboard 
    navigate('/dashboard')

    //If the login attempt does not work send them to the index page
  }


  return (
    <div className="col-md-10 mx-auto col-lg-5">
    <form className="p-4 p-md-5 border rounded-3 bg-light" onSubmit={handleSubmit}>
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
        Login
      </button>
      <hr className="my-4" />
      <small className="text-muted">
        Don't have an account? Click <Link to='/signup'>Sign up</Link> to make one!.
      </small>
    </form>
  </div>
  )
}

export default Login