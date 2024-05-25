import React, { useEffect, useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import { loginUser, registerUser } from '../utils/auth'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import { isUserAuthenticated } from '../utils/auth'

export default function Authentication() {
   const [isAuthenticated, setIsAuthenticated] = useState(false)
   const [isRegisterFormHidden, setIsRegisterFormHidden] = useState(true)
   const [loginMessage, setLoginMessage] = useState(null)
   const [registerMessage, setRegisterMessage] = useState(null)
   const [isLoading, setIsLoading] = useState(false)
   const navigate = useNavigate()

   function handleFormToggle() {
      isRegisterFormHidden ? setIsRegisterFormHidden(false) : setIsRegisterFormHidden(true)
   }

   function handleLoginUser(fd) { //fd is short for formdata
      async function login(fd) {
         const response = await loginUser(fd)
         if (response.type === 'failure') {
            const message = {
               message: response.message,
               type: 'error'
            }

            setLoginMessage(message)
         } else {
            const message = {
               message: response.message,
               type: 'success'
            }

            setLoginMessage(message)
            navigate('/')
         }
      }

      login(fd)
   }

   async function handleRegisterUser(fd) { //fd is short for formdata
      registerUser(fd).then((response) => {
         setRegisterMessage(response)
         if (response.type === 'success') {
            navigate('/')
         }
      })
   }

   useEffect(() => {
      if (isUserAuthenticated()) {
         setIsAuthenticated(true)
         navigate('/')
      }
   }, [])

   return (
      <>
         {!isLoading ? (<div className="h-screen grid place-items-center">
            {!isAuthenticated && (<div className='grid gap-2 w-full text-center'>
               <LoginForm message={loginMessage} onSubmit={handleLoginUser} hidden={!isRegisterFormHidden} />
               <RegisterForm message={registerMessage} onSubmit={handleRegisterUser} hidden={isRegisterFormHidden} />

               {
                  isRegisterFormHidden ? (
                     <p>
                        Don't have an account?
                        <button
                           className='underline text-blue-600 ml-2'
                           onClick={handleFormToggle}>
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
            </div>)}
         </div>) : (
            <Loading />
         )}
      </>
   )
}
