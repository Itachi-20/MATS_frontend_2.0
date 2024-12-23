
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { PopoverClose } from '@radix-ui/react-popover';
type props = {
  setStartDate: (value: string) => void;
  setEndDate: (value: string) => void;
  startDate: string;
  endDate: string;
  togglePicker: () => void;
  isPickerOpen: boolean;
  fetchTableData: () => void;
}

export default function DateRangePicker({ ...Props }: props) {
  return (
    <div className="relative">
      {/* <Input
        type="text"
        readOnly
        onClick={Props.togglePicker}
        placeholder="Date"
        className="lg:w-24 sm:w-20 w-[70px] rounded-[50px] lg:px-3 lg:py-2 sm:px-3 sm:py-1 px-3 py-1 lg:text-[14px] sm:text-[10px] text-[9px] border border-gray-300 shadow-sm font-normal focus:outline-none cursor-pointer placeholder:text-black "
      />
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none sm:w-[18px] sm:h-[18px] w-[15px] h-[15px]">
         <Image src="/svg/calendarIcon.svg" alt="calendar-Icon"  width={20} height={20} />
      </span> */}


      {/* Date Pickers */}
      {/* {Props.isPickerOpen && (
        <div className="absolute right-0 z-50 mt-2 p-4 border border-gray-300 rounded-md shadow-md bg-white">
          
          <label className="block text-sm font-medium">
            Start Date:
            <Input
              type="date"
              value={Props.startDate}
              onChange={(e) => Props.setStartDate(e.target.value)}
              className="block w-full mt-1 px-2 py-1 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block text-sm font-medium mt-2">
            End Date:
            <Input
              type="date"
              value={Props.endDate}
              onChange={(e) => Props.setEndDate(e.target.value)}
              className="block w-full mt-1 px-2 py-1 border border-gray-300 rounded-md"
            />
          </label>
          <button
            onClick={Props.fetchTableData}
            className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Done
          </button>
        </div>
      )} */}



      <Popover>
        <PopoverTrigger asChild>
          <Button className='lg:w-24 sm:w-20 w-[70px] rounded-[50px] lg:px-3 lg:py-2 sm:px-3 sm:py-1 px-3 py-1 lg:text-[14px] sm:text-[10px] text-[9px] bg-emerald-300'><Input
            type="text"
            readOnly
            onClick={Props.togglePicker}
            placeholder="Date"
            className="lg:w-24 sm:w-20   rounded-[50px] lg:px-3 lg:py-2 sm:px-3 sm:py-1 px-3 py-1 lg:text-[14px] sm:text-[10px] text-[9px] border border-gray-300 shadow-sm font-normal focus:outline-none cursor-pointer placeholder:text-black "
          />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none sm:w-[18px] sm:h-[18px] w-[15px] h-[15px]">
              <Image src="/svg/calendarIcon.svg" alt="calendar-Icon" width={20} height={20} />
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className='z-50 h-fit w-[200px] mt-2 mr-4 p-4 border border-gray-300 rounded-md shadow-md bg-white text-black'>
          <Label className="block text-sm font-medium">
            Start Date:
            <Input
              type="date"
              value={Props.startDate}
              onChange={(e) => Props.setStartDate(e.target.value)}
              className="block w-full mt-1 px-2 py-1 border border-gray-300 rounded-md"
            />
          </Label>
          <label className="block text-sm font-medium mt-2">
            End Date:
            <Input
              type="date"
              value={Props.endDate}
              onChange={(e) => Props.setEndDate(e.target.value)}
              className="block w-full mt-1 px-2 py-1 border border-gray-300 rounded-md"
            />
          </label>
          <PopoverClose className='w-full'>
            <button
              type='button'
              onClick={Props.fetchTableData}
              className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Done
            </button>
          </PopoverClose>
        </PopoverContent>
      </Popover>
    </div>

  );
}





