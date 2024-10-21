import Link from 'next/link'
import React from 'react'

type BtnType = {
  isBtn: true
  btnClr: 'bg-neutral-800' | 'bg-green-400'
  btnClrHvr: 'hover:bg-neutral-900' | 'hover:bg-green-500'
}

type LinkType = {
  isBtn?: false
  btnClr?: never
  btnClrHvr?: never
}

type BtnLinkProps = (BtnType | LinkType) & {
  href: string
  children: React.ReactNode
}

export default function BtnLink({
  href,
  children,
  isBtn,
  btnClr,
  btnClrHvr,
}: BtnLinkProps) {
  return (
    <Link
      href={href}
      className={`
        ${isBtn ? `
          flex items-center gap-2
          text-sm text-white font-semibold px-4 py-2 
          rounded-full hover:scale-105 
          focus-visible:outline outline-green-600  
          ${btnClrHvr} ${btnClr}
        ` : `
          block font-semibold text-neutral-800 hover:text-neutral-900 
          hover:scale-105 focus-visible:border-b-green-600 
          outline-none border border-b-2 border-transparent
        `}
      `}
    >
      {children}
    </Link>
  )
}
