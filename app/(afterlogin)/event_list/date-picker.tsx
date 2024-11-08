
import { useState } from 'react';
import {Input} from '@/components/ui/input';
import Image from 'next/image';

export default function DateRangePicker() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  // Date format function
  const formatDate = (date:any) => {
    if (!date) return '';
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-GB', options);
  };

  // Toggle Date Picker
  const togglePicker = () => {
    setIsPickerOpen(!isPickerOpen);
  };

  return (
    <div className="relative">
      <Input
        type="text"
        readOnly
        onClick={togglePicker}
        // value={
        //   startDate && endDate
        //     ? `${formatDate(startDate)} - ${formatDate(endDate)}`
        //     : 'Select Date Range'
        // }
        placeholder="Date"
        className="lg:w-24 sm:w-20 w-[70px] rounded-[50px] lg:px-3 lg:py-2 sm:px-3 sm:py-1 px-3 py-1 lg:text-[14px] sm:text-[10px] text-[9px] border border-gray-300 shadow-sm font-normal focus:outline-none cursor-pointer placeholder:text-black "
      />
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none sm:w-[18px] sm:h-[18px] w-[15px] h-[15px]">
         <Image src="/svg/calendarIcon.svg" alt="calendar-Icon"  width={20} height={20} />
      </span>
   

      {/* Date Pickers */}
      {isPickerOpen && (
        <div className="absolute z-50 mt-2 p-4 border border-gray-300 rounded-md shadow-md bg-white">
          <label className="block text-sm font-medium">
            Start Date:
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="block w-full mt-1 px-2 py-1 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block text-sm font-medium mt-2">
            End Date:
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="block w-full mt-1 px-2 py-1 border border-gray-300 rounded-md"
            />
          </label>
          <button
            onClick={togglePicker}
            className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}





