'use client'

import useModal from '@/hooks/useModal'
import Link from 'next/link'
import React from 'react'
import { FaPlus, FaCar, FaCarBattery } from 'react-icons/fa'
import { IoClose } from "react-icons/io5";

const listing = [
  {
    category: 'Vehicle',
    href: 'vehicle',
    desc: 'Sell a car, truck or other type of vehicle.',
    icon: <FaCar className='text-3xl fill-emerald-500' />
  },
  {
    category: 'Parts',
    href: 'parts',
    desc: 'Sell a car, truck or other type of vehicle.',
    icon: <FaCarBattery className='text-3xl fill-emerald-500' />
  },
]

export default function NewListing() {
  const { dialogRef, isOpen, setIsOpen } = useModal()

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`
        flex items-center gap-2
        bg-emerald-400 text-sm text-white font-semibold px-4 py-2 
        rounded-full hover:bg-emerald-500 hover:scale-105 
        focus-visible:outline outline-emerald-600
      `}
      >
        <FaPlus /> Create new listing
      </button>
      {isOpen && (
        <dialog
          ref={dialogRef}
          className='p-4 rounded shadow'
        >
          <div className='mb-4 flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>
              Choose a category
            </h2>
            <button
              onClick={() => {
                dialogRef.current?.close()
                setIsOpen(false)
              }}
              className='text-2xl'
            >
              <IoClose />
            </button>
          </div>
          <ul>
            {listing.map(list => (
              <Link
                key={list.category}
                href={`/create/${list.href}`}
                className={`
                  flex items-center gap-4 p-2 rounded-sm  
                hover:bg-neutral-200 focus-visible:outline outline-emerald-400
                `}
                onClick={() => setIsOpen(false)}
              >
                {list.icon}
                <div>
                  <p className='font-medium'>{list.category}</p>
                  <p className='text-sm'>
                    {list.desc}
                  </p>
                </div>
              </Link>
            ))}
          </ul>
        </dialog>
      )}
    </>
  )
}
