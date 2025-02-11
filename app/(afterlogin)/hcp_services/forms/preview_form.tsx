"use client"
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import BasicDetails from "@/components/previewHCPComponents/basic_Details"
import EventDetails from "@/components/previewHCPComponents/event_Details"
import VendorDetails from "@/components/commonPreviewComponents/vendor_detail";
// import LogisticsBudget from "@/components/logistics_budget";
// import CompensationBudget from "@/components/compensation_budget"
import TotalExpense from "@/components/commonPreviewComponents/total_expense"
import Documents from "@/components/commonPreviewComponents/documents"
import Add_vendor from "@/components/add_vendor";
import { usePathname } from 'next/navigation'
import { useRouter } from 'nextjs-toploader/app';
import Comment_box from "@/components/Comment_box";
import { PreviewDataType } from "@/app/Types/EventData";
import Hcp_Details from "@/components/previewHCPComponents/hcp_details";

type Props = {
  previewData: PreviewDataType | null;
  refno: string | null;
}

const Preview_Form = ({ ...Props }: Props) => {
  const pathname = usePathname();
  const router = useRouter()
  const [dialog, setDialog] = useState(false);
  const [addVendor, setAddVendor] = useState(false);
  const [preview_data, setPreviewData] = useState<PreviewDataType | null>(Props.previewData);
  const [comment, setComment] = useState<string>();
  const [isCommentbox, setIsCommentbox] = useState<boolean>();
  const [refNo, setRefNo] = useState<string | null>(Props.refno);


  const handleFinalSubmit = async () => {
    try {
      const response = await fetch(
        "/api/finalSubmit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({
            name: refNo,
            comment: comment
          })
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data, "response data");
        setTimeout(() => {
          router.push(`/event_list`);
          localStorage.clear();
        }, 1000)
      } else {
        console.log("submission failed");
      }
    } catch (error) {
      console.error("Error during Submission:", error);
    }
  };

  const handleComment = (value: string) => {
    setComment(value)
  }

  const handleDialog = () => {
    setIsCommentbox(prev => !prev);
  }
  console.log(preview_data,'preview_data')

  return (
    <>
      <div className="md:px-7 md:pb-7 md:pt-4 w-full z-20">
        <BasicDetails
          pathname=""
          eventData={preview_data}
        />
        {preview_data && preview_data.type_of_engagement == "One Time" && 
        <EventDetails
          eventData={preview_data}
        />
        }
        <Hcp_Details
          pathname=""
          eventData={preview_data}
        />

        <VendorDetails
        eventData={preview_data}
        />

        <TotalExpense
          eventData={preview_data}
        />

        <Documents
          PageName=""
          eventData={preview_data}
        />

      </div>

      <div className="flex justify-end pt-5 gap-4">
        {/* <Button className="bg-white text-black border text-md font-normal">
          Save as Draft
        </Button> */}
        <Button className="bg-white text-black border text-md font-normal" onClick={()=>router.push(`/hcp_services?forms=4&refno=${Props.refno}`)}>
          Back
        </Button>
        <Button className={`bg-[#4430bf] text-white  font-normal border ${preview_data?.preactivity_submitted == 1?"hidden":""}`} onClick={() => handleDialog()}>
          Submit
        </Button>
      </div>


      {isCommentbox &&
        <div className=" absolute z-50 flex pt-10 items-end justify-center bg-black bg-opacity-50 w-full h-full inset-0 pb-40">
          <Comment_box
            handleClose={handleDialog}
            handleSubmit={handleFinalSubmit}
            ButtonText={'Submit'}
          />
        </div>
      }
    </>

  )
}

export default Preview_Form