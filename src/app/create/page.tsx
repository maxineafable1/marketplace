import Link from 'next/link'
import React from 'react'
import { FaCar, FaCarBattery } from 'react-icons/fa'
import { TbCarTurbine } from "react-icons/tb";

const listing = [
  {
    category: 'Vehicle',
    href: 'vehicle',
    desc: 'Sell a car, truck or other type of vehicle.',
    icon: <FaCar className='group-focus-visible:fill-green-600' />
  },
  {
    category: 'Parts',
    href: 'parts',
    desc: 'Sell a car, truck or other type of vehicle.',
    icon: <TbCarTurbine className='group-focus-visible:fill-green-600' />
  },
]

export default function page() {
  return (
    <div className='grid place-items-center h-full'>
      <div className='bg-neutral-50 p-4 rounded-lg shadow'>
        <h2 className='text-xl mb-4 font-semibold'>
          Choose a category
        </h2>
        <ul className='grid grid-cols-2 gap-2'>
          {listing.map(list => (
            <Link
              key={list.category}
              href={`/create/${list.href}`}
              className={`
                p-4 rounded flex flex-col justify-center items-center
              bg-neutral-300 text-center aspect-square
                focus-visible:outline outline-green-600
                text-5xl hover:scale-105 hover:bg-neutral-400
                group
            `}
            >
              {list.icon}
              <p className='font-medium text-lg mb-2'>
                {list.category}
              </p>
              <p className='group-hover:text-white text-sm text-neutral-600 max-w-[20ch]'>
                {list.desc}
              </p>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  )
}
