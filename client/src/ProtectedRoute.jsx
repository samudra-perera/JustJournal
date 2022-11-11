import React from 'react'
import { Navigate } from 'react-router-dom'

//This is the protected routes for the authorized users to access their own profiles and their profile information
// Need to verify that sessions exist and that the user is validated
const ProtectedRoute = ({children}) => {
    const user = false
    if(!user) {
        return <Navigate to='/'/>
    }

    return children
}

export default ProtectedRoute