import React, { useEffect } from 'react'
import DetailPreview from './detail-preview'
import { Control, UseFormSetValue, useWatch } from 'react-hook-form'
import { VehiclePostData } from './upload'
import Divider from '../utils/divider'
import { FaCar, FaGasPump, FaUser } from 'react-icons/fa'
import { TbAutomaticGearbox, TbManualGearbox } from 'react-icons/tb'
import { MdElectricBolt } from 'react-icons/md'
import { TfiDashboard } from 'react-icons/tfi'
import { PiEngineFill } from 'react-icons/pi'
import { RiPaintFill } from 'react-icons/ri'
import { BsCardText } from 'react-icons/bs'
import { CiLocationOn } from 'react-icons/ci'

type VehiclePreview = {
  category?: 'vehicle'
  setValue: UseFormSetValue<VehiclePostData>
  control: Control<VehiclePostData>
}

type SubPreviewProps = VehiclePreview & {
  sessName: string | null
}

export default function SubPreview({
  category,
  sessName,
  setValue,
  control,
}: SubPreviewProps) {
  const {
    year,
    make,
    model,
    price,
    engine,
    trans,
    type,
    cleanTitle,
    stock,
    condition,
    extColor,
    intColor,
    mileage,
    desc,
    fuel,
  } = useWatch({
    control,
  })

  useEffect(() => {
    if (!year || !make || !model) return
    const title = `${year} ${make} ${model}`
    setValue('title', title)
  }, [year, make, model])

  return (
    <div className='grid 2xl:grid-cols-3 gap-2'>
      {/* item details */}
      <div className='2xl:col-span-2 bg-neutral-100 rounded overflow-y-auto'>
        <div className="px-4 pt-4">
          <h3 className='text-xl font-semibold'>
            {(year || make || model) ? `${year ? year : ''} ${make ? make : ''} ${model ? model : ''}` : 'Title'}
          </h3>
          <p className='font-medium'>
            {price ? price : 'Price'}
          </p>
          <p className='text-sm text-neutral-600'>
            Listed a few seconds ago in Location City
          </p>
        </div>

        <Divider />
        <div className="px-4 grid gap-3">
          <h3 className='font-semibold'>About this vehicle</h3>
          {condition && (
            <DetailPreview>
              <FaCar /> Vehicle condition: {condition}
            </DetailPreview>
          )}
          {trans && (
            <DetailPreview>
              {trans === 'Manual transmission' ? (
                <TbManualGearbox />
              ) : (
                <TbAutomaticGearbox />
              )}
              {trans}
            </DetailPreview>
          )}
          {fuel && (
            <DetailPreview>
              {fuel === 'Electric' || fuel === 'Hybrid' ? (
                <MdElectricBolt />
              ) : (
                <FaGasPump />
              )}
              Fuel type: {fuel}
            </DetailPreview>
          )}
          {mileage && (
            <DetailPreview>
              <TfiDashboard /> Mileage: {new Intl.NumberFormat('en-US', { style: 'unit', unit: 'kilometer' }).format(mileage)}
            </DetailPreview>
          )}
          {engine && (
            <DetailPreview>
              <PiEngineFill /> Engine: {engine}
            </DetailPreview>
          )}
          {(extColor || intColor) && (
            <DetailPreview>
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
            </DetailPreview>
          )}
          {type && (
            <DetailPreview>
              <FaCar /> Body type: {type}
            </DetailPreview>
          )}
          {cleanTitle && (
            <DetailPreview>
              <BsCardText />
              <div className='grid'>
                <p>Clean title</p>
                <p className='text-xs'>This vehicle has no signifant damage or problems.</p>
              </div>
            </DetailPreview>
          )}
          {stock && (
            <DetailPreview>
              <FaCar />
              <div className='grid'>
                <p>All stock</p>
                <p className='text-xs'>This vehicle has not been modified or changed any major parts.</p>
              </div>
            </DetailPreview>
          )}
        </div>

        <Divider />
        <div className="px-4 pb-4">
          <h3 className={`font-semibold ${desc && 'mb-4'}`}>Seller's Description</h3>
          <pre className='text-sm whitespace-pre-wrap leading-6'>
            {desc}
          </pre>
        </div>
      </div>
      {/* seller info */}
      <div className='p-4 bg-neutral-100 rounded'>
        <h3 className='font-semibold mb-2'>Seller information</h3>
        {sessName && (
          <DetailPreview>
            <span
              className={`
                block bg-neutral-300 rounded-full p-2 
                focus-visible:outline outline-green-600
              `}
            >
              <FaUser className='fill-neutral-800' />
            </span> {sessName}

          </DetailPreview>
        )}
        <DetailPreview>
          <CiLocationOn /> Cabanatuan City
        </DetailPreview>
      </div>
    </div>
  )
}
