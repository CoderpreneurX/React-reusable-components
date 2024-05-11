import React, {useRef} from 'react'
import { Button, TextInput, Textarea } from 'flowbite-react'

export default function EditProfileForm({ onSubmit, hidden }) {
   const firstnameField = useRef(null)
   const lastnameField = useRef(null)
   const bioField = useRef(null)
   const countryField = useRef(null)
   const cityField = useRef(null)

   function handleFormSubmit(e) {
      e.preventDefault()
      const formdata = new FormData()

      formdata.append('first_name', firstnameField.current.value)
      formdata.append('last_name', lastnameField.current.value)
      formdata.append('bio', bioField.current.value)
      formdata.append('country', countryField.current.value)
      formdata.append('city', cityField.current.value)

      onSubmit(formdata)
   }
   return (
      <>
         {!hidden && <form onSubmit={handleFormSubmit} className='flex flex-col items-center gap-2 w-full sm:max-w-md sm:mx-auto sm:shadow-xl sm:rounded-lg p-4 sm:border'>
            <div className='text-center mb-8'>
               <h1 className='font-bold text-cyan-700 text-4xl'>Create Profile</h1>
               <h1 className='text-slate-600'>Enter your credentials to continue</h1>
            </div>
            <div className='grid gap-2 max-w-sm w-full'>
               <TextInput
                  type="text"
                  name='first_name'
                  id='first_name'
                  placeholder='First name'
                  ref={firstnameField}
                  required
               />
               <TextInput
                  type="text"
                  name='last_name'
                  id='last_name'
                  placeholder='Last name'
                  ref={lastnameField}
                  required
               />

            </div>
            <div className='grid gap-2 max-w-sm w-full'>
               <Textarea
                  name='bio'
                  id='bio'
                  placeholder='Describe yourself...'
                  rows={4}
                  ref={bioField}
                  required
               />
            </div>
            <div className='grid gap-2 max-w-sm w-full'>
               <TextInput
                  type='text'
                  name='country'
                  id='country'
                  placeholder='Country'
                  ref={countryField}
                  required
               />
               <TextInput
                  type='text'
                  name='city'
                  id='city'
                  placeholder='City'
                  ref={cityField}
                  required
               />
            </div>
            <Button className='max-w-sm w-full' type='submit'>Save</Button>
         </form>}
      </>
   )
}
