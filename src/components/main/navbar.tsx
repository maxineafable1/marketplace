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
          block mr-auto text-xl bg-neutral-800 rounded-full p-2 
          hover:bg-neutral-900 hover:scale-105
          focus-visible:outline outline-green-600
        `}
      >
        <GoHomeFill className='fill-white' />
      </Link>
      <div className='flex items-center gap-4'>
        {session.id ? (
          <>
            <BtnLink
              href='/create'
              isBtn
              btnClr='bg-neutral-800'
              btnClrHvr='hover:bg-neutral-900'
            >
              <FaPlus /> Create new listing
            </BtnLink>
            <ProfileIcon />
          </>
        ) : (
          <>
            <BtnLink href='/login'>
              Log in
            </BtnLink>
            <BtnLink
              href='/signup'
              isBtn
              btnClr='bg-neutral-800'
              btnClrHvr='hover:bg-neutral-900'
            >
              Sign up
            </BtnLink>
          </>
        )}
      </div>
    </nav>
  )
}
