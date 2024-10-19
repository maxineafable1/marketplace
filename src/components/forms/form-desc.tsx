import React from 'react'

type FormDescProps = {
  title: string
  children: React.ReactNode
}

export default function FormDesc({ title, children }: FormDescProps) {
  return (
    <div className='mb-4'>
      <h3 className='font-semibold text-lg'>{title}</h3>
      <p className='text-sm text-neutral-700'>
        {children}
      </p>
    </div>
  )
}
