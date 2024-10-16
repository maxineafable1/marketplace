import { getSession } from '@/actions/auth'
import Link from 'next/link'
import React from 'react'
import { GoHomeFill } from "react-icons/go";
import { FaPlus } from "react-icons/fa";
import ProfileIcon from './profile-icon';
import BtnLink from '../utils/btn-link';
import NewListing from './new-listing';

export default async function Navbar() {
  const session = await getSession()

  return (
    <nav className='flex items-center p-4 bg-neutral-50 shadow sticky z-10 top-0'>
      <Link
        href='/'
        className={`
          block mr-auto text-xl bg-emerald-100 rounded-full p-2 
          hover:bg-emerald-200 hover:scale-105
          focus-visible:outline outline-emerald-600
        `}
      >
        <GoHomeFill className='fill-emerald-400' />
      </Link>
      <div className='flex items-center gap-4'>
        {session.id ? (
          <>
            <NewListing />
            <ProfileIcon />
          </>
        ) : (
          <>
            <Link
              href='/login'
              className={`
                block font-semibold text-emerald-400 hover:text-emerald-500 
                hover:scale-105 focus-visible:border-b-emerald-500 
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
