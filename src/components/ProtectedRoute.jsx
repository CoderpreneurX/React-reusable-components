import React, { useEffect, useState } from 'react'
import { isUserAuthenticated } from '../utils/auth'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'
import { getRefreshToken, refreshAccessToken } from '../utils/token'

export default function ProtectedRoute({ children }) {
   const [isAuthenticated, setIsAuthenticated] = useState(false)
   const [loading, setLoading] = useState(true) // Add loading state
   const navigate = useNavigate()

   useEffect(() => {
      if (isUserAuthenticated()) {
         setIsAuthenticated(true)
         setLoading(false) // Set loading to false when authentication is done
      } else {
         const refreshToken = getRefreshToken()
         if (refreshToken) {
            refreshAccessToken().then((response) => {
               if (response.type === 'success') {
                  setIsAuthenticated(true)
               } else {
                  setIsAuthenticated(false)
                  navigate('/auth') // Navigate only if refresh fails
               }
               setLoading(false) // Set loading to false after token refresh attempt
            })
         } else {
            navigate('/auth') // Navigate if no refresh token found
            setLoading(false) // Set loading to false when authentication is done
         }
      }
   }, []) // Add navigate and setLoading to dependency array

   return (
      <>
         {loading ? <Loading /> : (isAuthenticated ? children : <Loading />)} {/* Display loading spinner until authentication status is determined */}
      </>
   )
}
