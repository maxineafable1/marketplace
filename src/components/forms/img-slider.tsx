import React, { Fragment, useEffect, useState } from 'react'
import { FieldValues, Path, UseFormWatch } from 'react-hook-form'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

type ImgSliderProps<T extends FieldValues> = {
  watch: UseFormWatch<T>
  name: Path<T>
}

export default function ImgSlider<T extends FieldValues>({
  watch,
  name,
}: ImgSliderProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const fileImages = watch(name)

  // to make slider in sync with add or remove of uploaded files
  const currentImage = (fileImages && fileImages.length > 0) ? URL.createObjectURL(currentIndex >= fileImages.length ? fileImages[currentIndex - 1] : fileImages[currentIndex]) : ''

  function handleNext() {
    setCurrentIndex(prev => {
      return prev < (fileImages?.length - 1) ? prev + 1 : 0
    })
  }

  function handlePrev() {
    setCurrentIndex(prev => {
      return prev > 0 ? prev - 1 : fileImages?.length - 1
    })
  }

  return (
    <div className='relative w-full flex overflow-hidden'>
      {(Array.isArray(fileImages)
        && fileImages.length > 0)
        && (
          <div
            className={`
              absolute inset-0
              bg-[image:var(--image-url)] bg-no-repeat
              bg-center bg-cover blur
            `}
            style={{
              '--image-url': `url(${currentImage})`
            } as React.CSSProperties}
          >
          </div>
        )}
      {(Array.isArray(fileImages)
        && fileImages.length > 0)
        ? fileImages.map((_: File, index: number) => (
          <Fragment key={index}>
            <img
              src={currentImage}
              alt=""
              className={`
                block object-contain w-full aspect-video
                flex-shrink-0 flex-grow-0
                img-transition
              `}
              style={{
                translate: `${-100 * (currentIndex >= fileImages.length ? currentIndex - 1 : currentIndex)}%`,
              } as React.CSSProperties}
            />
            <button
              onClick={handlePrev}
              className="img-slide-btn left-0"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={handleNext}
              className="img-slide-btn right-0"
            >
              <FaAngleRight />
            </button>
          </Fragment>
        )) : (
          <div
            className={`
              bg-neutral-300 rounded w-full
              flex flex-col justify-center items-center
              text-center
            `}
          >
            <h2 className='text-2xl font-semibold'>Your listing preview</h2>
            <p className='max-w-[35ch]'>
              As you create your  listing,
              you can preview how it will appear to
              others on Marketplace.
            </p>
          </div>
        )}
      <div className='img-slider-circle-div'>
        {(Array.isArray(fileImages)
          && fileImages.length > 0)
          && fileImages?.map((image: File, index: number) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
            >
              <img
                src={URL.createObjectURL(image)}
                alt=""
                className={`
                block w-full aspect-square object-cover max-w-10 rounded-sm shadow-lg 
                ${(index !== (currentIndex >= fileImages.length ? currentIndex - 1 : currentIndex)) && 'opacity-40 hover:opacity-80'}  
              `}
              />
            </button>
          ))}
      </div>
    </div>
  )
}
