'use client'

import { PaperClipIcon, XMarkIcon } from '@heroicons/react/20/solid'
import React, {useCallback, useEffect, useState} from 'react'
import {useDropzone} from 'react-dropzone'

type props = {
  attachments: any[],
  updateAttachments: (files: any[]) => void,
}

const AttachmentDropzone = ({attachments, updateAttachments}: props) => {
  // const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  const [attachedFiles, setAttachedFiles] = useState<attachedFile[]>([]);

  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const fileURL = reader.result
        console.log(fileURL)
        setAttachedFiles(state => [...state, {path: fileURL, filename: file.name}])
      }
      reader.readAsDataURL(file)
    })
    
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  useEffect(() => {
    console.log('attachedFiles: ', attachedFiles)
    updateAttachments(attachedFiles);
  }, [attachedFiles])
  // const files = acceptedFiles.map((file: File) => {
  //   const reader = new FileReader()

  //   reader.onabort = () => console.log('file reading was aborted')
  //   reader.onerror = () => console.log('file reading has failed')
  //   reader.onload = () => {
  //     const result = reader.result
  //     attachments = [...attachments, result];
  //     updateAttachments(attachments)
  //   }
  //   reader.readAsDataURL(file)    
    
  //   return (
  //     <li
  //       className='flex gap-2 px-2 py-1 rounded-md border-2 broder-slate-200 w-fit my-2' 
  //       key={file.name}>
  //       {file.name}
  //       <button onClick={() => {}} type='button'>
  //         <XMarkIcon className='w-4 opacity-70 hover:opacity-100'/>
  //       </button>
  //     </li>
  //   )    
  // });

  const removeAttachment = (index: number) => {
    setAttachedFiles(state => state.filter((file, k) => k !== index));
  }

  return (
    <div>
      <div {...getRootProps({
        className:'h-36 w-full lg:w-[50%] hover:cursor-pointer border-2 border-dashed border-shaw-garnet opacity-70 hover:opacity-100 flex items-center justify-center bg-slate-200/60'
      })}>
        <input {...getInputProps()} />
        <div className='flex gap-2 animate-pulse'>
          <PaperClipIcon className='w-6' />
          <p>Drop files or click to browse</p>
        </div>
      </div>
      <div className='w-full lg:w-[50%] mt-2 duration-200'>
      {
          attachedFiles.length > 0 &&
          <button 
            onClick={() => setAttachedFiles([])}
            type='button'
            className='active:scale-90 duration-100 ml-2 py-1 px-2 bg-red-500 rounded-full text-white'>Clear</button>
        }
        {
          attachedFiles.map((file, key) => (
            <div 
            key={key}
            className='inline-block p-2 m-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-fit rounded-md opacity-70 hover:opacity-100 hover:cursor-default'
            
            >
              <div className='flex items-center justify-center'>
                <span>
                  {file.filename}
                </span>
                <button 
                  type='button'
                  onClick={() => removeAttachment(key)}
                  className='ml-2 hover:text-red-500'
                >
                  <XMarkIcon className='w-4' />
                </button>
              </div>
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default AttachmentDropzone;