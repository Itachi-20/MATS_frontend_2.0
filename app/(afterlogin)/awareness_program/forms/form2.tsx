'use client'
import { useState,useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from 'sonner';
import { Previewdata } from '@/app/(afterlogin)/hcp_services/page';

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
  previewData: Previewdata | null;
  refNo: string | undefined;
}
const Form2 = ({ ...Props }: Props) => {
  
  const router = useRouter();
  const start_date_ref: React.RefObject<any> = useRef(null);
  const end_date_ref: React.RefObject<any> = useRef(null);
  const [formdata, setFormData] = useState<formData>();
  const [refNo, setRefNo] = useState<string | null>(Props.refNo ?? "");
  const [eventStartDate, setEventStartDate] = useState<any>(Props.previewData?.event_start_date ? new Date(Props.previewData?.event_start_date).getTime() : "");
  const [engagementHCP,setEngagementHCP] = useState<string>(Props.previewData?.any_govt_hcp ?? "");

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

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const updatedFormData = {
      ...formdata
    };
    updatedFormData.event_type = "Awareness Program";

    if (refNo) {
      updatedFormData.name = refNo;
    }
    if(updatedFormData.any_govt_hcp == "No"){
      updatedFormData.no_of_hcp = 0;
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
          router.push(`/awareness_program?forms=3&refno=${data.message}`)
      } else {
        console.log("submission failed");
      }
    } catch (error) {
      console.error("Error during Submission:", error);
    }
  };
  const handlefieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value })as formData);
  }
  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }) as formData);
  };
  const handleEventStartDateValidate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentDate = new Date().setHours(0, 0, 0, 0);
    if (e.target.valueAsNumber < currentDate) {
      toast.error("You are selecting previous date");
    }
    setEventStartDate(e.target.valueAsNumber);
    handlefieldChange(e);
  };
  const handleEventEndDateValidate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (eventStartDate && e.target.valueAsNumber < eventStartDate ) {
      toast.error("Event end Date should be greater than or equal to start date");
      e.target.value = "";
    }
    handlefieldChange(e);
  };

  return (
    <>
      <div>
        <h1 className='text-black text-2xl font-normal uppercase pb-8'>
          Program Detail
        </h1>
        <div className='grid grid-cols-2 gap-6'>
          <div className='flex flex-col gap-2'>
            <label className='lable'>Program Name <span className='text-[#e60000]'>*</span></label>
            <Input className='dropdown' placeholder='Type Here'
              name='event_name'
              defaultValue={Props.previewData?.event_name ? Props.previewData.event_name : ""}
              onChange={(e) => handlefieldChange(e)}
            ></Input>

          </div>
          <div className='flex flex-col gap-2'>
            <label className='lable'>Program Venue and Location<span className='text-[#e60000]'>*</span></label>
            <Input className='dropdown' placeholder='Type Here'
              name={"event_venue"}
              defaultValue={Props.previewData?.event_venue ? Props.previewData.event_venue : ""}
              onChange={(e) => handlefieldChange(e)}
            ></Input>

          </div>
          <div className='flex flex-col gap-2' onClick={()=>{handleStartDateClick()}}>
            <label className='lable'htmlFor='start_date'>Program Start Date<span className='text-[#e60000]'>*</span></label>
            <input type='date' className='dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm'
              name='event_start_date'
              id='start_date'
              ref={start_date_ref}
              defaultValue={Props.previewData?.event_start_date ? Props.previewData.event_start_date : ""}
              onChange={(e) => handleEventStartDateValidate(e)}
            ></input>
          </div>
          <div className='flex flex-col gap-2'onClick={()=>{handleEndDateClick()}}>
            <label className='lable'>Program End Date<span className='text-[#e60000]'>*</span></label>
            <input type='date' className=' dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm'
              name='event_end_date'
              ref={end_date_ref}
              id='end_date'
              defaultValue={Props.previewData?.event_end_date ? Props.previewData.event_end_date : ""}
              onChange={(e) => handleEventEndDateValidate(e)}
            ></input>
          </div>
          <div className='flex flex-col gap-2'>
            <label className='lable'>engagement of any government hCP’s?<span className='text-[#e60000]'>*</span></label>
            <Select
              defaultValue={Props.previewData?.any_govt_hcp ? Props.previewData.any_govt_hcp : ""}
              onValueChange={(value) => {setEngagementHCP(value); handleSelectChange(value, "any_govt_hcp");}}
            >
              <SelectTrigger className="dropdown">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {
            engagementHCP == "Yes" ?
            <div className='flex flex-col gap-2'>
              <label className='lable'>Total number of government hCP’s<span className='text-[#e60000]'>*</span></label>
              <Input 
                defaultValue={Props.previewData?.no_of_hcp ? Props.previewData.no_of_hcp : ""}
                className={`dropdown ${engagementHCP?"":"cursor-not-allowed"}`} 
                placeholder='Type Here'
                name='no_of_hcp'
                type='number'
                disabled = {engagementHCP == "Yes"?false:true}
                onChange={(e) => handlefieldChange(e)}
              ></Input>
            </div> 
            :
            <div className='flex flex-col gap-2'></div>
          }

          <div className='flex flex-col gap-2'>
            <label className='lable'>Comments<span className='text-[#e60000]'>*</span></label>
            <Textarea className='text-black shadow-md' placeholder='Type Here'
              name='comments'
              defaultValue={Props.previewData?.comments ? Props.previewData?.comments : ""}
              onChange={(e) => { handlefieldChange(e) }}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label className='lable'>BU Rational<span className='text-[#e60000]'>*</span></label>
            <Textarea className='text-black shadow-md' placeholder='Type Here'
              name='bu_rational'
              defaultValue={Props.previewData?.bu_rational ? Props.previewData.bu_rational : ""}
              onChange={(e) => { handlefieldChange(e) }}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label className='lable'>{"HCP Name (if any)"}<span className='text-[#e60000]'>*</span></label>
            <Input className='dropdown' placeholder='Type Here'
              name='hcp_name'
              defaultValue={Props.previewData?.hcp_name ? Props.previewData.hcp_name : ""}
              onChange={(e) => handlefieldChange(e)}
            ></Input>
          </div>
        </div>
        <div className='flex justify-end pt-5 gap-4'>
          {/* <Button className='bg-white text-black border text-md font-normal'> Save as Draft</Button> */}
          <Button className='bg-white text-black border text-md font-normal hover:text-white hover:bg-black' onClick={()=>router.push(`/awareness_program?forms=1&refno=${refNo}`)}>Back</Button>
          <Button className='bg-[#4430bf] text-white text-md font-normal border' onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)}>Next</Button>
          {/* <Button className='bg-white text-black border text-md font-normal' onClick={prevForm}>Back</Button>
        <Button className='bg-[#4430bf] text-white text-md font-normal border'onClick={nextForm}>Next</Button> */}
        </div>
      </div>

    <Toaster richColors position="bottom-right" /> 
    </> 
  );
}

export default Form2