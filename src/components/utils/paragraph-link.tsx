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
        ml-1 focus-visible:border-b-2 focus-visible:border-b-green-600
        border-b border-b-neutral-600 hover:border-b-green-600 
        outline-none focus-visible:pb-1 hover:text-green-600
      `}
    >
      {text}
    </Link>
  )
}
