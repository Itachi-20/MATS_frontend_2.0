import React from 'react';
import CorrectSign from "@/public/svg/arrow";
import { Button } from "@/components/ui/button";
import { Input } from './ui/input';
import { AlertDialog,AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog";

export default function Dialog({button,msg}) {
  return (
    <AlertDialog >
      <AlertDialogTrigger asChild>
      <Button className='bg-[#4430bf] text-white text-lg font-normal leading-normal px-[31px] py-[10px]'>{button}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className='space-y-[40px]'>
          <AlertDialogTitle className='text-center text-[27px] text font-["Poppins"] font-light leading-normal'>{msg}</AlertDialogTitle>
          <AlertDialogDescription className='flex justify-center'>
         { msg == "Are you sure you want to submit?" || "Next Occurrence date" ?
          <div className='flex flex-col space-y-4 w-full'>
          {msg == "Next Occurrence date" && <Input type='date'></Input>}
         <div className='flex space-x-[30px] items-center justify-center'>
           <Button className='px-[32px] py-[3px] rounded-[8px] bg-[#FF532D] text-white text-[15px] font-normal leading-normal'>No</Button>
           <Button className='px-[32px] py-[3px] rounded-[8px] bg-[#5DBE74] text-white text-[15px] font-normal leading-normal'>Yes</Button>
         </div></div>:          
         <CorrectSign />          
         } 

          </AlertDialogDescription>
          { msg == "Are you sure you want to submit?" || "Next Occurrence date" ? " " :
          <AlertDialogTitle className='text-center text-[18px] text font-["Poppins"] font-normal leading-normal space-x-1/2'><span>Redirecting to </span><span className='font-semibold'>Dashboard </span></AlertDialogTitle>
          }
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}



