import React from 'react'
import { Button } from '@/components/ui/button';

type Props = {
    handleDialog:()=>void,
    handleExecute:()=>void
    title:string
}
const executeDialog = ({...Props}:Props) => {
  return (
    <div className=" absolute z-50 flex pt-10 items-end justify-center bg-black bg-opacity-50 w-full h-full inset-0 pb-40">
          <div className="absolute z-50 flex inset-0 items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl border  md:max-w-[600px] md:max-h-[200px] h-full w-full gap-8 text-black md:text-md font-light ">
        <h1 className="text-2xl flex justify-start font-poppins p-7">{Props.title}</h1>
        <div className="flex flex-col items-center h-full w-full px-7">
        <div className="flex justify-center pt-5 gap-4 w-full">
        <Button className='px-[32px] py-[3px] rounded-[8px] bg-[#FF532D] text-white text-[15px] font-normal leading-normal' onClick={()=>Props.handleDialog()}>No</Button>
        <Button className='px-[32px] py-[3px] rounded-[8px] bg-[#5DBE74] text-white text-[15px] font-normal leading-normal' onClick={()=>Props.handleExecute()}>Yes
          </Button>
        </div>
        </div>
      </div>
    </div >
        </div>
  )
}

export default executeDialog