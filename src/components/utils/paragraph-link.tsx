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
        ml-1 focus-visible:border-b-2 focus-visible:border-b-green-400
        border-b border-b-neutral-500 hover:border-b-green-400 
        outline-none focus-visible:pb-1 hover:text-green-500
      `}
    >
      {text}
    </Link>
  )
}
