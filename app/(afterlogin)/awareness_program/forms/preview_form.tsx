'use client'

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import BasicDetails from "@/components/training_and_education/basic_detail"
import EventDetails from "@/components/training_and_education/event_detail"
import VendorDetails from "@/components/training_and_education/vendor_detail"
import TotalExpense from "@/components/training_and_education/total_expense"
import Documents from "@/components/training_and_education/documents"
import Add_vendor from "@/components/add_vendor";
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation';
import Comment_box from "@/components/approvalCommentBox/Comment_box";

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
  documents: ActivityDocument[];
  advance_approvers: any[]; // Empty array, can be customized later
  city:string;
  reporting_head:string;
  requesting_hospital_name: string;
  ship_to: string;
  bill_to: string;
  organization_name:string;
  any_additional_expense:string;
  product_details:string;
  type_of_engagement:string;
  preactivity_submitted:number;

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

type File = {
  url: string;
  name: string;
  file_name:string
};

type DocumentDetails = {
  type: string;
  file: File[];
};

type ActivityDocument = {
  activity_type: string;
  document: DocumentDetails[];
};

type props = {
  refNo: string;
}

const Preview_Form = ({...Props}:props) => {
  const pathname = usePathname();
  const router = useRouter()
  const [dialog, setDialog] = useState(false);
  const [addVendor, setAddVendor] = useState(false);
  const [preview_data, setPreviewData] = useState<EventEntry | null>(null);
  const [refNo, setRefNo] = useState<string | null>(Props.refNo ?? "");
  const [isCommentbox,setIsCommentbox] = useState<boolean>();
  const [comment,setComment] = useState<string>();
  const isAddVendor = () => {
    setAddVendor(prev => !prev)
  }
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setIsChecked(e.target.checked);
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
  useEffect(() => {
    PreviewData();
  }, [])

  console.log("preview_data", preview_data, refNo)


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
  }

  const handleDialog = ()=>{
    setIsCommentbox(prev=> !prev);
  }

  return (
    <>
      <div className="md:px-7 md:pb-7 md:pt-4 w-full relative z-20">

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
          <Button className={`bg-[#4430bf] text-white  font-normal border hover:opacity-60`} onClick={()=>handleDialog()}>
            Submit
          </Button>
        </div>
      </div>
      {
              isCommentbox &&
        <div className="absolute z-50 flex pt-10 items-end justify-center bg-black bg-opacity-50 w-full h-full inset-0 pb-40">
          <Comment_box 
          handleClose={handleDialog}
          handleComment={handleComment}
          Submitbutton = {handleFinalSubmit}
          />
          </div>
          }
    </>
  )
}

export default Preview_Form