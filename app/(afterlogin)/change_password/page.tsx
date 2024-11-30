'use client'
import React, { useEffect } from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import { Toaster, toast } from 'sonner';
type formData = {
  user: string;
  new_password: string;
  confirm_password: string;
  logout_all_sessions:number;
};

const ChangePasswordPage = () => {
  const { role, name, userid, clearAuthData } = useAuth();
  const [formdata, setFormData] = useState<formData>(
    {
      user:userid ? userid : '',
      new_password:'',
      confirm_password: '',
      logout_all_sessions:0
    }
  );
  const [error, setError] = useState('');

  const handlefieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const handleCheckboxChange = (e:any) => {
    const { id, checked } = e.target;
    console.log('checked',checked)
    let check = 0;
    if (checked){
    check = 1;
    }
    setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: check, 
    }));
};


useEffect(() => {
  setFormData(prev => ({
    ...prev,
    user: userid ? userid : '',
  }));
}, [userid]);



const validatePassword = (password : string) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$/;
  return passwordRegex.test(password);
};
const handlePasswordChange = async ()=>{
  if (formdata.new_password != formdata.confirm_password ) {
    setError('New password and confirm password do not match.');
    toast.warning('New password and confirm password do not match.');
    return 
  }

  if (!validatePassword(formdata.new_password)) {
    setError('Password must be at least 8 characters long, contain one special character, and one number.');
    toast.warning('Password must be at least 8 characters long, contain one special character, and one number.');
    return;
  }

  try {
    const response = await fetch(`api/changePassword`,{
      method:"POST",
      
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify(formdata),
        credentials:"include"
    })
    console.log("response",response)
    if(response.ok){
      toast.success(`Password changed Successfully`);
    }
    if (!response.ok) {
      toast.error(response.statusText);
      //  if (response.status === 401) {
      //   console.error('Unauthorized access.');
      //   toast.error(response.statusText);
      // }
    }
  } catch (error) {
    console.error('Error updating password:', error);
  }
}

  return (
    <div className="px-6 pt-4">
      <div className="grid grid-cols-2 gap-12 pb-4">
        <div className="flex flex-col gap-2">
          <label className="lable" >
            Username
          </label>
          <Input type="text" placeholder="user" className="text-black" name={"user"} value={userid?userid:''} readOnly></Input>
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable">
            Full Name
          </label>
          <Input type="text" placeholder="full_name" className="text-black" name={"full_name"} value={name?name:''} onChange={(e) => handlefieldChange(e)} readOnly></Input>
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable">
           Role
          </label>
          <Input type="text" placeholder="role" className="text-black" name={"role"} value={role?role:''} onChange={(e) => handlefieldChange(e)} readOnly></Input>
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable" htmlFor="current_password">
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
          <label className="lable" htmlFor="confirm_password">
            Confirm Password<span className="text-[#e60000]">*</span>
          </label>
          <Input type="password" id="confirm_password" className=" text-black" name={"confirm_password"} onChange={(e) => handlefieldChange(e)} ></Input>
          {/* {error && <span className="text-red-500 mb-2">{error}</span>}  */}
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
        <Button className='bg-[#4430bf] text-white text-md font-normal border px-7' onClick={()=>handlePasswordChange()} >Save</Button>
        <Link href="/">
          <Button className="bg-white text-black border text-md font-normal px-7">
            Back
          </Button>
        </Link>
      </div>
      <Toaster richColors position="top-right" />
    </div>
  )
}

export default ChangePasswordPage;