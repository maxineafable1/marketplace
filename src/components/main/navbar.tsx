import { getSession } from '@/actions/auth'
import Link from 'next/link'
import React from 'react'
import { GoHomeFill } from "react-icons/go";
import { FaPlus } from "react-icons/fa";
import ProfileIcon from './profile-icon';
import BtnLink from '../utils/btn-link';

export default async function Navbar() {
  const session = await getSession()

  return (
    <nav className='flex items-center p-4 bg-neutral-50 shadow sticky z-10 top-0'>
      <Link
        href='/'
        className={`
          block mr-auto text-xl bg-neutral-300 rounded-full p-2 
          hover:bg-neutral-400 hover:scale-105
          focus-visible:outline outline-green-600
        `}
      >
        <GoHomeFill className='fill-neutral-800' />
      </Link>
      <div className='flex items-center gap-4'>
        {session.id ? (
          <>
            <Link
              href='/create'
              className={`
                flex items-center gap-2
                bg-green-400 text-sm text-white font-semibold px-4 py-2 
                rounded-full hover:bg-green-500 hover:scale-105 
                focus-visible:outline outline-green-600
              `}
            >
              <FaPlus /> Create new listing
            </Link>
            <ProfileIcon />
          </>
        ) : (
          <>
            <Link
              href='/login'
              className={`
                block font-semibold text-green-400 hover:text-green-500 
                hover:scale-105 focus-visible:border-b-green-600 
                outline-none border border-transparent
              `}
            >
              Log in
            </Link>
            <BtnLink
              href='/signup'
            >
              Sign up
            </BtnLink>
          </>
        )}
      </div>
    </nav>
  )
}
