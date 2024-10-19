import React from 'react'

export default function Sidebar() {
  return (
    <div
      className={`
        bg-neutral-50 w-full md:max-w-xs md:h-full
        md:fixed left-0
      `}
    >
      <div className='p-4'>
        <h1 className='font-bold text-2xl'>Marketplace</h1>
      </div>
    </div>
  )
}
