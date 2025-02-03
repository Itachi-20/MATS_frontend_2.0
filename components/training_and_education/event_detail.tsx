'use client'
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { usePathname } from 'next/navigation';
import { PreviewDataType } from '@/app/Types/EventData';


type Props = {
  pathname: string
  eventData:PreviewDataType | null
}

const event_Details = ({ ...Props }: Props) => {
  const pathname = usePathname();
  console.log(Props.eventData?.event_type);
  return (
    <div className="md:pb-8">
      <div className="flex gap-6">
        <h1 className="text-black md:text-[30px] md:font-medium uppercase md:pb-4">
          {Props.eventData?.event_type == 'Awareness Program' ? 'Program Details':'Event Details'}
        </h1>
        
      </div>
      <div className="grid md:grid-cols-3 md:gap-6">
        <div className={`flex flex-col md:gap-2 ${Props.eventData?.event_type == "Patient Support" ? 'hidden':''}`}>
          <label className="text-black md:text-sm md:font-normal capitalize">
            {Props.eventData?.event_type == ("Awareness Program") ? "Program Name" : (Props.eventData?.event_type == "Non Monetary Grant") || (Props.eventData?.event_type == "Monetary Grant") ? "Organisation Name" : "Event Name"}<span className="text-[#e60000]">*</span>
          </label>
          {/* <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Type Here"
            readOnly={true}
            value={Props.eventData?.event_type == "Monetary Grant" ? Props.eventData?.organization_name : Props.eventData?.event_name}
          ></Input> */}
          <textarea className='md:rounded-xl bg-[#f6f6f6] text-black shadow-md border h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl pl-2 pt-2' placeholder='Type Here'
            readOnly={true}
            value={Props.eventData?.event_type == "Monetary Grant" ? Props.eventData?.organization_name : Props.eventData?.event_name}
          />
        </div>
        { 
          (Props.eventData?.event_type == 'Training and Education')&&
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
        <div className={`flex flex-col md:gap-2  ${Props.eventData?.event_type == "Awareness Program" ? "" : "hidden"}`}>
          <label className="text-black md:text-sm md:font-normal capitalize">
            Program Start Date<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Type Here"
            readOnly={true}
            value={Props.eventData?.event_start_date}
          ></Input>
        </div>
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
        <div className={`flex flex-col md:gap-2  ${Props.eventData?.event_type == "Awareness Program" ? "" : "hidden"}`}>
          <label className="text-black md:text-sm md:font-normal capitalize">
            HCP Name(if any)<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Type Here"
            readOnly={true}
            value={Props.eventData?.hcp_name}
          ></Input>
        </div>

        { (Props.eventData?.event_type != 'Non Monetary Grant' && Props.eventData?.event_type != 'Patient Support' && Props.eventData?.event_type != 'Monetary Grant') &&
          <div className="flex flex-col md:gap-2">
            <label className="text-black md:text-sm md:font-normal capitalize">
              {Props.eventData?.event_type == "Awareness Program" ? "Program Venue and Location" : "Event Venue"}<span className="text-[#e60000]">*</span>
            </label>
            {/* <Input
              className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
              placeholder="Type Here"
              readOnly={true}
              value={Props.eventData?.event_venue}
            ></Input> */}
            <textarea className='md:rounded-xl bg-[#f6f6f6] text-black shadow-md border h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl pl-2 pt-2' placeholder='Type Here'
            readOnly={true}
            value={Props.eventData?.event_venue}
          />
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

        {/* <div className="flex flex-col md:gap-2">
          <label className="text-black md:text-sm md:font-normal capitalize">
            HCP Name<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Type Here"
            readOnly={true}
            value={Props.eventData?.hcp_name}
          ></Input>
        </div> */}

        {(Props.eventData?.event_type != 'Sponsorship Support' && Props.eventData?.event_type != 'Patient Support') ?
          <div className="flex flex-col md:gap-2">
            <label className="text-black md:text-sm md:font-normal capitalize">
              Comments<span className="text-[#e60000]">*</span>
            </label>
            <textarea
              className='md:rounded-xl bg-[#f6f6f6] text-black shadow-md border h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl pl-2 pt-2'
              placeholder="Type Here"
              readOnly={true}
              value={Props.eventData?.comments}
            ></textarea>
          </div> :
          <></>
        }
      </div>
    </div>
  )
}

export default event_Details