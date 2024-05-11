import React from 'react'
import ProfileAvatar from './ProfileAvatar'
import { FaEnvelope, FaLocationDot } from 'react-icons/fa6'

export default function ProfileCard({ image, profile, hidden }) {
  return (
    <>
      {!hidden && <div className='profile-card'>
        <div className='card-contents'>
          <ProfileAvatar image={image} />
          <div>
            <h1 className="fullname">{profile.first_name} {profile.last_name}</h1>
            <h1 className="username">@{profile.username}</h1>
          </div>
          <div className='grid gap-2'>
            <div className='flex gap-2 items-center'>
              <FaEnvelope />
              <h1 className="email">{profile.email}</h1>
            </div>
            <div className='flex gap-2 items-center'>
              <FaLocationDot />
              <h1 className="email">{profile.country}, {profile.city}</h1>
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}
