import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
type EventTable = {
  event_request_number: string;
  vendor_type: string;
  vendor_code: string;
  vendor_name: string;
  billable_amount: number;
  status: string;
  gst: string;
  invoice_amount: number;

};
const events: EventTable[] = [
  {
    event_request_number: '8976',
    vendor_type: 'Food Vendor',
    vendor_code: 'Missing',
    vendor_name: 'Novotel',
    billable_amount: 12555,
    status: 'Approval awaited from pankaj Joshi',
    gst: '000009999',
    invoice_amount: 1123445,
  },
];

const table = () => {
  return (
    <div className="border bg-white h-full p-4 rounded-[18px]">
      <Table className={""}>
        <TableHeader className={"bg-[#E0E9FF]"}>
          <TableRow className={"text-nowrap rounded-r-2xl border-none"}>
            <TableHead
              className={
                "text-center rounded-l-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Event Request Number
            </TableHead>
            <TableHead
              className={
                "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Vendor Type
            </TableHead>
            <TableHead
              className={
                "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Vendor Code
            </TableHead>

            <TableHead
              className={
                "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Vendor Name
            </TableHead>

            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Billable Amount
            </TableHead>
            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Status
            </TableHead>
            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              GST
            </TableHead>

            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Invoice Amount
            </TableHead>
            <TableHead
              className={
                "text-center rounded-r-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat'] sticky right-0 z-20 bg-[#E0E9FF]"
              }
            >Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events &&
            events.map((data, index) => {
              return (
                <TableRow key={index} className="text-center text-nowrap text-black">
                  <TableCell>{data.event_request_number}</TableCell>
                  <TableCell>{data.vendor_type}</TableCell>
                  <TableCell>{data.vendor_code}</TableCell>
                  <TableCell>{data.vendor_name}</TableCell>
                  <TableCell>{data.billable_amount}</TableCell>
                  <TableCell>{data.status}</TableCell>
                  <TableCell>{data.gst}</TableCell>

                  <TableCell>
                    {data.invoice_amount}
                  </TableCell>

                  <TableCell className='sticky right-0 z-20 gap-3 w-[120px] bg-white mt-2 flex border-l'>
                            <Image src={'/svg/view.svg'} alt='viewsvg' width={24}  height={18}/>
                            <Image src={'/svg/editIcon.svg'} alt='editsvg' width={20}  height={18}/>
                            <Image src={'/svg/delete.svg'} alt='deletesvg' width={20}  height={18}/>
                          </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  )
}

export default table
