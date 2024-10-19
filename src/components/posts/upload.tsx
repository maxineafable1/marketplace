'use client'

import React from 'react'
import Label from '../forms/label'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from '../forms/input'
import { usePathname } from 'next/navigation'
import { bodyTypes, fuelTypes, transmissions, vehiclePostSchema } from '@/schemas/post'
import ErrorMsg from '../forms/error-msg'
import Dropdown from '../utils/dropdown'
import ImgUpload from '../forms/img-upload'
import Divider from '../utils/divider'
import FormDesc from '../forms/form-desc'
import InputNumber from '../forms/input-number'
import ImgSlider from '../forms/img-slider'

import { TbAutomaticGearbox, TbManualGearbox } from 'react-icons/tb'
import { FaGasPump, FaCar, FaUser } from 'react-icons/fa'
import { MdElectricBolt } from "react-icons/md";
import { TfiDashboard } from 'react-icons/tfi'
import { PiEngineFill } from 'react-icons/pi'
import { CiLocationOn } from "react-icons/ci";
import { RiPaintFill } from "react-icons/ri";
import { BsCardText } from "react-icons/bs";

export type VehiclePostData = z.infer<typeof vehiclePostSchema>

type UploadProps = {
  sessName: string | null
  sessId: string | null
}

const years = Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() + 1) - i)

export default function Upload({
  sessId,
  sessName,
}: UploadProps) {
  const pathname = usePathname()
  const category = pathname.slice(pathname.lastIndexOf('/') + 1) as 'vehicle' | 'parts'

  const { register, handleSubmit, formState: { errors }, watch, setValue, trigger } = useForm<VehiclePostData>({
    resolver: zodResolver(vehiclePostSchema),
    defaultValues: {
      category,
    }
  })

  const year = watch('year')
  const make = watch('make')
  const model = watch('model')
  const price = watch('price')
  const trans = watch('trans')
  const fuel = watch('fuel')
  const mileage = watch('mileage')
  const engine = watch('engine')
  const extColor = watch('extColor')
  const intColor = watch('intColor')
  const type = watch('type')
  const desc = watch('desc')
  const cleanTitle = watch('cleanTitle')

  console.log(extColor)
  console.log(intColor)

  const onSubmit: SubmitHandler<VehiclePostData> = async data => {
    console.log(data)
  }

  return (
    <section className='grid xl:grid-cols-3 gap-2 h-full overflow-y-auto'>
      <div className='bg-neutral-50 p-4 rounded xl:overflow-y-auto'>
        <h2 className='text-2xl font-semibold mb-6'>Vehicle for sale</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid'
          encType='multipart/form-data'
        >
          <ImgUpload
            register={register}
            name='images'
            setValue={setValue}
            watch={watch}
            errorMsg={errors.images?.message?.toString()}
          />

          <Divider />
          <FormDesc title='About this vehicle'>
            Help buyers know more about the vehicle you're listing.
            This information will also help you see how
            the price you list your vehicle compares to the
            price range of similar vehicles.
          </FormDesc>
          <Dropdown
            list={years}
            defaultVal='Year'
            setValue={setValue}
            name='year'
            watch={watch}
            errMsg={errors.year?.message?.toString()}
          />

          <div className="grid gap-1 mb-4">
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

          <Divider />
          <FormDesc title='Price'>
            Enter your price for this vehicle.
          </FormDesc>
          <div className="grid gap-1">
            <InputNumber
              register={register}
              name='price'
              id='price'
              setValue={setValue}
              variant='money'
            />
            <ErrorMsg message={errors.price?.message} />
          </div>

          <Divider />
          <FormDesc title='Vehicle appearance and features'>
            Add more about what your vehicle looks like
            and the features that it has.
          </FormDesc>
          <Dropdown
            list={bodyTypes}
            defaultVal='Body Type'
            name='type'
            setValue={setValue}
            watch={watch}
            errMsg={errors.type?.message}
          />
          <div className="grid gap-1 mb-4">
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

          <Divider />
          <FormDesc title='Vehicle details'>
            Include more details to help connect
            interested buyers to your vehicle.
          </FormDesc>
          <Dropdown
            list={fuelTypes}
            defaultVal='Fuel Type'
            name='fuel'
            setValue={setValue}
            watch={watch}
            errMsg={errors.fuel?.message}
          />
          <Dropdown
            list={transmissions}
            defaultVal='Transmission Type'
            name='trans'
            setValue={setValue}
            watch={watch}
            errMsg={errors.trans?.message}
          />
          <div className="grid gap-1 mb-4">
            <Label htmlFor='engine' text='Engine' />
            <Input
              register={register}
              name='engine'
              id='engine'
            />
            <ErrorMsg message={errors.engine?.message} />
          </div>
          <div className="grid gap-1 mb-4">
            <Label htmlFor='mileage' text='Mileage' />
            <InputNumber
              register={register}
              name='mileage'
              id='mileage'
              setValue={setValue}
              variant='number'
            />
            <ErrorMsg message={errors.mileage?.message} />
          </div>
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
              className='accent-green-400 focus-visible:outline outline-green-600'
            />
          </div>

          <Divider />
          <FormDesc title='Description'>
            Tell buyers anything that you haven't
            had the chance to include yet about your vehicle.
          </FormDesc>
          <div className="grid gap-1">
            <textarea
              id="desc"
              {...register('desc')}
              className={`
                py-2 px-3 rounded bg-inherit border border-neutral-800
                hover:border-neutral-400 text-sm
                focus-visible:outline outline-green-600 focus-visible:border-transparent
                resize-none
              `}
              rows={5}
            ></textarea>
            <ErrorMsg message={errors.desc?.message} />
          </div>
          <button
            className={`
              bg-green-400 hover:bg-green-500
               rounded-full py-2 mt-4 font-medium
               focus-visible:outline outline-green-600
            `}
          >
            Post
          </button>
        </form>
      </div>
      <div className='xl:col-span-2 bg-neutral-50 p-4 rounded xl:overflow-y-auto'>
        <h2 className='font-semibold text-base mb-4'>Preview</h2>
        <div className="grid gap-2 grid-rows-3 h-full max-h-[calc(100%-3rem)]">
          <div className='grid row-span-2'>
            <ImgSlider
              name='images'
              watch={watch}
            />
          </div>
          <div className='grid 2xl:grid-cols-3 gap-2'>
            <div className='2xl:col-span-2 bg-neutral-100 overflow-y-auto p-4'>
              <h2 className='text-xl font-semibold'>
                {(year || make || model) ? `${year ? year : ''} ${make ? make : ''} ${model ? model : ''}` : 'Title'}
              </h2>
              <p className='font-medium'>
                {price ? price : 'Price'}
              </p>
              <p className='text-sm text-neutral-600'>
                Listed a few seconds ago in Location City
              </p>
              <Divider />
              <h3 className='font-semibold mt-4 mb-2'>About this vehicle</h3>
              {trans && (
                <p className='text-sm flex items-center gap-2'>
                  {trans === 'Manual Transmission' ? (
                    <TbManualGearbox />
                  ) : (
                    <TbAutomaticGearbox />
                  )}
                  {trans}
                </p>
              )}
              {fuel && (
                <p className='text-sm flex items-center gap-2'>
                  {fuel === 'Electric' || fuel === 'Hybrid' ? (
                    <MdElectricBolt />
                  ) : (
                    <FaGasPump />
                  )}
                  Fuel Type: {fuel}
                </p>
              )}
              {mileage && (
                <p className='text-sm flex items-center gap-2'>
                  <TfiDashboard /> Mileage: {new Intl.NumberFormat('en-US', { style: 'unit', unit: 'kilometer' }).format(mileage)}
                </p>
              )}
              {engine && (
                <p className='text-sm flex items-center gap-2'>
                  <PiEngineFill /> Engine: {engine}
                </p>
              )}
              {(extColor || intColor) && (
                <p className='text-sm flex items-center gap-2'>
                  <RiPaintFill />
                  {extColor && (
                    <span>
                      Exterior color: {extColor}
                    </span>
                  )}
                  <span>{(extColor && intColor) && '-'}</span>
                  {intColor && (
                    <span>
                      Interior color: {intColor}
                    </span>
                  )}
                </p>
              )}
              {type && (
                <p className='text-sm flex items-center gap-2'>
                  <FaCar /> Body Type: {type}
                </p>
              )}
              {cleanTitle && (
                <p className='text-sm flex items-center gap-2'>
                  <BsCardText />
                  <div>
                    <p>Clean title</p>
                    <p className='text-xs'>This vehicle has no signifant damage or problems</p>
                  </div>
                </p>
              )}
              <Divider />
              <h3 className='font-semibold mt-4 mb-2'>Seller's Description</h3>
              <p className='text-sm flex items-center gap-2 leading-6'>
                {desc}
              </p>
            </div>
            <div className='p-4 bg-neutral-100'>
              <h3 className='font-semibold mb-2'>Seller information</h3>
              {sessName && (
                <p className='font-medium text-sm flex items-center gap-2'>
                  <span
                    className={`
                      block bg-neutral-300 rounded-full p-2 
                      focus-visible:outline outline-green-600
                    `}
                  >
                    <FaUser className='fill-neutral-800' />
                  </span> {sessName}
                </p>
              )}
              <p className='font-medium text-sm flex items-center gap-2'>
                <CiLocationOn /> Cabanatuan City
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
