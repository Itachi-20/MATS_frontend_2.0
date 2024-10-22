"use client"
import React, { useEffect, useState } from 'react'
import Form1 from "@/app/(afterlogin)/training_and_education/forms/form1"
import Form2 from "@/app/(afterlogin)/training_and_education/forms/form2"
import Form3 from "@/app/(afterlogin)/training_and_education/forms/form3"
import Form4 from "@/app/(afterlogin)/training_and_education/forms/form4"
import Preview_Form from './forms/preview_form'
import Addvendor from '@/components/add_vendor'
import { useRouter } from 'next/router'
import { AppWrapper } from '@/app/context/module'


type dropdownData = {
  company:{
    name:string,
    company_name:"string"
  }[],
  division:{
    name:string,
    division_name:string
  }[],
  requestor:{
    full_name:string,
    email:string
  }[],
  vendor_type:{
    name:string,
    vendor_type:string
  }[],
  state:{
    name:string,
    state:string
  }[]
}


type Compensation = {
  vendor_type: string;
  vendor_name: string;
  est_amount: number;
  gst_included?: number;
  gst: number;
};

type Logistics = {
  vendor_type: string;
  vendor_name: string;
  est_amount: number;
  gst: number;
};

type formData = {
  name: string;
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
  division_sub_category:string;
  sub_type_of_activity:string;
};




const index = () => {
  const [form,setForm] = useState(1);
  const [addVendor,setAddVendor] = useState(false);
  const [dropdownData,setDropdownData] = useState<dropdownData | null>(null);

  const [formdata, setFormData] = useState<formData>({
    name: "",
    event_type: "",
    company: "",
    event_cost_center: "",
    state: "",
    city: "",
    event_start_date: "",
    event_end_date: "",
    bu_rational: "",
    faculty: "",
    participants: "",
    therapy: "",
    event_name: "",
    event_venue: "",
    comments: "",
    compensation: [],
    logistics: [],
    total_compensation_expense: 0,
    total_logistics_expense: 0,
    event_requestor: "",
    business_unit: "",
    division_category: "",
  division_sub_category:"",
  sub_type_of_activity:"",
  });

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const Body = {
      "data":formdata
    }
    try {
      const response = await fetch(
        "/api/training_and_education/handleSubmit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials:'include',
          body:JSON.stringify(Body)
        }
      );

      const data = await response.json();
      console.log(data,"response data");
      if (response.ok) {
      } else {
        console.log("submission failed");
      }
    } catch (error) {
      console.error("Error during Submission:", error);
    }
  };


  const handlefieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>{
    const {name,value} = e.target;
    setFormData(prev =>({ ...prev, [name]: value }));
  }


  const handleSelectChange = (value: string, name:string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const router = useRouter();
  const nextForm = ():void=>{
    setForm(prev=>prev+1);
    // router.push("/modules#form_top")
  }

  const prevForm = ()=>{
    setForm(prev=>prev-1);
    // router.push("/modules#form_top")
  }

  const isAddVendor = ()=>{
    setAddVendor(prev => !prev)
  }


  const dropdown = async () => {
     try {
         const response = await fetch("/api/training_and_education/dropdown", {
             method: "GET",
             headers: {
                 "Content-Type": "application/json",
             },
         });
 
          const data = await response.json();
          setDropdownData(data.data);
         if (response.ok) {
         } else {
             console.log('Login failed');
         }
     } catch (error) {
         console.error("Error during login:", error);
     }
 };

  useEffect(()=>{
    dropdown();
  },[])
  console.log(formdata,"this is form data");
  return (
        <>
        <AppWrapper>
        <div className="px-7 pb-7 pt-4 w-full relative z-20">
          <div>
        <h1 className="text-black text-[30px] font-medium capitalize" id="form_top">
        Training & Education
              </h1>
              <div className='py-9'></div>
          </div>
        {
          form == 1?
          <Form1
          nextForm = {nextForm}
          dropdownData={dropdownData}
          handlefieldChange = {handlefieldChange}
          handleSelectChange={handleSelectChange}
          handleSubmit={handleSubmit}
          />:
          form == 2?
          <Form2
          nextForm = {nextForm}
          prevForm={prevForm}
          />:
          form == 3?
          <Form3
          nextForm = {nextForm}
          prevForm={prevForm}
          isAddVendor = {isAddVendor}
          vendorType = {dropdownData && dropdownData.vendor_type}
          />:
          form == 4?
          <Form4
          nextForm = {nextForm}
          prevForm={prevForm}
          />:
          form == 5?
          <Preview_Form
          prevForm = {prevForm}
          />:""
        }
        </div>
    
    {
      addVendor &&
      <Addvendor
      isAddVendor = {isAddVendor}
      />
    }
    </AppWrapper>
    </>
  )
}

export default index