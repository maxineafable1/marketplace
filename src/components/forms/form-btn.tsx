import React from 'react'

type FormBtnProps = {
  children: React.ReactNode
}

export default function FormBtn({ children }: FormBtnProps) {
  return (
    <button
      className={`
        bg-green-400 py-3 font-semibold rounded
        hover:bg-green-500 text-white
        focus-visible:outline outline-white
      `}
    >
      {children}
    </button>
  )
}
