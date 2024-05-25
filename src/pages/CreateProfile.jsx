import React, { useEffect, useState } from 'react'
import ProfileForm from '../components/ProfileForm'
import { client } from '../utils/api'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import { getUserProfile } from '../utils/auth'

export default function CreateProfile() {
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    //We fetch the user's profile and if it exists, 
    //we redirect the user to the profile page,
    //Else, we set isLoading to false to load the create profile form
    useEffect(() => {
        getUserProfile().then((response) => {
            if (response.type === 'success') {
                navigate('/')
            } else {
                setIsLoading(false)
            }
        })
    }, [])
    return (
        <>
            {isLoading ? (<Loading />) : (
                <section className='h-screen grid place-items-center'>
                    <ProfileForm type='create' />
                </section>
            )}
        </>
    )
}
