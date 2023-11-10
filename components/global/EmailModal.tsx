'use client'

import { useState, useRef, useEffect, FormEventHandler, Fragment, FormEvent, MutableRefObject } from 'react'
import { Dialog, Listbox, Popover, Transition } from '@headlessui/react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Editor } from '@tinymce/tinymce-react';
import { ChevronUpDownIcon, CheckIcon, XMarkIcon, XCircleIcon, PaperClipIcon, PaperAirplaneIcon, PlusCircleIcon } from '@heroicons/react/20/solid'

import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import RemoveDoneOutlinedIcon from '@mui/icons-material/RemoveDoneOutlined';
import AttachmentDropzone from '../AttachmentDropzone';
import sendEmail from '@/lib/sendEmail';

type props = {
  recipients: student[]
  modalShown: boolean,
  closeModal: () => void,
}


const EmailModal = ({recipients, modalShown, closeModal} : props) => {
  const [emailContent, setEmailContent] = useState<email>({
    cc: [],
    subject: '',
    body: '',
    recipients: [],
  })
  const [ccEmail, setCcEmail] = useState<string>('');
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [dropZoneShown, setDropZoneShown] = useState<boolean>(false);
  const [attachedFiles, setAttachedFiles] = useState<attachedFile[]>([]);

  const editorRef = useRef<any>(null);
  const emailForm = useRef<HTMLFormElement>(null);

  useEffect(() => {
    console.log("attached files: ", attachedFiles);
  }, [attachedFiles])

  // send email
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let body: string = '';

    if (editorRef.current) {
      body = editorRef.current.getContent();
    }

    sendEmail({...emailContent, body: body, recipients: selectedRecipients, attachments: attachedFiles})
  }

  useEffect(() => {
    const form = emailForm.current
    const preventEnterSubmit = (e: KeyboardEvent) => {
      if (e.key === 'Enter') e.preventDefault();
    }
    
    return () => form?.removeEventListener('keydown', preventEnterSubmit);
  }, [emailForm])


  // deselect or select all recipients 
  const toggleAllRecipients: () => void = () => {
    if (selectedRecipients.length === 0) {
      const recs: string[] = []
      recipients.map((recipient) => recs.push(recipient.email))
      setSelectedRecipients(recs);
    } else {
      setSelectedRecipients([]);
    }
  }

  useEffect(() => {
    const recs: string[] = []
    recipients.map((recipient) => recs.push(recipient.email))
    setSelectedRecipients(recs);
  }, [recipients])

  const updateAttachedFiles = (files: attachedFile[]) => {
    setAttachedFiles(files);
  }

  const addCC = () => {
    setEmailContent(state => ({...state, cc: [...state.cc!, ccEmail]}));
    setCcEmail('');
  }

  return (
    <Dialog
      open={modalShown}
      onClose={() => closeModal()}
      className="relative z-20"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      {/* Full-screen scrollable container */}
      <div className="fixed inset-0 w-screen overflow-y-auto">
        {/* Container to center the panel */}
        <div className="flex h-full items-center justify-center p-4">
            {/* The actual dialog panel  */}
            <Dialog.Panel className="flex flex-col w-[90%] 2xl:w-[80%] h-[80%] transition-all duration-200 mx-auto rounded-lg bg-slate-50">
              <Dialog.Title className='relative text-lg bg-shaw-garnet rounded-t-lg px-8 py-4 text-white'>
                <span className='flex items-center justify-center w-fit gap-2'>
                  Compose
                  <EditOutlinedIcon className='w-5' />
                </span>
                <button
                  onClick={() => closeModal()}
                  className='absolute top-1/2 -translate-y-1/2 right-4 hover:opacity-100 opacity-70'>
                  <XMarkIcon className='w-6 rounded-full bg-white text-shaw-garnet' />
                </button>
              </Dialog.Title>
              <div className='w-full h-full p-8 overflow-y-auto text-black'>
                <form 
                  ref={emailForm}
                  className='w-full min-h-[100%] flex flex-col gap-4 pb-10'
                  onSubmit={handleFormSubmit}
                  autoComplete='off'
                  >
                  <div className='relative flex flex-col w-fit'>
                    <p>Recipients</p>
                    <div className='flex flex-row items-center gap-4'>
                      <Listbox value={selectedRecipients} onChange={setSelectedRecipients} multiple>
                        <div className="relative w-[15rem]">
                          <Listbox.Button className={`relative w-full cursor-default rounded-lg ${selectedRecipients.length ? 'bg-shaw-garnet text-white font-bold ' : 'bg-white'} active:scale-95 duration-100 cursor-pointer py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-shaw-garnet/50 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-shaw-garnet/30 sm:text-sm`}>
                            <span className="block truncate">{selectedRecipients.length ? `${selectedRecipients.length}/${recipients.length} selected`: 'No selection'}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                              <ChevronUpDownIcon
                                className={`h-5 w-5 ${selectedRecipients.length ? 'text-white': 'text-gray-400'}`}
                                aria-hidden="true"
                              />
                            </span>
                          </Listbox.Button>
                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                              {recipients.map((recipient, recipientIdx) => (
                                <Listbox.Option
                                  key={recipientIdx}
                                  className={({ active }) =>
                                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                      active ? 'bg-shaw-garnet text-white' : 'text-gray-900'
                                    }`
                                  }
                                  value={recipient.email}
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selected ? 'font-medium' : 'font-normal'
                                        }`}
                                      >
                                        {recipient.email}
                                      </span>
                                      {selected ? (
                                        <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-shaw-garnet'}`}>
                                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                      <div className='flex items-center justify-center flex-row gap-2'>
                        {
                          selectedRecipients.length !== 0 ?
                          <button 
                          onClick={toggleAllRecipients}
                          className='' type='button'>
                            <RemoveDoneOutlinedIcon className='p-1 w-6 hover:text-shaw-garnet' />
                          </button>                          
                          :
                          <button 
                          onClick={toggleAllRecipients}
                          className='' type='button'>
                            <DoneAllOutlinedIcon className='p-1 w-6 hover:text-shaw-garnet' />
                          </button>   
                        }
                      </div>
                      <button type='button'>Custom</button>
                    </div>
                    <div className='mt- 2 flex flex-col justify-center'>
                      <label htmlFor="cc-input">cc:</label>
                      <div className='flex flex-row gap-4'>
                        <div className='flex w-[15rem] bg-white overflow-hidden rounded-md border-[1px] border-slate-200'>
                          <input 
                            id='cc-input'
                            type="email"
                            value={ccEmail}
                            onChange={e => setCcEmail(e.target.value)}
                            className='focus:outline-none p-2 pl-3  w-full '
                          />
                          <div className='flex items-center justify-center pr-2'>
                            <button 
                              onClick={() => addCC()}
                              type='button'
                              disabled={ccEmail.length == 0}
                              className={`group ${ccEmail.length > 0 && 'active:scale-90 duration-100'} rounded-lg`}  
                            >
                              <PlusCircleIcon className='w-8 group-disabled:opacity-40 text-shaw-garnet'/>
                            </button>
                          </div>
                        </div>
                        <div>
                          {
                            emailContent.cc!.map((email, key) => (
                              <p key={key}>{email}</p>
                            ))
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='w-full relative'>
                    <label 
                      htmlFor="email-subject"
                      className='block'  
                    >Subject</label>
                    <input
                      autoComplete='off'
                      id='email-subject' 
                      type="text"
                      value={emailContent.subject}
                      onChange={(e) => setEmailContent({...emailContent, subject: e.target.value})}
                      className='border-[1px] border-slate-200 focus:outline-none w-full lg:w-[40%] rounded-lg py-2 px-3 text-gray-900'
                    />

                  </div>
                  <div className='w-full flex h-full flex-col mb-4'>
                    <Editor
                      apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                      onInit={(evt, editor) => editorRef.current = editor}
                      initialValue={emailContent.body}
                      init={{
                        menubar: true,
                        plugins: [
                          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                          'bold italic forecolor | alignleft aligncenter ' +
                          'alignright alignjustify | bullist numlist outdent indent | ' +
                          'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; jnk-size:14px }',
                      }}
                    />
                  </div>
                  <div>
                    <button 
                      type='button'
                      onClick={() => setDropZoneShown(state => !state)}
                      className='flex gap-2 items-center justify-center bg-shaw-yellow p-2 px-3 text-shaw-garnet rounded-full active:scale-90 duration-100'
                    >
                        <span>Attach Files</span>
                        <PaperClipIcon className='w-4' />
                      </button>
                      <div className={`${dropZoneShown ? 'block' : 'hidden'} mt-4`}>
                        <AttachmentDropzone attachments={attachedFiles} updateAttachments={updateAttachedFiles} />
                      </div>
                  </div>
                  <button 
                    role='submit'
                    className='mt-10 flex items-center justify-center gap-2 w-fit bg-shaw-yellow p-2 px-3 text-shaw-garnet rounded-full active:scale-90 duration-100'
                  >
                    <span>
                      Send Email
                    </span>
                    <PaperAirplaneIcon className='w-4' />
                  </button>
                </form>
              </div>
            </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  )
}

export default EmailModal;