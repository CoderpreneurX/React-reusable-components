import React, { useRef } from 'react'
import { TextInput, Button } from 'flowbite-react'
import { FaCircleUser, FaLock, FaEnvelope } from 'react-icons/fa6'

export default function LoginForm({ hidden, onSubmit }) {
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
   return (
      <>
         {!hidden && (
            <form onSubmit={handleRegistration} className='grid max-w-72 gap-3 w-full mx-auto'>
               <div className='text-center'>
                  <h1 className="title">Register</h1>
                  <h1 className="text-slate-600">Enter your credentials to continue</h1>
               </div>
               <TextInput
                  type='text'
                  name='username'
                  id='register-username'
                  placeholder='Username'
                  icon={FaCircleUser}
                  ref={usernameField}
                  required
               />
               <TextInput
                  type='email'
                  name='email'
                  id='register-email'
                  placeholder='E-mail'
                  icon={FaEnvelope}
                  ref={emailField}
                  required
               />
               <TextInput
                  type='password'
                  name='password'
                  id='register-password'
                  placeholder='Password'
                  icon={FaLock}
                  ref={passwordField}
                  required
               />
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
