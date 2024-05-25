import React, { useEffect, useState } from 'react'
import ProfileCard from '../components/ProfileCard'
import { getUserProfile, isUserAuthenticated } from '../utils/auth'
import Loading from '../components/Loading'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
   const [isLoading, setIsLoading] = useState(true)
   const [userProfile, setUserProfile] = useState(null)
   const navigate = useNavigate()

   useEffect(() => {

      console.log('Profile page in, authentication status is:', isUserAuthenticated())

      getUserProfile().then((response) => {
         if (response.type === 'success') {
            setIsLoading(false)
            setUserProfile(response.profile)
            console.log(response.profile)
         } else {
            setIsLoading(false)
            navigate('/create-profile')
         }
      }, [])

   }, [])

   return (
      <>
         {!isLoading ? (<section className='centered-grid'>
            {userProfile && (
               <ProfileCard profile={userProfile} />
            )}
         </section>) : (<Loading />)}
      </>
   )
}
