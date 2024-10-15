import React from 'react'

type LabelProps = {
  htmlFor: string
  text: string
}

export default function Label({ htmlFor, text }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className='text-sm font-medium'
    >
      {text}
    </label>
  )
}
