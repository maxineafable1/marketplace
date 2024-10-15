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
        bg-emerald-400 text-sm text-white font-semibold px-4 py-2 
        rounded-full hover:bg-emerald-500 hover:scale-105 
        focus-visible:outline outline-emerald-600
      `}
    >
      {children}
    </Link>
  )
}
