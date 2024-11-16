"use client";
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Documents from "@/components/documents";
import { Button } from "@/components/ui/button";
import EventDetails from "@/components/event_Details";
import TotalExpense from "@/components/total_Expense";
import BasicDetails from "@/components/basic_Details";
import LogisticBudget from "@/components/logistics_budget";
import CompensationBudget from "@/components/compensation_budget";
import { useParams } from 'next/navigation'

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



export default function EventListPage () {
  const router = useRouter();
  const refno = useParams().id;
  const [eventData,setEventData] = useState<EventEntry>();
  const handlClick = (refno:string) => {
    router.push(`/audit_trail/${refno}`)
  }


  const eventDataApi = async()=>{
    console.log("inside event Data")
    try {
      const response = await fetch(
        "/api/previewData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials:'include',
          body:JSON.stringify({
            name:refno
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        setEventData(data.data);
        
        
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
};



useEffect(()=>{
  eventDataApi();
},[])

  return (
        <div className="md:px-7 md:pb-7 md:pt-4 w-full relative z-20 text-black">
          <div className="pb-5">
            <div className="flex justify-between">
                <h1 className=" md:text-[30px] md:font-medium capitalize md:pb-4"> Training and Education</h1>
                <div className="flex gap-4 bg-white">
                  <Button className="border border-[#4430bf] text-[#4430bf] px-6" onClick={()=>handlClick(refno as string)}>Audit Trail</Button>
                  <Link href={"/event_list"}> 
                    <Button className="bg-white text-black border px-8 hover:bg-white">Back</Button>
                  </Link> 
                </div>
              </div>
            <div className="flex border rounded-xl justify-between p-3 bg-white gap-4">
              <div className="grid grid-cols-3 w-full gap-4">
              <div className="col-span-1">
                <h1 className="bg-[#ecf2ff] px-2 rounded-xl text-center">Request Number</h1>
                <h1 className="text-center">{eventData?.name}</h1>
              </div>
              <div className="col-span-1 ">
                <h1 className="bg-[#ecf2ff] px-2 rounded-xl text-center">Request Date</h1>
                <h1 className="text-center">11/11/24</h1>
              </div>
              <div className="col-span-1 flex justify-center">
              <Button className="bg-[#4430bf] text-white border  px-8 hover:bg-[#4430bf] " onClick={()=>router.push(`/execute?refno=${refno}`)}>Execute</Button>
              </div>
              </div>
            </div>
          </div>
          <BasicDetails 
          eventData = {eventData}
          pathname="eventListPage"
          />
          <EventDetails 
          eventData = {eventData}
          pathname="eventListPage"
          />
          <LogisticBudget 
          eventData = {eventData}
          />
          <CompensationBudget 
          eventData = {eventData}
          />
          <TotalExpense 
          eventData = {eventData}
          //pathname="eventListPage"
          />            
          <Documents 
          eventData = {eventData}
          PageName={"eventListPage"} /> 
        </div>
  )}

