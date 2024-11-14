"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Documents from "@/components/execute/document";
import { Button } from "@/components/ui/button";
import EventDetails from "@/components/execute/event-details";
import TotalExpense from "@/components/execute/total-expense";
import LogisticBudget from "@/components/execute/logistic-budget";
import BasicDetails from "@/components/execute/basic-details";
import CompensationBudget from "@/components/execute/compensation-budget";
import { useSearchParams } from 'next/navigation'

type EventEntry = {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  event_type: string;
  company: string;
  event_cost_center: string;
  state: string;
  sub_type_of_activity: string;
  business_unit: string;
  division_category: string;
  therapy: string;
  event_requestor: string;
  division_sub_category: string;
  status: string;
  current_stage: string;
  event_name: string;
  event_start_date: string;
  any_govt_hcp: string;
  comments: string;
  faculty: string;
  event_venue: string;
  event_end_date: string;
  no_of_hcp: number;
  bu_rational: string;
  participants: string;
  total_compensation_expense: number;
  has_advance_expense: number;
  total_logistics_expense: number;
  total_estimated_expense: number;
  currency: string;
  preactivity_status: string;
  advance_status: string;
  post_activity_status: string;
  post_expense_status: string;
  post_expense_check: number;
  travel_expense_status: string;
  travel_expense_check: number;
  invoice_amount: number;
  basic_amount: number;
  tds: number;
  gst: number;
  net_amount: number;
  doctype: string;
  compensation: Compensation[];
  travel_expense_approvers: any[]; // Empty array, can be customized later
  post_expense_approvers: any[]; // Empty array, can be customized later
  preactivity_approvers: ApproverStatus[];
  post_activity_approvers: any[]; // Empty array, can be customized later
  occurrence_status: OccurrenceStatus[];
  logistics: Logistics[];
  documents: Document[];
  advance_approvers: any[]; // Empty array, can be customized later
  city:string
  reporting_head:string
}

type Compensation = {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  vendor_type: string;
  actual_amount: number;
  status: string;
  vendor_name: string;
  advance: number;
  budget_category: string;
  est_amount: number;
  gst_included: number;
  gst: string;
  occurrence_no: number;
  parent: string;
  parentfield: string;
  parenttype: string;
  doctype: string;
}

type ApproverStatus = {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  approver_level: string;
  action_date: string;
  approver: string;
  remarks: string;
  approver_status: string;
  occurrence_no: number;
  parent: string;
  parentfield: string;
  parenttype: string;
  doctype: string;
}

type OccurrenceStatus = {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  occurrence_no: number;
  status: string;
  parent: string;
  parentfield: string;
  parenttype: string;
  doctype: string;
}

type Logistics = {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  vendor_type: string;
  actual_amount: number;
  status: string;
  advance: number;
  budget_category: string;
  est_amount: number;
  gst_included: number;
  gst: string;
  occurrence_no: number;
  parent: string;
  parentfield: string;
  parenttype: string;
  doctype: string;
}

type Document = {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  activity_type: string;
  occurrence_no: number;
  document_type: string;
  file: string;
  parent: string;
  parentfield: string;
  parenttype: string;
  doctype: string;
}

const ExecutePage:React.FC = () => {
  const [data,setData] = useState<EventEntry>();
  const param = useSearchParams()
  const refno = param.get("refno");
    const router = useRouter();
    const handlClick = () => {
        router.push(`/audit_trail/${refno}`)
     }

     const fetchData = async()=>{
      try {
        const tableData = await fetch(
          `api/execute/fetchData`,
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
      router.push(`/execute/${refno}`)
     }


     useEffect(()=>{
      fetchData();
     },[])
     console.log(data,"this is api data")
  return (
        <div className="md:px-7 md:pb-7 md:pt-[35px] w-full relative z-20 text-black">
          <div className="pb-5">

            <div className="flex justify-between">
                <h1 className=" md:text-[30px] md:font-medium capitalize md:pb-4"> Training and Education</h1>
                <div className="flex gap-4 bg-white leading-normal">
                  <Button className="border border-[#4430bf] text-[#FFF] px-6 bg-[#4430BF] text-[16px]" onClick={handlClick}>Advance Payment</Button>
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
          <TotalExpense />            
          <Documents /> 
        </div>
  )}

export default ExecutePage