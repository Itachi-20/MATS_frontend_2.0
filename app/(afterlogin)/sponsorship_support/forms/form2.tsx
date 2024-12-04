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
  const [eventStartDate,setEventStartDate] = useState<any>();
  const [formdata, setFormData] = useState<formData | {}>({});
  const [refNo, setRefNo] = useState<string | null>(Props.refno);
  const router = useRouter()
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const updatedFormData = {
        ...formdata

    };
    updatedFormData.event_type = "Sponsorship Support"
    if(refNo){
      updatedFormData.name = refNo;
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
        console.log(data, "response data");
        setRefNo(data.message);
        router.push(`/sponsorship_support?forms=3&refno=${data.message}`);
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
    const currentDate = Date.now()
    if(e.target.valueAsNumber < currentDate){
      toast.error("Please Enter Valid Start Date");
    }
    setEventStartDate(e.target.value)
    handlefieldChange(e);
}

  const handleEventEndDateValidate = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const currentDate = Date.now()
    if(e.target.valueAsNumber < currentDate || e.target.valueAsNumber < eventStartDate){
      toast.error("Please Enter Valid End Date");
    }
    handlefieldChange(e);
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
          onChange={(e) => handlefieldChange(e)}
          defaultValue={Props.previewData?.event_name?Props.previewData.event_name:""}
          ></Input>

        </div>
        <div className='flex flex-col gap-2'>
          <label className='lable'>Event Venue<span className='text-[#e60000]'>*</span></label>
          <Input className='dropdown' placeholder='Type Here'
          name='event_venue'  onChange={(e) => handlefieldChange(e)}
          defaultValue={Props.previewData?.event_venue?Props.previewData.event_venue:""}
          ></Input>

        </div>
        <div className='flex flex-col gap-2'>
          <label className='lable'>Event Start Date<span className='text-[#e60000]'>*</span></label>
          <input type='date'
          name='event_start_date'
           onChange={(e) => handleEventStartDateValidate(e)}
           defaultValue={Props.previewData?.event_start_date?Props.previewData.event_start_date:""}
          className='dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm'></input>

        </div>
        <div className='flex flex-col gap-2'>
          <label className='lable'>Event End Date<span className='text-[#e60000]'>*</span></label>
          <input type='date' 
          name='event_end_date'
          onChange={(e) => handleEventEndDateValidate(e)}
          defaultValue={Props.previewData?.event_end_date?Props.previewData.event_end_date:""}
          className=' dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm'></input>
        </div>
        
        <div className='flex flex-col gap-2'>
          <label className='lable'>BU Rational<span className='text-[#e60000]'>*</span></label>
          <Textarea 
          name='bu_rational'
          onChange={(e) => handlefieldChange(e)}
          defaultValue={Props.previewData?.bu_rational?Props.previewData.bu_rational:""}
          className='text-black shadow-md' placeholder='Type Here' />
        </div>
      </div>
     
      <div className='flex justify-end pt-5 gap-4'>
        {/* <Button className='bg-white text-black border text-md font-normal'> Save as Draft</Button> */}
        <Button className='bg-white text-black border text-md font-normal' onClick={()=>router.push(`/sponsorship_support?forms=1&refno=${Props.refno}`)}>Back</Button>
        <Button className='bg-[#4430bf] text-white text-md font-normal border' onClick={(e)=>handleSubmit(e)}>Next</Button>
      </div>
    </div>)
    <Toaster richColors position="bottom-right" />
    </>
  );
}

export default Form2