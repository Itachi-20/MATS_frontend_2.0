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
import { useRouter } from "nextjs-toploader/app";
import { handleEventStartDateValidate, handleEventEndDateValidate } from "@/app/utility/dateValidation";
import {eventCostCenter,subtypeActivity,reportingHeadDropdown,stateDropdown,FormErrors,CityDropdown, PreviewDataType, ChildVendor} from '@/app/Types/EventData'

type Props = {
  previewData:PreviewDataType | null;
  refno:string ;
  currency: {
    name: string
  }[] | null
}

const Form2 = ({ ...Props }: Props) => {
  const start_date_ref: React.RefObject<any> = useRef(null);
  const end_date_ref: React.RefObject<any> = useRef(null);
  const router = useRouter();
  const [formdata, setFormData] = useState<PreviewDataType>();
  const [errors, setErrors] = useState<FormErrors>();
  const [preview_data, setPreviewData] = useState<PreviewDataType | null>(null);
  const [refNo,setRefNo] = useState<string | null>(Props.refno ?? "");
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
  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }) as PreviewDataType);
  };
  const handlefieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }) as PreviewDataType);
  };
  const validateAtSubmit = () => {
    const errors: FormErrors = {};
    console.log("Checking Formdata value", formdata?.requesting_hospital_name);
    if ((Props.previewData?.requesting_hospital_name ? (formdata && ("requesting_hospital_name" in formdata && formdata.requesting_hospital_name == '')) : !formdata?.requesting_hospital_name)) errors.requesting_hospital_name = "Requesting Hospital Name is required";
    if ((Props?.previewData?.ship_to ? (formdata && ("ship_to" in formdata && formdata.ship_to == '')) : !formdata?.ship_to)) errors.ship_to = "Ship To is required";
    if ((Props?.previewData?.bill_to ? (formdata && ("bill_to" in formdata && formdata.bill_to == '')) : !formdata?.bill_to)) errors.bill_to = "Bil To is required";
    if ((Props?.previewData?.event_start_date ? (formdata && ("event_start_date" in formdata && formdata.event_start_date == '')) : !formdata?.event_start_date)) errors.event_start_date = "Event Start Date is required";
    if ((Props?.previewData?.event_end_date ? (formdata && ("event_end_date" in formdata && formdata.event_end_date == '')) : !formdata?.event_end_date)) errors.event_end_date = "Event End Date is required";
    if ((Props?.previewData?.bu_rational ? (formdata && ("bu_rational" in formdata && formdata.bu_rational == '')) : !formdata?.bu_rational)) errors.bu_rational = "BU Rational is required";
    if ((Props?.previewData?.currency ? (formdata && ("currency" in formdata && formdata.currency == '')) : !formdata?.currency)) errors.currency = "Currency is required";
    return errors;
  };
  const handleSubmit = async () => {
      const updatedFormData = {
          ...formdata
      };
      const validationErrors = validateAtSubmit();
      if (Object.keys(validationErrors).length > 0) {
        console.error(validationErrors)
        setErrors(validationErrors);
        return;
      }
      
    updatedFormData.event_type = "Patient Support"
    if(Props.previewData?.product_amount){
      updatedFormData.total_estimated_expense = Props.previewData.product_amount;
    }
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
          <label className={`lable ${(errors?.requesting_hospital_name && !formdata?.requesting_hospital_name) ? `text-red-600` : `text-black`}`}>Requesting Hospital Name <span className='text-[#e60000]'>*</span></label>
          <Input 
              type='text' 
              className={`${(errors?.requesting_hospital_name && !formdata?.requesting_hospital_name) ? `border border-red-600` : `border border-neutral-200`} dropdown h-10 rounded-md bg-white px-3 py-2 text-sm`}
              name='requesting_hospital_name'
              onChange={(e)=>{handlefieldChange(e)}}
              defaultValue={Props.previewData?.requesting_hospital_name?Props.previewData.requesting_hospital_name:""}
            ></Input>
            {
              errors &&
              (errors?.requesting_hospital_name && !formdata?.requesting_hospital_name) &&
              (
                <p className="w-full text-red-500 text-[11px] font-normal text-left">
                  {errors?.requesting_hospital_name}
                </p>
              )
            }
        </div>
        <div className='flex flex-col gap-2' onClick={() => { handleStartDateClick() }}>
            <label className={`lable ${(errors?.event_start_date && !formdata?.event_start_date) ? `text-red-600` : `text-black`}`} htmlFor='start_date'>
              Event Start Date<span className='text-[#e60000]'>*</span>
            </label>
            <input
              type='date'
              className={`${(errors?.event_start_date && !formdata?.event_start_date) ? `border border-red-600` : `border border-neutral-200`} dropdown h-10 rounded-md bg-white px-3 py-2 text-sm`}
              name='event_start_date'
              id='start_date'
              ref={start_date_ref}
              defaultValue={Props.previewData?.event_start_date ? Props.previewData.event_start_date : ""}
              onChange={(e) => handleEventStartDateValidate(
                {
                  e: e,
                  formData: formdata,
                  previewData: Props.previewData,
                  setEventStartDate: setEventStartDate,
                  eventStartDate: eventStartDate,
                  handlefieldChange: handlefieldChange
                }
              )}
            ></input>
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
        <div className='flex flex-col gap-2' onClick={() => { handleEndDateClick() }}>
          <label className={`lable ${(errors?.event_end_date && !formdata?.event_end_date) ? `text-red-600` : `text-black`}`}>
            Event End Date<span className='text-[#e60000]'>*</span>
          </label>
          <input
            type='date'
            className={`${(errors?.event_end_date && !formdata?.event_end_date) ? `border border-red-600` : `border border-neutral-200`} dropdown h-10 rounded-md bg-white px-3 py-2 text-sm`}
            name='event_end_date'
            ref={end_date_ref}
            id='end_date'
            defaultValue={Props.previewData?.event_end_date ? Props.previewData.event_end_date : ""}
            onChange={(e) => handleEventEndDateValidate(
              {
                e: e,
                formData: formdata,
                previewData: Props.previewData,
                setEventStartDate: setEventStartDate,
                eventStartDate: eventStartDate,
                handlefieldChange: handlefieldChange
              }
            )}
          ></input>
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
        <label className={`lable ${(errors?.ship_to && !formdata?.ship_to) ? `text-red-600` : `text-black`}`}>Ship To<span className='text-[#e60000]'>*</span></label>
          <Input 
              type='text' 
              className={`${(errors?.ship_to && !formdata?.ship_to) ? `border border-red-600` : `border border-neutral-200`} dropdown h-10 rounded-md bg-white px-3 py-2 text-sm`}
              name='ship_to'
              onChange={(e)=>{handlefieldChange(e)}}
              defaultValue={Props.previewData?.ship_to?Props.previewData.ship_to:""}
            ></Input>
            {
            errors &&
            (errors?.ship_to && !formdata?.ship_to) &&
            (
              <p className="w-full text-red-500 text-[11px] font-normal text-left">
                {errors?.ship_to}
              </p>
            )
          }
        </div>
        <div className='flex flex-col gap-2'>
        <label className={`lable ${(errors?.bill_to && !formdata?.bill_to) ? `text-red-600` : `text-black`}`}>Bill To<span className='text-[#e60000]'>*</span></label>
          <Input 
              type='text' 
              className={`${(errors?.bill_to && !formdata?.bill_to) ? `border border-red-600` : `border border-neutral-200`} dropdown h-10 rounded-md bg-white px-3 py-2 text-sm`}
              name='bill_to'
              onChange={(e)=>{handlefieldChange(e)}}
              defaultValue={Props.previewData?.bill_to?Props.previewData.bill_to:""}
            ></Input>
            {
            errors &&
            (errors?.bill_to && !formdata?.bill_to) &&
            (
              <p className="w-full text-red-500 text-[11px] font-normal text-left">
                {errors?.bill_to}
              </p>
            )
          }
        </div>
        <div className='flex flex-col gap-2'>
        <label className={`lable ${(errors?.bu_rational && !formdata?.bu_rational) ? `text-red-600` : `text-black`}`}>BU Rational<span className='text-[#e60000]'>*</span></label>
          <Textarea 
            className={`${(errors?.bu_rational && !formdata?.bu_rational) ? `border border-red-600` : ``} text-black shadow-md border h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md pl-2 pt-2`}
            placeholder='Type Here'
            name='bu_rational'
            onChange={(e)=>{handlefieldChange(e)}}
            defaultValue={Props.previewData?.bu_rational?Props.previewData.bu_rational:""}
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
            defaultValue={Props.previewData?.product_amount}
            readOnly
          ></Input>
        </div>
        <div className="flex flex-col col-span-1 gap-2">
        <label className={`lable ${(errors?.currency && !formdata?.currency) ? `text-red-600` : `text-black`}`}>
            Currency<span className="text-[#e60000]">*</span>
          </label>
          <Select
           defaultValue={Props.previewData?.currency ?? ""}
           onValueChange={(value) => handleSelectChange(value, "currency")}
          >
            <SelectTrigger className={`${(errors?.currency && !formdata?.currency) ? `border border-red-600` : ``} dropdown `}>
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
          {
            errors &&
            (errors?.currency && !formdata?.currency) &&
            (
              <p className="w-full text-red-500 text-[11px] font-normal text-left">
                {errors?.currency}
              </p>
            )
          }
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