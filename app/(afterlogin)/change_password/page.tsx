"use client"
import React from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from 'react';
type formData = {
  username: string;
  new_password: string;
  confirm_password: string;
};

const ChangePasswordPage = () => {

  const [formdata, setFormData] = useState<formData | {}>({});
  const handlefieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const handleCheckboxChange = (e:any) => {
    const { id, checked } = e.target;
    setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: checked, 
    }));
};

console.log(formdata,'formdata')

  return (
    <div className="px-6 pt-10">
      <div className="grid grid-cols-2 gap-12 pb-8">
        <div className="flex flex-col gap-2">
          <label className="lable" >
            Username
          </label>
          <Input type="text" placeholder="finance" className=" text-balck placeholder:text-black" name={"username"} onChange={(e) => handlefieldChange(e)} readOnly></Input>
        </div>


        <div className="flex flex-col gap-2">
          <label className="lable">
            Full Name
          </label>
          <Input type="text" placeholder="full_name" className=" text-balck placeholder:text-black" name={"full_name"} onChange={(e) => handlefieldChange(e)} readOnly></Input>
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable" htmlFor="password">
            Current Password
          </label>
          <Input type="password" id="current_password" className=" text-black" name={"current_password"}
            onChange={(e) => handlefieldChange(e)}></Input>
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable" htmlFor="password">
            New Password
          </label>
          <Input type="password" id="password" className=" text-black" name={"new_password"}
            onChange={(e) => handlefieldChange(e)}></Input>
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable" htmlFor="cpassword">
            Confirm Password<span className="text-[#e60000]">*</span>
          </label>
          <Input type="password" id="cpassword" className=" text-black" name={"confirm_password"} onChange={(e) => handlefieldChange(e)} ></Input>
        </div>
        <div className="">
          <input
            type="checkbox"
            id="logout_all_sessions"
          onChange={(e)=>handleCheckboxChange(e)}
          />
          <label htmlFor="logout_all_sessions" className="text-black pl-3">
            logout from all session
          </label>
        </div>

      </div>
      <div className="flex justify-end pt-5 gap-4">
        <Button className='bg-[#4430bf] text-white text-md font-normal border px-7' >Save</Button>
        <Link href="/">
          <Button className="bg-white text-black border text-md font-normal px-7">
            Back
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default ChangePasswordPage;