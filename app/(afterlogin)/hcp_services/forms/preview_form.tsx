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
import Comment_box from "@/components/approvalCommentBox/Comment_box";
import { Previewdata } from '@/app/(afterlogin)/hcp_services/page'
import Hcp_Details from "@/components/previewHCPComponents/hcp_details";

type EventEntry = {
  name: string | null;
  owner: string | null;
  creation: string | null;
  modified: string | null;
  modified_by: string | null;
  docstatus: string | null;
  idx: number;
  event_type: string | null;
  company: string | null;
  event_cost_center: string | null;
  state: string;
  sub_type_of_activity: string | null;
  business_unit: string;
  division_category: string;
  therapy: string;
  event_requestor: string;
  division_sub_category: string | null;
  status: string;
  current_stage: string;
  event_name: string | null;
  event_start_date: string;
  any_govt_hcp: string;
  comments: string | null;
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
  city: string;
  reporting_head: string;
  type_of_engagement: string;
  product_details: string;
  any_additional_expense: string;
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
  file_name: string
};

type DocumentDetails = {
  type: string;
  file: File[];
};

type ActivityDocument = {
  activity_type: string;
  document: DocumentDetails[];
};

type Props = {
  previewData: Previewdata | null;
  refno: string | null;
}

const Preview_Form = ({ ...Props }: Props) => {
  const pathname = usePathname();
  const router = useRouter()
  const [dialog, setDialog] = useState(false);
  const [addVendor, setAddVendor] = useState(false);
  const [preview_data, setPreviewData] = useState<Previewdata | null | undefined>(Props.previewData);
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
            handleComment={handleComment}
            Submitbutton={handleFinalSubmit}
          />
        </div>
      }
    </>

  )
}

export default Preview_Form