"use client"
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import Documents from "@/components/commonPreviewComponents/documents"
import {useSearchParams } from 'next/navigation'
import { useRouter } from "nextjs-toploader/app";
import Comment_box from "@/components/approvalCommentBox/Comment_box";

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
import {eventCostCenter,subtypeActivity,reportingHeadDropdown,stateDropdown,FormErrors,CityDropdown, PreviewDataType, ChildVendor} from '@/app/Types/EventData'



type Props = {
  tableData: PreviewDataType
  refno:string;
}

const Index = ({ ...Props }: Props) => {
  const router = useRouter();
  const [eventData, setEventData] = useState<PreviewDataType>(Props.tableData);
  const [isCommentbox, setIsCommentbox] = useState<boolean>();
  const [comment, setComment] = useState<string>();
  const [type, setType] = useState<string>("");
  const [buttonText,setButtonText] = useState<string>("");
  const [refno, setRefno] = useState(Props.refno);
console.log(refno,'refno')
  const handleApprove = async (isRequestor?:Number) => {
    try {
      const response = await fetch(
        "/api/eventRequestApprove/Approve",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({
            name: refno,
            "remark": comment,
            "action": type,
            "to_requestor":isRequestor
          })
        }
      );


      if (response.ok) {
        router.push("/event_approver_list")
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  // const eventDataApi = async () => {
  //   console.log("inside event Data")
  //   try {
  //     const response = await fetch(
  //       "/api/previewData",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         credentials: 'include',
  //         body: JSON.stringify({
  //           name: param.get("refno")
  //         })
  //       }
  //     );

  //     if (response.ok) {
  //       const data = await response.json();
  //       setEventData(data.data);


  //     } else {
  //       console.log("Login failed");
  //     }
  //   } catch (error) {
  //     console.error("Error during login:", error);
  //   }
  // };

  const handleDialog = () => {
    setIsCommentbox((prev) => !prev);
  }

  const handleComment = (value: string) => {
    setComment(value)
  }

  // useEffect(() => {
  //   eventDataApi();
  // }, [])
  console.log('eventData---------------------------------------', eventData)
  return (


    <div className={`md:px-7 md:pb-7 md:pt-4 w-full z-20 text-black`}>
      <div className="pb-5">
        <div className="flex justify-between pb-4">
          <h1 className=" md:text-[30px] md:font-medium capitalize md:pb-4">{eventData?.event_type}</h1>
          <div></div>
          <div className="flex gap-4 bg-white">
            <Button className="border border-[#4430bf] text-[#4430bf] px-6" onClick={()=>router.push(`/audit_trail/${eventData.name}`)}>Audit Trail</Button>
            <Button className="bg-white text-black border px-8 hover:bg-white" onClick={()=>{router.push('/event_approver_list')}}>Back</Button>
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
              <h1 className="text-center">{eventData?.modified.substring(0, 10)}</h1>
            </div>
          </div>
          <div className={`flex gap-4 text-white items-center ${eventData?.can_approve?"":"hidden"}`}>
            {/* <Button className="bg-[#5dbe74] hover:bg-[#5dbe74] px-6" onClick={()=>handleApprove("Approved")}>Approve</Button>
              <Button className="bg-[#ff5757] hover:bg-[#ff5757] px-6" onClick={()=>handleApprove("Rejected")}>Reject</Button>
              <Button className="bg-[#4430bf] hover:bg-[#4430bf] px-6" onClick={()=>handleApprove("Send Back")}>Send Back</Button> */}
            {
              !(eventData && eventData?.is_approved) &&
              <>
                <Button className="bg-[#5dbe74] hover:bg-[#5dbe74] px-6" onClick={() => { handleDialog(); setType("Approved"); setButtonText("Approve")}}>Approve</Button>
                <Button className="bg-[#4430bf] hover:bg-[#4430bf] px-6" onClick={() => { handleDialog(); setType("Send Back"); setButtonText("Send Back") }}>Send Back</Button>
                <Button className="bg-[#ff5757] hover:bg-[#ff5757] px-6" onClick={() => { handleDialog(); setType("Rejected");setButtonText("Reject") }}>Reject</Button>
              </>
            }
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
        eventData={eventData}/>
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
          eventData = {eventData}
          //pathname="eventListPage"
          />            
          <Documents 
          eventData = {eventData}
          PageName={"eventListPage"} /> 
      {
        isCommentbox &&
        <div className="absolute z-50 flex pt-10 items-start justify-center bg-black bg-opacity-50 w-full h-full inset-0 pb-40">
          <Comment_box
            handleClose={handleDialog}
            handleComment={handleComment}
            Submitbutton={handleApprove}
            ButtonText = {buttonText}
          />
        </div>
      }
    </div>

  )
}

export default Index