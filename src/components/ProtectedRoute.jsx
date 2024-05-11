import React, { useEffect, useState } from 'react'
import { isUserAuthenticated } from '../utils/auth'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'

export default function ProtectedRoute({ children }) {
   const [isAuthenticated, setIsAuthenticated] = useState(false)
   const navigate = useNavigate()

   useEffect(() => {
      if (isUserAuthenticated()) {
         setIsAuthenticated(true)
      } else {
         navigate('/auth')
      }

   }, [])

   return (
      <>
         {isAuthenticated ? children : <Loading />}
      </>
   )
}
