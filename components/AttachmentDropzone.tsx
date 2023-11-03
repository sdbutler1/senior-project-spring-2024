'use client'

import { PaperClipIcon, XMarkIcon } from '@heroicons/react/20/solid'
import React, {useCallback, useEffect, useState} from 'react'
import {useDropzone} from 'react-dropzone'

type props = {
  attachedFiles: File[]
  updateAttachedFiles: (files: File[]) => void;
}

const AttachmentDropzone = ({attachedFiles, updateAttachedFiles}: props) => {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();


  const files = attachedFiles.map((file: any) => {
    const reader = new FileReader()

    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
    // Do whatever you want with the file contents
      const binaryStr = reader.result
      console.log(binaryStr)
    }
    reader.readAsArrayBuffer(file)    
    
    return (
      <li
        className='flex gap-2 px-2 py-1 rounded-md border-2 broder-slate-200 w-fit my-2' 
        key={file.path}>
        {file.name}
        <button onClick={() => removeAttachedFile(file.name)} type='button'>
          <XMarkIcon className='w-4 opacity-70 hover:opacity-100'/>
        </button>
      </li>

    )
});

  useEffect(()  => {
    updateAttachedFiles([...acceptedFiles]);
  }, [acceptedFiles])

  const removeAttachedFile = (name: string): void => {
    updateAttachedFiles(attachedFiles.filter((file) => file.name !== name));
  }

  return (
    <div>
      <div {...getRootProps({
        className:'h-36 w-full lg:w-[50%] hover:cursor-pointer border-2 border-dashed border-shaw-garnet opacity-70 hover:opacity-100 flex items-center justify-center bg-slate-200/60'
      })}>
        <input {...getInputProps()} />
        <div className='flex gap-2 animate-pulse'>
          <PaperClipIcon className='w-6' />
          <p>Drop files or click to choose</p>
        </div>
      </div>
      <ul>
        {files}
      </ul>
    </div>
  )
}

export default AttachmentDropzone;