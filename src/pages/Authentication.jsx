import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

export default function Authentication() {
   function loginUser(fd) { //fd is short for formdata
      console.log('Logged in', fd)
   }

   function registerUser(fd) { //fd is short for formdata
      console.log('Registered', fd)
   }

   const [isRegisterFormHidden, setIsRegisterFormHidden] = useState(true)
   return (
      <>
         <div className="h-screen grid place-items-center">
            <div className='grid gap-2 w-full text-center'>
               <LoginForm onSubmit={loginUser} hidden={!isRegisterFormHidden} />
               <RegisterForm onSubmit={registerUser} hidden={isRegisterFormHidden} />

               {
                  isRegisterFormHidden ? (
                     <p>
                        Don't have an account?
                        <button
                           className='underline text-blue-600 ml-2'
                           onClick={() => setIsRegisterFormHidden(false)}>
                           Register
                        </button>
                     </p>) :
                     (
                        <p>
                           Already have an account?
                           <button
                           className='text-blue-600 ml-2 underline'
                              onClick={() => setIsRegisterFormHidden(true)}>
                              Login
                           </button>
                        </p>
                     )
               }
            </div>
         </div>
      </>
   )
}
