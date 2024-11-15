"use client"
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import BasicDetails from "@/components/basic_Details"
import EventDetails from "@/components/event_Details"
import VendorDetails from "@/components/vendor_Details"
import TotalExpense from "@/components/total_Expense"
import Documents from "@/components/documents"
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


const Index = () => {

  const [eventData,setEventData] = useState<EventEntry>();
  const param = useSearchParams()

  const handleApprove = async(value:string)=>{
    const refno = param.get("refno");
      try {
        const response = await fetch(
          "/api/eventRequestApprove/Approve",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials:'include',
            body:JSON.stringify({
              name:refno,
              "remark": "Test Approve Pre Activity",
              "action":value
            })
          }
        );
  
        const data = await response.json();
  
        if (response.ok) {
        } else {
          console.log("Login failed");
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
  };

  const eventDataApi = async()=>{
    console.log("inside event Data")
    try {
      const response = await fetch(
        "/api/eventRequestApprove/fetchData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials:'include',
          body:JSON.stringify({
            name:param.get("refno")
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
            <Button className="border border-[#4430bf] text-[#4430bf] px-6">Audit Trail</Button>
              <Button className="bg-white text-black border px-8 hover:bg-white">Back</Button>
            </div>
              </div>
            <div className="flex border rounded-xl justify-between p-3 bg-white gap-4">
              <div className="grid grid-cols-2 w-full gap-4">
              <div className="col-span-1">
                <h1 className="bg-[#ecf2ff] px-2 rounded-xl text-center">Request Number</h1>
                <h1 className="text-center">{eventData && eventData.name}</h1>
                </div>
              <div className="col-span-1">
                <h1 className="bg-[#ecf2ff] px-2 rounded-xl text-center">Request Date</h1>
                <h1 className="text-center">{eventData?.modified.substring(0,10)}</h1>
                </div>
              </div>
              <div className="flex gap-4 text-white items-center">
              <Button className="bg-[#5dbe74] hover:bg-[#5dbe74] px-6" onClick={()=>handleApprove("Approved")}>Approve</Button>
              <Button className="bg-[#ff5757] hover:bg-[#ff5757] px-6" onClick={()=>handleApprove("Rejected")}>Reject</Button>
              <Button className="bg-[#4430bf] hover:bg-[#4430bf] px-6" onClick={()=>handleApprove("Send Back")}>Send Back</Button>
              </div>
            </div>
          </div>
        <BasicDetails
        pathname=""
        eventData = {eventData}
        />

        <EventDetails
        pathname=""
        eventData = {eventData}
        />

        <VendorDetails
        eventData = {eventData}
        />

        <TotalExpense
        eventData = {eventData}
        />
            
        <Documents
        eventData = {eventData}
        PageName=""
        />
        </div>
    
  )
}

export default Index