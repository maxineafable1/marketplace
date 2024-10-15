import Link from 'next/link'
import React from 'react'

type ParagraphLinkProps = {
  href: string
  text: string
}

export default function ParagraphLink({ href, text }: ParagraphLinkProps) {
  return (
    <Link
      href={href}
      className={`
        ml-1 focus-visible:border-b-2 focus-visible:border-b-emerald-400
        border-b border-b-neutral-500 hover:border-b-emerald-400 
        outline-none focus-visible:pb-1 hover:text-emerald-500
      `}
    >
      {text}
    </Link>
  )
}
