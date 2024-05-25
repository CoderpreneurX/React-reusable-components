import React, { useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'

export default function AvatarCropper({ onCrop, hidden }) {
   const [scale, setScale] = useState(1)
   const [file, setFile] = useState(null)
   const editor = useRef(null)

   const handleWheel = (e) => {
      // e.preventDefault(); // Prevent default scroll behavior

      // Calculate the new scale based on the scroll direction
      const newScale = e.deltaY > 0 ? scale - 0.05 : scale + 0.05;

      // Limit the scale within a specific range (adjust as needed)
      const minScale = 1;
      const maxScale = 2;
      const clampedScale = Math.min(Math.max(newScale, minScale), maxScale);

      // Update the scale state
      setScale(clampedScale);
   }

   function handleFileChange(file) {
      setFile(file)
   }

   function handleImageCrop() {
      if (editor.current) {
         const canvas = editor.current.getImageScaledToCanvas()
         const imageData = canvas.toDataURL()

         onCrop(imageData)
      }
   }
   return (
      <>
         {!hidden && (
            <div className="grid h-screen w-full place-items-center bg-black bg-opacity-40">
               <div className="w-full max-w-md rounded bg-white px-4 py-2 gap-4">
                  <div className="border-b py-2">
                     <input type="file" onChange={(e) => handleFileChange(e.target.files[0])} />
                  </div>
                  <div className='w-full bg-slate-500'>
                     {!file ? (<div className="border-8 grid bg-white place-items-center my-2 border-dashed w-full aspect-square">
                        <h1 className="font-medium text-lg text-slate-600">Please select an Image</h1>
                     </div>) : (
                        <AvatarEditor
                           className='mx-auto'
                           ref={editor}
                           image={file}
                           width={280}
                           height={280}
                           border={5}
                           color={[0, 0, 0, 0.4]}
                           scale={scale}
                           onWheel={handleWheel}
                        />
                     )}
                  </div>
                  <div className="border-t py-2">
                     <button onClick={handleImageCrop} className="rounded bg-blue-600 w-full px-3 py-2 font-medium text-white">Crop</button>
                  </div>
               </div>
            </div>
         )}
      </>
   )
}
