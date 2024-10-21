import React from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

type InputCheckProps<T extends FieldValues> = {
  register: UseFormRegister<T>
  name: Path<T>
  id: string
  title: string
  sub?: string
  mb?: boolean
}

export default function InputCheck<T extends FieldValues>({
  register,
  name,
  id,
  title,
  sub,
  mb,
}: InputCheckProps<T>) {
  return (
    <label
      htmlFor={id}
      className={`
        flex items-center justify-between ${mb && 'mb-4'}
        bg-neutral-100 p-2 rounded-sm
        hover:bg-neutral-200 cursor-pointer
      `}
    >
      <div>
        <p className='font-medium text-sm'>
          {title}
        </p>
        <p className='text-xs'>
          {sub}
        </p>
      </div>
      <input
        type="checkbox"
        id={id}
        {...register(name)}
        className='accent-green-400 cursor-pointer scale-125 focus-visible:outline outline-green-600'
      />
    </label>
  )
}
