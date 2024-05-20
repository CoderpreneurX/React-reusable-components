import React, { useEffect, useRef, useState } from 'react'
import { TextInput, Button } from 'flowbite-react'
import { FaCircleUser, FaLock, FaEnvelope } from 'react-icons/fa6'

export default function LoginForm({ hidden, onSubmit, message }) {
   const [errorMessage, setErrorMessage] = useState(null)
   const [successMessage, setSuccessMessage] = useState(null)
   const [fieldErrors, setFieldErrors] = useState(null)

   const usernameField = useRef(null)
   const emailField = useRef(null)
   const passwordField = useRef(null)

   function handleRegistration(e) {
      e.preventDefault()

      const formdata = new FormData()

      formdata.append('username', usernameField.current.value)
      formdata.append('email', emailField.current.value)
      formdata.append('password', passwordField.current.value)

      onSubmit(formdata)
   }

   useEffect(() => {
      if (message) {
         console.log(message)
         if (message.type === 'failure') {
            setErrorMessage(message.message)
         } else if (message.type === 'success') {
            setSuccessMessage(message.message)
         } else if (message.type === 'field_error') {
            setFieldErrors(message.message)
         }
      }
   }, [message])

   return (
      <>
         {!hidden && errorMessage && (
            <div className='alert error'>
               <h1>{errorMessage}</h1>
            </div>
         )}
         {!hidden && successMessage && (
            <div className='alert success'>
               <h1>{successMessage}</h1>
            </div>
         )}
         {!hidden && fieldErrors && (
            <div className="alert error">
               <h1>Please correct the errors below!</h1>
            </div>
         )}
         {!hidden && (
            <form onSubmit={handleRegistration} className='grid max-w-72 gap-3 w-full mx-auto'>
               <div className='text-center'>
                  <h1 className="title">Register</h1>
                  <h1 className="text-slate-600">Enter your credentials to continue</h1>
               </div>
               <div>
                  <TextInput
                     type='text'
                     name='username'
                     id='register-username'
                     placeholder='Username'
                     icon={FaCircleUser}
                     ref={usernameField}
                     required
                  />
                  {fieldErrors && (<h1 className='error'>{fieldErrors.username}</h1>)}
               </div>
               <div>
                  <TextInput
                     type='email'
                     name='email'
                     id='register-email'
                     placeholder='E-mail'
                     icon={FaEnvelope}
                     ref={emailField}
                     required
                  />
               </div>
               <div>
                  <TextInput
                     type='password'
                     name='password'
                     id='register-password'
                     placeholder='Password'
                     icon={FaLock}
                     ref={passwordField}
                     required
                  />
                  {fieldErrors && (<h1 className='error'>{fieldErrors.password}</h1>)}
               </div>
               <Button
                  type='submit'
               >
                  Login
               </Button>
            </form>
         )}
      </>

   )
}
