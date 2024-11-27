import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  nextForm: () => void;
};

const Form = () => {

  const handlePasswordChange = async ()=>{
    try {
      const response = await fetch(``,{
        method:"POST",
        
          headers:{
            "Content-Type": "application/json",
          },
          body:"",
          credentials:"include"
      })
      if(response.ok){

      }
    } catch (error) {
      
    }
  }


  return (
    
    <div className="px-6 pt-10">
      
      <div className="grid grid-cols-2 gap-12 pb-8">
      
        {/* <div className="flex flex-col gap-2">
          <label className="lable">
            Name
          </label>
          <Select>
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="finance-team - 222" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="finance-team">finance team - 222</SelectItem> */}
              {/* <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem> */}
            {/* </SelectContent>
          </Select>
        </div> */}

        <div className="flex flex-col gap-2">
          <label className="lable" >
            Username
          </label>
          <Input type="text" placeholder="finance" className=" text-balck placeholder:text-black"></Input> 
        </div>

        <div className="flex flex-col gap-2">
          <label className="lable">
            Person ID
          </label>
          <Select>
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Pre-Activity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pre-activity">Pre-Activity</SelectItem>
              {/* <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem> */}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="lable" htmlFor="cpassword">
            Current Password
          </label>
          <Input type="password" name="cpassword" id="cpassword" className=" text-balck"></Input> 
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable" htmlFor="npassword">
            New Password<span className="text-[#e60000]">*</span>
          </label>
          <Input type="password" name="npassword" id="npassword" className=""></Input> 
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable" htmlFor="confPassword">
          Confirm Password<span className="text-[#e60000]">*</span>
          </label>
          <Input type="password"  name="conPassword" id="conPassword" className=""></Input> 
        </div>
      </div>
      <div className="flex justify-end pt-5 gap-4">
        <Button className='bg-[#4430bf] text-white text-md font-normal border px-7'>Save</Button>
        <Link href="/">
          <Button className="bg-white text-black border text-md font-normal px-7">          
            Back
          </Button>
        </Link>
      </div>
    </div>)

};

export default Form;
