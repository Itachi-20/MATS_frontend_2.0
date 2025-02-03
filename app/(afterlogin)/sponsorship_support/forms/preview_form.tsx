"use client"
import React,{useState,useEffect} from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import BasicDetails from "@/components/commonPreviewComponents/basic_details";
import EventDetails from "@/components/sponsorshipSupportPreviewComponents/eventDetails";
import TotalExpense from "@/components/total_Expense";
import Documents from "@/components/documents";
import Add_vendor from "@/components/add_vendor";
import SponsorshipDetails from "@/components/sponsorshipSupportPreviewComponents/sponsorshipDetails";
import OtherDetails from "@/components/sponsorshipSupportPreviewComponents/other_details";
import { usePathname } from 'next/navigation'
import { useRouter } from 'nextjs-toploader/app';
import Comment_box from "@/components/Comment_box";  
import VendorDetails from "@/components/commonPreviewComponents/vendor_detail"
import {eventCostCenter,subtypeActivity,reportingHeadDropdown,stateDropdown,FormErrors,CityDropdown, PreviewDataType, ChildVendor} from '@/app/Types/EventData'

type Props = {
    refno: string | null
}
const Preview_Form = ({...Props}:Props) => {
  const pathname = usePathname();
  const router = useRouter()
  const [dialog,setDialog] = useState(false);
  const [preview_data, setPreviewData] = useState<PreviewDataType | null >(null);
  const [comment,setComment] = useState<string>();
  const [isCommentbox,setIsCommentbox] = useState<boolean>();
  const [refNo, setRefNo] = useState<string | null>(Props.refno);

  const handleDialog = ()=>{
    setIsCommentbox(prev=> !prev);
  };
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
        console.log(data, "PreviewData")
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
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
  const handleComment = (value:string)=>{
    setComment(value)
  };
  useEffect(() => {
    PreviewData();
  }, [])
  return (
      <>
        <div className="md:px-7 md:pb-7 md:pt-4 w-full z-20">
            
        <BasicDetails
         pathname=""
         eventData={preview_data}
        />


        <SponsorshipDetails
        pathname=""
        eventData={preview_data}
        />

        <OtherDetails
        pathname=""
        eventData={preview_data}
        />
        <EventDetails
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
        fetchFile={PreviewData}
        />

            <div className="flex justify-end pt-5 gap-4">
              {/* <Button className="bg-white text-black border text-md font-normal">
                Save as Draft
              </Button> */}
          
              <Button className='bg-white text-black border text-md font-normal hover:text-white hover:bg-black' onClick={()=>router.push(`/sponsorship_support?forms=4&refno=${Props.refno}`)}>
                Back
              </Button>
              <Button className={`bg-[#4430bf] text-white  font-normal border ${preview_data?.preactivity_submitted == 1?"hidden":""}`} onClick={()=>handleDialog()}>
                Submit
              </Button>
            </div>
        </div>
        {
            isCommentbox &&
            <div className=" absolute z-50 flex pt-10 items-end justify-center bg-black bg-opacity-50 w-full h-full inset-0 pb-40">
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