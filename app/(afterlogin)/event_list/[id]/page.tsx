"use client";
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'nextjs-toploader/app';
import Documents from "@/components/documents";
import { Button } from "@/components/ui/button";
import EventDetails from "@/components/training_and_education/event_detail";
import EventDetailsSponsorship from "@/components/sponsorshipSupportPreviewComponents/eventDetails"
import TotalExpense from "@/components/commonPreviewComponents/total_expense";
import BasicDetails from "@/components/commonPreviewComponents/basic_details";
import VendorDetails from "@/components/commonPreviewComponents/vendor_detail";
import HCPDetails from "@/components/previewHCPComponents/hcp_details";
import BasicDetailsHCP from "@/components/previewHCPComponents/basic_Details";
import HCPEventDetail from "@/components/previewHCPComponents/event_Details"
import { useParams } from 'next/navigation'
import OrganizationDetailsMonetary from '@/components/monetoryPreviewComponents/organizationDetails'
import BeneficialDetails from "@/components/previewPatientSupportComponents/beneficialDetails"
import ShippingDetails from "@/components/previewPatientSupportComponents/shippingDetails"
import EquipmentDetails from "@/components/nonMonetoryPreviewComponents/equipmentDetails"
import Sponsorship_Details from "@/components/sponsorshipSupportPreviewComponents/sponsorshipDetails";
import Other_Details from "@/components/sponsorshipSupportPreviewComponents/other_details";
import { Input } from "@/components/ui/input";

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
  city: string;
  reporting_head: string;
  type_of_engagement: string;
  executed:number;
  preactivity_approved:number;
  post_activity_approved:number;
  post_activity_submitted:number
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



export default function EventListPage() {
  const router = useRouter();
  const refno = useParams().id;
  const [eventData, setEventData] = useState<EventEntry>();
  const handlClick = (refno: string) => {
    router.push(`/audit_trail/${refno}`)
  }


  const eventDataApi = async () => {
    console.log("inside event Data")
    try {
      const response = await fetch(
        "/api/previewData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({
            name: refno
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



  useEffect(() => {
    eventDataApi();
  }, [])

  return (
    <div className="md:px-7 md:pb-7 md:pt-4 w-full relative z-20 text-black">
      <div className="pb-5">
        <div className="flex justify-between">
          <h1 className=" md:text-[30px] md:font-medium capitalize md:pb-4 text-black">{eventData?.event_type}</h1>
          <div className="flex gap-4 bg-white">
            <Link href={`/event_passenger_list/${refno}`}>
            <Button className="bg-white text-black border text-md font-normal rounded-xl py-2 hover:bg-white">
                          Add Passenger
                        </Button>
            </Link>
            <Button className="border border-[#4430bf] text-[#4430bf] px-6" onClick={() => handlClick(refno as string)}>Audit Trail</Button>
            <Link href={"/event_list"}>
              <Button className="bg-white text-black border px-8 hover:bg-white" onClick={()=>{router.push("/event_list")}}>Back</Button>
            </Link>
          </div>
        </div>
        <div className="flex border rounded-xl justify-between p-3 bg-white gap-4 w-full">
          <div className="grid grid-cols-3 w-full gap-4">
            <div className="col-span-1">
              <h1 className="bg-[#ecf2ff] px-2 rounded-xl text-center">Request Number</h1>
              <h1 className="text-center">{eventData?.name}</h1>
            </div>
            <div className="col-span-1 ">
              <h1 className="bg-[#ecf2ff] px-2 rounded-xl text-center">Request Date</h1>
              <h1 className="text-center">{eventData?.modified.substring(0, 10)}</h1>
            </div>
            <div className="col-span-1 flex justify-center">
              <Button className={`bg-[#4430bf] text-white border  px-8 hover:bg-[#4430bf] ${eventData && (eventData.executed == 1 && eventData.post_activity_submitted == 0) ? "" : "hidden"} `} onClick={() => router.push(`/post_document_activity/${refno}`)}>Post Document</Button>
              <Button className={`bg-[#4430bf] text-white border  px-8 hover:bg-[#4430bf] ${eventData && (eventData.executed == 0 && eventData.preactivity_approved == 1) ? "" : "hidden"} `} onClick={() => router.push(`/execute/${refno}`)}>Execute</Button>
            </div>
          </div>
        </div>
      </div>



      {
        eventData?.event_type != "HCP Services" &&

        <BasicDetails
          pathname=""
          eventData={eventData}
        />
      }

      {
        eventData?.event_type == "HCP Services" &&
        <BasicDetailsHCP
          pathname=""
          eventData={eventData}
        />
      }
      {
        eventData?.event_type == "Patient Support" &&
        <>
          <BeneficialDetails
            eventData={eventData}
          />

          <ShippingDetails
            eventData={eventData}
          />
        </>

      }
      {
        eventData?.event_type == "Sponsorship Support" &&
        <>
          <Sponsorship_Details
            eventData={eventData}
          />

          <Other_Details
            eventData={eventData}
          />
        </>

      }
      {
        (eventData?.event_type == "Training and Education" || eventData?.event_type == "Awareness Program") &&

        <EventDetails
          pathname=""
          eventData={eventData}
        />
      }
      {
        eventData?.event_type == "Monetary Grant" &&
        <OrganizationDetailsMonetary
          eventData={eventData}
        />
      }
      {
        eventData?.event_type == "Sponsorship Support" &&
        <EventDetailsSponsorship
          eventData={eventData} />
      }
      {
        eventData?.event_type == "Non Monetary Grant" &&
        <EquipmentDetails
          eventData={eventData}
        />
      }
      {
        eventData?.type_of_engagement == "One Time" &&
        <HCPEventDetail
          eventData={eventData}
        />
      }
      {eventData?.event_type == "HCP Services" &&
        <HCPDetails
          pathname=""
          eventData={eventData}
        />}

      {
        eventData?.event_type != "Patient Support" &&
        <VendorDetails
          eventData={eventData}
        />
      }

      <TotalExpense
        eventData={eventData}
      //pathname="eventListPage"
      />
      <Documents
        eventData={eventData}
        PageName={"eventListPage"} />
        {
          eventData?.event_type == "HCP Services" && 
          <div className="grid md:grid-cols-3 md:gap-6">
        <div className="flex flex-col md:gap-2">
          <label className="text-black md:text-sm md:font-normal capitalize">
            Occurance Date<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Type Here"
            readOnly={true}
            value={eventData?.occurance_date}
          ></Input>
        </div>
        </div>
        }
    </div>
  )
}

