import React from 'react'

export default function RequestDetails (){
  return (
     <div className='border-[0.5px] border-[#848484] rounded-3xl mt-5 mb-10 p-2 text-black grid grid-cols-3'>
            <div className='grid-cols-1 px-6 border-r-[0.5px] border-[#848484]'>
                <ul className='text-[15px] font-["Poppins"] leading-normal font-light text-[#000]'>
                    <li className='border-b-[0.5px] border-[#848484] p-2'>Event Date :<span className='font-medium px-1'>11/1/24</span></li>
                    <li className='border-b-[0.5px] border-[#848484] p-2'>Event Name :<span className='font-medium px-1'>Lorem ipsum</span></li>
                    <li className='border-b-[0.5px] border-[#848484] p-2'>Event Requester Name :<span className='font-medium px-1'>Lorem ipsum</span></li>
                    <li className='p-2'>Event Requester Number :<span className='font-medium px-1'>8976</span></li>
                </ul>
            </div>
            <div className='grid-cols-1 px-6 border-r-[0.5px] border-[#848484]'>
               <ul className='text-[15px] font-["Poppins"] leading-normal font-light text-[#000]'>
                    <li className='border-b-[0.5px] border-[#848484] p-2'>Cost Center :<span className='font-medium px-1'>301102021</span></li>
                    <li className='border-b-[0.5px] border-[#848484] p-2'>Cost Center Hod :<span className='font-medium px-1'>Gautam Tripathy</span></li>
                    <li className='border-b-[0.5px] border-[#848484] p-2'>Cost Center Description :<span className='font-medium px-1'>VAS-GT-Mumbai-MKTG</span></li>
                    <li className='p-2'>Reporting Head :<span className='font-medium px-1'>Finance Team </span></li>
                </ul>
            </div>
            <div className='grid-cols-1 px-6'>
            <ul className='text-[15px] font-["Poppins"] leading-normal font-light text-[#000]'>
                    <li className='border-b-[0.5px] border-[#848484] p-2'>Business Unit :<span className='font-medium px-1'>Trauma BU</span></li>
                    <li className='border-b-[0.5px] border-[#848484] p-2'>Sub Type Af activity :<span className='font-medium px-1'>Mix Event</span></li>
                    <li className='border-b-[0.5px] border-[#848484] p-2'>Total Estimated Expense :<span className='font-medium px-1'>11128</span></li>
                </ul>
            </div>

     </div>
 )
}

