"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'nextjs-toploader/app';
import Documents from "@/components/execute/document";
import { Button } from "@/components/ui/button";
import EventDetails from "@/components/execute/event-details";
import TotalExpense from "@/components/execute/total-expense";
import LogisticBudget from "@/components/execute/logistic-budget";
import BasicDetails from "@/components/execute/basic-details";
import CompensationBudget from "@/components/execute/compensation-budget";
import { useSearchParams } from 'next/navigation'

import {eventCostCenter,subtypeActivity,reportingHeadDropdown,stateDropdown,FormErrors,CityDropdown, PreviewDataType, ChildVendor} from '@/app/Types/EventData'


const ExecutePage:React.FC = () => {
  const [data,setData] = useState<PreviewDataType>();
  const param = useSearchParams()
  const refno = param.get("refno");
    const router = useRouter();
    const handlClick = () => {
        router.push(`/audit_trail/${refno}`)
     }

     const fetchData = async()=>{
      try {
        const tableData = await fetch(
          `api/previewData`,
          {
            method: "POST",
            headers:{
              "Content-Type": "application/json",
            },
            credentials:"include",
            body:JSON.stringify({
            name: refno
            })
          }
        );
        if(tableData.ok){
          const data = await tableData.json();
          setData(data.data);
        }
        
      } catch (error) {
        console.log(error,"something went wrong");
      }
     }

     const handleNext = (refno:string)=>{
      router.push(`/post_document_activity/${refno}`)
     }


     useEffect(()=>{
      fetchData();
     },[])
     console.log(data,"this is api data")
  return (
        <div className="md:px-7 md:pb-7 md:pt-[35px] w-full relative z-20 text-black">
          <div className="pb-5">

            <div className="flex justify-between">
              <div></div>
                {/* <h1 className=" md:text-[30px] md:font-medium capitalize md:pb-4"> Training and Education</h1> */}
                <div className="flex gap-4 bg-white leading-normal mb-2">
                  <Button className="border border-[#4430bf] text-[#4430bf] px-6 text-[18px]" onClick={handlClick}>Audit Trail</Button>
                  <Link href={"/event_list"}> 
                    <Button className="bg-white text-black border px-9 hover:bg-white text-[18px]">Back</Button>
                  </Link> 
                </div>
            </div>

            <div className="flex border rounded-xl justify-between p-3 bg-white gap-4">
              <div className="grid grid-cols-5 w-full gap-4">
              <div className="col-span-2 border-r-[1px] border-slate-300 pr-2">
                <h1 className="bg-[#ecf2ff] px-2 rounded-xl text-center">Request Number</h1>
                <h1 className="text-center">{data?.name}</h1>
              </div>
              <div className="col-span-2  border-r-[1px] border-slate-300 pr-2">
                <h1 className="bg-[#ecf2ff] px-2 rounded-xl text-center">Request Date</h1>
                <h1 className="text-center">{data?.modified.substring(0,10)}</h1>
              </div>
              <div className="col-span-1 flex justify-center pt-1">
                <Button className="bg-[#4430BF] text-[#FFF] border px-[68px] py-[10px] rounded-[8px] text-[20px] font-normal leading-normal font-['Poppins']" onClick={()=>handleNext(refno as string)}>Next</Button>
               </div>
              </div>
            </div>
          </div>
          <BasicDetails 
          pathname=""
          eventData = {data}
          />
          <EventDetails 
          pathname=""
          eventData = {data}
          />
          <LogisticBudget 
          pathname=""
          eventData = {data}
          />
          <CompensationBudget 
          pathname=""
          eventData = {data}
          />
          <TotalExpense 
          pathname=""
          eventData = {data}
          />            
          <Documents 
          eventData = {data}
          pathname=""
          /> 
        </div>
  )}

export default ExecutePage