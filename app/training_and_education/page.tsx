"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import Form1 from "@/app/training_and_education/forms/form1"
import Form2 from "@/app/training_and_education/forms/form2"
import Form3 from "@/app/training_and_education/forms/form3"
import Form4 from "@/app/training_and_education/forms/form4"
import Preview_Form from './forms/preview_form'
import Addvendor from '@/components/add_vendor'
import { useRouter } from 'next/router'
const index = () => {
  const [form,setForm] = useState(1);
  const [addVendor,setAddVendor] = useState(false);
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
  return (
    <div className="h-screen bg-[#EBEBF6] grid grid-cols-6 relative overflow-hidden">
       
    <Image
            className=" w-full absolute z-10 -top-96 -right-[500px] -rotate-6"
            src={"/Lines.png"}
            alt=""
            width={1500}
            height={100}
            ></Image>
            
      <div className="col-span-1 px-11">
        <Sidebar />
      </div>
      <div className="col-span-5 border-2 rounded-l-[60px] w-full h-screen bg-white overflow-scroll overflow-x-hidden relative">
        <div className="sticky top-0 z-30 bg-white">
          <Navbar/>
        </div>
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
    </div>
    {
      addVendor &&
    <Addvendor
    isAddVendor = {isAddVendor}
    />
    }
    </div>
  )
}

export default index