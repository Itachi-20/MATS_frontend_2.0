"use client";
import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserRightsTable from '@/components/user_management/user_rights_table';
import LoginInformation from '@/components/user_management/login_information';
import CustomerInformation from '@/components/user_management/customer_information';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";

export default function UserManagementInformation() {

  const [activeTab, setActiveTab] = useState('basicDetails'); // Initial active tab


  return (
    <div className="p-7 w-full relative z-20 text-black">
      {/* {start search and fliter section } */}
      <div className="flex justify-between pb-4 relative">
        <Input className="w-[40%] rounded-[50px] bg-[#ecf2ff] placeholder:text-black" placeholder="Search" />
        <Image src="svg/search.svg" alt="search-icon" width={23} height={23} className="absolute right-[63%] top-[15%]" />
        <div className="flex gap-5">
          <Select>
            <SelectTrigger className="text-black shadow focus-visible:ring-transparent rounded-[25px] gap-4 border border-slate-400 !important">
              <SelectValue placeholder="Export" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">Pdf</SelectItem>
              <SelectItem value="excel">Excel</SelectItem>
              <SelectItem value="print">Print</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
       
      <div className='flex justify-end py-5'>
        <Button className='text-[17px] px-7 py-3 bg-blue-500 font-medium text-white'>Save</Button>
      </div>

      <Tabs defaultValue="basicDetails" className="w-full">

        <TabsList className="w-full border-[0.5px] border-[#848484] rounded-[20px] py-12">
        {/* Basic Details Tab */}
        <TabsTrigger
          value="basicDetails"
          onClick={() => setActiveTab('basicDetails')} // Update active tab
          className={`w-full text-start text-black text-[20px] font-medium leading-normal border-r-[1px] border-slate-400 ${
            activeTab === 'basicDetails' ? ' text-black' : ''
          }`}
        >
          <div className="flex flex-col space-y-[7px] w-full">
            <span
              className={`px-[16px] py-[5px] rounded-[20px] ${
                activeTab === 'basicDetails' ? 'bg-[#ECF2FF]' : 'bg-[#F8F8F8]'
              }`}
            >
              Basic Details
            </span>
            <span className="text-[#000] text-[15px] font-normal px-[16px]">
              Basic details of user and rights assignment
            </span>
          </div>
        </TabsTrigger>

        {/* User Rights Tab */}
        <TabsTrigger
          value="userRights"
          onClick={() => setActiveTab('userRights')} // Update active tab
          className={`w-full text-start text-black text-[20px] font-medium leading-normal ${
            activeTab === 'userRights' ? ' text-black' : ''
          }`}
        >
          <div className="flex flex-col space-y-[7px] w-full">
            <span
              className={`px-[16px] py-[5px] rounded-[20px] ${
                activeTab === 'userRights' ? 'bg-[#ECF2FF]' : 'bg-[#F8F8F8]'
              }`}
            >
              User Rights
            </span>
            <span className="text-[#000] text-[15px] font-normal px-[16px]">
              Person access information to user rights
            </span>
          </div>
        </TabsTrigger>
        </TabsList>

        <TabsContent value="basicDetails" className='py-5 space-y-10'>
          <div className='grid grid-cols-3 gap-6'>

            <div className="flex flex-col gap-2">
              <label className="lable" htmlFor="emp_code">
                Employee Code<span className="text-[#e60000]">*</span>
              </label>
              <Input type="text" name="emp_code" id="emp_code" />
            </div>

            <div className="flex space-x-2 items-center">
              <div className='mt-6'>
                <Select>
                  <SelectTrigger className="dropdown ">
                    <SelectValue placeholder="Mr." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mr">Mr.</SelectItem>
                    <SelectItem value="miss">Miss.</SelectItem>
                    <SelectItem value="dr">Dr.</SelectItem>
                    <SelectItem value="mrs">Mrs.</SelectItem>


                  </SelectContent>
                </Select>

              </div>
              <div className='w-full space-y-1'>
                <label className="lable" htmlFor="emp_code">
                  First Name<span className="text-[#e60000]">*</span>
                </label>
                <Input type="text" name="emp_code" id="emp_code" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="lable" htmlFor="last_name">
                Last Name<span className="text-[#e60000]">*</span>
              </label>
              <Input type="text" name="last_name" id="last_name" required />
            </div>

            <div className="flex flex-col gap-2">
              <label className="lable">
                Department Name<span className="text-[#e60000]">*</span>
              </label>
              <Select>
                <SelectTrigger className="dropdown ">
                  <SelectValue placeholder="-Select-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Department1">Department1</SelectItem>
                  <SelectItem value="Department2">Department2</SelectItem>
                  <SelectItem value="Department3">Department3</SelectItem>
                  <SelectItem value="Department14">Department4</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="lable">
                Designation<span className="text-[#e60000]">*</span>
              </label>
              <Select>
                <SelectTrigger className="dropdown ">
                  <SelectValue placeholder="-Select-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Department1">Department1</SelectItem>
                  <SelectItem value="Department2">Department2</SelectItem>
                  <SelectItem value="Department3">Department3</SelectItem>
                  <SelectItem value="Department14">Department4</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="lable">
                Branch<span className="text-[#e60000]">*</span>
              </label>
              <Select>
                <SelectTrigger className="dropdown ">
                  <SelectValue placeholder="-Select-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Department1">Department1</SelectItem>
                  <SelectItem value="Department2">Department2</SelectItem>
                  <SelectItem value="Department3">Department3</SelectItem>
                  <SelectItem value="Department14">Department4</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="lable">
                Role<span className="text-[#e60000]">*</span>
              </label>
              <Select>
                <SelectTrigger className="dropdown ">
                  <SelectValue placeholder="-Select-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Department1">Department1</SelectItem>
                  <SelectItem value="Department2">Department2</SelectItem>
                  <SelectItem value="Department3">Department3</SelectItem>
                  <SelectItem value="Department14">Department4</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="lable">
                Grade<span className="text-[#e60000]">*</span>
              </label>
              <Select>
                <SelectTrigger className="dropdown ">
                  <SelectValue placeholder="-Select-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Department1">Department1</SelectItem>
                  <SelectItem value="Department2">Department2</SelectItem>
                  <SelectItem value="Department3">Department3</SelectItem>
                  <SelectItem value="Department14">Department4</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="lable">
                Group
              </label>
              <Select>
                <SelectTrigger className="dropdown ">
                  <SelectValue placeholder="-Select-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Department1">Department1</SelectItem>
                  <SelectItem value="Department2">Department2</SelectItem>
                  <SelectItem value="Department3">Department3</SelectItem>
                  <SelectItem value="Department14">Department4</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="lable">
                Weekoff<span className="text-[#e60000]">*</span>
              </label>
              <Select>
                <SelectTrigger className="dropdown ">
                  <SelectValue placeholder="Sunday" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Department1">Sunday</SelectItem>
                  <SelectItem value="Department2">Monday</SelectItem>
                  <SelectItem value="Department3">Tuesday</SelectItem>
                  <SelectItem value="Department14">Wednesday</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="lable">
                Base Town<span className="text-[#e60000]">*</span>
              </label>
              <Select>
                <SelectTrigger className="dropdown ">
                  <SelectValue placeholder="-Select-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="abc">abc</SelectItem>
                  <SelectItem value="bc">bc</SelectItem>
                  <SelectItem value="bcs">bcs</SelectItem>
                  <SelectItem value="sdsa">sdsa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="lable" htmlFor="emp_code">
                Date of Joining<span className="text-[#e60000]">*</span>
              </label>
              <Input type="date" name="date" id="date" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="lable" htmlFor="emp_code">
                Date of Birth
              </label>
              <Input type="date" name="date" id="date" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="lable">
                Nationality
              </label>
              <Select>
                <SelectTrigger className="dropdown ">
                  <SelectValue placeholder="-Select-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="abc">abc</SelectItem>
                  <SelectItem value="bc">bc</SelectItem>
                  <SelectItem value="bcs">bcs</SelectItem>
                  <SelectItem value="sdsa">sdsa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="lable" htmlFor="sap_vendor_code">
                SAP Vendor Code<span className="text-[#e60000]">*</span>
              </label>
              <Input type="text" name="sap_vendor_code" id="sap_vendor_code" placeholder='SAP Vendor Code' />
            </div>

            <div className="flex flex-col gap-2">
              <label className="lable">
                Region<span className="text-[#e60000]">*</span>
              </label>
              <Select>
                <SelectTrigger className="dropdown ">
                  <SelectValue placeholder="-Select-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="abc">abc</SelectItem>
                  <SelectItem value="bc">bc</SelectItem>
                  <SelectItem value="bcs">bcs</SelectItem>
                  <SelectItem value="sdsa">sdsa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="lable">
                Division
              </label>
              <Select>
                <SelectTrigger className="dropdown ">
                  <SelectValue placeholder="-Select-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="abc">abc</SelectItem>
                  <SelectItem value="bc">bc</SelectItem>
                  <SelectItem value="bcs">bcs</SelectItem>
                  <SelectItem value="sdsa">sdsa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="lable">
                Customer Zone
              </label>
              <Select>
                <SelectTrigger className="dropdown ">
                  <SelectValue placeholder="-Select-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="abc">abc</SelectItem>
                  <SelectItem value="bc">bc</SelectItem>
                  <SelectItem value="bcs">bcs</SelectItem>
                  <SelectItem value="sdsa">None Selected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="lable">
                Payroll Company
              </label>
              <Select>
                <SelectTrigger className="dropdown ">
                  <SelectValue placeholder="-Select-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="abc">abc</SelectItem>
                  <SelectItem value="bc">bc</SelectItem>
                  <SelectItem value="bcs">bcs</SelectItem>
                  <SelectItem value="sdsa">sdsa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="lable" htmlFor="cost_center">
                Cost Center
              </label>
              <Input type="number" name="cost_center" id="cost_center" placeholder='0' />
            </div>
          </div>
         <CustomerInformation />
         <LoginInformation />
        </TabsContent>
        <TabsContent value="userRights">
          <UserRightsTable />
        </TabsContent>
      </Tabs>

    </div>
  )
}

