import React from 'react'

type FormBtnProps = {
  children: React.ReactNode
  marginBotAndX?: boolean
}

export default function FormBtn({ children, marginBotAndX }: FormBtnProps) {
  return (
    <button
      type='submit'
      className={`
        bg-neutral-800 py-2 font-semibold rounded
        hover:bg-neutral-900 text-white
        focus-visible:outline outline-green-600
        ${marginBotAndX && 'mx-4 mb-4'}
      `}
    >
      {children}
    </button>
  )
}
