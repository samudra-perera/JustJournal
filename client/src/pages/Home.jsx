import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div>
        Home
      </div>
      <div>
        <Link to='/'>Login</Link>
        <Link to='/signup'>Signup</Link>
      </div>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default Home