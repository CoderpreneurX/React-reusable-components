import React, { useState } from 'react'
import ProfileForm from '../components/ProfileForm'
import { client } from '../utils/api'
import { useNavigate } from 'react-router-dom'
import { updateUserProfile } from '../utils/auth'

export default function EditProfile() {
   const [formErrors, setFormErrors] = useState(null)
   const navigate = useNavigate()
   function handleProfileEdit(fd) {
      const base64ImageData = fd.get('profile_picture')
      const binaryString = atob(base64ImageData.split(',')[1])
      const byteArray = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
         byteArray[i] = binaryString.charCodeAt(i);
      }
      const imageBlob = new Blob([byteArray], {type: 'image/webp'})

      fd.delete('profile_picture')
      fd.append('profile_picture', imageBlob, 'image.png')
      updateUserProfile(fd).then((response) => {
         if(response.type === 'success') {
            navigate('/')
         }
      })
   }
   return (
      <section className='h-screen grid place-items-center'>
         <ProfileForm type='edit' messages={formErrors} onSubmit={(fd) => handleProfileEdit(fd)} />
      </section>
   )
}
