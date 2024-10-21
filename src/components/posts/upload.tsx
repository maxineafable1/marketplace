'use client'

import React from 'react'
import Label from '../forms/label'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from '../forms/input'
import { usePathname } from 'next/navigation'
import { bodyTypes, fuelTypes, transmissions, vehicleConditions, vehiclePostSchema } from '@/schemas/post'
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
import Preview from './preview'
import InputCheck from '../forms/input-check'
import FormBtn from '../forms/form-btn'
import SubPreview from './sub-preview'

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

  const { register, handleSubmit, formState: { errors }, watch, setValue, control, reset, resetField } = useForm<VehiclePostData>({
    resolver: zodResolver(vehiclePostSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      category,
    }
  })

  const onSubmit: SubmitHandler<VehiclePostData> = async data => {
    console.log(data)
  }

  return (
    <section className='grid xl:grid-cols-3 gap-2 h-full overflow-y-auto'>
      <div className='bg-neutral-50 rounded xl:overflow-y-auto'>
        <h2 className='text-2xl font-semibold mb-6 pt-4 px-4'>Vehicle for sale</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid'
          encType='multipart/form-data'
        >
          <div className="px-4">
            <ImgUpload
              register={register}
              name='images'
              setValue={setValue}
              control={control}
              errorMsg={errors.images?.message?.toString()}
            />
          </div>

          <Divider />
          <div className='px-4'>
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
              control={control}
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
            <div className="grid gap-1 mb-4">
              <Label htmlFor='model' text='Model' />
              <Input
                register={register}
                name='model'
                id='model'
              />
              <ErrorMsg message={errors.model?.message} />
            </div>
            <Dropdown
              list={vehicleConditions}
              defaultVal='Vehicle condition'
              setValue={setValue}
              name='condition'
              control={control}
              errMsg={errors.condition?.message}
            />
          </div>

          <Divider />
          <div className="px-4">
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
          </div>

          <Divider />
          <div className="px-4">
            <FormDesc title='Vehicle appearance and features'>
              Add more about what your vehicle looks like
              and the features that it has.
            </FormDesc>
            <Dropdown
              list={bodyTypes}
              defaultVal='Body Type'
              name='type'
              setValue={setValue}
              control={control}
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
          </div>

          <Divider />
          <div className="px-4">
            <FormDesc title='Vehicle details'>
              Include more details to help connect
              interested buyers to your vehicle.
            </FormDesc>
            <Dropdown
              list={fuelTypes}
              defaultVal='Fuel type'
              name='fuel'
              setValue={setValue}
              control={control}
              errMsg={errors.fuel?.message}
            />
            <Dropdown
              list={transmissions}
              defaultVal='Transmission type'
              name='trans'
              setValue={setValue}
              control={control}
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
            <InputCheck
              id='cleanTitle'
              register={register}
              name='cleanTitle'
              title='This vehicle has a clean title.'
              sub='This vehicle has no significant damage or persistent problems.'
              mb
            />
            <InputCheck
              id='stock'
              register={register}
              name='stock'
              title='This vehicle is stock.'
              sub='This vehicle has not been modified or changed any major parts.'
            />
          </div>

          <Divider />
          <div className="px-4">
            <FormDesc title='Description'>
              Tell buyers anything that you haven't
              had the chance to include yet about your vehicle.
            </FormDesc>
            <div className="grid gap-1 mb-4">
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
          </div>
          <FormBtn marginBotAndX>Post</FormBtn>
        </form>
      </div>
      <Preview
        category='vehicle'
        sessName={sessName}
        setValue={setValue}
        control={control}
      />
    </section>
  )
}
