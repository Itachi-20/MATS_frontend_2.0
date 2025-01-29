import React from 'react'
import { Input } from "@/components/ui/input";
import BeneficiaryDetails from "@/components/beneficiary_details";
import { Textarea } from "@/components/ui/textarea"

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
   
    documents: Document[];
    advance_approvers: any[]; // Empty array, can be customized later
    city:string
    reporting_head:string;
    product_amount: number;
    quantity:number;
    requesting_hospital_name:string
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

type Props = {
    eventData:EventEntry | null
}
const Basic_Details = ({ ...Props }: Props) => {
  return (
    <div className="md:pb-8">
      <div className="flex md:gap-6" >
        <h1 className="text-black md:text-[30px] md:font-medium uppercase md:pb-4">
          Shipping Details
        </h1>
        <div className="pt-3">
        </div>
      </div>
      <div className="grid md:grid-cols-3 md:gap-6">
        <div className='flex flex-col gap-2'>
          <label className='lable'>Requesting Hospital Name <span className='text-[#e60000]'>*</span></label>
          <Input className='dropdown' placeholder='Type Here' disabled value={Props.eventData?.requesting_hospital_name}></Input>

        </div>
        <div className='flex flex-col gap-2'>
          <label className='lable'>Event Start Date<span className='text-[#e60000]'>*</span></label>
          <input type='date' className='dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm' disabled value={Props.eventData?.event_start_date}></input>

        </div>
        <div className='flex flex-col gap-2'>
          <label className='lable'>Event End Date<span className='text-[#e60000]'>*</span></label>
          <input type='date' className=' dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm' disabled value={Props.eventData?.event_end_date}></input>
        </div>
        {/* <div className='flex flex-col gap-2'>
          <label className='lable'>Total number of government hCP’s<span className='text-[#e60000]'>*</span></label>
          <Select>
            <SelectTrigger className="text-black shadow">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>

        </div> */}
        <div className='flex flex-col gap-2'>
          <label className='lable'>Ship To<span className='text-[#e60000]'>*</span></label>
          <Textarea className='md:rounded-xl bg-[#f6f6f6] text-black shadow-md' placeholder='Type Here'disabled value={Props.eventData?.ship_to} />
        </div>
        <div className='flex flex-col gap-2'>
          <label className='lable'>Bill To<span className='text-[#e60000]'>*</span></label>
          <Textarea className='md:rounded-xl bg-[#f6f6f6] text-black shadow-md' placeholder='Type Here'disabled value={Props.eventData?.bill_to}/>
        </div>
        <div className='flex flex-col gap-2'>
          <label className='lable'>BU Rational<span className='text-[#e60000]'>*</span></label>
          <Textarea className='md:rounded-xl bg-[#f6f6f6] text-black shadow-md' placeholder='Type Here' disabled value={Props.eventData?.bu_rational}/>
        </div>
      </div>
    </div>
  )
}

export default Basic_Details