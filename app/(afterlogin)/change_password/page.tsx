'use client';
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ChangePasswordPage = () => {
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');

  const handlePasswordChange = async()=>{
    console.log("client side")
    try {
      const Data = await fetch(
        `/api/change_password`,
        {
          method: "POST",
          headers:{
            "Content-Type": "application/json",
          },
          credentials:'include',
          body:JSON.stringify({
            username,
            password,           

          })
        }
      );
      if(Data.ok){
        const data = await Data.json();
        console.log(data.message)
      }
      
    } catch (error) {
      console.log(error,"something went wrong");
    }
  }

   useEffect(()=>{
    handlePasswordChange();
  },[])

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setIsPasswordMatch(newPassword === value);
  };
    
  return (        
    <div className="px-6 pt-10">
      
    <div className="grid grid-cols-2 gap-12 pb-8">
    
      <div className="flex flex-col gap-2">
        <label className="lable">
          Name
        </label>
        <Select>
          <SelectTrigger className="dropdown">
            <SelectValue placeholder="finance-team - 222" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="finance-team">finance team - 222</SelectItem>
          
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="lable" htmlFor="user_name">
          Username
        </label>
        <Input type="text" id="user_name" name="user_name" placeholder="finance" className=" bg-gray-200 text-balck placeholder:text-black" onChange={(e) => setUsername(e.target.value)}></Input> 
      </div>

      <div className="flex flex-col gap-2">
        <label className="lable">
          Person ID
        </label>
        <Select>
          <SelectTrigger className="dropdown bg-gray-200">
            <SelectValue placeholder="Pre-Activity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pre-activity">Pre-Activity</SelectItem>
          
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="lable" htmlFor="cpassword">
          Current Password
        </label>
        <Input type="password" name="cpassword" id="cpassword" className="bg-gray-200 text-balck" value={oldPassword}  onChange={(e) => setOldPassword(e.target.value)}></Input> 
      </div>

      <div className="flex flex-col gap-2">
        <label className="lable" htmlFor="npassword">
          New Password<span className="text-[#e60000]">*</span>
        </label>
       
        <Input type="password" name="new_password" id="new_password" className={`text-black p-2 rounded border ${!isPasswordMatch ? 'border-red-500' : ''}`} value={newPassword} onChange={(e) => setNewPassword(e.target.value)}></Input> 
      </div>

      <div className="flex flex-col gap-2">
        <label className="lable" htmlFor="confirm_password">
        Confirm Password<span className="text-[#e60000]">*</span>
        </label>
        <Input type="password"  name="confirm_password" id="confirm_password"  className={`text-black p-2 rounded border ${!isPasswordMatch ? 'border-red-500' : ''}`} onChange={handleConfirmPasswordChange}></Input> 
      </div>
    </div>

    <div className="flex justify-end pt-5 gap-4">
      <Button className='bg-[#4430bf] text-white text-md font-normal border px-7' onClick={handlePasswordChange} disabled={!isPasswordMatch}>Save</Button>
      <Link href="/">
        <Button className="bg-white text-black border text-md font-normal px-7" >          
          Back
        </Button>
      </Link>
    </div>

  </div>
  )
        
}

export default ChangePasswordPage;