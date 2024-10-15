import React from 'react'

type FormBtnProps = {
  children: React.ReactNode
}

export default function FormBtn({ children }: FormBtnProps) {
  return (
    <button
      className={`
        bg-emerald-400 py-3 font-semibold rounded
        hover:bg-emerald-500 text-neutral-100
        focus-visible:outline outline-white
      `}
    >
      {children}
    </button>
  )
}
