import React from 'react'
import { IoIosInformationCircleOutline } from "react-icons/io";

export default function ErrorMsg({ message }: { message: string | undefined }) {
  return (
    <>
      {message && (
        <p className='text-sm text-red-400 flex items-center gap-2'>
          <IoIosInformationCircleOutline /> {message}
        </p>
      )}
    </>
  )
}
