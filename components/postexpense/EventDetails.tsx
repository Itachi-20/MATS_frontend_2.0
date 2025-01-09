"use client";
import React from 'react'
import { Input } from '@/components/ui/input';
import { usePathname } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';

const event_Details = () => {
  return (
    <div className="md:pb-8">
      <div className="flex gap-6">
        <h1 className="text-black md:text-[30px] md:font-medium uppercase md:pb-4">
          {/* {pathname.substring(1) == 'monetary_grant' || pathname.substring(1) == 'non_monetary_grant' ? 'organisation Details' : 'event Details'} */}
        </h1>
      </div>
      <div className="grid md:grid-cols-3 md:gap-6">
        <div className="flex flex-col md:gap-2">
          <label htmlFor='event_name' className="text-black md:text-sm md:font-normal capitalize">
            Event Name<span className="text-[#e60000]">*</span>
          </label>
          <Input
            type='text'
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Lorem ipsum dolor sit amet"
            id='event_name'
            name='event_name'
            readOnly={true}
          ></Input>
        </div>
        <div className="flex flex-col md:gap-2">
          <label htmlFor='event_name' className="text-black md:text-sm md:font-normal capitalize">
             Event Date<span className="text-[#e60000]">*</span>
          </label>
          <Input
            type='date'
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Lorem ipsum dolor sit amet"
            id='event_name'
            name='event_name'
            readOnly={true}
          ></Input>
        </div>
        <div className="flex flex-col md:gap-2">
          <label htmlFor='event_name' className="text-black md:text-sm md:font-normal capitalize">
             Event Venue<span className="text-[#e60000]">*</span>
          </label>
          <Input
            type='text'
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Lorem ipsum dolor sit amet"
            id='event_name'
            name='event_name'
            readOnly={true}
          ></Input>
        </div>
        <div className="flex flex-col md:gap-2">
          <label htmlFor='eng_gov_hcp' className="text-black md:text-sm md:font-normal capitalize">
          engagement of any government hCP’s?*<span className="text-[#e60000]">*</span>
          </label>
          <Input
            type='text'
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="yes"
            id='eng_gov_hcp'
            name='eng_gov_hcp'
            readOnly={true}
          ></Input>
        </div>
        <div className="flex flex-col md:gap-2">
          <label htmlFor='gov_hcp' className="text-black md:text-sm md:font-normal capitalize">
          Total Number of government HCP’s<span className="text-[#e60000]">*</span>
          </label>
          <Input
            type='text'
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="12"
            id='gov_hcp'
            name='gov_hcp'
            readOnly={true}
          ></Input>
        </div>
        <div className="flex flex-col md:gap-2">
          <label htmlFor='bu_rational' className="text-black md:text-sm md:font-normal capitalize">
            BU rational<span className="text-[#e60000]">*</span>
          </label>
          <Input
            type='text'
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Lorem ipsum dolor sit amet"
            id='bu_rational'
            name='bu_rational'
            readOnly={true}
          ></Input>
        </div>
        
        {/* {pathname.substring(1) != 'sponsorship_program' ? */}
          <div className="flex flex-col md:gap-2">
            <label htmlFor="comment" className="text-black md:text-sm md:font-normal capitalize">
              Comments<span className="text-[#e60000]">*</span>
            </label>
            <Textarea
              className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
              placeholder="Lorem ipsum dolor sit amet"
              id='comment'
              name='comment'
              readOnly={true}
            ></Textarea>
          </div> 
          {/* :
          <></> */}
        {/* } */}
      </div>
    </div>
  )
}

export default event_Details