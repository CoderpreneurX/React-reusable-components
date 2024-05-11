import React, { useEffect, useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import { isUserAuthenticated, loginUser, registerUser } from '../utils/auth'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'

export default function Authentication() {
   const [isLoading, setIsLoading] = useState(true)
   const navigate = useNavigate()

   function handleLoginUser(fd) { //fd is short for formdata
      async function login(fd) {
         const response = await loginUser(fd)
         if (response.type === 'failure') {
            console.error(response.message)
         } else {
            console.log(response.message)
         }
      }

      login(fd)
   }

   function handleRegisterUser(fd) { //fd is short for formdata
      async function register(fd) {
         const response = await registerUser(fd)
         if (response.type === 'failure') {
            console.error(response.message)
         } else {
            console.log(response.message)
         }
      }

      register(fd)
   }

   useEffect(() => {
      async function checkIsAuthenticated() {
         if (await isUserAuthenticated()) {
            setIsLoading(false)
            navigate('/')
         } else {
            setIsLoading(false)
         }
      }

      checkIsAuthenticated()
   }, [])

   const [isRegisterFormHidden, setIsRegisterFormHidden] = useState(true)
   return (
      <>
         {!isLoading ? (<div className="h-screen grid place-items-center">
            <div className='grid gap-2 w-full text-center'>
               <LoginForm onSubmit={handleLoginUser} hidden={!isRegisterFormHidden} />
               <RegisterForm onSubmit={handleRegisterUser} hidden={isRegisterFormHidden} />

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
         </div>) : (
            <Loading />
         )}
      </>
   )
}
