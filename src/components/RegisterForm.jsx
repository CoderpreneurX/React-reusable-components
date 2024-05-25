import React, { useEffect, useRef, useState } from 'react'
import { TextInput, Button } from 'flowbite-react'
import { FaCircleUser, FaLock, FaEnvelope, FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'

export default function LoginForm({ hidden, onSubmit, message }) {
   const [errorMessage, setErrorMessage] = useState(null)
   const [successMessage, setSuccessMessage] = useState(null)
   const [fieldErrors, setFieldErrors] = useState(null)

   const [isUsernameTooltipHidden, setIsUsernameTooltipHidden] = useState(true)
   const [isPasswordTooltipHidden, setIsPasswordTooltipHidden] = useState(true)
   const [isPasswordVisible, setIsPasswordVisible] = useState(false)
   const [isSubmitButtonEnabled, setIsSubmitButtonEnabled] = useState(false)

   const usernameField = useRef(null)
   const emailField = useRef(null)
   const passwordField = useRef(null)

   function togglePasswordVisibility(e) {
      e.preventDefault()
      setIsPasswordVisible(!isPasswordVisible)
   }

   function areFieldsValid() {
      const username = usernameField.current.value
      const password = passwordField.current.value

      const usernameRegex = /^(?![_\d])[a-z0-9_]{6,30}$/
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/

      if (usernameRegex.test(username) && passwordRegex.test(password)) {
         return true
      } else {
         return false
      }
   }

   function checkFormValidity() {
      setErrorMessage(null)
      setFieldErrors(null)
      areFieldsValid() ? setIsSubmitButtonEnabled(true) : setIsSubmitButtonEnabled(false)
   }

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
         setIsSubmitButtonEnabled(false)
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
               <div className='relative'>
                  <TextInput
                     type='text'
                     name='username'
                     id='register-username'
                     onChange={checkFormValidity}
                     onFocus={() => setIsUsernameTooltipHidden(false)}
                     onBlur={() => setIsUsernameTooltipHidden(true)}
                     placeholder='Username'
                     icon={FaCircleUser}
                     ref={usernameField}
                     required
                  />
                  {fieldErrors && (<h1 className='error'>{fieldErrors.username}</h1>)}
                  <div className='tooltip'>
                     {!isUsernameTooltipHidden && (
                        <h1 className='mx-3 my-2'>Only lowercase letters, underscores, and numbers allowed!</h1>
                     )}
                  </div>
               </div>
               <div>
                  <TextInput
                     type='email'
                     name='email'
                     id='register-email'
                     onChange={checkFormValidity}
                     placeholder='E-mail'
                     icon={FaEnvelope}
                     ref={emailField}
                     required
                  />
                  {fieldErrors && (<h1 className='error'>{fieldErrors.email}</h1>)}
               </div>
               <div className='relative'>
                  <TextInput
                     type={isPasswordVisible ? 'text' : 'password'}
                     name='password'
                     id='register-password'
                     onChange={checkFormValidity}
                     onFocus={() => setIsPasswordTooltipHidden(false)}
                     onBlur={() => setIsPasswordTooltipHidden(true)}
                     placeholder='Password'
                     icon={FaLock}
                     ref={passwordField}
                     required
                  />
                  {fieldErrors && (<h1 className='error'>{fieldErrors.password}</h1>)}
                  <div className='absolute cursor-pointer text-slate-600 px-3 py-3 right-0 top-0' onClick={togglePasswordVisibility}>
                     {!isPasswordVisible ? (<FaRegEye />) : (<FaRegEyeSlash />)}
                  </div>
                  <div className='tooltip'>
                     {!isPasswordTooltipHidden && (
                        <h1 className='mx-3 my-2'>Minimum 10 characters, 1 uppercase and lowercase letter, 1 number, and 1 special character required!</h1>
                     )}
                  </div>
               </div>
               <Button
                  type='submit'
                  disabled={!isSubmitButtonEnabled}
               >
                  Register
               </Button>
            </form>
         )}
      </>

   )
}
