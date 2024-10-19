import { getSession } from '@/actions/auth'
import Upload from '@/components/posts/upload'
import React from 'react'

export default async function page() {
  const session = await getSession()

  return (
    <Upload 
      sessName={session.name}
      sessId={session.id}
    />
  )
}
