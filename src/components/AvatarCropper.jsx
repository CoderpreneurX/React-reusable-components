import React from 'react'

export default function AvatarCropper({ onCrop, hidden }) {
   return (
      <>
         {!hidden && (
            <div class="grid h-screen w-full place-items-center bg-black bg-opacity-40">
               <div class="w-full max-w-md rounded bg-white px-4 py-2 gap-4">
                  <div class="border-b py-2">
                     <input type="file" />
                  </div>
                  <div class="border-8 grid place-items-center my-2 border-dashed w-full aspect-square">
                     <h1 class="font-medium text-lg text-slate-600">Please select an Image</h1>
                  </div>
                  <div class="border-t py-2">
                     <button class="rounded bg-blue-600 w-full px-3 py-2 font-medium text-white">Crop</button>
                  </div>
               </div>
            </div>
         )}
      </>
   )
}
