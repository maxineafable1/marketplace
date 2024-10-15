import React from 'react'
import Label from '../forms/label'

export default function Upload() {
  return (
    <section className='grid xl:grid-cols-3 gap-2'>
      <div className='bg-neutral-50 p-4 rounded'>
        <h2>Vehicle for sale</h2>
        <form
          className=''
        >
          <Label htmlFor='make' text='Make' />

        </form>
      </div>
      <div className='xl:col-span-2 bg-neutral-100 p-4 rounded'>
        <h2>Preview</h2>
      </div>
    </section>
  )
}
