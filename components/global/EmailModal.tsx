import { useState } from 'react'
import { Dialog } from '@headlessui/react'

type props = {
  modalShown: boolean,
  closeModal: () => void,
}


const EmailModal = ({modalShown, closeModal} : props) => {

  return (
    <Dialog
      open={modalShown}
      onClose={() => closeModal()}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      {/* Full-screen scrollable container */}
      <div className="fixed inset-0 w-screen overflow-y-auto">
        {/* Container to center the panel */}
        <div className="flex min-h-full items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <Dialog.Panel className="w-[50%] h-[50%] mx-auto rounded bg-white p-4">
            <Dialog.Title>Complete your order</Dialog.Title>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  )
}

export default EmailModal;