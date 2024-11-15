'use client'
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { usePathname } from 'next/navigation';

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


type Props = {
  pathname: string
  eventData:EventEntry | null
}

const event_Details = ({ ...Props }: Props) => {
  const pathname = usePathname();
  console.log(pathname.substring(1));
  return (
    <div className="md:pb-8">
      <div className="flex gap-6">
        <h1 className="text-black md:text-[30px] md:font-medium uppercase md:pb-4">
          {pathname.substring(1) == 'monetary_grant' || pathname.substring(1) == 'non_monetary_grant' ? 'organisation Details' : 'event Details'}
        </h1>
        
      </div>
      <div className="grid md:grid-cols-3 md:gap-6">
        <div className="flex flex-col md:gap-2">
          <label className="text-black md:text-sm md:font-normal capitalize">
            {pathname == "/assesment_program" ? "Program Name" : pathname == "/non_monetary_grant" ? "Organisation Name" : "Event Name"}<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Type Here"
            readOnly={true}
            value={Props.eventData?.event_name}
          ></Input>
        </div>
        { 
          pathname.substring(1) == 'sponsorship_program' || pathname.substring(1) == 'non_monetary_grant' &&
          <>
            <div className="flex flex-col md:gap-2">
              <label className="text-black md:text-sm md:font-normal capitalize">
                Event Start Date<span className="text-[#e60000]">*</span>
              </label>
              <Input
                className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
                placeholder="Type Here"
                readOnly={true}
                value={Props.eventData?.event_start_date}
              ></Input>
            </div>
            <div className="flex flex-col md:gap-2">
            <label className="text-black md:text-sm md:font-normal capitalize">
              Event End Date<span className="text-[#e60000]">*</span>
            </label>
            <Input
              className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
              placeholder="Type Here"
              readOnly={true}
              value={Props.eventData?.event_end_date}
            ></Input>
          </div>
          </>
        }
        { pathname.substring(1) != 'sponsorship_program' || pathname.substring(1) != 'non_monetary_grant' &&
          <div className="flex flex-col md:gap-2">
            <label className="text-black md:text-sm md:font-normal capitalize">
              {Props.pathname == "/assesment_program" ? "Program Start Date" : "Event Date"}<span className="text-[#e60000]">*</span>
            </label>
            <Input
              className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
              placeholder="Type Here"
              readOnly={true}
            ></Input>
          </div>
        }
        <div className={`flex flex-col md:gap-2  ${Props.pathname == "/assesment_program" ? "" : "hidden"}`}>
          <label className="text-black md:text-sm md:font-normal capitalize">
            Program End Date<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Type Here"
            readOnly={true}
            value={Props.eventData?.event_end_date}
          ></Input>
        </div>

        { pathname.substring(1) != 'non_monetary_grant' &&
          <div className="flex flex-col md:gap-2">
            <label className="text-black md:text-sm md:font-normal capitalize">
              {Props.pathname == "/assesment_program" ? "Program Venue and Location" : "Event Venue"}<span className="text-[#e60000]">*</span>
            </label>
            <Input
              className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
              placeholder="Type Here"
              readOnly={true}
              value={Props.eventData?.event_venue}
            ></Input>
          </div>
        }

        {pathname.substring(1) != 'sponsorship_program' || pathname.substring(1) != 'non_monetary_grant' &&
          <>
            <div className="flex flex-col md:gap-2">
              <label className="text-black md:text-sm md:font-normal capitalize">
                engagement of any government hCP’s?<span className="text-[#e60000]">*</span>
              </label>
              <Input
                className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
                placeholder="Type Here"
                readOnly={true}
                value={Props.eventData?.any_govt_hcp}
              ></Input>
            </div>
            <div className="flex flex-col md:gap-2">
              <label className="text-black md:text-sm md:font-normal capitalize">
                Total Number of government HCP’s<span className="text-[#e60000]">*</span>
              </label>
              <Input
                className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
                placeholder="Type Here"
                readOnly={true}
              ></Input>
            </div>
          </> 
        }
        <div className="flex flex-col md:gap-2">
          <label className="text-black md:text-sm md:font-normal capitalize">
            BU rational<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Type Here"
            readOnly={true}
            value={Props.eventData?.bu_rational}
          ></Input>
        </div>
        {pathname.substring(1) != 'sponsorship_program' ?
          <div className="flex flex-col md:gap-2">
            <label className="text-black md:text-sm md:font-normal capitalize">
              Comments<span className="text-[#e60000]">*</span>
            </label>
            <Textarea
              className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
              placeholder="Type Here"
              readOnly={true}
              value={Props.eventData?.comments}
            ></Textarea>
          </div> :
          <></>
        }
      </div>
    </div>
  )
}

export default event_Details