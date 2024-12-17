"use client"
import React from 'react';
import { useState,useRef } from 'react';
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
import { Toaster, toast } from 'sonner'
import { useRouter } from 'nextjs-toploader/app';
import { Previewdata } from '@/app/(afterlogin)/monetary_grant/page'
type dropdownData = {
  company: {
    name: string;
    company_name: "string";
  }[];
  division: {
    name: string;
    division_name: string;
  }[];
  requestor: {
    full_name: string;
    email: string;
  }[];
  vendor_type: {
    name: string;
    vendor_type: string;
  }[];
  state: {
    name: string;
    state: string;
  }[];
};

type eventCostCenter = {
  cost_center: {
    name: string;
    cost_center_description: string;
  }[];
  division_category: {
    name: string;
    category: string;
  }[];
  therapy: {
    name: string;
    therapy: string;
  }[];
};

type subtypeActivity = {
  name: string;
  division_sub_category: string
}[];

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
  organization_name:string;
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
  refno: string;
}

type FormErrors = {
  organization_name?: string;
  event_venue?: string;
  event_start_date?: string;
  event_end_date?: string;
  any_govt_hcp?: string;
  no_of_hcp?: string;
  bu_rational?: string;
}

const Form2 = ({ ...Props }: Props) => {
  const start_date_ref: React.RefObject<any> = useRef(null);
  const end_date_ref: React.RefObject<any> = useRef(null);
  const [formdata, setFormData] = useState<formData>();
    const [errors, setErrors] = useState<FormErrors>();
  const [refNo, setRefNo] = useState<string | null>(Props.refno);
  const router = useRouter()
  const [engagementHCP,setEngagementHCP] = useState<string>(Props.previewData?.any_govt_hcp ?? "");
  const [eventStartDate, setEventStartDate] = useState<any>(Props.previewData?.event_start_date ? new Date(Props.previewData?.event_start_date).getTime() : "");

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
  const handleEventStartDateValidate = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const currentDate = new Date().setHours(0, 0, 0, 0);
    if(e.target.valueAsNumber < currentDate){
      toast.error("You are selecting previous Date");
    }
    setEventStartDate(e.target.valueAsNumber)
    handlefieldChange(e);
  };
  const handleEventEndDateValidate = (e:React.ChangeEvent<HTMLInputElement>)=>{
    if(e.target.valueAsNumber < eventStartDate){
      toast.error("Date should be greater than or equal to start date");
      e.target.value="";
    }
    handlefieldChange(e);
  };
  const handlefieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }) as formData);
  };
  const handleSelectChange = (value: string, name: string) => {
    // if(name == "any_govt_hcp" && value == "No"){
    //   const noofhcpfield = document.getElementsByName("no_of_hcp")[0] as HTMLInputElement;
    //   noofhcpfield.value = "0";
    // }
    setFormData((prev) => ({ ...prev, [name]: value }) as formData);
  };
  const validateAtSubmit = async () => {
    const errors: FormErrors = {};
    console.log("Checking Formdata value", formdata?.event_name);
    if ((Props.previewData?.organization_name ? (formdata && ("organization_name" in formdata && formdata.organization_name == '')) : !formdata?.organization_name)) errors.organization_name = "Organization Name is required";
    if ((Props?.previewData?.event_start_date ? (formdata && ("event_start_date" in formdata && formdata.event_start_date == '')) : !formdata?.event_start_date)) errors.event_start_date = "Event Start Date activity is required";
    if ((Props?.previewData?.event_end_date ? (formdata && ("event_end_date" in formdata && formdata.event_end_date == '')) : !formdata?.event_end_date)) errors.event_end_date = "Event End Date is required";
    if ((Props?.previewData?.any_govt_hcp ? (formdata && ("any_govt_hcp" in formdata && formdata.any_govt_hcp == '')) : !formdata?.any_govt_hcp)) errors.any_govt_hcp = "Engagement of any government hCP’s is required";
    if (((formdata?.any_govt_hcp  == "Yes") || (Props?.previewData?.any_govt_hcp  == "Yes")) && (Props?.previewData?.no_of_hcp ? (formdata && ("no_of_hcp" in formdata && !formdata.no_of_hcp)) : !formdata?.no_of_hcp)) errors.no_of_hcp = "No of HCP is required";
    if ((Props?.previewData?.bu_rational ? (formdata && ("bu_rational" in formdata && formdata.bu_rational == '')) : !formdata?.bu_rational)) errors.bu_rational = "BU Rational is required";
    return errors;
  };
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const validationErrors = await validateAtSubmit();
    if (Object.keys(validationErrors).length > 0) {
      console.error(validationErrors)
      setErrors(validationErrors);
      return;
    }

    const updatedFormData = {
      ...formdata

    };

    if (updatedFormData.any_govt_hcp == "No") {
      updatedFormData.no_of_hcp = 0
    }
    updatedFormData.event_type = "Monetary Grant"
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
        router.push(`/monetary_grant?forms=3&refno=${data.message}`);
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
        Organisation Details
      </h1>
      <div className='grid grid-cols-2 gap-6'>
        <div className='flex flex-col gap-2'>
        <label className={`lable ${(errors?.organization_name && !formdata?.organization_name) ? `text-red-600` : `text-black`}`}>Organization Name <span className='text-[#e60000]'>*</span></label>
          <Input 
            className={`${(errors?.organization_name && !formdata?.organization_name) ? `border border-red-600` : ``} text-black shadow-md border h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md pl-2 pt-2`} 
            placeholder='Type Here' 
            name='organization_name'
            onChange={(e)=>handlefieldChange(e)}
            defaultValue={Props.previewData?.organization_name?Props.previewData.organization_name:""}
          ></Input>
            {
              errors &&
              (errors?.organization_name && !formdata?.organization_name) &&
              (
                <p className="w-full text-red-500 text-[11px] font-normal text-left">
                  {errors?.organization_name}
                </p>
              )
            }
        </div>
        <div className='flex flex-col gap-2'onClick={()=>{handleStartDateClick()}}>
          <label className={`lable ${(errors?.event_start_date && !formdata?.event_start_date) ? `text-red-600` : `text-black`}`} htmlFor='start_date'>Event Start Date<span className='text-[#e60000]'>*</span></label>
          <Input 
            type='date' 
            className={`${(errors?.event_start_date && !formdata?.event_start_date) ? `border border-red-600` : `border border-neutral-200`} dropdown h-10 rounded-md bg-white px-3 py-2 text-sm`}
            name='event_start_date'
            id='start_date'
            ref={start_date_ref}
            onChange={(e)=>handleEventStartDateValidate(e)}
            defaultValue={Props.previewData?.event_start_date?Props.previewData.event_start_date:""}
          ></Input>
            {
              errors &&
              (errors?.event_start_date && !formdata?.event_start_date) &&
              (
                <p className="w-full text-red-500 text-[11px] font-normal text-left">
                  {errors?.event_start_date}
                </p>
              )
            }
        </div>
        <div className='flex flex-col gap-2'onClick={()=>{handleEndDateClick()}}>
          <label className={`lable ${(errors?.event_end_date && !formdata?.event_end_date) ? `text-red-600` : `text-black`}`}>Event End Date<span className='text-[#e60000]'>*</span></label>
          <Input 
            type='date' 
            className={`${(errors?.event_end_date && !formdata?.event_end_date) ? `border border-red-600` : `border border-neutral-200`} dropdown h-10 rounded-md bg-white px-3 py-2 text-sm`}
            name='event_end_date'
            id='end_date'
            ref={end_date_ref}
            onChange={(e)=>handleEventEndDateValidate(e)}
            defaultValue={Props.previewData?.event_end_date?Props.previewData.event_end_date:""}
          ></Input>
          {
              errors &&
              (errors?.event_end_date && !formdata?.event_end_date) &&
              (
                <p className="w-full text-red-500 text-[11px] font-normal text-left">
                  {errors?.event_end_date}
                </p>
              )
            }
        </div>
        
        <div className='flex flex-col gap-2'>
        <label className={`lable ${(errors?.any_govt_hcp && !formdata?.any_govt_hcp) ? `text-red-600` : `text-black`}`}>engagement of any government hCP’s?<span className='text-[#e60000]'>*</span></label>
          <Select
            onValueChange={(value)=>{handleSelectChange(value,"any_govt_hcp"); setEngagementHCP(value);}}
            defaultValue={Props.previewData?.any_govt_hcp?Props.previewData.any_govt_hcp:""}
            >
            <SelectTrigger className={`${(errors?.any_govt_hcp && !formdata?.any_govt_hcp) ? `border border-red-600` : ``} dropdown `}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="Yes">Yes</SelectItem>
            <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
          {
              errors &&
              (errors?.any_govt_hcp && !formdata?.any_govt_hcp) &&
              (
                <p className="w-full text-red-500 text-[11px] font-normal text-left">
                  {errors?.any_govt_hcp}
                </p>
              )
            }
        </div>

        {
            engagementHCP == "Yes" ?
              <div className='flex flex-col gap-2'>
                <label className={`lable ${(errors?.no_of_hcp && !formdata?.no_of_hcp) ? `text-red-600` : `text-black`}`}>Total number of government hCP’s<span className='text-[#e60000]'>*</span></label>
                <Input
                  defaultValue={Props.previewData?.no_of_hcp ? Props.previewData.no_of_hcp : ""}
                  className={`${(errors?.no_of_hcp && !formdata?.no_of_hcp) ? `border border-red-600` : `border border-neutral-200`} dropdown h-10 rounded-md bg-white px-3 py-2 text-sm`}
                  placeholder='Type Here'
                  name='no_of_hcp'
                  type='number'
                  disabled={engagementHCP == "Yes" ? false : true}
                  onChange={(e) => handlefieldChange(e)}
                ></Input>
                {
                  errors &&
                  (errors?.no_of_hcp && !formdata?.no_of_hcp) &&
                  (
                    <p className="w-full text-red-500 text-[11px] font-normal text-left">
                      {errors?.no_of_hcp}
                    </p>
                  )
                }
              </div>
              :
              <></>
          }

          <div className='flex flex-col gap-2'>
            <label className={`lable ${(errors?.bu_rational && !formdata?.bu_rational) ? `text-red-600` : `text-black`}`}>BU Rational<span className='text-[#e60000]'>*</span></label>
            <textarea
              className={`${(errors?.bu_rational && !formdata?.bu_rational) ? `border border-red-600` : ``} text-black shadow-md border h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md pl-2 pt-2`}
              placeholder='Type Here'
              name='bu_rational'
              defaultValue={Props.previewData?.bu_rational ? Props.previewData.bu_rational : ""}
              onChange={(e) => { handlefieldChange(e) }}
            />
            {
              errors &&
              (errors?.bu_rational && !formdata?.bu_rational) &&
              (
                <p className="w-full text-red-500 text-[11px] font-normal text-left">
                  {errors?.bu_rational}
                </p>
              )
            }
          </div>
        <div className='flex flex-col gap-2'>
          <label className='lable'>Comments</label>
          <Textarea className='text-black shadow-md' placeholder='Type Here'
            name='comments'
            onChange={(e)=>{handlefieldChange(e)}}
            defaultValue={Props.previewData?.comments?Props.previewData.comments:""}
          />
        </div>
      </div>
      <div className='flex justify-end pt-5 gap-4'>
        {/* <Button className='bg-white text-black border text-md font-normal'> Save as Draft</Button> */}
        <Button className='bg-white text-black border text-md font-normal' onClick={()=>router.push(`/monetary_grant?forms=1&refno=${Props.refno}`)}>Back</Button>
        <Button className='bg-[#4430bf] text-white text-md font-normal border' onClick={handleSubmit}>Next</Button>
      </div>
    </div>
    <Toaster richColors position="bottom-right" />
    </>
  );
}

export default Form2