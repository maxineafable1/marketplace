import React from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

type InputProps<T extends FieldValues> = {
  register: UseFormRegister<T>
  name: Path<T>
  id: string
  placeholder?: string
  type?: 'text' | 'password'
  autoFocus?: boolean
}

export default function Input<T extends FieldValues>({
  register,
  name,
  id,
  autoFocus,
  placeholder,
  type = 'text',
}: InputProps<T>) {
  return (
    <input
      type={type}
      id={id}
      {...register(name)}
      className={`
        py-2 px-3 rounded bg-inherit border border-neutral-800
        hover:border-neutral-400 text-sm
        focus-visible:outline outline-green-600 focus-visible:border-transparent
      `}
      autoFocus={autoFocus}
      placeholder={placeholder}
    />
  )
}
