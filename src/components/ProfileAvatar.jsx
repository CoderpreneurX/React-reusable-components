import React from 'react'
import avatarImage from '../assets/avatar.svg'
import { MdOutlineCamera } from "react-icons/md"

export default function ProfileAvatar({ image, onClick, isEditable }) {
  return (
    <div className="profile-avatar">
      <img className='w-44' src={image ? image : avatarImage} alt="Avatar" />
      {isEditable && (<div className='change-avatar-overlay' onClick={onClick}>
        <div className='grid -translate-y-4 gap-2'>
          <MdOutlineCamera className='place-self-center scale-[160%]' />
          <h1 className="font-medium">Change avatar</h1>
        </div>
      </div>)}
    </div>
  )
}
