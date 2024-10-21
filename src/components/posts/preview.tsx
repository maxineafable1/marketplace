import React from 'react'
import ImgSlider from '../forms/img-slider'
import { Control, UseFormSetValue } from 'react-hook-form'
import { VehiclePostData } from './upload'
import SubPreview from './sub-preview'

type VehiclePreview = {
  category: 'vehicle'
  setValue: UseFormSetValue<VehiclePostData>
  control: Control<VehiclePostData>
}

type PreviewProps = VehiclePreview & {
  sessName: string | null
}

export default function Preview({
  category,
  sessName,
  setValue,
  control,
}: PreviewProps) {
  if (category === 'vehicle') {
    return (
      <div className='xl:col-span-2 bg-neutral-50 p-4 rounded xl:overflow-y-auto'>
        <h2 className='font-semibold text-base mb-4'>Preview</h2>
        <div className="grid gap-2 grid-rows-3 h-full max-h-[calc(100%-3rem)]">
          <div className='grid row-span-2 rounded overflow-hidden'>
            <ImgSlider
              name='images'
              control={control}
            />
          </div>
          <SubPreview
            category={category}
            sessName={sessName}
            setValue={setValue}
            control={control}
          />
        </div>
      </div>
    )
  }

}
