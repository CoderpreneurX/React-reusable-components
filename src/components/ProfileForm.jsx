import React, { useRef, useState } from 'react'
import { Button, TextInput, Textarea } from 'flowbite-react'
import ProfileAvatar from './ProfileAvatar'
import AvatarCropper from './AvatarCropper'

export default function ProfileForm({ onSubmit, hidden, messages, type = 'create' }) {
   const [isCropperEnabled, setIsCropperEnabled] = useState(false)
   const [croppedImage, setCroppedImage] = useState(null)

   function handleFormSubmit(e) {
      e.preventDefault()
      const formdata = new FormData()

      formdata.append('first_name', e.target.first_name.value)
      formdata.append('last_name', e.target.last_name.value)
      formdata.append('bio', e.target.bio.value)
      formdata.append('country', e.target.country.value)
      formdata.append('city', e.target.city.value)
      formdata.append('profile_picture', croppedImage)

      onSubmit(formdata)
   }

   async function handleCroppedImage(image) {
      setCroppedImage(image)
      setIsCropperEnabled(false)
   }
   return (
      <>
         {isCropperEnabled && (
            <AvatarCropper onCrop={(image) => handleCroppedImage(image)} />
         )}
         {!hidden && !isCropperEnabled && <form onSubmit={handleFormSubmit}>
            <div className="sm:rounded-lg grid w-full max-w-md gap-2.5 sm:shadow-xl sm:px-6 sm:border p-4">
               <div className="text-center py-2">
                  <h1 className="font-medium text-3xl text-cyan-600">Edit Profile</h1>
                  <p className="text-slate-600">Enter your credentials to continue</p>
               </div>
               <div className="flex justify-between gap-2.5 flex-wrap items-center">
                  <div className='mx-auto'>
                     <ProfileAvatar image={croppedImage} onClick={() => setIsCropperEnabled(true)} isEditable={true} />
                  </div>
                  <div className="grid gap-2.5 w-full flex-1">
                     <TextInput
                        className="min-w-max"
                        type="text"
                        placeholder="First name"
                        name='first_name'
                        shadow={true}
                        required
                     />
                     <TextInput
                        className="min-w-max"
                        type="text"
                        placeholder="Last name"
                        name='last_name'
                        shadow
                        required
                     />
                  </div>
               </div>
               <Textarea
                  placeholder="Describe yourself..."
                  rows="5"
                  shadow
                  name='bio'
                  required
               >
               </Textarea>
               <div className="grid gap-2">
                  <TextInput
                     className="w-auto"
                     type="text"
                     placeholder="Country"
                     name='country'
                     shadow
                     required
                  />
                  <TextInput
                     className="w-auto"
                     type="text"
                     placeholder="City"
                     name='city'
                     shadow
                     required
                  />
               </div>
               <Button className='max-w-sm w-full' type='submit'>Save</Button>
            </div>
         </form>}
      </>
   )
}
