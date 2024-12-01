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
  documents: ActivityDocument[];
  advance_approvers: any[]; // Empty array, can be customized later
  city:string
  reporting_head:string
  type_of_engagement:string
  product_details:string
  annual_plan:number;
  service_type:string;
  sponsorship_ref_no: string;
  training_ref_no: string;
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
  eventData:EventEntry | undefined |null
}

const Basic_Details = ({ ...Props }: Props) => {
  console.log("Props.sub_type_of_activity",Props.eventData?.event_start_date)
  return (
    <div className="md:pb-8">
      <div className="flex md:gap-6" >
        <h1 className="text-black md:text-[30px] md:font-medium uppercase md:pb-4">
          Basic Details
        </h1>
      </div>
      <div className="grid md:grid-cols-3 md:gap-6">
        <div className="flex flex-col md:gap-2">
          <label className="text-black md:text-sm md:font-normal capitalize">
            Company Name<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Type Here"
            readOnly={true}
            value={Props.eventData?.company}
          ></Input>
        </div>
        <div className="flex flex-col md:gap-2">
          <label className="text-black md:text-sm md:font-normal capitalize">
            Business Unit<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Type Here"
            readOnly={true}
            value={Props.eventData?.business_unit}
          ></Input>
        </div>
        <div className="flex flex-col md:gap-2">
          <label className="text-black md:text-sm md:font-normal capitalize">
            Event Requester<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Type Here"
            readOnly={true}
            value={Props.eventData?.event_requestor}
          ></Input>
        </div>
        <div className="flex flex-col md:gap-2">
          <label className="text-black md:text-sm md:font-normal capitalize">
            Event Cost Center<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Type Here"
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
            placeholder="Type Here"
            readOnly={true}
            value={Props.eventData?.division_category}
          ></Input>
        </div>

        {/* should be condition based */}
        {
          Props.eventData?.division_category == "National" &&
          <div className="flex flex-col gap-2">
              <label className="lable">
                Budget Sub Type<span className="text-[#e60000]">*</span>
              </label>
              <Input
              className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
              placeholder="Type Here"
              readOnly={true}
              value={Props.eventData?.division_sub_category}
            ></Input>
            </div>
        }
        <div className="flex flex-col md:gap-2">
          <label className="text-black md:text-sm md:font-normal capitalize">
            city<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Type Here"
            readOnly={true}
            value={Props.eventData?.city}
          ></Input>
        </div>
        <div className="flex flex-col md:gap-2">
          <label className="text-black md:text-sm md:font-normal capitalize">
            state<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Type Here"
            readOnly={true}
            value={Props.eventData?.state}
          ></Input>
        </div>
        <div className={`flex flex-col md:gap-2  ${Props.eventData?.event_type == "Awareness Program" ? "hidden" : ""}`}>
          <label className="text-black md:text-sm md:font-normal capitalize">
            Therapy<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Type Here"
            readOnly={true}
            value={Props.eventData?.therapy}
          ></Input>
        </div>
        <div className={`flex flex-col md:gap-2  ${Props.eventData?.event_type == "Awareness Program" ? "hidden" : ""}`}>
          <label className="text-black md:text-sm md:font-normal capitalize">
            reporting head<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Type Here"
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
            placeholder="Type Here"
            readOnly={true}
            value={Props.eventData?.sub_type_of_activity}
          ></Input>
        </div>  

        <div className="flex flex-col gap-2">
          <label className="lable">
            Faculties<span className="text-[#e60000]">*</span>
          </label>
          <Textarea className='text-black shadow-md bg-[#f6f6f6]' placeholder='Type Here' readOnly value={Props.eventData?.faculty}/>
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable">
            Participants<span className="text-[#e60000]">*</span>
          </label>
          <Textarea className='text-black shadow-md bg-[#f6f6f6]' placeholder='Type Here' readOnly value={Props.eventData?.participants}/>
        </div>
      </div>
      { Props.eventData && Props.eventData.type_of_engagement && Props.eventData.type_of_engagement == "MSA" &&
        <>
          <div className="py-8">
              <h1 className="text-black text-2xl font-normal uppercase pb-8">
                Sub Type Details
              </h1>
              <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="flex flex-col md:gap-2">
                        <label className="text-black md:text-sm md:font-normal capitalize">
                            Start Date<span className="text-[#e60000]">*</span>
                        </label>
                        <Input
                            className="text-black shadow md:rounded-xl md:py-5"
                            type="date"
                            placeholder="dd/mm/yy"
                            name="event_start_date"
                            value={Props.eventData?.event_start_date?Props.eventData.event_start_date:''}
                            readOnly 
                        ></Input>
                    </div>
                    <div className="flex flex-col md:gap-2">
                        <label className="text-black md:text-sm md:font-normal capitalize">
                            End Date<span className="text-[#e60000]">*</span>
                        </label>
                        <Input
                            className="text-black shadow md:rounded-xl md:py-5"
                            type="date"
                            placeholder="dd/mm/yy"
                            name="event_end_date"
                            value={Props.eventData?.event_end_date?Props.eventData.event_end_date:''}
                            readOnly
                        ></Input>
                    </div>
                    <div className="flex flex-col md:gap-2">
                        <label className="text-black md:text-sm md:font-normal capitalize">
                            Annual Plan<span className="text-[#e60000]">*</span>
                        </label>
                        <Input
                            className="text-black shadow md:rounded-xl md:py-5"
                            placeholder="Type Here"
                            name="annual_plan"
                            value={Props.eventData?.annual_plan?Props.eventData?.annual_plan:''}
                            readOnly
                        ></Input>
                    </div>
                </div>
          </div>

          <div className="py-8">
              <h1 className="text-black text-2xl font-normal uppercase pb-8">
                MSA Details
              </h1>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="flex flex-col md:gap-2">
                    <label className="text-black md:text-sm md:font-normal capitalize">
                        Service Type<span className="text-[#e60000]">*</span>
                    </label>
                    <Input
                        className="text-black shadow md:rounded-xl md:py-5"
                        placeholder="Type Here"
                        name="service_type"
                        readOnly
                    ></Input>
                </div>
              </div>
          </div>
        </>
        
      }
        { Props.eventData && Props.eventData.type_of_engagement && Props.eventData.type_of_engagement == "One Time" &&
        <>
          <div className="py-8">
              <h1 className="text-black text-2xl font-normal uppercase pb-8">
                Sub Type Details
              </h1>
              <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="flex flex-col md:gap-2">
                        <label className="text-black md:text-sm md:font-normal capitalize">
                            Start Date<span className="text-[#e60000]">*</span>
                        </label>
                        <Input
                            className="text-black shadow md:rounded-xl md:py-5"
                            type="date"
                            placeholder="dd/mm/yy"
                            name="event_start_date"
                            value={Props.eventData?.event_start_date?Props.eventData?.event_start_date:''}
                            readOnly 
                        ></Input>
                    </div>
                    <div className="flex flex-col md:gap-2">
                        <label className="text-black md:text-sm md:font-normal capitalize">
                            End Date<span className="text-[#e60000]">*</span>
                        </label>
                        <Input
                            className="text-black shadow md:rounded-xl md:py-5"
                            type="date"
                            placeholder="dd/mm/yy"
                            name="event_end_date"
                            value={Props.eventData?.event_end_date?Props.eventData?.event_end_date:''}
                            readOnly
                        ></Input>
                    </div>
                    <div className="flex flex-col md:gap-2">
                        <label className="text-black md:text-sm md:font-normal capitalize">
                        Training & Education Request Ref Number<span className="text-[#e60000]">*</span>
                        </label>
                        <Input
                            className="text-black shadow md:rounded-xl md:py-5"
                            placeholder="Type Here"
                            name="training_ref_no"
                            value={Props.eventData?.training_ref_no?Props.eventData?.training_ref_no:''}
                            readOnly
                        ></Input>
                    </div>
                    <div className="flex flex-col md:gap-2">
                        <label className="text-black md:text-sm md:font-normal capitalize">
                        Sponsorship Support Request Ref Number <span className="text-[#e60000]">*</span>
                        </label>
                        <Input
                            className="text-black shadow md:rounded-xl md:py-5"
                            placeholder="Type Here"
                            name="sponsorship_ref_no"
                            value={Props.eventData?.sponsorship_ref_no?Props.eventData?.sponsorship_ref_no:''}
                            readOnly
                        ></Input>
                    </div>
                </div>
          </div>
{/* {
 Props.eventData && Props.eventData.type_of_engagement && Props.eventData.type_of_engagement == "MSA" &&
          <div className="py-8">
              <h1 className="text-black text-2xl font-normal uppercase pb-8">
                MSA Details
              </h1>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="flex flex-col md:gap-2">
                    <label className="text-black md:text-sm md:font-normal capitalize">
                        Service Type<span className="text-[#e60000]">*</span>
                    </label>
                    <Input
                        className="text-black shadow md:rounded-xl md:py-5"
                        placeholder="Type Here"
                        name="service_type"
                        value={Props.eventData?.service_type?Props.eventData?.service_type:''}
                        readOnly
                    ></Input>
                </div>
              </div>
          </div>
} */}
        </>
        
      }

      { Props.eventData && Props.eventData.type_of_engagement && Props.eventData.type_of_engagement == "Scientific Advisory Consultancy Agreement" &&
        <>
          <div className="py-8">
              <h1 className="text-black text-2xl font-normal uppercase pb-8">
                Sub Type Details
              </h1>
              <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="flex flex-col md:gap-2">
                        <label className="text-black md:text-sm md:font-normal capitalize">
                            Start Date<span className="text-[#e60000]">*</span>
                        </label>
                        <Input
                            className="text-black shadow md:rounded-xl md:py-5"
                            type="date"
                            placeholder="dd/mm/yy"
                            name="start_date"
                            readOnly
                        ></Input>
                    </div>
                    <div className="flex flex-col md:gap-2">
                        <label className="text-black md:text-sm md:font-normal capitalize">
                            End Date<span className="text-[#e60000]">*</span>
                        </label>
                        <Input
                            className="text-black shadow md:rounded-xl md:py-5"
                            type="date"
                            placeholder="dd/mm/yy"
                            name="end_date"
                            readOnly
                        ></Input>
                    </div>
                    <div className="flex flex-col md:gap-2">
                        <label className="text-black md:text-sm md:font-normal capitalize">
                            Annual Plan<span className="text-[#e60000]">*</span>
                        </label>
                        <Input
                            className="text-black shadow md:rounded-xl md:py-5"
                            placeholder="Type Here"
                            name="annual_plan"
                            readOnly
                        ></Input>
                    </div>
                </div>
          </div>
        </>
        
      }

      { Props.eventData && Props.eventData.type_of_engagement && (Props.eventData.type_of_engagement == "Royalty Agreement" || Props.eventData.type_of_engagement == "Product development And Royalty Agreement" || Props.eventData.type_of_engagement == "Product Development Agreement" || Props.eventData.type_of_engagement == "Product feedback Agreement") &&
        <>
          <div className="py-8">
              <h1 className="text-black text-2xl font-normal uppercase pb-8">
                Sub Type Details
              </h1>
              <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="flex flex-col md:gap-2">
                        <label className="text-black md:text-sm md:font-normal capitalize">
                            Start Date<span className="text-[#e60000]">*</span>
                        </label>
                        <Input
                            className="text-black shadow md:rounded-xl md:py-5"
                            type="date"
                            placeholder="dd/mm/yy"
                            name="start_date"
                            readOnly
                            value={Props.eventData?.event_start_date}
                        ></Input>
                    </div>
                    <div className="flex flex-col md:gap-2">
                        <label className="text-black md:text-sm md:font-normal capitalize">
                            End Date<span className="text-[#e60000]">*</span>
                        </label>
                        <Input
                            className="text-black shadow md:rounded-xl md:py-5"
                            type="date"
                            placeholder="dd/mm/yy"
                            name="end_date"
                            readOnly
                            value={Props.eventData?.event_end_date}
                        ></Input>
                    </div>
                    <div className="flex flex-col md:gap-2">
                        <label className="text-black md:text-sm md:font-normal capitalize">
                            Product Details<span className="text-[#e60000]">*</span>
                        </label>
                        <Input
                            className="text-black shadow md:rounded-xl md:py-5"
                            placeholder="Type Here"
                            name="product_details"
                            readOnly
                            value={Props.eventData?.product_details}
                        ></Input>
                    </div>
                </div>
          </div>
        </>
        
      }
    </div>
  )
}

export default Basic_Details