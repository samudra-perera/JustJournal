import React from 'react'
import { Outlet, Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div>
        <div>Dashboard</div>
        <div>
            <Link to='journals'>Journal</Link>
            <Link to='createJournal'>Create</Link>
            <Outlet />
        </div>
    </div>
    
  )
}

export default Dashboard