"use client"
import React,{useState,useEffect} from 'react'
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
import { useRouter } from 'next/navigation'
import {Previewdata} from '@/app/(afterlogin)/hcp_services/page'

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
  previewData:Previewdata | null;
  refno:string ;
}
const Form2 = ({...Props}:Props) => {
  const router = useRouter();
  const [formdata, setFormData] = useState<formData | {}>({});
  const [refNo,setRefNo] = useState<string | null>(Props.refno);
  const [hcpValue,setHCPValue] = useState<string>()
  const handleAnyHCPChange = (value:string)=>{
    setHCPValue(value);
  }

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlefieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
       e.preventDefault();
   
       const updatedFormData = {
           ...formdata
   
       };
       
       updatedFormData.event_type = "HCP Services"
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
           localStorage.setItem("refno", data.message);
           setRefNo(data.message);
   
           setTimeout(() => {
             router.push(`/hcp_services?forms=3&refno=${data.message}`);
           }, 1000)
         } else {
           console.log("submission failed");
         }
       } catch (error) {
         console.error("Error during Submission:", error);
       }
     };

     useEffect(() => {
      setFormData({ ...formdata, name: Props.refno?Props.refno:localStorage.getItem("refno") })
    }, [])

console.log(formdata,"this is form data")
  return (
    // </div>
    <div>
      <h1 className='text-black text-2xl font-normal uppercase pb-8'>
        Hcp Details
      </h1>
      <div className='grid grid-cols-2 gap-6'>
        <div className='flex flex-col gap-2'>
          <label className='lable'>Hcp Name <span className='text-[#e60000]'>*</span></label>
          <Input className='dropdown' placeholder='Type Here'
          name='hcp_name'
          onChange={(e)=>{handlefieldChange(e)}}
          defaultValue={Props.previewData?.hcp_name?Props.previewData.hcp_name:""}
          ></Input>

        </div>
        <div className='flex flex-col gap-2'>
          <label className='lable'>Hospital Affiliation<span className='text-[#e60000]'>*</span></label>
          <input type='text' 
          name='hospital_affiliation'
          onChange={(e)=>{handlefieldChange(e)}}
          defaultValue={Props.previewData?.hospital_affiliation?Props.previewData.hospital_affiliation:""}
          className='dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm'></input>

        </div>
        
        <div className='flex flex-col gap-2'>
          <label className='lable'>engagement of any government hCP’s?<span className='text-[#e60000]'>*</span></label>
          <Select
          onValueChange={(value)=>{handleSelectChange(value,"any_govt_hcp"); handleAnyHCPChange(value)}}
          defaultValue={Props.previewData?.any_govt_hcp?Props.previewData.any_govt_hcp:""}
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
          <input type='number' 
          name='no_of_hcp'
          onChange={(e)=>{handlefieldChange(e)}}
          defaultValue={Props.previewData?.no_of_hcp?Props.previewData.no_of_hcp:""}
          disabled={hcpValue == "No"?true:false}
          className='dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm'></input>


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
      <div className='flex justify-end pt-5 gap-4'>
        {/* <Button className='bg-white text-black border text-md font-normal'> Save as Draft</Button> */}
        <Button className='bg-white text-black border text-md font-normal' onClick={()=>router.push(`/hcp_services?forms=1&refno=${Props.refno}`)}>Back</Button>
        <Button className='bg-[#4430bf] text-white text-md font-normal border'onClick={(e)=>handleSubmit(e)}>Next</Button>
      </div>
    </div>
  );
}

export default Form2