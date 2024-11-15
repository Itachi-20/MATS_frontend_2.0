"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Documents from "@/components/postexpense/Documents";
import { Button } from "@/components/ui/button";
import EventDetails from "@/components/postexpense/EventDetails";
import TotalExpense from "@/components/postexpense/TotalExpense";
import LogisticBudget from "@/components/postexpense/LogisticBudget";
import BasicDetails from "@/components/postexpense/BasicDetails";
import CompensationBudget from "@/components/postexpense/CompensationBudget";

const Page:React.FC = () => {
    const router = useRouter();
   
  return (
        <div className="md:px-7 md:pb-7 md:pt-4 w-full relative z-20 text-black">
          <div className="pb-5">
            <div className="flex justify-between">
                <h1 className=" md:text-[30px] md:font-medium capitalize md:pb-4"> Training and Education</h1>
                <div className="flex gap-4 bg-white leading-normal">
                  <Button className="border border-[#4430bf] text-[#FFF] px-6 bg-[#4430BF] text-[16px]" >Advance Payment</Button>
                  <Button className="border border-[#4430bf] text-[#4430bf] px-6 text-[18px]" >Audit Trail</Button>
                  <Link href={"/event_list"}> 
                    <Button className="bg-white text-black border px-9 hover:bg-white text-[18px]">Back</Button>
                  </Link>
                </div>
            </div>


            <div className="flex border rounded-xl justify-between p-3 bg-white gap-4">
              <div className="grid grid-cols-5 w-full gap-4">
              <div className="col-span-2 border-r-[1px] border-slate-300 pr-2">
                <h1 className="bg-[#ecf2ff] px-2 rounded-xl text-center">Request Number</h1>
                <h1 className="text-center">1234567</h1>
              </div>
              <div className="col-span-2  border-r-[1px] border-slate-300 pr-2">
                <h1 className="bg-[#ecf2ff] px-2 rounded-xl text-center">Request Date</h1>
                <h1 className="text-center">11/11/24</h1>
              </div>
              <div className="col-span-1 flex justify-center pt-1">
                {/* <Button className="bg-[#4430BF] text-[#FFF] border px-[20px] py-[10px] rounded-[8px] text-[20px] font-normal leading-normal font-['Poppins']" onClick={()=> router.push("/postexpense/upload")}>Submit Document</Button> */}
                <Button className="bg-[#4430BF] text-[#FFF] border px-[68px] py-[10px] rounded-[8px] text-[20px] font-normal leading-normal font-['Poppins']" onClick={()=> router.push(`/traning_And_education/${1234567}`)}>Next</Button>
               </div>
              </div>
            </div>
          </div>
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fields.map((field) => (
                <BasicDetails key={field.id} field={field} onChange={handleInputChange} />
            ))}
        </div> */}
           <BasicDetails />
          <EventDetails />
          <LogisticBudget />
          <CompensationBudget />
          <TotalExpense />            
          <Documents />
        </div>
  )}


export default Page