import React from 'react'
import { FieldValues, Path, PathValue, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { MAX_MILEAGE, MAX_PRICE } from '@/schemas/post'

type InputNumberProps<T extends FieldValues> = {
  setValue: UseFormSetValue<T>
  register: UseFormRegister<T>
  name: Path<T>
  variant: 'money' | 'number'
  id: string
}

const NUMS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

export default function InputNumber<T extends FieldValues>({
  setValue,
  register,
  name,
  id,
  variant = 'number',
}: InputNumberProps<T>) {
  return (
    <input
      type='text'
      id={id}
      {...register(name)}
      className={`
        py-2 px-3 rounded bg-inherit border border-neutral-800
        hover:border-neutral-400 text-sm
        focus-visible:outline outline-green-600 focus-visible:border-transparent
      `}
      onChange={e => {
        if (variant === 'money') {
          // ₱1,000 to 1000
          // if not for this it results as NaN
          const targetVal = +e.target.value.replace(/₱|,/g, '')

          // no ₱0
          if (targetVal === 0) {
            setValue(name, '' as PathValue<T, Path<T>>)
            return
          }

          const formatter = new Intl.NumberFormat('fil-PH', { style: 'currency', currency: 'PHP', trailingZeroDisplay: 'stripIfInteger' })
          const formattedNumber = formatter.format(targetVal)

          setValue(name, formattedNumber as PathValue<T, Path<T>>)
        } else if (variant === 'number') {
          const val = e.target.value
          // only to type 0 once
          if (val.startsWith('0'))
            setValue(name, '0' as PathValue<T, Path<T>>)
          else if (+val > MAX_MILEAGE)
            setValue(name, MAX_MILEAGE as PathValue<T, Path<T>>)
          else
            setValue(name, val as PathValue<T, Path<T>>)
        }
      }}
      onPaste={e => {
        if (variant === 'money') {
          const targetVal = e.clipboardData.getData('text').replace(/₱|,/g, '')
          const targetLen = targetVal.length <= MAX_PRICE.toString().length

          const currLen = e.currentTarget.value.replace(/₱|,/g, '').length
          const validLen = currLen + targetVal.length <= MAX_PRICE.toString().length

          const negative = targetVal.startsWith('-')

          if (isNaN(+targetVal) || !targetLen || !validLen || negative)
            e.preventDefault()
        } else if (variant === 'number') {
          const targetVal = e.clipboardData.getData('text')
          const targetLen = targetVal.length <= MAX_MILEAGE.toString().length

          const currLen = e.currentTarget.value.length
          const validLen = currLen + targetVal.length <= MAX_MILEAGE.toString().length

          const negative = targetVal.startsWith('-')

          if (isNaN(+targetVal) || !targetLen || !validLen || negative)
            e.preventDefault()
        }
      }}
      onKeyDown={e => {
        // prevents alphabet chars but made it accessible
        const CTRL_A = e.ctrlKey && e.key.toLowerCase() === 'a'
        const CTRL_C = e.ctrlKey && e.key.toLowerCase() === 'c'
        const CTRL_V = e.ctrlKey && e.key.toLowerCase() === 'v'
        const CTRL_X = e.ctrlKey && e.key.toLowerCase() === 'x'
        const CTRL_Z = e.ctrlKey && e.key.toLowerCase() === 'z'
        const BCKSPC = e.key.toLowerCase() === 'backspace'
        const A_LEFT = e.key.toLowerCase() === 'arrowleft'
        const A_RIGHT = e.key.toLowerCase() === 'arrowright'
        const TAB = e.key.toLowerCase() === 'tab'
        const SHFT_TAB = e.shiftKey && e.key.toLowerCase() === 'tab'

        // limit the price length
        if (variant === 'money') {
          const targetValLen = e.currentTarget.value.replace(/₱|,/g, '').length
          const V_LENGTH = targetValLen < MAX_PRICE.toString().length

          if (!V_LENGTH && !SHFT_TAB && !TAB && !CTRL_Z && !CTRL_A && !CTRL_C && !CTRL_V && !CTRL_X && !BCKSPC && !A_LEFT && !A_RIGHT)
            e.preventDefault()
        }

        if (!SHFT_TAB && !TAB && !CTRL_Z && !CTRL_A && !CTRL_C && !CTRL_V && !CTRL_X && !BCKSPC && !A_LEFT && !A_RIGHT && !NUMS.includes(e.key)) {
          e.preventDefault()
        }
      }}
    />
  )
}
