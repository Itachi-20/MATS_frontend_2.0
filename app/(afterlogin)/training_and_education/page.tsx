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
  event_type:{
    name:string,
    event_name:string
  }[],
  vendor_type:{
    name:string,
    vendor_type:string
  }[]
}
const index = () => {
  const [form,setForm] = useState(1);
  const [addVendor,setAddVendor] = useState(false);
  const [dropdownData,setDropdownData] = useState<dropdownData | null>(null);
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
         const response = await fetch("/api/dropdown", {
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
  console.log(dropdownData);
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