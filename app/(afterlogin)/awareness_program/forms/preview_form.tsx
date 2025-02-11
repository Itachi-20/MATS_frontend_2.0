'use client'

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import BasicDetails from "@/components/training_and_education/basic_detail"
import EventDetails from "@/components/training_and_education/event_detail"
import VendorDetails from "@/components/commonPreviewComponents/vendor_detail"
import TotalExpense from "@/components/commonPreviewComponents/total_expense"
import Documents from "@/components/commonPreviewComponents/documents"
import { usePathname } from 'next/navigation'
import { useRouter } from 'nextjs-toploader/app';
import Comment_box from "@/components/Comment_box";
import { PreviewDataType } from "@/app/Types/EventData";
import Link from "next/link";

type props = {
  refNo: string;
}

const Preview_Form = ({...Props}:props) => {
  const pathname = usePathname();
  const router = useRouter()
  const [dialog, setDialog] = useState(false);
  const [addVendor, setAddVendor] = useState(false);
  const [preview_data, setPreviewData] = useState<PreviewDataType | null>(null);
  const [refNo, setRefNo] = useState<string | null>(Props.refNo ?? "");
  const [isCommentbox,setIsCommentbox] = useState<boolean>();
  const [comment,setComment] = useState<string>();
  
  const PreviewData = async () => {
    try {
      const response = await fetch("/api/previewData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          name: refNo
        })
      });

      if (response.ok) {
        const data = await response.json();
        setPreviewData(data.data);
        // console.log(data, "PreviewData")
      } else {
        console.log('Response was not OKAY');
      }
    } catch (error) {
      console.error("Error during Previewing data:", error);
    }
  };
  useEffect(() => {
    PreviewData();
  }, [])

  // console.log("preview_data", preview_data, refNo)


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
            comment:comment
          })
        }
      );
      if (response.ok) {
        const data = await response.json();
        // console.log(data, "response data");
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


  const handleComment = (value:string)=>{
    setComment(value)
  }

  const handleDialog = ()=>{
    setIsCommentbox(prev=> !prev);
  }

  return (
    <>
      <div className="md:px-7 md:pb-7 md:pt-4 w-full  z-20">

        <BasicDetails
          pathname={pathname}
          eventData={preview_data}

        />

        <EventDetails
          pathname={pathname}
          eventData={preview_data}
        />

        <VendorDetails
          eventData={preview_data}
        />

        <TotalExpense
          eventData={preview_data}
        />

        <Documents
          eventData={preview_data}
          PageName={'nahi pata'}
          fetchFile={PreviewData}
        />

        <div className="flex justify-end pt-5 gap-4">
          {/* <Button className="bg-white text-black border text-md font-normal">
            Save as Draft
          </Button>*/}
          <Button className="bg-white text-black border text-md font-normal hover:text-white hover:bg-black" onClick={()=>{router.push(`/awareness_program?forms=4&refno=${refNo}`)}}>
            Back
          </Button>
          <Button className={`bg-[#4430bf] text-white  font-normal border hover:opacity-60 ${preview_data?.preactivity_submitted == 1?"hidden":""}`} onClick={()=>handleDialog()}>
            Submit
          </Button>
        </div>
      </div>
        {
              isCommentbox &&
        <div className="absolute z-50 flex pt-10 items-end justify-center bg-black bg-opacity-50 w-full h-full inset-0 pb-40">
          <Comment_box 
          handleClose={handleDialog}
          handleSubmit = {handleFinalSubmit}
          ButtonText={'Submit'}
          />
          </div>
          }
    </>
  )
}

export default Preview_Form