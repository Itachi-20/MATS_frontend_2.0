import React from 'react';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";


const LoginInformation = () => {
  return (
    <div className='space-y-3'>
      <h1 className='text-[25px] text-black font-normal leading-normal'>Customer Information</h1>
      <div className='grid grid-cols-3 gap-6'>
        <div className="flex flex-col gap-2">
          <label className="lable" htmlFor="username">
            User Name<span className="text-[#e60000]">*</span>
          </label>
          <Input type="text" name="username" id="username" placeholder='username' />
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable" htmlFor="password">
            Password<span className="text-[#e60000]">*</span>
          </label>
          <Input type="password" name="pws" id="pws" placeholder="password" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable" htmlFor="cpassword">
            Confirm Password<span className="text-[#e60000]">*</span>
          </label>
          <Input type="password" name="cpws" id="cpws" />
        </div>

        <div className='space-y-1'>
          <label>Accesslevel<span className='text-red-600'>*</span> </label>
          <Select>
            <SelectTrigger className="dropdown ">
              <SelectValue placeholder="-Select-" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mr">Mr.</SelectItem>
              <SelectItem value="miss">Miss.</SelectItem>
              <SelectItem value="dr">Dr.</SelectItem>
              <SelectItem value="mrs">Mrs.</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-1'>
          <label>Reports To<span className='text-red-600'>*</span> </label>
          <Select>
            <SelectTrigger className="dropdown ">
              <SelectValue placeholder="-Select Reports To" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mr">Mr.</SelectItem>
              <SelectItem value="miss">Miss.</SelectItem>
              <SelectItem value="dr">Dr.</SelectItem>
              <SelectItem value="mrs">Mrs.</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-1'>
          <label>Display Viewwise</label>
          <Select>
            <SelectTrigger className="dropdown ">
              <SelectValue placeholder="-Self-" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mr">Mr.</SelectItem>
              <SelectItem value="miss">Miss.</SelectItem>
              <SelectItem value="dr">Dr.</SelectItem>
              <SelectItem value="mrs">Mrs.</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-1'>
          <label>Company of</label>
          <Select>
            <SelectTrigger className="dropdown ">
              <SelectValue placeholder="-Select-" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mr">Mr.</SelectItem>
              <SelectItem value="miss">Miss.</SelectItem>
              <SelectItem value="dr">Dr.</SelectItem>
              <SelectItem value="mrs">Mrs.</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

    </div>
  )
}

export default LoginInformation