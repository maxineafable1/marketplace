'use client'

import { signup } from '@/actions/auth'
import { signupSchema } from '@/schemas/user'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import ErrorRoot from '../forms/error-root'
import Input from '../forms/input'
import ErrorMsg from '../forms/error-msg'
import Label from '../forms/label'
import FormBtn from '../forms/form-btn'
import ParagraphLink from '../utils/paragraph-link'

export type SignupSchemaType = z.infer<typeof signupSchema>

export default function Signup() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema)
  })

  const onSubmit: SubmitHandler<SignupSchemaType> = async (data) => {
    try {
      await signup(data)
    } catch (error) {
      if (error instanceof Error)
        setError('root', { message: error.message })
    }
  }

  return (
    <section className='max-w-lg mx-auto'>
      <h2 className='font-semibold text-lg mb-4'>Create an account</h2>
      <ErrorRoot message={errors.root?.message} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='grid gap-4'
      >
        <div className="grid gap-1">
          <Label htmlFor='firstName' text='First Name' />
          <Input
            register={register}
            id='firstName'
            name='firstName'
            autoFocus
          />
          <ErrorMsg message={errors.firstName?.message} />
        </div>
        <div className="grid gap-1">
          <Label htmlFor='lastName' text='Last Name' />
          <Input
            register={register}
            id='lastName'
            name='lastName'
          />
          <ErrorMsg message={errors.lastName?.message} />
        </div>
        <div className="grid gap-1">
          <Label htmlFor='email' text='Email Address' />
          <Input
            register={register}
            id='email'
            name='email'
          />
          <ErrorMsg message={errors.email?.message} />
        </div>
        <div className="grid gap-1">
          <Label htmlFor='password' text='Password' />
          <Input
            register={register}
            id='password'
            name='password'
            type='password'
          />
          <ErrorMsg message={errors.password?.message} />
        </div>
        <FormBtn>Sign up</FormBtn>
      </form>
      <p className='text-sm text-center mt-4'>
        Already have an account?
        <ParagraphLink 
          href='/login'
          text='Log in'
        />
      </p>
    </section>
  )
}
