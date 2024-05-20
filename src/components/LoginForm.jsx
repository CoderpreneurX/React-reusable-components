import React, { useRef, useEffect } from 'react'
import { TextInput, Button } from 'flowbite-react'
import { FaCircleUser, FaLock } from 'react-icons/fa6'

export default function LoginForm({ hidden, onSubmit, message }) {
   const usernameField = useRef(null)
   const passwordField = useRef(null)

   function handleLogin(e) {
      e.preventDefault()

      const formdata = new FormData()

      formdata.append('username', usernameField.current.value)
      formdata.append('password', passwordField.current.value)

      onSubmit(formdata)
   }

   useEffect(() => {
      console.log('Login message', message)
   }, [message])
   return (
      <>
         {!hidden && message && (
            <div className="message">
               {message.type === 'error' ? (<div className="error-message">
                  <h1 className="message">{message.message}</h1>
               </div>) :
                  (<div className='success-message'>
                     <h1>{message.message}</h1>
                  </div>)}
            </div>
         )}
         {!hidden && (
            <form onSubmit={handleLogin} className='grid max-w-72 gap-3 w-full mx-auto'>
               <div className='text-center'>
                  <h1 className="title">Login</h1>
                  <h1 className="text-slate-600">Enter your credentials to continue</h1>
               </div>
               <TextInput
                  type='text'
                  name='username'
                  id='login-username'
                  placeholder='Username'
                  icon={FaCircleUser}
                  ref={usernameField}
                  required
               />
               <TextInput
                  type='password'
                  name='password'
                  id='login-password'
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
