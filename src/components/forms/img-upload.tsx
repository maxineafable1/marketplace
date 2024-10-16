'use client'

import React, { Fragment, useState } from 'react'
import { FieldValues, Path, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { FaImages } from 'react-icons/fa'
import { IoClose } from "react-icons/io5";

type ImgUploadProps<T extends FieldValues> = {
  register: UseFormRegister<T>
  name: Path<T>
  setValue: UseFormSetValue<T>
}

export default function ImgUpload<T extends FieldValues>({
  register,
  name,
  setValue,
}: ImgUploadProps<T>) {
  const [fileImages, setFileImages] = useState<File[]>([])

  return (
    <>
      <div className='my-4'>
        <h3 className='font-medium'>Photo upload</h3>
        <p className='text-sm'>
          Photos - <span className='font-medium'>{fileImages.length} / 10</span> - You can add up to 10 photos.
        </p>
      </div>
      {fileImages.length > 0 ? (
        <ul className='grid grid-cols-3 gap-2'>
          {fileImages.map((file, index) => (
            <Fragment key={index}>
              <li className='relative'>
                <img
                  src={URL.createObjectURL(file)}
                  alt=""
                  className={`
                    block w-full h-full object-cover aspect-square rounded shadow
                    hover:opacity-90
                  `}
                />
                <IoClose
                  tabIndex={0}
                  className={`
                    absolute shadow bg-neutral-300 hover:bg-neutral-200 
                    p-1 rounded-full text-2xl top-1 right-1 hover:scale-105
                    focus-visible:outline outline-emerald-400 cursor-pointer
                  `}
                  onClick={() => setFileImages(fileImages.toSpliced(index, 1))}
                  onKeyDown={e => {
                    if (e.code === 'Enter')
                      setFileImages(fileImages.toSpliced(index, 1))
                  }}
                />
              </li>
              {index === fileImages.length - 1 && (
                <>
                  <label
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.code === 'Enter') {
                        e.currentTarget.control?.click()
                      }
                    }}
                    className={`
                    bg-neutral-300 hover:bg-neutral-400 rounded 
                      w-full h-full aspect-square shadow
                      flex flex-col gap-1 items-center justify-center
                      focus-visible:outline outline-emerald-400
                    `}
                  >
                    <div className='flex flex-col items-center gap-2'>
                      <FaImages
                        className='text-4xl'
                      />
                      <p className='font-medium'>Add photo</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      id="file"
                      multiple
                      {...register(name)}
                      onChange={e => {
                        const files = e.target.files
                        if (files) {
                          const filesArr = Array.from(files)
                          setFileImages([...fileImages, ...filesArr])
                        }

                      }}
                      className={`sr-only invisible`}
                    />
                  </label>
                </>
              )}
            </Fragment>
          ))}
        </ul>
      ) : (
        <label
          tabIndex={0}
          onKeyDown={e => {
            console.log(e.code)
            if (e.code === 'Enter') {
              e.currentTarget.control?.click()
            }
          }}
          className={`
              p-4 rounded bg-inherit border border-neutral-500
              hover:border-neutral-400 text-sm
              focus-visible:outline outline-emerald-400 focus-visible:border-transparent
              flex flex-col items-center cursor-pointer
            `}
        >
          <div className='flex flex-col items-center gap-2'>
            <FaImages
              className='bg-neutral-200 text-4xl rounded-full p-2'
            />
            <p className='font-medium'>Add photos</p>
          </div>
          <input
            type="file"
            accept="image/*"
            id="file"
            multiple
            {...register(name)}
            onChange={e => {
              const files = e.target.files
              if (files) {
                const filesArr = Array.from(files)
                setFileImages([...fileImages, ...filesArr])
              }

            }}
            className={`sr-only invisible`}
          />
        </label>
      )}
    </>
  )
}
