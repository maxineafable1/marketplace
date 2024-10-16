'use client'

import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import React, { useRef, useState } from 'react'
import { FieldValues, Path, PathValue, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { FaCaretDown } from 'react-icons/fa'

type DropdownProps<T extends FieldValues> = {
  list: readonly string[]
  defaultVal: string
  name: Path<T>
  setValue: UseFormSetValue<T>
  watch: UseFormWatch<T>
}

export default function Dropdown<T extends FieldValues>({
  list,
  defaultVal,
  setValue,
  name,
  watch,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const divRef = useRef<HTMLDivElement>(null)
  const choiceDivRef = useRef<HTMLDivElement>(null)

  function handleClickOutside() {
    setIsOpen(false)
  }

  const val = watch(name)

  useOnClickOutside([divRef, choiceDivRef], handleClickOutside, isOpen)

  return (
    <div className='relative text-sm'>
      <div
        tabIndex={0}
        ref={choiceDivRef}
        className={`
          py-2 px-3 rounded bg-inherit border border-neutral-500 cursor-pointer
          hover:border-neutral-400 flex items-center justify-between
          focus-visible:outline outline-emerald-400 focus-visible:border-transparent
        `}
        onClick={() => setIsOpen(true)}
      >
        {val ?? defaultVal} <FaCaretDown />
      </div>
      {isOpen && (
        <div
          ref={divRef}
          className={`
            absolute w-full shadow rounded bg-neutral-100 z-10 p-1
            max-h-40 overflow-y-scroll
          `}
        >
          <ul>
            {list.map((type, index) => (
              <li
                key={index}
                className={`
                  rounded-sm p-1 focus-visible:outline outline-emerald-400 cursor-pointer
                  ${val === type ? 'bg-neutral-300' : 'hover:bg-neutral-200'}
                `}
                onClick={() => {
                  setValue(name, type as PathValue<T, Path<T>>, { shouldValidate: true })
                }}
              >
                {type}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
