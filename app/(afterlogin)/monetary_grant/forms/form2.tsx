"use client"
import React from 'react'
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useContext } from 'react';
import { AppContext } from '@/app/context/module'
type Props = {
    nextForm: ()=>void
    prevForm: ()=>void
}
const Form2 = ({...Props}:Props) => {
  const appContext = useContext(AppContext);
  if (!appContext) {
    throw new Error("SomeComponent must be used within an AppWrapper");
  }

  const { user } = appContext;
  console.log(user,"this is user");
  return (
    // </div>
    (<div>
      <h1 className='text-black text-2xl font-normal uppercase pb-8'>
        Basic Detail
      </h1>
      <div className='grid grid-cols-2 gap-12'>
      <div className='flex flex-col gap-2'>
        <label className='lable'>Event Name <span className='text-[#e60000]'>*</span></label>
        <Input className='dropdown' placeholder='Type Here'></Input>

      </div>
      <div className='flex flex-col gap-2'>
        <label className='lable'>Event Venue<span className='text-[#e60000]'>*</span></label>
        <Input className='dropdown' placeholder='Type Here'></Input>

      </div>
      <div className='flex flex-col gap-2'>
        <label className='lable'>Event Start Date<span className='text-[#e60000]'>*</span></label>
        <input type='date' className='dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm'></input>

      </div>
      <div className='flex flex-col gap-2'>
        <label className='lable'>Event End Date<span className='text-[#e60000]'>*</span></label>
        <input type='date' className=' dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm'></input>
      </div>
      <div className='flex flex-col gap-2'>
        <label className='lable'>engagement of any government hCP’s?<span className='text-[#e60000]'>*</span></label>
        <Select>
<SelectTrigger className="dropdown">
<SelectValue placeholder="Theme" />
</SelectTrigger>
<SelectContent>
<SelectItem value="light">Light</SelectItem>
<SelectItem value="dark">Dark</SelectItem>
<SelectItem value="system">System</SelectItem>
</SelectContent>
</Select>

      </div>
      <div className='flex flex-col gap-2'>
        <label className='lable'>Total number of government hCP’s<span className='text-[#e60000]'>*</span></label>
        <Select>
<SelectTrigger className="text-black shadow">
<SelectValue placeholder="Theme" />
</SelectTrigger>
<SelectContent>
<SelectItem value="light">Light</SelectItem>
<SelectItem value="dark">Dark</SelectItem>
<SelectItem value="system">System</SelectItem>
</SelectContent>
</Select>

      </div>
      <div className='flex flex-col gap-2'>
        <label className='lable'>Therapy<span className='text-[#e60000]'>*</span></label>
        <Select>
<SelectTrigger className="dropdown">
<SelectValue placeholder="Theme" />
</SelectTrigger>
<SelectContent>
<SelectItem value="light">Light</SelectItem>
<SelectItem value="dark">Dark</SelectItem>
<SelectItem value="system">System</SelectItem>
</SelectContent>
</Select>

      </div>
      <div className='flex flex-col gap-2'>
        <label className='lable'>Reporting Head<span className='text-[#e60000]'>*</span></label>
        <Select>
<SelectTrigger className="text-black shadow">
<SelectValue placeholder="Theme" />
</SelectTrigger>
<SelectContent>
<SelectItem value="light">Light</SelectItem>
<SelectItem value="dark">Dark</SelectItem>
<SelectItem value="system">System</SelectItem>
</SelectContent>
</Select>

      </div>
      <div className='flex flex-col gap-2'>
        <label className='lable'>Comments<span className='text-[#e60000]'>*</span></label>
        <Textarea className='text-black shadow-md' placeholder='Type Here'/>
      </div>
      <div className='flex flex-col gap-2'>
        <label className='lable'>BU Rational<span className='text-[#e60000]'>*</span></label>
        <Textarea className='text-black shadow-md' placeholder='Type Here'/>
      </div>
      </div>
      <div className='flex justify-end pt-5 gap-4'>
        <Button className='bg-white text-black border text-md font-normal'> Save as Draft</Button>
        <Button className='bg-white text-black border text-md font-normal' onClick={Props.prevForm}>Back</Button>
        <Button className='bg-[#4430bf] text-white text-md font-normal border'onClick={Props.nextForm}>Next</Button>
      </div>
    </div>)
  );
}

export default Form2