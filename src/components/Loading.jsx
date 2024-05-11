import React from 'react'
import loading from '../assets/loading.gif'

export default function Loading({ hidden }) {
   return (
      <>
         {!hidden && (
            <div className='absolute top-0 left-0 h-screen w-full bg-white grid gap-6 place-items-center'>
               <div>
                  <img className='h-24 mb-2' src={loading} alt="Loading, please wait!" />
                  <h1 className='font-medium text-center text-lg'>Loading</h1>
               </div>
            </div>
         )}
      </>
   )
}
