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
import ViewDocument from '@/components/view_document'
import { Button } from '@/components/ui/button';
import { useState } from 'react';
type DocumentRow = {
  name: string;
  file_name: string;
  file_url: string;
};

type ActualVendor = {
  event_request_number:string
  name: string;
  vendor_type: string;
  vendor_name: string;
  files: DocumentRow[];
  status: string;
  advance: number;
  gst: string;
  invoice_amount: number;
  tds: number;
  net_amount: number;
  utr_number: string | null;
  payment_date: string | null;
  parent: string;
};
type Props = {
  expensetabledata: ActualVendor[] | undefined; // Props includes the tableData field
};

const table = ({ ...Props }: Props) => {
  const [open, setOpen] = useState(false);
  const [fileData, setFileData] = useState<DocumentRow[] | undefined>();
  const handleSetFileData = async (file: any) => {
    setFileData(file);
    setOpen(true)
  };
  return (

    <>
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
          {/* <TableHead
            className={
              "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
            }
          >
            Vendor Code
          </TableHead> */}

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
              "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
            }
          >
            TDS
          </TableHead>
          <TableHead
            className={
              "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
            }
          >
            Net Amount
          </TableHead>
          <TableHead
            className={
              "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
            }
          >
            UTR Number
          </TableHead>
          <TableHead
            className={
              "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
            }
          >
            Payment Date
          </TableHead>
          <TableHead
            className={
              "text-center rounded-r-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat'] sticky right-0 z-20 bg-[#E0E9FF]"
            }
          >Action</TableHead>
        </TableRow>
      </TableHeader>
      {
        Props.expensetabledata ?
          <TableBody>
            {Props?.expensetabledata &&
              Props?.expensetabledata?.map((data, index) => {
                return (
                  <TableRow key={index} className="text-center text-nowrap text-black">
                    <TableCell>{data.event_request_number}</TableCell>
                    <TableCell>{data.vendor_type}</TableCell>
                    {/* <TableCell>{data.vendor_code}</TableCell> */}
                    <TableCell>{data.vendor_name}</TableCell>
                    <TableCell>{data.advance}</TableCell>
                    <TableCell>{data.status}</TableCell>
                    <TableCell>{data.gst}</TableCell>
                    <TableCell>{data.invoice_amount}</TableCell>
                    <TableCell>{data.tds}</TableCell>
                    <TableCell>{data.net_amount}</TableCell>
                    <TableCell>{data.utr_number}</TableCell>
                    <TableCell>{data.payment_date}</TableCell>
                    <TableCell className='sticky right-0 z-20 gap-3 w-[120px] bg-white mt-2 flex border-l'>
                      <button onClick={() => handleSetFileData(data.files)}><Image src={'/svg/view.svg'} alt='viewsvg' width={24} height={18} /></button>
                      {/* <Image src={'/svg/view.svg'} alt='viewsvg' width={24}  height={18}/> */}
                      <Image src={'/svg/editIcon.svg'} alt='editsvg' width={20} height={18} />
                      <Image src={'/svg/delete.svg'} alt='deletesvg' width={20} height={18} />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
          :
          <TableBody>
            <TableRow className="text-center text-black text-nowrap ">
              <TableCell colSpan={9}>No Results</TableCell>
            </TableRow>
          </TableBody>
      }
    </Table>
      </div>


      {
        open &&
        <ViewDocument setClose={setOpen} data={fileData} />
      }
    </>
  )
}

export default table
