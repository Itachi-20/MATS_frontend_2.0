"use client"
import React, { useState, useEffect } from 'react'
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

import { useRouter } from "nextjs-toploader/app";
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
  engagement_type: {
    name: string
    engagement_type: string
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
  no_of_hcp: number,
  hcp_name: string,
  hospital_affiliation: string
};


type activityDropdown = {
  activity: {
    name: string,
    activity_name: string
  }[],
  document: {
    name: string,
    activity_type: string,
    document_name: string
  }[]
}

type Props = {
  previewData: Previewdata | null;
  refno: string;
}

type FormErrors = {
  hcp_name?: string;
  hospital_affiliation?: string;
  any_govt_hcp?: string;
  no_of_hcp?: string;
  bu_rational?: string;
}

const Form2 = ({ ...Props }: Props) => {
  const router = useRouter();
  const [engagementHCP, setEngagementHCP] = useState<string>(Props.previewData?.any_govt_hcp ?? "");
  const [formdata, setFormData] = useState<formData>();
  const [errors, setErrors] = useState<FormErrors>();
  const [refNo, setRefNo] = useState<string | null>(Props.refno);
  const [hcpValue, setHCPValue] = useState<string>()
  const handleAnyHCPChange = (value: string) => {
    setHCPValue(value);
  }

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }) as formData);
  };

  const handlefieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }) as formData);
  }
  const validateAtSubmit = () => {
    const errors: FormErrors = {};
    console.log("Checking Formdata value", formdata?.hcp_name);
    if ((Props.previewData?.hcp_name ? (formdata && ("hcp_name" in formdata && formdata.hcp_name == '')) : !formdata?.hcp_name)) errors.hcp_name = "Program Name is required";
    if ((Props?.previewData?.hospital_affiliation ? (formdata && ("hospital_affiliation" in formdata && formdata.hospital_affiliation == '')) : !formdata?.hospital_affiliation)) errors.hospital_affiliation = "Program Venue is required";
    if ((Props?.previewData?.any_govt_hcp ? (formdata && ("any_govt_hcp" in formdata && formdata.any_govt_hcp == '')) : !formdata?.any_govt_hcp)) errors.any_govt_hcp = "Engagement of any government hCP’s is required";
    if (((formdata?.any_govt_hcp == "Yes") || (Props?.previewData?.any_govt_hcp == "Yes")) && (Props?.previewData?.no_of_hcp ? (formdata && ("no_of_hcp" in formdata && !formdata.no_of_hcp)) : !formdata?.no_of_hcp)) errors.no_of_hcp = "No of HCP is required";
    if ((Props?.previewData?.bu_rational ? (formdata && ("bu_rational" in formdata && formdata.bu_rational == '')) : !formdata?.bu_rational)) errors.bu_rational = "BU Rational is required";
    return errors;
  };
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const validationErrors = validateAtSubmit();
    if (Object.keys(validationErrors).length > 0) {
      console.error(validationErrors)
      setErrors(validationErrors);
      return;
    }
    const updatedFormData = {
      ...formdata

    };

    updatedFormData.event_type = "HCP Services"
    if (refNo) {
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
            onChange={(e) => { handlefieldChange(e) }}
            defaultValue={Props.previewData?.hcp_name ? Props.previewData.hcp_name : ""}
          ></Input>
          {
            errors &&
            (errors?.hcp_name && !formdata?.hcp_name) &&
            (
              <p className="w-full text-red-500 text-[11px] font-normal text-left">
                {errors?.hcp_name}
              </p>
            )
          }
        </div>
        <div className='flex flex-col gap-2'>
          <label className='lable'>Hospital Affiliation<span className='text-[#e60000]'>*</span></label>
          <input type='text'
            name='hospital_affiliation'
            onChange={(e) => { handlefieldChange(e) }}
            defaultValue={Props.previewData?.hospital_affiliation ? Props.previewData.hospital_affiliation : ""}
            className='dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm'></input>
          {
            errors &&
            (errors?.hospital_affiliation && !formdata?.hospital_affiliation) &&
            (
              <p className="w-full text-red-500 text-[11px] font-normal text-left">
                {errors?.hospital_affiliation}
              </p>
            )
          }
        </div>

        <div className='flex flex-col gap-2'>
          <label className={`lable ${(errors?.any_govt_hcp && !formdata?.any_govt_hcp) ? `text-red-600` : `text-black`}`}>
            engagement of any government hCP’s?<span className='text-[#e60000]'>*</span>
          </label>
          <Select
            defaultValue={Props.previewData?.any_govt_hcp ? Props.previewData.any_govt_hcp : ""}
            onValueChange={(value) => { setEngagementHCP(value); handleSelectChange(value, "any_govt_hcp"); }}
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
            <div className='flex flex-col gap-2'></div>
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

      </div>
      <div className='flex justify-end pt-5 gap-4'>
        {/* <Button className='bg-white text-black border text-md font-normal'> Save as Draft</Button> */}
        <Button className='bg-white text-black border text-md font-normal' onClick={() => router.push(`/hcp_services?forms=1&refno=${Props.refno}`)}>Back</Button>
        <Button className='bg-[#4430bf] text-white text-md font-normal border' onClick={(e) => handleSubmit(e)}>Next</Button>
      </div>
    </div>
  );
}

export default Form2