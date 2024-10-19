import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";


type dropdownData = {
  company:{
    name:string,
    company_name:"string"
  }[],
  division:{
    name:string,
    division_name:string
  }[],
  event_type:{
    name:string,
    event_name:string
  }[],
  vendor_type:{
    name:string,
    vendor_type:string
  }[]
}

type Props = {
  nextForm: () => void;
  dropdownData: dropdownData | null
};
const Form1 = ({ ...Props }: Props) => {
  return (
    // </div>
    (<div>
      <h1 className="text-black text-2xl font-normal uppercase pb-8">
        Basic Detail
      </h1>
      <div className="grid grid-cols-2 gap-12 pb-8">
        <div className="flex flex-col gap-2">
          <label className="lable">
            Company Names <span className="text-[#e60000]">*</span>
          </label>
          <Select>
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {Props.dropdownData && Props.dropdownData.company.map((item,index)=>{
                return(
                  <SelectItem value={item.name}>{item.company_name}</SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable">
            Business Unit<span className="text-[#e60000]">*</span>
          </label>
          <Select>
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
            {Props.dropdownData && Props.dropdownData.division.map((item,index)=>{
                return(
                  <SelectItem value={item.name}>{item.division_name}</SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable">
            Event requester<span className="text-[#e60000]">*</span>
          </label>
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
        <div className="flex flex-col gap-2">
          <label className="lable">
            event cost center<span className="text-[#e60000]">*</span>
          </label>
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
        <div className="flex flex-col gap-2">
          <label className="lable">
            Budget<span className="text-[#e60000]">*</span>
          </label>
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
        <div className="flex flex-col gap-2">
          <label className="lable">
            City<span className="text-[#e60000]">*</span>
          </label>
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
        <div className="flex flex-col gap-2">
          <label className="lable">
            State<span className="text-[#e60000]">*</span>
          </label>
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
        <div className="flex flex-col gap-2">
          <label className="lable">
            Therapy<span className="text-[#e60000]">*</span>
          </label>
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
        <div className="flex flex-col gap-2">
          <label className="lable">
            Reporting Head<span className="text-[#e60000]">*</span>
          </label>
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
        <div className="flex flex-col gap-2">
          <label className="lable">
            Sub Type Of Activity<span className="text-[#e60000]">*</span>
          </label>
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
        
      </div>
      <div className="grid grid-cols-2 gap-10">
      <div className="flex flex-col gap-2">
          <label className="lable">
            Faculties<span className="text-[#e60000]">*</span>
          </label>
          <Textarea className='text-black shadow-md' placeholder='Type Here'/>
        </div>
      <div className="flex flex-col gap-2">
          <label className="lable">
            Participants<span className="text-[#e60000]">*</span>
          </label>
          <Textarea className='text-black shadow-md' placeholder='Type Here'/>
      </div>
        </div>
      <div className="flex justify-end pt-5 gap-4">
        <Button className="bg-white text-black border text-md font-normal">
          {" "}
          Save as Draft
        </Button>
        <Button className='bg-[#4430bf] text-white text-md font-normal border' onClick={Props.nextForm}>Next</Button>
      </div>
    </div>)
  );
};

export default Form1;
