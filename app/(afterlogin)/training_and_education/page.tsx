import React from 'react';
import Form1 from "@/app/(afterlogin)/training_and_education/forms/form1";
import Form2 from "@/app/(afterlogin)/training_and_education/forms/form2";
import Form3 from "@/app/(afterlogin)/training_and_education/forms/form3";
import Form4 from "@/app/(afterlogin)/training_and_education/forms/form4";
import Preview_Form from './forms/preview_form';
import { AppWrapper } from '@/app/context/module';
import { PreviewData, handleBusinessUnitChange, activityList, dropdown } from '../hcp_services/utility';
import { cookies } from 'next/headers';

export type DropdownDataType = {
  company: {
    name: string,
    company_name: string
  }[],
  currency: {
    name: string
  }[],
  division: {
    name: string,
    division_name: string
  }[],
  engagement_type:{
    name:string,
    engagement_type: string,
  }[],
  gst: {
    name: string,
    rate: string
  }[],
  hcp_ref_no: {
    name: string
  }[],
  requestor: {
    full_name: string,
    email: string
  }[],
  state: {
    name: string,
    state: string
  }[],
  city: {
    name: string,
    city: string
  }[],
  training_ref_no: {
    name: string
  }[],
  vendor_type: {
    name: string,
    vendor_type: string
  }[],
};
export type ActivityDropdownType = {
  activity:{
    name:string,
    activity_name:string
  }[],
  document:{
    name:string,
    activity_type:string,
    document_name:string
  }[]
};
export type PreviewDataType = {
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
  city: string | null;
  therapy: string;
  event_requestor: string;
  division_sub_category: string | null;
  reporting_head: string | null;
  status: string;
  current_stage: string;
  product_amount: number;
  quantity: number;
  organizer_name: string | null;
  sponsor_currency: number;
  sponsorship_amount: number;
  entitlement_in_lieu_of_sponsorship: string | null;
  comment_if_any: string | null;
  any_additional_expense: string | null;
  event_name: string | null;
  event_start_date: string;
  any_govt_hcp: string;
  comments: string | null;
  faculty: string;
  hcp_name: string;
  type_of_engagement: string;
  annual_plan: number;
  product_details: string;
  organization_name: string | null;
  event_venue: string | null;
  event_end_date: string;
  no_of_hcp: number;
  bu_rational: string;
  participants: string;
  training_ref_no: string | null;
  hcp_ref_no: string | null;
  sponsorship_ref_no: string | null;
  service_type: string | null;
  hospital_affiliation: string;
  requesting_hospital_name: string | null;
  bill_to: string | null;
  ship_to: string | null;
  total_compensation_expense: number;
  has_advance_expense: number;
  event_conclusion: string | null;
  total_logistics_expense: number;
  travel_vendors_status: string;
  total_estimated_expense: number;
  currency: string;
  preactivity_status: string;
  advance_status: string;
  advance_expense_check: number;
  post_activity_status: string;
  post_expense_status: string;
  post_expense_check: number;
  travel_expense_status: string;
  travel_expense_check: number;
  amended_from: string | null;
  document_no: string | null;
  invoice_date: string | null;
  invoice_amount: number;
  division: string | null;
  nature: string | null;
  gl_code: string | null;
  zone: string | null;
  remark: string | null;
  posting_date: string | null;
  basic_amount: number;
  tds: number;
  cost_centre: string | null;
  company_name: string | null;
  utr_number: string | null;
  finance_state: string | null;
  invoice_number: string | null;
  gst: number;
  net_amount: number;
  cc_name: string | null;
  gl_name: string | null;
  payment_date: string | null;
  finance_city: string | null;
  doctype: string;
  actual_vendors: any[];
  expense_attachments: any[];
  preactivity_approvers: any[];
  logistics: ChildVendor[];
  travel_expense_approvers: any[];
  post_activity_approvers: any[];
  post_expense_vendors: any[];
  travel_vendors: any[];
  occurrence_status: ChildOccurrence[];
  post_expense_approvers: any[];
  documents: Document[];
  advance_approvers: any[];
  compensation: ChildVendor[];
  occurrence_no: number;
  preactivity_submitted: number;
  preactivity_approved: number;
  advance_request_submitted: number;
  advance_request_approved: number;
  executed: number;
  post_activity_submitted: number;
  post_activity_approved: number;
  post_expense_submitted: number;
  post_expense_approved: number;
  travel_expense_submitted: number;
  travel_expense_approved: number;
  budget:string;
};
  type ChildVendor = {
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
    file: string | null;
    event_conclusion: string | null;
    vendor_name: string | null;
    advance: number;
    budget_category: string;
    advance_expense_check: number;
    travel_expense_check: number;
    est_amount: number;
    gst_included: number;
    gst: string;
    occurrence_no: number;
    post_expense_check: number;
    document_no: string | null;
    invoice_date: string | null;
    invoice_amount: number;
    division: string | null;
    nature: string | null;
    gl_code: string | null;
    zone: string | null;
    narration: string | null;
    posting_date: string | null;
    basic_amount: number;
    tds: number;
    cost_center: string | null;
    company_name: string | null;
    utr_number: string | null;
    state: string | null;
    invoice_number: string | null;
    finance_gst: string | null;
    net_amount: number;
    cc_name: string | null;
    gl_name: string | null;
    payment_date: string | null;
    city: string | null;
    parent: string;
    parentfield: string;
    parenttype: string;
    doctype: string;
  };
  type ChildOccurrence = {
    name: string;
    owner: string;
    creation: string;
    modified: string;
    modified_by: string;
    docstatus: number;
    idx: number;
    occurrence_no: number;
    is_declared: number;
    occurrence_date: string | null;
    travel_vendor_status: string;
    submitted_by: string | null;
    status: string;
    preactivity_submitted: number;
    preactivity_approved: number;
    executed: number;
    advance_request_submitted: number;
    advance_request_approved: number;
    post_activity_submitted: number;
    post_activity_approved: number;
    post_expense_submitted: number;
    post_expense_approved: number;
    travel_expense_submitted: number;
    travel_expense_approved: number;
    parent: string;
    parentfield: string;
    parenttype: string;
    doctype: string;
  };
  type Document = {
    activity_type: string;
    document: {
        type: string;
        file: {
            name: string;
            url: string;
            file_name: string;
        }[];
    }[];
  };
export type FormDataType = {
  name: string | null;
  event_type: string;
  company: string;
  event_cost_center: string;
  state: string;
  city: string;
  event_start_date: string;
  event_end_date: string;
  bu_rational: string;
  faculty: string;
  participants: string;
  therapy: string;
  event_name: string;
  event_venue: string;
  comments: string;
  compensation: CompensationType[];
  logistics: LogisticsType[];
  total_compensation_expense: number;
  total_logistics_expense: number;
  event_requestor: string;
  business_unit: string;
  division_category: string;
  division_sub_category: string;
  sub_type_of_activity: string;
  any_govt_hcp: string,
  no_of_hcp: number
};
  type CompensationType = {
    vendor_type: string;
    vendor_name: string;
    est_amount: number;
    gst_included?: number;
  };
  type LogisticsType = {
    vendor_type: string;
    est_amount: number;
  };

const index = async ({...Props}:any) => {

  const props =  await Props;
  const {forms,refno} = await props.searchParams;
  const activityDropdown:ActivityDropdownType = await activityList();
  const dropdownData:DropdownDataType =await dropdown();

  const cookie = await cookies();
  let previewdata:  PreviewDataType | null = null;
  let eventCostCenter = null;
  // console.log(refno,cookie);
  
  if(refno){
    previewdata =  await PreviewData(refno,cookie);
  }
  if(previewdata && previewdata.business_unit){
    eventCostCenter = await handleBusinessUnitChange(previewdata.business_unit,cookie);
  }

  let eventType = "Training and Education";
  // console.log(activityDropdown, dropdownData, previewdata);

  return (
    <>
      <AppWrapper>
        <div className="px-7 pb-7 pt-4 w-full relative z-20">
          <div>
            <h1 className="text-black text-[30px] font-medium capitalize" id="form_top">
            
            </h1>
            <div className='py-9'></div>
          </div>
          {
          forms == "1" ?
            <Form1
              eventCostCenter={eventCostCenter}
              previewData = {previewdata}
              dropdownData={dropdownData}
              // refNo={refno}
            /> :
            forms == "2" ?
              <Form2
                previewData = {previewdata}
                refNo={refno}
              /> :
              forms == "3" ?
                <Form3
                  previewData = {previewdata}
                  vendorType={dropdownData && dropdownData.vendor_type}
                  currency={dropdownData && dropdownData.currency}
                  refNo={refno}

                /> :
                forms == "4" ?
                  <Form4
                    activityDropdown={activityDropdown}
                    refNo={refno}

                  /> :
                  forms == "5" ?
                    <Preview_Form
                      refNo={refno}
                    /> : ""
        }
        </div>
      </AppWrapper>
    </>
  )
}

export default index