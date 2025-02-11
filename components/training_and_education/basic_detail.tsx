import React from 'react'
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PreviewDataType } from '@/app/Types/EventData';

type Props = {
  pathname: string
  eventData: PreviewDataType | undefined | null
}

const Basic_Details = ({ ...Props }: Props) => {
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
        {
          Props && Props.eventData?.business_unit == "Orthopedics" &&
          <div className="flex flex-col md:gap-2">
          <label className="text-black md:text-sm md:font-normal capitalize">
            Event Division<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Type Here"
            readOnly={true}
            value={Props.eventData?.event_division}
          ></Input>
        </div>
        }
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
        <div className="flex flex-col gap-2">
          <label className="lable">
            Budget Sub Type<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Type Here"
            readOnly={true}
            value={Props.eventData?.division_sub_category ? Props.eventData?.division_sub_category : ""}
          ></Input>
        </div>
        <div className="flex flex-col md:gap-2">
          <label className="text-black md:text-sm md:font-normal capitalize">
            city<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Type Here"
            readOnly={true}
            value={Props.eventData?.city as string}
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
            value={Props.eventData?.reporting_head as string}
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
        {
          Props.eventData && Props.eventData.event_type == "Training and Education" &&
          <div className="flex flex-col md:gap-2">
            <label className="text-black md:text-sm md:font-normal capitalize">
              HCP Services Request Ref Number<span className="text-[#e60000]">*</span>
            </label>
            <Input
              className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
              placeholder="Type Here"
              readOnly={true}
              value={Props && Props.eventData?.hcp_ref_no?Props.eventData.hcp_ref_no:"NA"}
            ></Input>
          </div>
        }


        {Props.eventData?.event_type == 'Training and Education' &&
          <>
            <div className="flex flex-col gap-2">
              <label className="lable">
                Selection Criteria For Faculty<span className="text-[#e60000]">*</span>
              </label>
              <textarea className='md:rounded-xl bg-[#f6f6f6] text-black shadow-md border h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl pl-2 pt-2' placeholder='Type Here' readOnly value={Props.eventData?.faculty} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="lable ">
                Selection Criteria For Participant<span className="text-[#e60000]">*</span>
              </label>
              <textarea className='md:rounded-xl bg-[#f6f6f6] text-black shadow-md border h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl pl-2 pt-2' placeholder='Type Here' readOnly value={Props.eventData?.participants} />
            </div>
          </>
        }

        {Props.eventData?.event_type == 'Sponsorship Support' && 
        <div className="flex flex-col gap-2">
          <label className="lable">
            Selection Criteria For Faculty<span className="text-[#e60000]">*</span>
          </label>
          <textarea className='md:rounded-xl bg-[#f6f6f6] text-black shadow-md border h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl pl-2 pt-2' placeholder='Type Here' readOnly value={Props.eventData?.faculty} />
        </div>}
      </div>
    </div>
  )
}

export default Basic_Details