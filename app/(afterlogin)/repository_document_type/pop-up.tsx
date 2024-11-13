import React from 'react'

import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type props = {
  handleAdd:()=> void;
}
const popup = ({handleAdd }: props) => {
  return (

    <>
      <div className="absolute z-50 flex inset-0 items-center justify-center bg-black bg-opacity-50">
        <div className="border-2 rounded-xl p-6 max-w-lg w-full bg-white relative text-black">
          <h1 className="text-2xl font-poppins py-4">Add Document</h1>
          <div className='space-y-2'>
            <Label className='text-black'>Type <span className='text-red-500'>*</span></Label>
            <Input className='text-black' name='type' placeholder="Type here..." />
          </div>
          <div className="flex justify-end pt-5 gap-4 w-full">
            <Button className="bg-white text-black border text-md font-normal px-12 rounded-md hover:bg-white" onClick={handleAdd}>
              Back
            </Button>
            <Button className="bg-[#4430bf] text-white text-md font-normal border px-8 hover:bg-[#4430bf]">
              Save
            </Button>
          </div>
        </div>
      </div>
    </>

  )
}

export default popup
