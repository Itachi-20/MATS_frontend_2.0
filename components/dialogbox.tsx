import React from 'react';
import CorrectSign from "@/public/svg/arrow";
import { Button } from "@/components/ui/button";
import { AlertDialog,AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog";

export default function Dialog({button}) {
  return (
    <AlertDialog >
      <AlertDialogTrigger asChild>
      <Button className='bg-[#4430bf] text-white text-lg font-normal leading-normal px-[31px] py-[10px]'>{button}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className='space-y-[40px]'>
          <AlertDialogTitle className='text-center text-[30px] text font-["Poppins"] font-light leading-normal'>Submitted Successfully</AlertDialogTitle>
          <AlertDialogDescription className='flex justify-center'>
          <CorrectSign />
          </AlertDialogDescription>
          <AlertDialogTitle className='text-center text-[18px] text font-["Poppins"] font-normal leading-normal space-x-1/2'><span>Redirecting to </span><span className='font-semibold'>Dashboard </span></AlertDialogTitle>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}



