import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";9

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
    pathname : string
    eventData: EventEntry | undefined
  }

const LogisticBudget = ({...Props}:Props) => {
    return (
        <div className="pb-8">
            <div className="flex gap-6">
                <h1 className="text-black md:text-[30px] md:font-medium uppercase md:pb-4">
                    Logistics Budget
                </h1>
            </div>
            <div className="border border-[#848484] p-7 rounded-[50px] w-full mr-4  bg-white">
                <Table className={""}>
                    <TableHeader className={"bg-[#E0E9FF]"}>
                        <TableRow className={""}>
                            <TableHead
                                className={
                                    "text-center rounded-l-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                Vendor Type
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                Amount (in INR)
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            Props.eventData && Props.eventData.logistics?.map((item,index)=>{
                                return (
                        <TableRow className="text-black text-center">
                            <TableCell>{item.vendor_type}</TableCell>
                            <TableCell>{item.est_amount}</TableCell>
                        </TableRow>                        
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default LogisticBudget;