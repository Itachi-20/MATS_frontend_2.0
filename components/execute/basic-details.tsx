// // components/DynamicInput.tsx
// import React from 'react';

// interface InputField {
//     id: string; // Unique identifier for each field
//     label: string; // Label text for the input
//     value: string; // Default or initial value for the input
//   }
 
// interface DynamicInputProps {
//   field: InputField;
//   onChange: (id: string, value: string) => void;
// }

// const DynamicInput: React.FC<DynamicInputProps> = ({ field, onChange }) => {
    
//   return (
//     <div className="mb-4 ">
//       <label className="block text-sm font-medium text-gray-700">
//         {field.label}
//       </label>
//       <input
//         type="text"
//         value={field.value}
//         onChange={(e) => onChange(field.id, e.target.value)}
//         className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//       />
//     </div>
//   );
// };

// export default DynamicInput;



import React from 'react'
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import BeneficiaryDetails from "@/components/beneficiary_details";

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
  eventData:EventEntry | undefined
}

const Basic_Details = ({ ...Props }: Props) => {
  console.log(Props.pathname, "this is pathname")
  return (
    <div className="md:pb-8">
      <div className="flex md:gap-6" >
        <h1 className="text-black md:text-[30px] md:font-medium uppercase md:pb-4">
          Basic Details
        </h1>
      </div>
      <div className="grid md:grid-cols-3 md:gap-6">
        <div className="flex flex-col md:gap-2">
          <label htmlFor="company_name" className="text-black md:text-sm md:font-normal capitalize">
            Company Name<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Micro Life Sciences Private Limited"
            id='company_name'
            name='company_name'
            readOnly={true}
            value={Props.eventData?.company}
          ></Input>
        </div>
        <div className="flex flex-col md:gap-2">
          <label htmlFor='business_unit' className="text-black md:text-sm md:font-normal capitalize">
            Business Unit<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Cardiology"
            id='business_unit'
            name='business_unit'
            readOnly={true}
            value={Props.eventData?.business_unit}
          ></Input>
        </div>
        <div className="flex flex-col md:gap-2">
          <label htmlFor="event_requester" className="text-black md:text-sm md:font-normal capitalize">
            Event Requester<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Event user name"
            id='event_requester'
            name="event_requester"
            readOnly={true}
            value={Props.eventData?.event_requestor}
          ></Input>
        </div>
        <div className="flex flex-col md:gap-2">
          <label htmlFor='event_cost-center' className="text-black md:text-sm md:font-normal capitalize">
            Event Cost Center<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Lorem ipsum dolor sit amet"
            id='event_cost_center'
            name='event_cost_center'
            readOnly={true}
            value={Props.eventData?.event_cost_center}
          ></Input>
        </div>
        <div className="flex flex-col md:gap-2">
          <label className="text-black md:text-sm md:font-normal capitalize">
            Budget<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="National"
            readOnly={true}
            value={Props.eventData?.division_category}
          ></Input>
        </div>
       
        <div className="flex flex-col md:gap-2">
          <label className="text-black md:text-sm md:font-normal capitalize">
            state<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Gujarat"
            readOnly={true}
            value={Props.eventData?.state}
          ></Input>
        </div>
        <div className={`flex flex-col md:gap-2  ${Props.pathname == "/assesment_program" ? "hidden" : ""}`}>
          <label className="text-black md:text-sm md:font-normal capitalize">
            Therapy<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Pheriperal"
            readOnly={true}
            value={Props.eventData?.therapy}
          ></Input>
        </div>
        <div className={`flex flex-col md:gap-2  ${Props.pathname == "/assesment_program" ? "hidden" : ""}`}>
          <label className="text-black md:text-sm md:font-normal capitalize">
            reporting head<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="lorem ipsum"
            readOnly={true}
            value={Props.eventData?.reporting_head}
          ></Input>
        </div>
        <div className="flex flex-col md:gap-2">
          <label className="text-black md:text-sm md:font-normal capitalize">
            sub type of activity<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Meril Event"
            readOnly={true}
            value={Props.eventData?.sub_type_of_activity}
          ></Input>
        </div>
      </div>
    </div>
  )
}

export default Basic_Details



