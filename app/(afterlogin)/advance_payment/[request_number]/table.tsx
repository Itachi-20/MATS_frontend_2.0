'use client'
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useRouter } from 'next/navigation';
type EventTable = {
  request_number: string;
  event_name: string;
  event_type: string;
  event_date: string;
  total_expense: number;
  event_requestor: string;
};

const events: EventTable[] = [
  {
    request_number: 'REQ001',
    event_name: 'Annual Conference',
    event_type: 'Conference',
    event_date: '2024-10-15',
    total_expense: 15000,
    event_requestor: 'John Doe',
  },
  {
    request_number: 'REQ002',
    event_name: 'Product Launch',
    event_type: 'Launch',
    event_date: '2024-11-20',
    total_expense: 25000,
    event_requestor: 'Jane Smith',
  },
  {
    request_number: 'REQ003',
    event_name: 'Team Building Retreat',
    event_type: 'Workshop',
    event_date: '2024-09-30',
    total_expense: 8000,
    event_requestor: 'Mike Johnson',
  },
  {
    request_number: 'REQ004',
    event_name: 'End of Year Gala',
    event_type: 'Gala',
    event_date: '2024-12-31',
    total_expense: 40000,
    event_requestor: 'Emily Davis',
  },
  {
    request_number: 'REQ005',
    event_name: 'Marketing Workshop',
    event_type: 'Workshop',
    event_date: '2024-10-10',
    total_expense: 5500,
    event_requestor: 'Alex Brown',
  },
  {
    request_number: 'REQ006',
    event_name: 'Client Appreciation Event',
    event_type: 'Social',
    event_date: '2024-09-15',
    total_expense: 12000,
    event_requestor: 'Sara Miller',
  },
];

const TableComponent = () => {
  const router = useRouter()
  return (
    <div className="border bg-white h-full p-4 rounded-[18px]">
      <Table className="">
        <TableHeader className="bg-[#E0E9FF]">
          <TableRow className="text-nowrap rounded-r-2xl border-none mb-2">
            <TableHead className="text-center  rounded-l-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat']">
              Event Name
            </TableHead>
            <TableHead className="text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']">
              Event Date
            </TableHead>
            <TableHead className="text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']">
              Vendor Name
            </TableHead>
            <TableHead className="text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']">
              Vendor Type
            </TableHead>
            <TableHead className="text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']">
              Advance Request
            </TableHead>
            <TableHead className="text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']">
              Total Expense
            </TableHead>
            <TableHead
              className="text-center rounded-r-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat'] sticky right-0 z-50 bg-[#E0E9FF]"
            >
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((data, index) => (
            <React.Fragment key={index}>
              {/* Subheading Row every two data rows */}
              {index % 2 === 0 && index < 6 && (
                

                <TableRow className="bg-[#F8F8F8] border-none p-8">
                  <TableCell colSpan={3} className="text-left p-3 rounded-l-2xl text-[#333] ">
                    Request Number:<span className='font-semibold'>{data.request_number}</span> 
                  </TableCell>
                  <TableCell colSpan={3} className="text-right border-r  p-3 rounded-r-2xl text-[#333]">
                    Event Type:<span className='font-semibold'>{data.event_type}</span>
                  </TableCell>
                </TableRow>
                
              )}
              {/* Data Row */}
              
              <TableRow className="text-center text-nowrap border-b">
                <TableCell className=''>{data.event_name}</TableCell>
                <TableCell>{data.event_date}</TableCell>
                <TableCell>{data.event_requestor}</TableCell>
                <TableCell>{data.event_type}</TableCell>
                <TableCell>{data.total_expense}</TableCell>
                <TableCell className='border-r'>{data.total_expense}</TableCell>
                <TableCell className="sticky right-0 bg-[white] z-50 ">
                            <div className="">
                            {
                              // data.level_1 == "Approved"?<button className="border rounded-full px-4 py-1 border-[#0e4154] text-[#0e4154]">view</button>
                              // :
                              <button className="border rounded-full px-4 py-1 border-black text-black" onClick={() => router.push(`/advance_payment/${data.event_type}/${data.request_number}`)}>Take Action</button>
                            }
                            </div>
                          </TableCell>
              </TableRow>
              
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableComponent;
