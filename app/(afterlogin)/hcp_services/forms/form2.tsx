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

type dropdownData = {
  company: {
    name: string,
    company_name: "string"
  }[],
  division: {
    name: string,
    division_name: string
  }[],
  requestor: {
    full_name: string,
    email: string
  }[],
  vendor_type: {
    name: string,
    vendor_type: string
  }[],
  state: {
    name: string,
    state: string
  }[]
  currency: {
    name: string
  }[]
  engagement_type:{
    name:string
    engagement_type:string
  }[]
}

type Compensation = {
  vendor_type: string;
  vendor_name: string;
  est_amount: number;
  gst_included?: number;
};

type Logistics = {
  vendor_type: string;
  est_amount: number;
};

type formData = {
  name: string | null;
  event_type: string;
  company: string;
  event_cost_center: string;
  state: string;
  city: string;
  event_start_date: string;
  event_end_date: string;
  bu_rational: string;
  faculty: string;
  participants: string;
  therapy: string;
  event_name: string;
  event_venue: string;
  comments: string;
  compensation: Compensation[];
  logistics: Logistics[];
  total_compensation_expense: number;
  total_logistics_expense: number;
  event_requestor: string;
  business_unit: string;
  division_category: string;
  division_sub_category: string;
  sub_type_of_activity: string;
  any_govt_hcp: string,
  no_of_hcp: number
};


type activityDropdown = {
  activity:{
    name:string,
    activity_name:string
  }[],
  document:{
    name:string,
    activity_type:string,
    document_name:string
  }[]
}

type Props = {
  handlefieldChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSelectChange: (value: string, name: string) => void;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void
}
const Form2 = ({ ...Props }: Props) => {

  return (
    // </div>
    (<div>
      <h1 className='text-black text-2xl font-normal uppercase pb-8'>
        Hcp Details
      </h1>
      <div className='grid grid-cols-2 gap-12'>
        <div className='flex flex-col gap-2'>
          <label className='lable'>Hcp Name <span className='text-[#e60000]'>*</span></label>
          <Input className='dropdown' placeholder='Type Here'
          name='hcp_name'
          onChange={(e)=>{Props.handlefieldChange(e)}}
          ></Input>

        </div>
        <div className='flex flex-col gap-2'>
          <label className='lable'>Hospital Affiliation<span className='text-[#e60000]'>*</span></label>
          <input type='text' 
          name='hospital_affiliation'
          onChange={(e)=>{Props.handlefieldChange(e)}}
          className='dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm'></input>

        </div>
        
        <div className='flex flex-col gap-2'>
          <label className='lable'>engagement of any government hCP’s?<span className='text-[#e60000]'>*</span></label>
          <Select
          onValueChange={(value)=>{Props.handleSelectChange(value,"any_govt_hcp")}}
          >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="No">No</SelectItem>
              <SelectItem value="Yes">Yes</SelectItem>
            </SelectContent>
          </Select>

        </div>
        <div className='flex flex-col gap-2'>
          <label className='lable'>Total number of government hCP’s<span className='text-[#e60000]'>*</span></label>
          <input type='input' 
          name='no_of_hcp'
          onChange={(e)=>{Props.handlefieldChange(e)}}
          className='dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm'></input>


        </div>

        <div className='flex flex-col gap-2'>
          <label className='lable'>BU Rational<span className='text-[#e60000]'>*</span></label>
          <Textarea className='text-black shadow-md' placeholder='Type Here'
          name='bu_rational'
          onChange={(e)=>{Props.handlefieldChange(e)}}
          />
        </div>
        
      </div>
      <div className='flex justify-end pt-5 gap-4'>
        <Button className='bg-white text-black border text-md font-normal'> Save as Draft</Button>
        <Button className='bg-white text-black border text-md font-normal'>Back</Button>
        <Button className='bg-[#4430bf] text-white text-md font-normal border'onClick={(e)=>Props.handleSubmit(e)}>Next</Button>
      </div>
    </div>)
  );
}

export default Form2