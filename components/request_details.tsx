import React from 'react'


type travel_data = {
    event_date:string,
    event_name:string,
    name:string,
    cost_center:string
    cost_code:string,
    cost_desc:string,
    cost_hod:string,
    business_unit:string,
    event_type:string,
    sub_type_of_activity:string,
    event_requestor:string,
    total_logistics_expense:string,
    reporting_head:string

}



type Props = {
    data:travel_data
}

export default function RequestDetails ({...Props}:Props){
  return (
     <div className='border-[0.5px] border-[#848484] rounded-3xl mt-5 mb-10 p-2 text-black grid grid-cols-3'>
            <div className='grid-cols-1 px-6 border-r-[0.5px] border-[#848484]'>
                <ul className='text-[15px] font-["Poppins"] leading-normal font-light text-[#000]'>
                    <li className='border-b-[0.5px] border-[#848484] p-2'>Event Date :<span className='font-medium px-1'>{Props.data.event_date}</span></li>
                    <li className='border-b-[0.5px] border-[#848484] p-2'>Event Name :<span className='font-medium px-1'>{Props.data.event_name}</span></li>
                    <li className='border-b-[0.5px] border-[#848484] p-2'>Event Requester Name :<span className='font-medium px-1'>{Props.data.event_requestor}</span></li>
                    <li className='p-2'>Event Requester Number :<span className='font-medium px-1'>{Props.data.name}</span></li>
                </ul>
            </div>
            <div className='grid-cols-1 px-6 border-r-[0.5px] border-[#848484]'>
               <ul className='text-[15px] font-["Poppins"] leading-normal font-light text-[#000]'>
                    <li className='border-b-[0.5px] border-[#848484] p-2'>Cost Center :<span className='font-medium px-1'>{Props.data.cost_center}</span></li>
                    <li className='border-b-[0.5px] border-[#848484] p-2'>Cost Center Hod :<span className='font-medium px-1'>{Props.data.cost_hod}</span></li>
                    <li className='border-b-[0.5px] border-[#848484] p-2'>Cost Center Description :<span className='font-medium px-1'>{Props.data.cost_desc}</span></li>
                    <li className='p-2'>Reporting Head :<span className='font-medium px-1'>{Props.data.reporting_head}</span></li>
                </ul>
            </div>
            <div className='grid-cols-1 px-6'>
            <ul className='text-[15px] font-["Poppins"] leading-normal font-light text-[#000]'>
                    <li className='border-b-[0.5px] border-[#848484] p-2'>Business Unit :<span className='font-medium px-1'>{Props.data.business_unit}</span></li>
                    <li className='border-b-[0.5px] border-[#848484] p-2'>Sub Type Af activity :<span className='font-medium px-1'>{Props.data.sub_type_of_activity}</span></li>
                    <li className='border-b-[0.5px] border-[#848484] p-2'>Total Estimated Expense :<span className='font-medium px-1'>{Props.data.total_logistics_expense}</span></li>
                </ul>
            </div>

     </div>
 )
}

