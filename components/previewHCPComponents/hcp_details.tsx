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
  documents: ActivityDocument[];
  advance_approvers: any[]; // Empty array, can be customized later
  city: string;
  reporting_head: string;
  requesting_hospital_name: string;
  ship_to: string;
  bill_to: string;
  organization_name: string;
  hcp_name: string;
  hospital_affiliation: string;
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
  pathname: string
  eventData: EventEntry | undefined | null
}

const Hcp_Details = ({ ...Props }: Props) => {
  const pathname = usePathname();
  console.log(pathname.substring(1));
  return (
    <div className="md:pb-8">
      <div className="flex gap-6">
        <h1 className="text-black md:text-[30px] md:font-medium uppercase md:pb-4">
          HCP Details
        </h1>
      </div>
      <div className="grid md:grid-cols-3 md:gap-6">
        <div className={`flex flex-col md:gap-2`}>
          <label className="text-black md:text-sm md:font-normal capitalize">
            Hcp Name
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Type Here"
            readOnly={true}
            value={Props.eventData?.hcp_name}
          ></Input>
        </div>
        <div className={`flex flex-col md:gap-2`}>
          <label className="text-black md:text-sm md:font-normal capitalize">
            Hospital Affiliation
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Type Here"
            readOnly={true}
            value={Props.eventData?.hospital_affiliation}
          ></Input>
        </div>
        <div className={`flex flex-col md:gap-2`}>
          <label className="text-black md:text-sm md:font-normal capitalize">
          Engagement of any government hCP’s
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Type Here"
            readOnly={true}
            value={Props.eventData?.any_govt_hcp}
          ></Input>
        </div>
        <div className={`flex flex-col md:gap-2`}>
          <label className="text-black md:text-sm md:font-normal capitalize">
          Total number of government hCP’s
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Type Here"
            readOnly={true}
            value={Props.eventData?.no_of_hcp}
          ></Input>
        </div>
        <div className={`flex flex-col md:gap-2`}>
          <label className="text-black md:text-sm md:font-normal capitalize">
          BU Rational
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Type Here"
            readOnly={true}
            value={Props.eventData?.bu_rational}
          ></Input>
        </div>
      </div>
    </div>
  )
}

export default Hcp_Details