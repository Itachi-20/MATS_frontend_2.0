
import { useState ,useEffect} from 'react';
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
  useEffect(() => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setFullYear(today.getFullYear() - 1);
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = today.toISOString().split('T')[0];
    if (!Props.startDate && !Props.endDate) {
      Props.setStartDate(formattedStartDate);
      Props.setEndDate(formattedEndDate);
    }
  }, [Props]);
  return (
    // <div className="relative">
    //   <Popover>
    //     <PopoverTrigger asChild>
    //       <Button className='relative z-10 flex justify-center w-fit items-center rounded-[50px] cursor-pointer py-2 lg:px-3  lg:text-[14px] border border-gray-300 shadow-sm '>
    //         <Input
    //           type="text"
    //           readOnly
    //           onClick={Props.togglePicker}
    //           value={Props.startDate && Props.endDate ? Props.startDate + '  -  ' + Props.endDate : ''}
    //           placeholder='Start date  -  End date'
    //           className="w-52 rounded-[50px] pr-2 text-[14px] bg-transparent  font-normal focus-visible:ring-transparent border-none cursor-pointer placeholder:text-black "
    //         />
    //       <div className=" absolute right-3 pointer-events-none sm:w-[18px] sm:h-[18px] w-[15px] h-[15px]">
    //         <Image src="/svg/calendarIcon.svg" alt="calendar-Icon" width={20} height={20} />
    //       </div>
    //       </Button>
    //     </PopoverTrigger>
    //     <PopoverContent className='z-50 h-fit w-[200px] mt-2 mr-4 p-4 border border-gray-300 rounded-md shadow-md bg-white text-black'>
    //       <Label className="block text-sm font-medium">
    //         Start Date:
    //         <Input
    //           type="date"
    //           value={Props.startDate}
    //           onChange={(e) => Props.setStartDate(e.target.value)}
    //           className="block w-full mt-1 px-2 py-1 border border-gray-300 rounded-md"
    //         />
    //       </Label>
    //       <label className="block text-sm font-medium mt-2">
    //         End Date:
    //         <Input
    //           type="date"
    //           value={Props.endDate}
    //           onChange={(e) => Props.setEndDate(e.target.value)}
    //           className="block w-full mt-1 px-2 py-1 border border-gray-300 rounded-md"
    //         />
    //       </label>
    //       <PopoverClose className='w-full'>
    //         <button
    //           type='button'
    //           onClick={Props.fetchTableData}
    //           className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md"
    //         >
    //           Done
    //         </button>
    //       </PopoverClose>
    //     </PopoverContent>
    //   </Popover>
    // </div>
<div className="relative">
      <Popover>
        <PopoverTrigger asChild>
          <Button className='relative z-10 flex justify-center w-fit items-center rounded-[50px] cursor-pointer py-2 lg:px-3 lg:text-[14px] border border-gray-300 shadow-sm '>
            <Input
              type="text"
              readOnly
              onClick={Props.togglePicker}
              value={Props.startDate && Props.endDate ? Props.startDate + '  -  ' + Props.endDate : ''}
              placeholder='Start date  -  End date'
              className="w-52 rounded-[50px] pr-2 text-[14px] bg-transparent font-normal focus-visible:ring-transparent border-none cursor-pointer placeholder:text-black "
            />
            <div className="absolute right-2 pointer-events-none sm:w-[18px] sm:h-[18px] w-[15px] h-[15px]">
              <Image src="/svg/calendarIcon.svg" alt="calendar-Icon" width={20} height={20} />
            </div>
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





