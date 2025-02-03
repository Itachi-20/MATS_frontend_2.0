import React from 'react'
import { Input } from "@/components/ui/input";
import BeneficiaryDetails from "@/components/beneficiary_details";
import { Textarea } from "@/components/ui/textarea"
import { PreviewDataType } from '@/app/Types/EventData';

type Props = {
    eventData:PreviewDataType | null
}
const Basic_Details = ({ ...Props }: Props) => {
  return (
    <div className="md:pb-8">
      <div className="flex md:gap-6" >
        <h1 className="text-black md:text-[30px] md:font-medium uppercase md:pb-4">
          Shipping Details
        </h1>
        <div className="pt-3">
        </div>
      </div>
      <div className="grid md:grid-cols-3 md:gap-6">
        <div className='flex flex-col gap-2'>
          <label className='lable'>Requesting Hospital Name <span className='text-[#e60000]'>*</span></label>
          <Input className='dropdown' placeholder='Type Here' disabled value={Props.eventData?.requesting_hospital_name}></Input>

        </div>
        <div className='flex flex-col gap-2'>
          <label className='lable'>Event Start Date<span className='text-[#e60000]'>*</span></label>
          <input type='date' className='dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm' disabled value={Props.eventData?.event_start_date}></input>

        </div>
        <div className='flex flex-col gap-2'>
          <label className='lable'>Event End Date<span className='text-[#e60000]'>*</span></label>
          <input type='date' className=' dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm' disabled value={Props.eventData?.event_end_date}></input>
        </div>
        {/* <div className='flex flex-col gap-2'>
          <label className='lable'>Total number of government hCP’s<span className='text-[#e60000]'>*</span></label>
          <Select>
            <SelectTrigger className="text-black shadow">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>

        </div> */}
        <div className='flex flex-col gap-2'>
          <label className='lable'>Ship To<span className='text-[#e60000]'>*</span></label>
          <Textarea className='md:rounded-xl bg-[#f6f6f6] text-black shadow-md' placeholder='Type Here'disabled value={Props.eventData?.ship_to} />
        </div>
        <div className='flex flex-col gap-2'>
          <label className='lable'>Bill To<span className='text-[#e60000]'>*</span></label>
          <Textarea className='md:rounded-xl bg-[#f6f6f6] text-black shadow-md' placeholder='Type Here'disabled value={Props.eventData?.bill_to}/>
        </div>
        <div className='flex flex-col gap-2'>
          <label className='lable'>BU Rational<span className='text-[#e60000]'>*</span></label>
          <Textarea className='md:rounded-xl bg-[#f6f6f6] text-black shadow-md' placeholder='Type Here' disabled value={Props.eventData?.bu_rational}/>
        </div>
      </div>
    </div>
  )
}

export default Basic_Details