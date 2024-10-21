import React from 'react'

type DetailPreviewProps = {
  children: React.ReactNode
}

export default function DetailPreview({ children }: DetailPreviewProps) {
  return (
    <div className='text-sm flex items-center gap-2'>
      {children}
    </div>
  )
}
