import React from 'react'
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

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
    city:string
    reporting_head:string
    organizer_name:string,
    sponsorship_amount:number
    entitlement_in_lieu_of_sponsorship:string

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


type Props = {
    pathname: string 
    eventData: EventEntry | null | undefined
}


const Sponsorship_Details = ({...Props}:Props) => {
    
    return (
        <div className="md:pb-8">
            <div className="flex md:gap-6" >
                <h1 className="text-black md:text-[30px] md:font-medium uppercase md:pb-4">
                    Sponsorship Details
                </h1>
                <div className="pt-3">
                    {/* <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Group">
                            <g id="Vector">
                                <mask id="path-1-inside-1_605_29773" fill="white">
                                    <path d="M4.01679 5.35547H2.67786C1.96765 5.35547 1.28652 5.6376 0.784326 6.13979C0.282131 6.64199 0 7.32311 0 8.03333V20.0837C0 20.7939 0.282131 21.475 0.784326 21.9772C1.28652 22.4794 1.96765 22.7615 2.67786 22.7615H14.7282C15.4384 22.7615 16.1196 22.4794 16.6217 21.9772C17.1239 21.475 17.4061 20.7939 17.4061 20.0837V18.7448" />
                                </mask>
                                <path d="M2.67786 5.35547V4.35547V5.35547ZM0 8.03333H-1H0ZM0 20.0837H-1H0ZM4.01679 4.35547H2.67786V6.35547H4.01679V4.35547ZM2.67786 4.35547C1.70243 4.35547 0.766952 4.74296 0.0772194 5.43269L1.49143 6.8469C1.80609 6.53224 2.23286 6.35547 2.67786 6.35547V4.35547ZM0.0772194 5.43269C-0.612513 6.12242 -1 7.0579 -1 8.03333H1C1 7.58833 1.17677 7.16156 1.49143 6.8469L0.0772194 5.43269ZM-1 8.03333V20.0837H1V8.03333H-1ZM-1 20.0837C-1 21.0591 -0.612513 21.9946 0.0772194 22.6843L1.49143 21.2701C1.17677 20.9555 1 20.5287 1 20.0837H-1ZM0.0772194 22.6843C0.766951 23.3741 1.70243 23.7615 2.67786 23.7615V21.7615C2.23286 21.7615 1.80609 21.5848 1.49143 21.2701L0.0772194 22.6843ZM2.67786 23.7615H14.7282V21.7615H2.67786V23.7615ZM14.7282 23.7615C15.7036 23.7615 16.6391 23.3741 17.3289 22.6843L15.9146 21.2701C15.6 21.5848 15.1732 21.7615 14.7282 21.7615V23.7615ZM17.3289 22.6843C18.0186 21.9946 18.4061 21.0591 18.4061 20.0837H16.4061C16.4061 20.5287 16.2293 20.9555 15.9146 21.2701L17.3289 22.6843ZM18.4061 20.0837V18.7448H16.4061V20.0837H18.4061Z" fill="black" mask="url(#path-1-inside-1_605_29773)" />
                            </g>
                            <path id="Vector_2" d="M21.939 4.8002C22.4663 4.27287 22.7626 3.55765 22.7626 2.81189C22.7626 2.06613 22.4663 1.35092 21.939 0.823585C21.4117 0.296252 20.6965 9.62388e-09 19.9507 0C19.2049 -9.62388e-09 18.4897 0.296252 17.9624 0.823585L7.53019 11.2186C6.99573 11.7512 6.69531 12.4746 6.69531 13.2291C6.69531 14.7966 7.96602 16.0673 9.53351 16.0673C10.288 16.0673 11.0114 15.7669 11.544 15.2324L21.939 4.8002ZM16.0678 2.678L20.0846 6.69479L16.0678 2.678Z" fill="black" />
                        </g>
                    </svg> */}
                </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
            <div className="flex flex-col md:gap-2">
                    <label className="text-black md:text-sm md:font-normal capitalize">
                        Organizer Name<span className="text-[#e60000]">*</span>
                    </label>
                    <Input
                        className="text-black shadow bg-[#f6f6f6] md:rounded-xl md:py-5"
                        placeholder="Type Here"
                        value={Props.eventData?.organizer_name}
                        readOnly
                    ></Input>
                </div>
                <div className="flex flex-col md:gap-2">
                    <label className="text-black md:text-sm md:font-normal capitalize">
                        Sponsorship Amount<span className="text-[#e60000]">*</span>
                    </label>
                    <Input
                        className="text-black shadow bg-[#f6f6f6] md:rounded-xl md:py-5"
                        placeholder="Type Here"
                        readOnly
                        value={Props.eventData?.sponsorship_amount}
                    ></Input>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="lable">
                    Currency<span className="text-[#e60000]">*</span>
                  </label>
                  <Select
                  disabled
                  >
                    <SelectTrigger className="dropdown">
                      <SelectValue placeholder={Props.eventData?.currency} />
                    </SelectTrigger>
                    <SelectContent>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col md:gap-2">
                    <label className="text-black md:text-sm md:font-normal capitalize">
                    Entitlement in Lieu of sponsorship<span className="text-[#e60000]">*</span>
                    </label>
                    <Input
                        className="text-black shadow bg-[#f6f6f6] md:rounded-xl md:py-5"
                        placeholder="Type Here"
                        value={Props.eventData?.entitlement_in_lieu_of_sponsorship}
                    ></Input>
                </div>
            </div>
        </div>
    )
}

export default Sponsorship_Details;