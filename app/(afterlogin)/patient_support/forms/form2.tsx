"use client"
import React, { useEffect,useRef } from 'react'
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
import { Toaster, toast } from 'sonner'
import { useRouter } from 'next/navigation'
import {Previewdata} from '@/app/(afterlogin)/patient_support/page'
type EventEntry = {
  product_amount: number
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

type Props = {
  previewData:Previewdata | null;
  refno:string ;
  currency: {
    name: string
  }[] | null
}
const Form2 = ({ ...Props }: Props) => {
  const start_date_ref: React.RefObject<any> = useRef(null);
  const end_date_ref: React.RefObject<any> = useRef(null);
  const router = useRouter();
  const [formdata, setFormData] = useState<formData | {}>({});
  const [preview_data, setPreviewData] = useState<EventEntry | null>(null);
  const [refNo,setRefNo] = useState<string | null>(Props.refno ?? "");
  const [eventStartDate, setEventStartDate] = useState<any>(Props.previewData?.event_start_date ? new Date(Props.previewData?.event_start_date).getTime() : "");
  
  const handleEventStartDateValidate = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const currentDate = new Date().setHours(0, 0, 0, 0);
    if(e.target.valueAsNumber < currentDate){
      toast.error("You are choosing previous date");
    }
    setEventStartDate(e.target.valueAsNumber)
    handlefieldChange(e);
}

const handleStartDateClick = () => {
  if (start_date_ref.current) {
    start_date_ref.current.showPicker(); // For modern browsers
    start_date_ref.current.focus(); // Fallback for older browsers
  }
};

const handleEndDateClick = () => {
  if (end_date_ref.current) {
    end_date_ref.current.showPicker(); // For modern browsers
    end_date_ref.current.focus(); // Fallback for older browsers
  }
};

  const handleEventEndDateValidate = (e:React.ChangeEvent<HTMLInputElement>)=>{
    if(eventStartDate && e.target.valueAsNumber < eventStartDate){
      toast.error("End Date should be greater than or equal to start date");
      e.target.value = "";
    }
    handlefieldChange(e);
  }

    const handleSelectChange = (value: string, name: string) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlefieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async () => {
   
       const updatedFormData = {
           ...formdata
   
       };
       
       updatedFormData.event_type = "Patient Support"
       if(Props.refno){
         updatedFormData.name = Props.refno;
       }
   
   
       try {
         const response = await fetch(
           "/api/training_and_education/handleSubmit",
           {
             method: "POST",
             headers: {
               "Content-Type": "application/json",
             },
             credentials: 'include',
             body: JSON.stringify(updatedFormData)
           }
         );
         if (response.ok) {
           const data = await response.json();
           setRefNo(data.message);
   
           setTimeout(() => {
             router.push(`/patient_support?forms=3&refno=${data.message}`);
           }, 1000)
         } else {
           console.log("submission failed");
         }
       } catch (error) {
         console.error("Error during Submission:", error);
       }
     };
  return (
    <>
    <div>
      <h1 className='text-black text-2xl font-normal uppercase pb-8'>
        Shipping Details
      </h1>
      <div className='grid grid-cols-2 gap-6'>
        <div className='flex flex-col gap-2'>
          <label className='lable'>Requesting Hospital Name <span className='text-[#e60000]'>*</span></label>
          <Input type='text' className=' dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm'
              name='requesting_hospital_name'
              onChange={(e)=>{handlefieldChange(e)}}
              defaultValue={Props.previewData?.requesting_hospital_name?Props.previewData.requesting_hospital_name:""}
            ></Input>

        </div>
        <div className='flex flex-col gap-2' onClick={()=>{handleStartDateClick()}}>
          <label className='lable' htmlFor='start_date'>Event Start Date<span className='text-[#e60000]'>*</span></label>
          <Input type='date' className=' dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm'
              id='start_date'
              name='event_start_date'
              ref={start_date_ref}
              onChange={(e)=>{handleEventStartDateValidate(e)}}
              defaultValue={Props.previewData?.event_start_date?Props.previewData.event_start_date:""}
            ></Input>

        </div>
        <div className='flex flex-col gap-2' onClick={()=>{handleEndDateClick()}}>
          <label className='lable' htmlFor='end_date'>Event End Date<span className='text-[#e60000]'>*</span></label>
          <Input type='date' className=' dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm'
          id='end_date'
              name='event_end_date'
              ref={end_date_ref}
              onChange={(e)=>{handleEventEndDateValidate(e)}}
              defaultValue={Props.previewData?.event_end_date?Props.previewData.event_end_date:""}
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
              onChange={(e)=>{handlefieldChange(e)}}
              defaultValue={Props.previewData?.ship_to?Props.previewData.ship_to:""}
            ></Input>
        </div>
        <div className='flex flex-col gap-2'>
          <label className='lable'>Bill To<span className='text-[#e60000]'>*</span></label>
          <Input type='text' className=' dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm'
              name='bill_to'
              onChange={(e)=>{handlefieldChange(e)}}
              defaultValue={Props.previewData?.bill_to?Props.previewData.bill_to:""}
            ></Input>
        </div>
        <div className='flex flex-col gap-2'>
          <label className='lable'>BU Rational<span className='text-[#e60000]'>*</span></label>
          <Textarea className='text-black shadow-md' placeholder='Type Here'
            name='bu_rational'
            onChange={(e)=>{handlefieldChange(e)}}
            defaultValue={Props.previewData?.bu_rational?Props.previewData.bu_rational:""}
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
            defaultValue={Props.previewData?.total_estimated_expense}
            readOnly
          ></Input>
        </div>
        <div className="flex flex-col col-span-1 gap-2">
          <label className="lable">
            Currency<span className="text-[#e60000]">*</span>
          </label>
          <Select
           defaultValue={Props.previewData?.currency ?? ""}
           onValueChange={(value) => handleSelectChange(value, "currency")}
          >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
            {Props.currency &&
                Props.currency ?
                Props.currency.map((item, index) => {
                  return (
                    <SelectItem value={item.name}>
                      {item.name}
                    </SelectItem>
                  );
                })
                :
                <SelectItem value={"null"} disabled>No Data Yet</SelectItem>
              }
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='flex justify-end pt-5 gap-4'>
        {/* <Button className='bg-white text-black border text-md font-normal'> Save as Draft</Button> */}
        <Button className='bg-white text-black border text-md font-normal' onClick={()=>{router.push(`/patient_support?forms=1&refno=${Props.refno}`)}}>Back</Button>
        <Button className='bg-[#4430bf] text-white text-md font-normal border' onClick={()=>{handleSubmit()}}>Next</Button>
      </div>
    </div>
    <Toaster richColors position="bottom-right" />
    </>
  );
}

export default Form2