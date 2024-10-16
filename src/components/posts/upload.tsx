'use client'

import React, { useEffect, useRef, useState } from 'react'
import Label from '../forms/label'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
// import { postUnionSchema } from '@/schemas/post'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from '../forms/input'
import { usePathname } from 'next/navigation'
import { bodyTypes, fuelTypes, transmissions, vehiclePostSchema } from '@/schemas/post'
import ErrorMsg from '../forms/error-msg'
import { FaCaretDown } from "react-icons/fa";
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { FaImages } from "react-icons/fa";
import Dropdown from '../utils/dropdown'
import ImgUpload from '../forms/img-upload'

export type VehiclePostData = z.infer<typeof vehiclePostSchema>

export default function Upload() {
  const pathname = usePathname()
  const category = pathname.slice(pathname.lastIndexOf('/') + 1) as 'vehicle' | 'parts'

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<VehiclePostData>({
    resolver: zodResolver(vehiclePostSchema),
    defaultValues: {
      category,
    }
  })

  return (
    <section className='grid xl:grid-cols-3 gap-2 h-full'>
      <div className='bg-neutral-50 p-4 rounded overflow-y-auto'>
        <h2 className='text-2xl font-semibold'>Vehicle for sale</h2>
        <form
          className='grid'
          encType='multipart/form-data'
        >
          <ImgUpload 
            register={register}
            name='images'
            setValue={setValue}
          />

          <div className='my-4'>
            <h3 className='font-medium'>About this vehicle</h3>
            <p className='text-sm'>
              Help buyers know more about the vehicle you're listing.
              This information will also help you see how
              the price you list your vehicle compares to the
              price range of similar vehicles.
            </p>
          </div>
          <div className="grid gap-1">
            <Label htmlFor='make' text='Make' />
            <Input
              register={register}
              name='make'
              id='make'
            />
            <ErrorMsg message={errors.make?.message} />
          </div>
          <div className="grid gap-1">
            <Label htmlFor='model' text='Model' />
            <Input
              register={register}
              name='model'
              id='model'
            />
            <ErrorMsg message={errors.model?.message} />
          </div>
          <div className="grid gap-1">
            <Label htmlFor='year' text='Year' />
            <Input
              register={register}
              name='year'
              id='year'
            />
            <ErrorMsg message={errors.year?.message} />
          </div>

          <div className='my-4'>
            <h3 className='font-medium'>Price</h3>
            <p className='text-sm'>
              Enter your price for this vehicle.
            </p>
          </div>
          <div className="grid gap-1">
            <Label htmlFor='price' text='Price' />
            <Input
              register={register}
              name='price'
              id='price'
            />
            <ErrorMsg message={errors.price?.message} />
          </div>

          <div className='my-4'>
            <h3 className='font-medium'>Vehicle appearance and features</h3>
            <p className='text-sm'>
              Add more about what your vehicle looks like
              and the features that it has.
            </p>
          </div>
          <Dropdown
            list={bodyTypes}
            defaultVal='Body Type'
            name='type'
            setValue={setValue}
            watch={watch}
          />
          <div className="grid gap-1">
            <Label htmlFor='extColor' text='Exterior Color' />
            <Input
              register={register}
              name='extColor'
              id='extColor'
            />
            <ErrorMsg message={errors.extColor?.message} />
          </div>
          <div className="grid gap-1">
            <Label htmlFor='intColor' text='Interior Color' />
            <Input
              register={register}
              name='intColor'
              id='intColor'
            />
            <ErrorMsg message={errors.intColor?.message} />
          </div>

          <div className='my-4'>
            <h3 className='font-medium'>Vehicle details</h3>
            <p className='text-sm'>
              Include more details to help connect
              interested buyers to your vehicle.
            </p>
          </div>
          <Dropdown
            list={fuelTypes}
            defaultVal='Fuel Type'
            name='fuel'
            setValue={setValue}
            watch={watch}
          />
          <Dropdown
            list={transmissions}
            defaultVal='Transmission Type'
            name='trans'
            setValue={setValue}
            watch={watch}
          />
          <div className="grid gap-1">
            <Label htmlFor='engine' text='Engine' />
            <Input
              register={register}
              name='engine'
              id='engine'
            />
            <ErrorMsg message={errors.engine?.message} />
          </div>
          {/* checkbox */}
          <div className="flex items-center justify-between">
            <label
              htmlFor="cleanTitle"
            >
              <p className='font-medium text-sm'>
                This vehicle has a clean title.
              </p>
              <p className='text-xs'>
                This vehicle has no significant damage
                or persistent problems.
              </p>
            </label>
            <input
              type="checkbox"
              id='cleanTitle'
              {...register('cleanTitle')}
            // className='sr-only'
            />
          </div>

          <div className='my-4'>
            <h3 className='font-medium'>Description</h3>
            <p className='text-sm'>
              Tell buyers anything that you haven't
              had the chance to include yet about your vehicle.
            </p>
          </div>
          <div className="grid gap-1">
            <Label htmlFor='desc' text='Description' />
            <textarea
              id="desc"
              {...register('desc')}
              className={`
                py-2 px-3 rounded bg-inherit border border-neutral-500
                hover:border-neutral-400 text-sm
                focus-visible:outline outline-emerald-400 focus-visible:border-transparent
                resize-none
              `}
              rows={5}
            ></textarea>
          </div>
        </form>
      </div>
      <div className='xl:col-span-2 bg-neutral-100 p-4 rounded'>
        <h2>Preview</h2>
      </div>
    </section>
  )
}
