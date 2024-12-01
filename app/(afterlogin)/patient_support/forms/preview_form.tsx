import React,{useState} from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import BasicDetails from "@/components/basic_Details"
import EventDetails from "@/components/event_Details"
import VendorDetails from "@/components/vendor_Details";
import LogisticsBudget from "@/components/logistics_budget";
import CompensationBudget from "@/components/compensation_budget"
import TotalExpense from "@/components/total_Expense"
import Documents from "@/components/documents"
import Add_vendor from "@/components/add_vendor";
import ShippingDetails from "@/components/shipping_details";
import BeneficiaryDetails from "@/components/beneficiary_details";
import OtherDetails from "@/components/other_details";
import { useEffect } from "react";
import Comment_box from "@/components/approvalCommentBox/Comment_box";  

type Props = {
  handleBackButton: (e: React.MouseEvent<HTMLButtonElement>) => void
}

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
  city: string
  reporting_head:string;
  requesting_hospital_name:string;
  ship_to:string;
  bill_to:string;
  organization_name:string;
  product_amount: number;
  quantity:number;
  total_estimateed_expense: number;
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
const Preview_Form = ({...Props}:Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const [preview_data, setPreviewData] = useState<EventEntry | null>(null);
  const [dialog,setDialog] = useState(false);
  const [addVendor,setAddVendor] = useState(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [comment,setComment] = useState<string>();
  const [isCommentbox,setIsCommentbox] = useState<boolean>();

  
  const [refNo,setRefNo] = useState<string | null>(localStorage.getItem("refno")?localStorage.getItem("refno"):"");
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setIsChecked(e.target.checked);
  };

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
        <div className="md:px-7 md:pb-7 md:pt-4 w-full relative z-20">
            
        <BasicDetails
          pathname={pathname}
          eventData={preview_data}

        />

        <BeneficiaryDetails
          pathname={pathname}
          eventData={preview_data}

        />

        <EventDetails
          pathname={pathname}
          eventData={preview_data}
        />

        <TotalExpense
          eventData={preview_data}
        />

        <Documents
          eventData={preview_data}
          PageName={'nahi pata'}
        />
        
            <div className="flex items-center md:pb-8 gap-3">
            <input
            type="checkbox"
            onChange={handleCheckboxChange}
            checked={isChecked}
            className="checkbox"
          />
            <label className="text-black md:text-sm md:font-normal">
              I hereby declare that all details filled by me are correct and genuine.<span className="text-[#e60000]">*</span>
                </label>
            </div>

            <div className="flex justify-end pt-5 gap-4">
              {/* <Button className="bg-white text-black border text-md font-normal">
                Save as Draft
              </Button> */}
              <Button className="bg-white text-black border text-md font-normal">
                Back
              </Button>
              <Button className={`bg-[#4430bf] text-white  font-normal border`} disabled={!isChecked} onClick={()=>handleDialog()}>
                Submit
              </Button>
            </div>
        </div>
        {
            isCommentbox &&
            <div className=" absolute z-50 flex pt-10 items-end justify-center bg-black bg-opacity-50 w-full h-full inset-0 pb-40">
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