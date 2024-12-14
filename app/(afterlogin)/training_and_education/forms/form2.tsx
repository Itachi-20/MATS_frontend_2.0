"use client"
import { useRouter } from 'nextjs-toploader/app';
import React, { useState,useRef } from 'react'
import { Input } from "@/components/ui/input"
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
import { PreviewDataType, FormDataType } from "../page";


type Props = {
  previewData: PreviewDataType | null;
  refNo: string | undefined;
}


const Form2 = ({ ...Props }: Props) => {
  const router = useRouter();
  const start_date_ref: React.RefObject<any> = useRef(null);
  const end_date_ref: React.RefObject<any> = useRef(null);
  const [formData, setFormData] = useState<FormDataType>();
  const [refNo, setRefNo] = useState<string | null>(Props.refNo ?? "");
  const [eventStartDate, setEventStartDate] = useState<any>(Props.previewData?.event_start_date ? new Date(Props.previewData?.event_start_date).getTime() : "");
  const [engagementHCP,setEngagementHCP] = useState<string>(Props.previewData?.any_govt_hcp ?? "");

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const updatedFormData = {
        ...formData
    };
    updatedFormData.event_type = "Training and Education";
    if(updatedFormData.any_govt_hcp == "No"){
      updatedFormData.no_of_hcp = 0;
    }
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
        // console.log(data, "response data");
        setRefNo(data.message);
        router.push(`/training_and_education?forms=3&refno=${data.message}`);
      } else {
        console.log("submission failed");
      }
    } catch (error) {
      console.error("Error during Submission:", error);
    }
  };
  const handlefieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }) as FormDataType);
  };
  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }) as FormDataType);
  };
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
  };

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
          Event Details
        </h1>
        <div className='grid grid-cols-2 gap-6'>
          <div className='flex flex-col gap-2'>
            <label className='lable'>Event Name <span className='text-[#e60000]'>*</span></label>
            {/* <Input 
              defaultValue={Props.previewData?.event_name ? Props.previewData.event_name : ""}
              className='dropdown' 
              placeholder='Type Here'
              name='event_name'
              onChange={(e) => handlefieldChange(e)}
            ></Input> */}
            <Textarea 
              defaultValue={Props.previewData?.event_name ? Props.previewData.event_name : ""}
              className='text-black shadow-md min-h-5' 
              placeholder='Type Here'
              name='event_name'
              onChange={(e) => { handlefieldChange(e)}}
            />

          </div>
          <div className='flex flex-col gap-2'>
            <label className='lable'>Event Venue<span className='text-[#e60000]'>*</span></label>
            {/* <Input 
              defaultValue={Props.previewData?.event_venue ? Props.previewData.event_venue : ""}
              className='dropdown' 
              placeholder='Type Here'
              name={"event_venue"}
              onChange={(e) => handlefieldChange(e)}
            ></Input> */}
            <Textarea 
              defaultValue={Props.previewData?.event_venue ? Props.previewData.event_venue : ""}
              className='text-black shadow-md min-h-5' 
              placeholder='Type Here'
              name='event_venue'
              onChange={(e) => { handlefieldChange(e)}}
              />
          </div>
          <div className='flex flex-col gap-2'onClick={()=>{handleStartDateClick()}}>
            <label className='lable'htmlFor='start_date'>Event Start Date<span className='text-[#e60000]'>*</span></label>
            <input 
              defaultValue={Props.previewData?.event_start_date ? Props.previewData.event_start_date : ""}
              type='date' 
              id='start_date'
              ref={start_date_ref}
              className='dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm'
              name='event_start_date'
              onChange={(e) =>{handleEventStartDateValidate(e)}}
            ></input>

          </div>
          <div className='flex flex-col gap-2'onClick={()=>{handleEndDateClick()}}>
            <label className='lable'htmlFor='end_date'>Event End Date<span className='text-[#e60000]'>*</span></label>
            <input 
              defaultValue={Props.previewData?.event_end_date ? Props.previewData.event_end_date : ""}
              type='date' 
              ref={end_date_ref}
              id='end_date'
              className=' dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm'
              name='event_end_date'
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
            <Textarea 
              defaultValue={Props.previewData?.comments ? Props.previewData.comments : ""}
              className='text-black shadow-md' 
              placeholder='Type Here'
              name='comments'
              onChange={(e) => { handlefieldChange(e) }}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label className='lable'>BU Rational<span className='text-[#e60000]'>*</span></label>
            <Textarea 
              defaultValue={Props.previewData?.bu_rational ? Props.previewData.bu_rational : ""}
              className='text-black shadow-md' 
              placeholder='Type Here'
              name='bu_rational'
              onChange={(e) => { handlefieldChange(e) }}
            />
          </div>
        </div>
        <div className='flex justify-end pt-5 gap-4'>
          {/* <Button className='bg-white text-black border text-md font-normal'> Save as Draft</Button> */}
          <Button className='bg-white text-black border text-md font-normal' onClick={() => router.push(`/training_and_education?forms=1&refno=${Props.refNo}`)}>Back</Button>
          <Button className='bg-[#4430bf] text-white text-md font-normal border' onClick={handleSubmit}>Next</Button>
        </div>
      <Toaster richColors position="bottom-right" />
      </div>
    </>
  );
}

export default Form2