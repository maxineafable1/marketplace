import Link from 'next/link'
import React from 'react'

type BtnLinkProps = {
  href: string
  children: React.ReactNode
}

export default function BtnLink({ href, children }: BtnLinkProps) {
  return (
    <Link
      href={href}
      className={`
        flex items-center gap-2
        bg-green-400 text-sm text-white font-semibold px-4 py-2 
        rounded-full hover:bg-green-500 hover:scale-105 
        focus-visible:outline outline-green-600
      `}
    >
      {children}
    </Link>
  )
}
