'use client'

import React from 'react'
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/schemas/user';
import { z } from 'zod';
import { login } from '@/actions/auth';
import Input from '../forms/input';
import ErrorMsg from '../forms/error-msg';
import ErrorRoot from '../forms/error-root';
import Label from '../forms/label';
import FormBtn from '../forms/form-btn';
import ParagraphLink from '../utils/paragraph-link';

export type LoginSchemaType = z.infer<typeof loginSchema>

export default function Login() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    try {
      await login(data)
    } catch (error) {
      if (error instanceof Error)
        setError('root', { message: error.message })
    }
  }

  return (
    <section className='max-w-lg mx-auto'>
      <h2 className='font-semibold text-lg mb-4'>Login to marketplace</h2>
      <ErrorRoot message={errors.root?.message} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='grid gap-4'
      >
        <div className='grid gap-1'>
          <Label htmlFor='email' text='Email Address' />
          <Input
            register={register}
            id='email'
            name='email'
            autoFocus
          />
          <ErrorMsg message={errors.email?.message} />
        </div>
        <div className='grid gap-1'>
          <Label htmlFor='password' text='Password' />
          <Input
            register={register}
            id='password'
            name='password'
            type='password'
          />
          <ErrorMsg message={errors.password?.message} />
        </div>
        <FormBtn>Login</FormBtn>
      </form>
      <p className='text-sm text-center mt-4'>
        Don't have an account?
        <ParagraphLink 
          href='/signup'
          text='Sign up'
        />
      </p>
    </section>
  )
}
