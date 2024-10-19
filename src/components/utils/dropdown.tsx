'use client'

import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { FieldValues, Path, PathValue, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { FaCaretDown } from 'react-icons/fa'
import ErrorMsg from '../forms/error-msg'

type DropdownProps<T extends FieldValues, U> = {
  list: readonly React.ReactNode[]
  defaultVal: string
  name: Path<T>
  setValue: UseFormSetValue<T>
  watch: UseFormWatch<T>
  errMsg: string | undefined
}

export default function Dropdown<T extends FieldValues, U>({
  list,
  defaultVal,
  setValue,
  name,
  watch,
  errMsg,
}: DropdownProps<T, U>) {
  const [isOpen, setIsOpen] = useState(false)

  const divRef = useRef<HTMLDivElement>(null)
  const choiceDivRef = useRef<HTMLDivElement>(null)
  const ulRef = useRef<HTMLUListElement>(null)

  const val = watch(name)
  const [currentIndex, setCurrentIndex] = useState(!val ? 0 : list.indexOf(val))

  function handleClickOutside() {
    setCurrentIndex(!val ? 0 : list.indexOf(val))
    setIsOpen(false)
  }

  useOnClickOutside([divRef, choiceDivRef], handleClickOutside, [isOpen, val])

  useEffect(() => {
    function accessibility(e: KeyboardEvent) {
      // console.log(e.code)
      switch (e.code) {
        case 'Enter': {
          !isOpen && setIsOpen(true)
          if (isOpen) {
            setValue(name, list[currentIndex] as PathValue<T, Path<T>>, { shouldValidate: true })
          }
          return
        }
        case 'ArrowUp': {
          if (isOpen) {
            e.preventDefault()
            setCurrentIndex(prev => prev > 0 ? prev - 1 : prev)
          }
          return
        }
        case 'ArrowDown': {
          e.preventDefault()
          !isOpen && setIsOpen(true)
          if (isOpen) {
            setCurrentIndex(prev => prev < list.length - 1 ? prev + 1 : prev)
          }
          return
        }
        case 'Escape': {
          if (isOpen) {
            setCurrentIndex(!val ? 0 : list.indexOf(val))
            setIsOpen(false)
          }
        }
      }
    }

    choiceDivRef.current?.addEventListener('keydown', accessibility)
    return () => choiceDivRef.current?.removeEventListener('keydown', accessibility)
  }, [isOpen, currentIndex, val])

  return (
    <div className="relative text-sm mb-4">
      <div className="grid gap-1">
        {val && (
          <p
            className='font-medium cursor-default'
            onClick={() => choiceDivRef.current?.focus()}
          >
            {defaultVal}
          </p>
        )}
        <div
          tabIndex={0}
          ref={choiceDivRef}
          className={`
          py-2 px-3 rounded bg-inherit border border-neutral-800 cursor-pointer
          hover:border-neutral-400 flex items-center justify-between
          focus-visible:outline outline-green-600 focus-visible:border-transparent
        `}
          onClick={() => setIsOpen(true)}
        >
          {val ?? defaultVal} <FaCaretDown />
        </div>
        <ErrorMsg message={errMsg} />
      </div>
      {isOpen && (
        <div
          ref={divRef}
          className={`
            absolute w-full shadow rounded bg-neutral-100 z-10 p-1
            max-h-40 overflow-y-scroll
          `}
        >
          <ul ref={ulRef}>
            {list.map((type, index) => {
              setTimeout(() => {
                const currentLi = ulRef?.current?.querySelector('.currentIndex')
                if (currentLi) {
                  currentLi.scrollIntoView({
                    behavior: "smooth",
                    block: 'nearest'
                  })
                }
              }, 0)
              return (
                (
                  <li
                    key={index}
                    className={`
                      rounded-sm p-1 focus-visible:outline outline-emerald-400 cursor-pointer
                      ${val === type && 'bg-neutral-300 selectedIndex'}
                      ${index === currentIndex && 'currentIndex bg-neutral-200'}
                    `}
                    onClick={() => {
                      setValue(name, type as PathValue<T, Path<T>>, { shouldValidate: true })
                      setIsOpen(false)
                    }}
                    onMouseEnter={() => setCurrentIndex(index)}
                  >
                    {type}
                  </li>
                )
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
