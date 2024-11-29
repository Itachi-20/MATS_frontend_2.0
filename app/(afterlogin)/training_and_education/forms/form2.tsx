"use client"
import React, { useState } from 'react'
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
import { Toaster, toast } from 'sonner'

type Props = {
  handlefieldChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSelectChange: (value: string, name: string) => void;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void
}


const Form2 = ({ ...Props }: Props) => {
  const [eventStartDate,setEventStartDate] = useState<any>();
  const handleEventStartDateValidate = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const currentDate = Date.now()
    if(e.target.valueAsNumber < currentDate){
      toast.error("Please Enter Valid Start Date");
    }
    setEventStartDate(e.target.value)
    Props.handlefieldChange(e);
}

  const handleEventEndDateValidate = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const currentDate = Date.now()
    if(e.target.valueAsNumber < currentDate || e.target.valueAsNumber < eventStartDate){
      toast.error("Please Enter Valid End Date");
    }
    Props.handlefieldChange(e);
  }


  const [engagementHCP,setEngagementHCP] = useState<any>();
  return (
    <>
    (<div>
      <h1 className='text-black text-2xl font-normal uppercase pb-8'>
        Basic Detail
      </h1>
      <div className='grid grid-cols-2 gap-6'>
        <div className='flex flex-col gap-2'>
          <label className='lable'>Event Name <span className='text-[#e60000]'>*</span></label>
          <Input className='dropdown' placeholder='Type Here'
            name='event_name'
            onChange={(e) => Props.handlefieldChange(e)}
          ></Input>

        </div>
        <div className='flex flex-col gap-2'>
          <label className='lable'>Event Venue<span className='text-[#e60000]'>*</span></label>
          <Input className='dropdown' placeholder='Type Here'
            name={"event_venue"}
            onChange={(e) => Props.handlefieldChange(e)}
          ></Input>

        </div>
        <div className='flex flex-col gap-2'>
          <label className='lable'>Event Start Date<span className='text-[#e60000]'>*</span></label>
          <input type='date' className='dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm'
            name='event_start_date'
            onChange={(e) =>{handleEventStartDateValidate(e)}}
          ></input>

        </div>
        <div className='flex flex-col gap-2'>
          <label className='lable'>Event End Date<span className='text-[#e60000]'>*</span></label>
          <input type='date' className=' dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm'
            name='event_end_date'
            onChange={(e) => handleEventEndDateValidate(e)}
          ></input>
        </div>
        <div className='flex flex-col gap-2'>
          <label className='lable'>engagement of any government hCP’s?<span className='text-[#e60000]'>*</span></label>
          <Select
            onValueChange={(value) => {setEngagementHCP(value);Props.handleSelectChange(value, "any_govt_hcp");}}
          >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>

        </div>
        <div className='flex flex-col gap-2'>
          <label className='lable'>Total number of government hCP’s<span className='text-[#e60000]'>*</span></label>
          <Input className={`dropdown ${engagementHCP?"":"cursor-not-allowed"}`} placeholder='Type Here'
            name='no_of_hcp'
            type='number'
            disabled = {engagementHCP == "Yes"?false:true}
            onChange={(e) => Props.handlefieldChange(e)}
          ></Input>
        </div>
        <div className='flex flex-col gap-2'>
          <label className='lable'>Comments<span className='text-[#e60000]'>*</span></label>
          <Textarea className='text-black shadow-md' placeholder='Type Here'
            name='comments'
            onChange={(e) => { Props.handlefieldChange(e) }}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label className='lable'>BU Rational<span className='text-[#e60000]'>*</span></label>
          <Textarea className='text-black shadow-md' placeholder='Type Here'
            name='bu_rational'
            onChange={(e) => { Props.handlefieldChange(e) }}
          />
        </div>
      </div>
      <div className='flex justify-end pt-5 gap-4'>
        <Button className='bg-white text-black border text-md font-normal'> Save as Draft</Button>
        <Button className='bg-white text-black border text-md font-normal'>Back</Button>
        <Button className='bg-[#4430bf] text-white text-md font-normal border' onClick={Props.handleSubmit}>Next</Button>
      </div>
    </div>
      <Toaster richColors position="bottom-right" />
    )
      </>
  );
}

export default Form2