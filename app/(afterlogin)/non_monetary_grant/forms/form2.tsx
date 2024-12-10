"use client"
import React from 'react'
import { useState,useRef } from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Toaster, toast } from 'sonner'
import { useRouter } from "next/navigation";
import { Previewdata } from '@/app/(afterlogin)/monetary_grant/page'
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
type Props = {
  previewData: Previewdata | null;
  refno: string;
}
const Form2 = ({ ...Props }: Props) => {
  const start_date_ref: React.RefObject<any> = useRef(null);
  const end_date_ref: React.RefObject<any> = useRef(null);
  const [eventStartDate, setEventStartDate] = useState<any>(Props.previewData?.event_start_date ? new Date(Props.previewData?.event_start_date).getTime() : "");  
  const [formdata, setFormData] = useState<formData | {}>({});
  const [refNo, setRefNo] = useState<string | null>(Props.refno);
  const router = useRouter()
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const updatedFormData = {
      ...formdata

    };
    updatedFormData.event_type = "Non Monetary Grant"
    if (refNo) {
      updatedFormData.name = refNo;
    }

    try {
      const response = await fetch(
        "/api/monetary_grant/handleSubmit",
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
        console.log(data, "response data");
        setRefNo(data.message);
        router.push(`/non_monetary_grant?forms=3&refno=${data.message}`);

      } else {
        console.log("submission failed");
      }
    } catch (error) {
      console.error("Error during Submission:", error);
    }
  };

  const handlefieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }
  const handleEventStartDateValidate = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const currentDate = new Date().setHours(0, 0, 0, 0);
    if(e.target.valueAsNumber < currentDate){
      toast.error("You are choosing previous date");
    }
    setEventStartDate(e.target.valueAsNumber)
    handlefieldChange(e);
}

  const handleEventEndDateValidate = (e:React.ChangeEvent<HTMLInputElement>)=>{
    if(eventStartDate && e.target.valueAsNumber < eventStartDate){
      toast.error("End Date should be greater than or equal to start date");
      e.target.value = "";
    }
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

  return (
    <>
    <div>
      <h1 className='text-black text-2xl font-normal uppercase pb-8'>
      Equipment Grant Details
      </h1>
      <div className='grid grid-cols-2 gap-6'>
        
        <div className='flex flex-col gap-2'>
          <label className='lable'>Name of Organization<span className='text-[#e60000]'>*</span></label>
          <Input className='dropdown' placeholder='Type Here' 
            name='organization_name'
            onChange={(e)=>handlefieldChange(e)}
            defaultValue={Props.previewData?.organization_name?Props.previewData.organization_name:""}
          ></Input>
        </div>

        <div className='flex flex-col gap-2'onClick={()=>{handleStartDateClick()}}>
          <label className='lable' htmlFor=''>Event Start Date<span className='text-[#e60000]'>*</span></label>
          <Input type='date' className='dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm'
          id='start_date'
            name='event_start_date'
            onChange={(e)=>handleEventStartDateValidate(e)}
            ref={start_date_ref}
            defaultValue={Props.previewData?.event_start_date?Props.previewData.event_start_date:""}
          ></Input>
        </div>

        <div className='flex flex-col gap-2'onClick={()=>{handleEndDateClick()}}>
          <label className='lable'>Event End Date<span className='text-[#e60000]'>*</span></label>
          <Input type='date' className=' dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm'
          id='end_date'
            name='event_end_date'
            onChange={(e)=>handleEventEndDateValidate(e)}
            ref={end_date_ref}
            defaultValue={Props.previewData?.event_end_date?Props.previewData.event_end_date:""}
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
        <div className='flex flex-col gap-2'>
          <label className='lable'>Comments<span className='text-[#e60000]'>*</span></label>
          <Textarea className='text-black shadow-md' placeholder='Type Here'
            name='comments'
            onChange={(e)=>{handlefieldChange(e)}}
            defaultValue={Props.previewData?.comments?Props.previewData.comments:""}
          />
        </div>
      </div>
      <div className='flex justify-end pt-5 gap-4'>
        {/* <Button className='bg-white text-black border text-md font-normal'> Save as Draft</Button> */}
        <Button className='bg-white text-black border text-md font-normal hover:text-white hover:bg-black' onClick={()=>router.push(`/non_monetary_grant?forms=1&refno=${Props.refno}`)}>Back</Button>
        <Button className='bg-[#4430bf] text-white text-md font-normal border' onClick={handleSubmit}>Next</Button>
      </div>
    </div>
    <Toaster richColors position="bottom-right" />
    </>
  );
}

export default Form2