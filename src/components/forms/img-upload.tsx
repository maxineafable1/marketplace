import React, { Fragment } from 'react'
import { FieldValues, Path, PathValue, UseFormRegister, UseFormSetValue, UseFormTrigger, UseFormWatch } from 'react-hook-form'
import { FaImages } from 'react-icons/fa'
import { IoClose } from "react-icons/io5";
import ErrorMsg from './error-msg';
import { MAX_NUM_FILES } from '@/schemas/post';
import FormDesc from './form-desc';

type ImgUploadProps<T extends FieldValues> = {
  register: UseFormRegister<T>
  name: Path<T>
  setValue: UseFormSetValue<T>
  watch: UseFormWatch<T>
  errorMsg: string | undefined
}

export default function ImgUpload<T extends FieldValues>({
  register,
  name,
  setValue,
  watch,
  errorMsg,
}: ImgUploadProps<T>) {
  const filesVal = watch(name)
  const fileImages = filesVal && Array.from(filesVal) as File[]

  return (
    <>
      <FormDesc title='Photo upload'>
        Photos - <span className='font-medium'>{fileImages?.length ?? 0} / {MAX_NUM_FILES}</span> - You can add up to {MAX_NUM_FILES} photos.
      </FormDesc>
      <div className='grid gap-1'>
        {fileImages?.length > 0 ? (
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
                    absolute shadow bg-neutral-300 hover:bg-neutral-400
                    p-1 rounded-full text-2xl top-1 right-1
                    focus-visible:outline outline-green-600 cursor-pointer
                  `}
                    onClick={() => setValue(name, fileImages.toSpliced(index, 1) as PathValue<T, Path<T>>, { shouldValidate: true })}
                    onKeyDown={e => {
                      if (e.code === 'Enter')
                        setValue(name, fileImages.toSpliced(index, 1) as PathValue<T, Path<T>>, { shouldValidate: true })
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
                      focus-visible:outline outline-green-600
                      cursor-pointer
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
                          // to prevent current files being overrided
                          // when you upload another file
                          const files = e.target.files
                          if (files) {
                            const filesArr = Array.from(files)
                            setValue(name, [...fileImages, ...filesArr] as PathValue<T, Path<T>>, { shouldValidate: true })
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
              p-4 rounded bg-inherit border border-neutral-800
              hover:border-neutral-400 text-sm
              focus-visible:outline outline-green-600 focus-visible:border-transparent
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
                // validate inital upload
                const files = e.target.files
                if (files) {
                  const filesArr = Array.from(files)
                  setValue(name, filesArr as PathValue<T, Path<T>>, { shouldValidate: true })
                }
              }}
              className={`sr-only invisible`}
            />
          </label>
        )}
        <ErrorMsg message={errorMsg} />
      </div>
    </>
  )
}
