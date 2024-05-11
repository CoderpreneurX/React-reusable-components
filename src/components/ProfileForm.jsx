import React, { useRef } from 'react'

export default function ProfileForm({hidden, onSubmit}) {
   const firstnameField = useRef(null)
   const lastnameField = useRef(null)
   const bioField = useRef(null)
   const countryField = useRef(null)
   const cityField = useRef(null)

   function handleFormSubmit(e) {
      e.preventDefault()

      const formdata = new FormData()

      formdata.append('first_name', firstnameField)
      formdata.append('last_name', lastnameField)
      formdata.append('bio', bioField)
      formdata.append('country', countryField)
      formdata.append('city', cityField)

      onSubmit(formdata)
   }

   return (
      <>
         {!hidden && (
            <form onSubmit={handleFormSubmit}>
               <input ref={firstnameField} type="text" name='first_name' placeholder='firstname' />
               <input ref={lastnameField} type="text" name='last_name' placeholder='lastname' />
               <input ref={bioField} type="text" name='bio' placeholder='bio' />
               <input ref={countryField} type="text" name='country' placeholder='country' />
               <input ref={cityField} type="text" name='city' placeholder='city' />
            </form>
         )}
      </>
   )
}
