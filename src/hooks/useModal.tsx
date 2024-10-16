'use client'

import { useEffect, useRef, useState } from "react"

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (isOpen) {
      dialog?.showModal()
    }

    function closeModal(e: MouseEvent) {
      if (!dialog) return
      const dialogDimensions = dialog.getBoundingClientRect()
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        dialog.close()
        setIsOpen(false)
      }
    }

    function preventEscEnterKey(e: KeyboardEvent) {
      const key = e.key.toLowerCase()
      if (key === 'enter' || key === 'escape') e.preventDefault()
    }

    dialog?.addEventListener("click", closeModal)
    dialog?.addEventListener('keydown', preventEscEnterKey)
    return () => {
      dialog?.removeEventListener('click', closeModal)
      dialog?.removeEventListener('keydown', preventEscEnterKey)
    }
  }, [isOpen])

  return { dialogRef, setIsOpen, isOpen }
}