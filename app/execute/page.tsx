"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import Preview_Form from '@/app/execute/forms/preview_form'
import Addvendor from '@/components/add_vendor'
import { Button } from '@/components/ui/button'
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
        <div className="flex justify-between">
            <h1 className=" md:text-[30px] md:font-medium capitalize md:pb-4 text-black"> Training and Education</h1>
            <div className="flex gap-4 bg-white">
            <Button className="border border-[#4430bf] text-[#4430bf] px-6">Audit Trail</Button>
              <Button className="bg-white text-black border px-8 hover:bg-white">Back</Button>
            </div>
              </div>

              <div className="flex border rounded-xl justify-between items-center p-3 bg-white gap-6 text-black">
              <div className="grid grid-cols-2 w-full">
              <div className="col-span-1 px-4">
                <h1 className="bg-[#ecf2ff] px-2 rounded-xl text-center">Request Number</h1>
                <h1 className="text-center">1234567</h1>
                </div>
              <div className="col-span-1 border-x-2 px-4">
                <h1 className="bg-[#ecf2ff] px-2 rounded-xl text-center">Request Date</h1>
                <h1 className="text-center">11/11/24</h1>
                </div>
              </div>
              
              <Button className="bg-[#4430bf] hover:bg-[#4430bf] px-10 text-white">Execute</Button>
              
            </div>

        {
          form == 1?
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