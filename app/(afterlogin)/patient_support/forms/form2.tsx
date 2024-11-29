"use client"
import React, { useEffect } from 'react'
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
import { AppContext } from '@/app/context/module';
import { useState } from 'react';

type EventEntry = {
  product_amount: number
}

type Props = {
  currency: {
    name: string
  }[] | null,
  handlefieldChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>void;
  handleSelectChange: (value:string,name:string)=>void;
  handleSubmit:(e: React.MouseEvent<HTMLButtonElement>)=>void
  handleBackButton: (e: React.MouseEvent<HTMLButtonElement>)=>void
}
const Form2 = ({ ...Props }: Props) => {
  const [preview_data, setPreviewData] = useState<EventEntry | null>(null);
  const [refNo,setRefNo] = useState<string | null>(localStorage.getItem("refno")?localStorage.getItem("refno"):"");

  const PreviewData = async () => {
    try {
      const response = await fetch("/api/previewData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          name: refNo
        })
      });

      if (response.ok) {
        const data = await response.json();
        setPreviewData(data.data);
        console.log(data, "PreviewData")
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  useEffect(()=>{
    PreviewData();
  },[]);
  return (
    // </div>
    (<div>
      <h1 className='text-black text-2xl font-normal uppercase pb-8'>
        Shipping Details
      </h1>
      <div className='grid grid-cols-2 gap-6'>
        <div className='flex flex-col gap-2'>
          <label className='lable'>Requesting Hospital Name <span className='text-[#e60000]'>*</span></label>
          <Input type='text' className=' dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm'
              name='requesting_hospital_name'
              onChange={(e) => Props.handlefieldChange(e)}
            ></Input>

        </div>
        <div className='flex flex-col gap-2'>
          <label className='lable'>Event Start Date<span className='text-[#e60000]'>*</span></label>
          <Input type='date' className=' dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm'
              name='event_start_date'
              onChange={(e) => Props.handlefieldChange(e)}
            ></Input>

        </div>
        <div className='flex flex-col gap-2'>
          <label className='lable'>Event End Date<span className='text-[#e60000]'>*</span></label>
          <Input type='date' className=' dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm'
              name='event_end_date'
              onChange={(e) => Props.handlefieldChange(e)}
            ></Input>
        </div>
        {/* <div className='flex flex-col gap-2'>
          <label className='lable'>engagement of any government hCP’s?<span className='text-[#e60000]'>*</span></label>
          <Select>
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
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
          <Input type='text' className=' dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm'
              name='ship_to'
              onChange={(e) => Props.handlefieldChange(e)}
            ></Input>
        </div>
        <div className='flex flex-col gap-2'>
          <label className='lable'>Bill To<span className='text-[#e60000]'>*</span></label>
          <Input type='text' className=' dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm'
              name='bill_to'
              onChange={(e) => Props.handlefieldChange(e)}
            ></Input>
        </div>
        <div className='flex flex-col gap-2'>
          <label className='lable'>BU Rational<span className='text-[#e60000]'>*</span></label>
          <Textarea className='text-black shadow-md' placeholder='Type Here'
            name='bu_rational'
            onChange={(e)=>{Props.handlefieldChange(e)}}
          />
        </div>
      </div>
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
            name='total_estimated_expense'
            type='number'
            // onChange={(e)=>Props.handlefieldChange(e)}
            value={preview_data?.product_amount}
            readOnly
          ></Input>
        </div>
        <div className="flex flex-col col-span-1 gap-2">
          <label className="lable">
            Currency<span className="text-[#e60000]">*</span>
          </label>
          <Select
          onValueChange={(value:string)=>{Props.handleSelectChange(value,"currency")}}
          >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {
                Props && Props.currency?.map((item,index)=>{
                  return(
                    <SelectItem value={item.name}>{item.name}</SelectItem>
                  )
                })
              }
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='flex justify-end pt-5 gap-4'>
        <Button className='bg-white text-black border text-md font-normal'> Save as Draft</Button>
        <Button className='bg-white text-black border text-md font-normal' onClick={Props.handleBackButton}>Back</Button>
        <Button className='bg-[#4430bf] text-white text-md font-normal border' onClick={Props.handleSubmit}>Next</Button>
      </div>
    </div>)
  );
}

export default Form2