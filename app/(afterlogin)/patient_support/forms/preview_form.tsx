"use client"
import React,{useState} from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import BasicDetails from "@/components/commonPreviewComponents/basic_details"
import ShippingDetails from "@/components/previewPatientSupportComponents/shippingDetails"
import VendorDetails from "@/components/vendor_Details";
import LogisticsBudget from "@/components/logistics_budget";
import CompensationBudget from "@/components/compensation_budget"
import TotalExpense from "@/components/total_Expense"
import Documents from "@/components/commonPreviewComponents/documents"
import Add_vendor from "@/components/add_vendor";
// import ShippingDetails from "@/components/shipping_details";
import BeneficiaryDetails from "@/components/previewPatientSupportComponents/beneficialDetails";
import OtherDetails from "@/components/sponsorshipSupportPreviewComponents/other_details";
import { useEffect } from "react";
import Comment_box from "@/components/Comment_box";  
import {eventCostCenter,subtypeActivity,reportingHeadDropdown,stateDropdown,FormErrors,CityDropdown, PreviewDataType, ChildVendor} from '@/app/Types/EventData'

type Props = {
  previewData: PreviewDataType | null;
  refno: string | null;
}


const Preview_Form = ({...Props}:Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const [preview_data, setPreviewData] = useState<PreviewDataType | null>(null);
  const [dialog,setDialog] = useState(false);
  const [addVendor,setAddVendor] = useState(false);

  const [comment,setComment] = useState<string>();
  const [isCommentbox,setIsCommentbox] = useState<boolean>();

  
  const [refNo,setRefNo] = useState<string | null>(Props.refno ?? "");
  
  

  const isAddVendor = ()=>{
    setAddVendor(prev => !prev)
  }
  
  const handleDialog = ()=>{
    setIsCommentbox(prev=> !prev);
  }

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

  useEffect(() => {
    PreviewData();
  }, [])

  const handleComment = (value:string)=>{
    setComment(value)
  }
  return (
      <>
        <div className="md:px-7 md:pb-7 md:pt-4 w-full z-20">
            
        <BasicDetails
          pathname={pathname}
          eventData={preview_data}

        />

        <BeneficiaryDetails
          pathname={pathname}
          eventData={preview_data}
        />

        <ShippingDetails
        eventData={preview_data}
        />

        <TotalExpense
          eventData={preview_data}
        />

        <Documents
          eventData={preview_data}
          PageName={'nahi pata'}
        />
        
            <div className="flex justify-end pt-5 gap-4">
              {/* <Button className="bg-white text-black border text-md font-normal">
                Save as Draft
              </Button> */}
              <Button className="bg-white text-black border text-md font-normal" onClick={()=>{router.push(`/patient_support?forms=3&refno=${Props.refno}`)}}>
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