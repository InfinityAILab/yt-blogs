import React from "react"
import { Button } from "./button"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-50 rounded-lg shadow-lg overflow-hidden w-1/3 px-8 py-10">
        {/* <div className="px-4 py-2 bg-gray-800 text-white text-lg font-semibold">
          {title}
        </div> */}
        <div className="">{children}</div>
        <div className="py-6 text-right">
          <Button
            onClick={onClose}
            className="bg-black hover:bg-black/80 border rounded-lg text-white"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Modal
