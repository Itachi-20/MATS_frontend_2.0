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
  city:string;
  reporting_head:string;
  requesting_hospital_name:string;
  ship_to:string;
  bill_to:string;
  organization_name:string;
  hcp_name:string;
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
  eventData:EventEntry | undefined | null
}

const event_Details = ({ ...Props }: Props) => {
  const pathname = usePathname();
  console.log(Props.eventData?.event_type);
  return (
    <div className="md:pb-8">
      <div className="flex gap-6">
        <h1 className="text-black md:text-[30px] md:font-medium uppercase md:pb-4">
          {Props.eventData?.event_type == 'Monetary Grant' || Props.eventData?.event_type == 'Non Monetary Grant' ? 'organisation Details' : Props.eventData?.event_type == 'Awareness Program' ? 'Program Details':'event details'}
        </h1>
        
      </div>
      <div className="grid md:grid-cols-3 md:gap-6">
        <div className={`flex flex-col md:gap-2 ${Props.eventData?.event_type == "Patient Support" ? 'hidden':''}`}>
          <label className="text-black md:text-sm md:font-normal capitalize">
            {Props.eventData?.event_type == ("Awareness Program") ? "Program Name" : (Props.eventData?.event_type == "Non Monetary Grant") || (Props.eventData?.event_type == "Monetary Grant") ? "Organisation Name" : "Event Name"}<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Type Here"
            readOnly={true}
            value={Props.eventData?.event_type == "Monetary Grant" ? Props.eventData?.organization_name : Props.eventData?.event_name}
          ></Input>
        </div>
        { 
          (Props.eventData?.event_type == 'Sponsorship Support' || Props.eventData?.event_type == 'Non Monetary Grant' || Props.eventData?.event_type == 'Patient Support' || Props.eventData?.event_type == 'Monetary Grant') &&
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

        { 
          Props.eventData?.event_type == 'Patient Support' &&
          <>
            <div className="flex flex-col md:gap-2">
              <label className="text-black md:text-sm md:font-normal capitalize">
              Requesting Hospital Name<span className="text-[#e60000]">*</span>
              </label>
              <Input
                className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
                placeholder="Type Here"
                readOnly={true}
                value={Props.eventData?.requesting_hospital_name}
              ></Input>
            </div>
            <div className="flex flex-col md:gap-2">
            <label className="text-black md:text-sm md:font-normal capitalize">
              Ship To<span className="text-[#e60000]">*</span>
            </label>
            <Input
              className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
              placeholder="Type Here"
              readOnly={true}
              value={Props.eventData?.ship_to}
            ></Input>
          </div>
          <div className="flex flex-col md:gap-2">
            <label className="text-black md:text-sm md:font-normal capitalize">
              Bill To<span className="text-[#e60000]">*</span>
            </label>
            <Input
              className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
              placeholder="Type Here"
              readOnly={true}
              value={Props.eventData?.bill_to}
            ></Input>
          </div>
          </>
        }

        { (Props.eventData?.event_type != 'Sponsorship Support' && Props.eventData?.event_type != 'Non Monetary Grant') &&
          <div className="flex flex-col md:gap-2">
            <label className="text-black md:text-sm md:font-normal capitalize">
              {Props.eventData?.event_type == "Awareness Program" ? "Program Start Date" : "Event Date"}<span className="text-[#e60000]">*</span>
            </label>
            <Input
              className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
              placeholder="Type Here"
              readOnly={true}
              value={Props.eventData?.event_start_date}
            ></Input>
          </div>
        }
        <div className={`flex flex-col md:gap-2  ${Props.eventData?.event_type == "Awareness Program" ? "" : "hidden"}`}>
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

        { (Props.eventData?.event_type != 'Non Monetary Grant' && Props.eventData?.event_type != 'Patient Support' && Props.eventData?.event_type != 'Monetary Grant') &&
          <div className="flex flex-col md:gap-2">
            <label className="text-black md:text-sm md:font-normal capitalize">
              {Props.eventData?.event_type == "Awareness Program" ? "Program Venue and Location" : "Event Venue"}<span className="text-[#e60000]">*</span>
            </label>
            <Input
              className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
              placeholder="Type Here"
              readOnly={true}
              value={Props.eventData?.event_venue}
            ></Input>
          </div>
        }

        { (Props.eventData?.event_type != 'Sponsorship Support' && Props.eventData?.event_type != 'Non Monetary Grant') &&
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
            { Props.eventData?.any_govt_hcp == "Yes" &&
              <div className="flex flex-col md:gap-2">
                <label className="text-black md:text-sm md:font-normal capitalize">
                  Total Number of government HCP’s<span className="text-[#e60000]">*</span>
                </label>
                <Input
                  className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
                  placeholder="Type Here"
                  readOnly={true}
                  value={Props.eventData?.no_of_hcp}
                ></Input>
              </div>
            }
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

        <div className="flex flex-col md:gap-2">
          <label className="text-black md:text-sm md:font-normal capitalize">
            HCP Name<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Type Here"
            readOnly={true}
            value={Props.eventData?.hcp_name}
          ></Input>
        </div>

        {(Props.eventData?.event_type != 'Sponsorship Support' && Props.eventData?.event_type != 'Patient Support') ?
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