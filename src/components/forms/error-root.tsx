import React from 'react'
import { IoIosInformationCircleOutline } from "react-icons/io";

export default function ErrorRoot({ message }: { message: string | undefined }) {
  return (
    <>
      {message && (
        <p className='bg-red-400 text-white text-sm rounded-sm py-1 px-3 my-4 flex items-center gap-2'>
          <IoIosInformationCircleOutline /> {message}
        </p>
      )}
    </>
  )
}
