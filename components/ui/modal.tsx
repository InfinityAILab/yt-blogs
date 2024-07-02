import React from "react"
import { Button } from "./button"
import { Cross1Icon } from "@radix-ui/react-icons"

interface ModalProps {
  isOpen: boolean
  onClose?: () => void
  title: string
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-50 rounded-lg shadow-lg overflow-hidden w-1/3 px-8 py-5">
        <div className="flex items-center justify-between py-2 text-gray-900 text-lg font-semibold">
          <span>{title}</span>
          {onClose && 
            <Button variant='ghost' size='icon' onClick={onClose}>
              <Cross1Icon className="size-5" />  
            </Button>}
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Modal
