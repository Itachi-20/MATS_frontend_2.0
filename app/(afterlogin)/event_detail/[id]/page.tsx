"use client";
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'nextjs-toploader/app';
import Documents from "@/components/commonPreviewComponents/documents";
import { Button } from "@/components/ui/button";
import EventDetails from "@/components/training_and_education/event_detail";
import EventDetailsSponsorship from "@/components/sponsorshipSupportPreviewComponents/eventDetails"
import TotalExpense from "@/components/commonPreviewComponents/total_expense";
import BasicDetails from "@/components/basic_Details";
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
import {eventCostCenter,subtypeActivity,reportingHeadDropdown,stateDropdown,FormErrors,CityDropdown, PreviewDataType, ChildVendor} from '@/app/Types/EventData'




export default function EventListPage() {
  const router = useRouter();
  const refno = useParams().id;
  const [eventData, setEventData] = useState<PreviewDataType | null>(null);
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
            <Button className="border border-[#4430bf] text-[#4430bf] px-6" onClick={() => handlClick(refno as string)}>Audit Trail</Button>
            {/* <Link href={"/event_list"}> */}
              <Button className="bg-white text-black border px-8 hover:bg-white" onClick={()=>{router.push("/event_report")}}>Back</Button>
            {/* </Link> */}
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
              <h1 className="text-center">{eventData?.modified.substring(0, 10)}</h1>
            </div>
            {/* <div className="col-span-1 flex justify-center">
              <Button className={`bg-[#4430bf] text-white border  px-8 hover:bg-[#4430bf] ${eventData && (eventData.executed == 1 || eventData.post_activity_approved == 1) && (eventData?.status != "Post Activity Submitted") ? "" : "hidden"} `} onClick={() => router.push(`/post_document_activity/${refno}`)}>Post Document</Button>
              <Button className={`bg-[#4430bf] text-white border  px-8 hover:bg-[#4430bf] ${eventData && (eventData.executed == 0 && eventData.preactivity_approved == 1) ? "" : "hidden"} `} onClick={() => router.push(`/execute/${refno}`)}>Execute</Button>
            </div> */}
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
          pathname=""
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
          pathname=""
            eventData={eventData}
          />

          <Other_Details
          pathname=""
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
        pathname=""
          eventData={eventData}
        />
      }
      {
        eventData?.event_type == "Sponsorship Support" &&
        <EventDetailsSponsorship
        pathname=""
          eventData={eventData} />
      }
      {
        eventData?.event_type == "Non Monetary Grant" &&
        <EquipmentDetails
        pathname=""
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
    </div>
  )
}

