import { logout } from '@/actions/auth'
import React from 'react'

export default function Logout() {
  return (
    <form action={logout}>
      <button
        className={`
          p-1 w-full hover:bg-neutral-200
          text-start rounded-sm
          focus-visible:outline outline-emerald-400
        `}
      >
        Log out
      </button>
    </form>
  )
}
