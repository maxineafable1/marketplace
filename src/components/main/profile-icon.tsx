'use client'

import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import Link from 'next/link';
import React, { useRef, useState } from 'react'
import { FaUser } from "react-icons/fa";
import Logout from '../auth/logout';

export default function ProfileIcon() {
  const [isOpen, setIsOpen] = useState(false)

  const divRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  function handleClickOutside() {
    setIsOpen(false)
  }

  useOnClickOutside([divRef, btnRef], handleClickOutside, isOpen)

  return (
    <div
      className='relative'
    >
      <button
        ref={btnRef}
        className={`
          block mr-auto bg-emerald-100 rounded-full p-2 
          hover:bg-emerald-200 hover:scale-105
          focus-visible:outline outline-emerald-600
        `}
        onClick={() => setIsOpen(true)}
      >
        <FaUser className='fill-emerald-400' />
      </button>
      {isOpen && (
        <div
          ref={divRef}
          className={`
            absolute bg-neutral-50 shadow rounded p-1
            right-0 w-40 text-sm z-10
          `}
        >
          <Link 
            href='/'
            className='block p-1 w-full rounded-sm hover:bg-neutral-200 focus-visible:outline outline-emerald-400'
          >
            Profile
          </Link>
          <Logout />
        </div>
      )}
    </div>
  )
}
