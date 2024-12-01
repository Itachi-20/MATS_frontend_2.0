"use client"
import React from 'react'
import {useState} from 'react'
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
import { Toaster, toast } from 'sonner'

type currency = {
    name: string
  }[]
type Props = {
  // nextForm: () => void
  // prevForm: () => void
  handlefieldChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSelectChange: (value: string, name: string) => void;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void
  currency:currency | undefined
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
  return (
    <>
    (<div>
      <h1 className='text-black text-2xl font-normal uppercase pb-8'>
        Event Details
      </h1>
      <div className='grid grid-cols-2 gap-12'>
        <div className='flex flex-col gap-2'>
          <label className='lable'>Event Name <span className='text-[#e60000]'>*</span></label>
          <Input className='dropdown' placeholder='Type Here' name='event_name'
          onChange={(e) => Props.handlefieldChange(e)}
          ></Input>

        </div>
        <div className='flex flex-col gap-2'>
          <label className='lable'>Event Venue<span className='text-[#e60000]'>*</span></label>
          <Input className='dropdown' placeholder='Type Here'
          name='event_venue'  onChange={(e) => Props.handlefieldChange(e)}
          ></Input>

        </div>
        <div className='flex flex-col gap-2'>
          <label className='lable'>Event Start Date<span className='text-[#e60000]'>*</span></label>
          <input type='date'
          name='event_start_date'
           onChange={(e) => handleEventStartDateValidate(e)}
          className='dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm'></input>

        </div>
        <div className='flex flex-col gap-2'>
          <label className='lable'>Event End Date<span className='text-[#e60000]'>*</span></label>
          <input type='date' 
          name='event_end_date'
          onChange={(e) => handleEventEndDateValidate(e)}
          className=' dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm'></input>
        </div>
        
        <div className='flex flex-col gap-2'>
          <label className='lable'>BU Rational<span className='text-[#e60000]'>*</span></label>
          <Textarea 
          name='bu_rational'
          onChange={(e) => Props.handlefieldChange(e)}
          className='text-black shadow-md' placeholder='Type Here' />
        </div>
      </div>
      <div className=''>
        <h1 className="text-black text-2xl font-normal uppercase py-8">
          Expense Details
        </h1>
        <div className="grid grid-cols-4 gap-12">
          <div className="flex flex-col col-span-2 gap-2">
            <label className="lable">
              Total Estimated Expense
              <span className="text-[#e60000]">*</span>
            </label>
            <Input
              className="text-black shadow"
              placeholder="Type Here"
              name='total_estimated_amount'
              onChange={(e) => Props.handlefieldChange(e)}
            ></Input>
          </div>
          <div className="flex flex-col col-span-1 gap-2">
            <label className="lable">
              Currency<span className="text-[#e60000]">*</span>
            </label>
            <Select
            onValueChange={(value)=>{Props.handleSelectChange(value,"currency")}}
            >
              <SelectTrigger className="dropdown">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {
                  Props && Props.currency?.map((item,index)=>{
                    return (
                      <SelectItem value={item.name}>{item.name}</SelectItem>
                    )
                  })
                }
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className='flex justify-end pt-5 gap-4'>
        {/* <Button className='bg-white text-black border text-md font-normal'> Save as Draft</Button> */}
        <Button className='bg-white text-black border text-md font-normal'>Back</Button>
        <Button className='bg-[#4430bf] text-white text-md font-normal border' onClick={(e)=>Props.handleSubmit(e)}>Next</Button>
      </div>
    </div>)
    <Toaster richColors position="bottom-right" />
    </>
  );
}

export default Form2