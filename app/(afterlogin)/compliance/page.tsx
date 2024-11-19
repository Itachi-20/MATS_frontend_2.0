import React from 'react'
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import PreActivityTable from './pre_activity_request_table';
import PostActivityTable from './post_activity_request_table';
import PostExpenseRequestTable from './post_expense_request_table';

export default function ComplianceDashboard  () {
  return (
    <div className="pl-7 pr-20 pb-7 pt-16 w-full relative z-20 flex flex-col justify-stretch space-y-12">
          
    <div className="space-y-[35px]">

      <div className="grid grid-cols-4 gap-5 text-black">

        <div className="flex flex-col col-span-1 bg-[#fee4cb] py-5 pl-[17px] pr-20 rounded-2xl text-['Poppins']">
          <div className="">
            <svg
              width="30"
              height="30"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Icon">
                <circle
                  id="Ellipse 3"
                  cx="20"
                  cy="20"
                  r="20"
                  fill="black"
                />
                <g id="Sales Icon">
                  <g id="Group 916">
                    <path
                      id="Subtract"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13 11C11.8954 11 11 11.8954 11 13V27C11 28.1046 11.8954 29 13 29H27C28.1046 29 29 28.1046 29 27V13C29 11.8954 28.1046 11 27 11H13ZM16 21C16 20.4477 15.5523 20 15 20C14.4477 20 14 20.4477 14 21V25C14 25.5523 14.4477 26 15 26C15.5523 26 16 25.5523 16 25V21ZM20 17C20.5523 17 21 17.4477 21 18V25C21 25.5523 20.5523 26 20 26C19.4477 26 19 25.5523 19 25V18C19 17.4477 19.4477 17 20 17ZM26 15C26 14.4477 25.5523 14 25 14C24.4477 14 24 14.4477 24 15V25C24 25.5523 24.4477 26 25 26C25.5523 26 26 25.5523 26 25V15Z"
                      fill="white"
                    />
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <h1 className="text-[#151D48] text-[24px] font-medium leading-[32px] pt-8">Total Events</h1>
          <h1 className="text-[#425166] text-[20px] font-semibold pt-2 leading-[24px]">
           54967
          </h1>
        </div>

        <div className="flex flex-col col-span-1 bg-[#DBF6FD] py-5 pl-[17px] pr-20 rounded-2xl text-['Poppins']">
          <div className="">
            <svg
              width="30"
              height="30"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Icon">
                <circle
                  id="Ellipse 3"
                  cx="20"
                  cy="20"
                  r="20"
                  fill="black"
                />
                <path
                  id="Arrow 2"
                  d="M21.0607 21.0607C21.6464 20.4749 21.6464 19.5251 21.0607 18.9393L11.5147 9.3934C10.9289 8.80761 9.97919 8.80761 9.3934 9.3934C8.80761 9.97919 8.80761 10.9289 9.3934 11.5147L17.8787 20L9.3934 28.4853C8.80761 29.0711 8.80761 30.0208 9.3934 30.6066C9.97919 31.1924 10.9289 31.1924 11.5147 30.6066L21.0607 21.0607ZM0 21.5H20V18.5H0V21.5Z"
                  fill="white"
                />
              </g>
            </svg>
          </div> 
          <h1 className="text-[#151D48] text-[24px] font-medium leading-[32px] pt-8">Pre-activity <p className='text-[18px] font-medium leading-[26px] text-[#151D48]'>(Pending at compliance)</p></h1>
          <h1 className="text-[#425166] text-[20px] font-semibold pt-2 leading-[24px]">
            3274
          </h1>
        </div>

        <div className="flex flex-col col-span-1 bg-[#B5D9FF] py-5 pl-[17px] pr-20 rounded-2xl text-['Poppins']">
          <div className="">
            <svg
              width="30"
              height="30"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Icon">
                <circle
                  id="Ellipse 3"
                  cx="20"
                  cy="20"
                  r="20"
                  fill="black"
                />
                <path
                  id="Arrow 2"
                  d="M21.0607 21.0607C21.6464 20.4749 21.6464 19.5251 21.0607 18.9393L11.5147 9.3934C10.9289 8.80761 9.97919 8.80761 9.3934 9.3934C8.80761 9.97919 8.80761 10.9289 9.3934 11.5147L17.8787 20L9.3934 28.4853C8.80761 29.0711 8.80761 30.0208 9.3934 30.6066C9.97919 31.1924 10.9289 31.1924 11.5147 30.6066L21.0607 21.0607ZM0 21.5H20V18.5H0V21.5Z"
                  fill="white"
                />
              </g>
            </svg>
          </div> 
          <h1 className="text-[#151D48] text-[24px] font-medium leading-[32px] pt-8">Post-activity<p className='text-[18px] font-medium leading-[26px] text-[#151D48]'>(Pending at compliance)</p></h1>
          <h1 className="text-[#425166] text-[20px] font-semibold pt-2 leading-[24px]">
           54967
          </h1>
        </div>

        <div className="flex flex-col col-span-1 bg-[#FFD3E2] py-5 pl-[17px] pr-20 rounded-2xl text-['Poppins']">
          <div className="">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="Icon">
<circle id="Ellipse 3" cx="20" cy="20" r="20" fill="black"/>
<path id="Subtract" fill-rule="evenodd" clip-rule="evenodd" d="M20 32C26.6274 32 32 26.6274 32 20C32 13.3726 26.6274 8 20 8C13.3726 8 8 13.3726 8 20C8 26.6274 13.3726 32 20 32ZM21.9609 23.3729C22.3514 23.7634 22.9846 23.7634 23.3751 23.3729C23.7656 22.9824 23.7656 22.3492 23.3751 21.9587L21.4142 19.9978L23.3725 18.0396C23.763 17.649 23.763 17.0159 23.3725 16.6254C22.9819 16.2348 22.3488 16.2348 21.9583 16.6254L20 18.5836L18.0417 16.6254C17.6512 16.2348 17.0181 16.2348 16.6275 16.6254C16.237 17.0159 16.237 17.649 16.6275 18.0396L18.5858 19.9978L16.6249 21.9587C16.2344 22.3492 16.2344 22.9824 16.6249 23.3729C17.0154 23.7634 17.6486 23.7634 18.0391 23.3729L20 21.412L21.9609 23.3729ZM23.4442 11.6851C21.5205 10.8883 19.38 10.7832 17.3874 11.3876C15.3949 11.992 13.6736 13.2686 12.5168 14.9999C11.36 16.7312 10.8392 18.81 11.0433 20.8822C11.2474 22.9544 12.1637 24.8917 13.636 26.364C14.0266 26.7545 14.6597 26.7545 15.0503 26.364C15.4408 25.9735 15.4408 25.3403 15.0503 24.9498C13.9051 23.8046 13.1924 22.2979 13.0337 20.6862C12.875 19.0745 13.28 17.4576 14.1797 16.1111C15.0795 14.7645 16.4183 13.7716 17.968 13.3015C19.5178 12.8314 21.1826 12.9131 22.6788 13.5329C24.175 14.1526 25.41 15.272 26.1735 16.7003C26.9369 18.1285 27.1814 19.7773 26.8655 21.3657C26.5495 22.9541 25.6926 24.3837 24.4408 25.4111C23.1889 26.4385 21.6195 27 20 27C19.4477 27 19 27.4478 19 28C19 28.5523 19.4477 29 20 29C22.0822 29 24.1 28.2781 25.7095 26.9571C27.3191 25.6362 28.4209 23.7981 28.8271 21.7559C29.2333 19.7137 28.9188 17.5938 27.9373 15.7575C26.9558 13.9211 25.3679 12.482 23.4442 11.6851Z" fill="white"/>
</g>
          </svg>
          </div> 
          <h1 className="text-[#151D48] text-[24px] font-medium leading-[32px] pt-8">Total Closed</h1>
          <h1 className="text-[#425166] text-[20px] font-semibold pt-2 leading-[24px]">
          210
          </h1>
        </div>

      
      </div>

      <div className='flex space-x-[23px]'> 

          <Select>
            <SelectTrigger className="dropdown w-[300px] text-[15px] text-[#636363] font-normal border-[1px] border-slate-500">
              <SelectValue placeholder="-Select Compliance Member-" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="m1">Member-1</SelectItem>
              <SelectItem value="m2">Member-2</SelectItem>
              <SelectItem value="m3">Member-3</SelectItem>
              <SelectItem value="m4">Member-4</SelectItem>
            </SelectContent>
          </Select>  

          <Select>
            <SelectTrigger className="dropdown w-[200px] text-[15px] text-[#636363] font-normal  border-[1px] border-slate-500">
              <SelectValue placeholder="-Select Business-"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="b1">Business-1</SelectItem>
              <SelectItem value="b2">Business-2</SelectItem>
              <SelectItem value="b3">Business-3</SelectItem>
              <SelectItem value="b4">Business-4</SelectItem>
            </SelectContent>
          </Select>

          <Input type='date' name='date' id='date' className='border-[1px] border-slate-500 w-[150px] text-[#636363]' placeholder='text-[#636363]'/>

          <Select>
            <SelectTrigger  className="dropdown w-[200px] text-[15px] text-[#636363] font-normal  border-[1px] border-slate-500">
              <SelectValue placeholder="-Select Requestor-" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="r1">Requester-1</SelectItem>
              <SelectItem value="r2">Requester-2</SelectItem>
              <SelectItem value="r3">Requester-3</SelectItem>
              <SelectItem value="r4">Requester-4</SelectItem>
            </SelectContent>
          </Select>

      </div>               

    </div>
 {/* ----------- starts tables ---------- */}
    <div className='space-y-[32px]'>
        <div className=''>
           <PreActivityTable />
        </div>
        <div className=''>
           <PostActivityTable />
        </div>
        <div className=''>
          <PostExpenseRequestTable  />
        </div>
    </div>
    
</div>
  )
}
