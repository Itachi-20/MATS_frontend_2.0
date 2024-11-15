'use client';
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import ToggleButton from "@/components/toggle_button";

type CancelListTable = {
  request_number: string;
  event_name: string;
  event_type: string;
  event_date: string;
  event_end_date:string;
  event_requestor: string;
  event_venue:string;
};

const CancelList = () => {
  const router = useRouter()

  const cancelLists: CancelListTable[] = [
    {
      request_number: "REQ001",
      event_name: "Annual Conference",
      event_type: "Conference",
      event_date: "2024-10-15",
      event_end_date:"2024-11-20",
      event_requestor: "John Doe",
      event_venue:"Name 0001",
    },
    {
      request_number: "REQ001",
      event_name: "Annual Conference",
      event_type: "Conference",
      event_date: "2024-10-15",
      event_end_date:"2024-11-20",
      event_requestor: "John Doe",
      event_venue:"Name 0001",
    },
    {
      request_number: "REQ001",
      event_name: "Annual Conference",
      event_type: "Conference",
      event_date: "2024-10-15",
      event_end_date:"2024-11-20",
      event_requestor: "John Doe",
      event_venue:"Name 0001",
    },
    {
      request_number: "REQ001",
      event_name: "Annual Conference",
      event_type: "Conference",
      event_date: "2024-10-15",
      event_end_date:"2024-11-20",
      event_requestor: "John Doe",
      event_venue:"Name 0001",
    },
    {
      request_number: "REQ001",
      event_name: "Annual Conference",
      event_type: "Conference",
      event_date: "2024-10-15",
      event_end_date:"2024-11-20",
      event_requestor: "John Doe",
      event_venue:"Name 0001",
    },
    {
      request_number: "REQ001",
      event_name: "Annual Conference",
      event_type: "Conference",
      event_date: "2024-10-15",
      event_end_date:"2024-11-20",
      event_requestor: "John Doe",
      event_venue:"Name 0001",
    },
  ];

  return (
    <>
        <div className="p-7 w-full relative z-20 text-black">
          <div className="flex justify-between pb-5 relative">           
                <Input
                    className="w-[40%] rounded-[50px] bg-[#ecf2ff] placeholder:text-black"
                    placeholder="Search"
                />
                <Image src="svg/search.svg"  alt="search-icon" width={23} height={23} className="absolute right-[63%] top-[15%]"/> 
                
            <div className="flex gap-5">
               <Button className="rounded-[25px] border-[.2px] border-slate-400 bg-[#FFF] text-[14px] flex space-x-2 px-[20px]" onClick={()=> router.push('/cancelled_list')}>
                    <span>Cancelled list</span>
                    <Image src={"/svg/cancel.svg"} alt="add-Icon" width={20} height={20} />
                </Button>
              <Select>
                <SelectTrigger className="text-black shadow focus-visible:ring-transparent rounded-[25px] gap-4 border border-slate-400 !important">
                  <SelectValue placeholder="Export" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">Pdf</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="Print">Print</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="text-black shadow focus-visible:ring-transparent rounded-[25px] gap-4 border border-slate-400 !important">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <Button className="text-black text-md font-normal bg-white hover:bg-white border rounded-[25px] px-8 py-5 shadow">
                Back
              </Button>
            </div>
          </div>

          <div className="border bg-white h-full p-4 rounded-[18px]">
            <Table className={""}>
              <TableHeader className={"bg-[#E0E9FF]"}>
                <TableRow className={"text-nowrap rounded-r-2xl"}>
                  <TableHead
                    className={
                      "text-center rounded-l-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                  >
                   Request No.
                  </TableHead>
                  <TableHead
                    className={
                      "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                  >
                    Event Name 
                  </TableHead>
                  <TableHead
                    className={
                      "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                  >
                    Event Type
                  </TableHead>

                  <TableHead
                    className={
                      "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                  >
                    Event Date
                  </TableHead>

                  <TableHead
                    className={
                      "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                  >
                    Event End date
                  </TableHead>

                  <TableHead
                    className={
                      "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                  >
                    Event Requestor
                  </TableHead>

                  <TableHead
                    className={
                      "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                  >
                    Event Venue
                  </TableHead>
                 
                  <TableHead
                    className={
                      "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                  >
                    {/* Advance  */}
                  </TableHead>
                 
                 
                  <TableHead
                    className={
                      "text-center rounded-r-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat'] sticky right-0 z-50 bg-[#E0E9FF]"
                    }
                  >
                    {/* Action */}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                  {cancelLists &&
                    cancelLists.map((cancelList, index) => {
                      return (
                        <TableRow key={index} className="text-center text-nowrap">
                          <TableCell>{cancelList.request_number}</TableCell>
                          <TableCell>{cancelList.event_type}</TableCell>
                          <TableCell>{cancelList.event_name}</TableCell>
                          <TableCell>{cancelList.event_date}</TableCell>
                          <TableCell>{cancelList.event_end_date}</TableCell>
                          <TableCell>{cancelList.event_requestor}</TableCell>   
                          <TableCell>{cancelList.event_venue}</TableCell>                      
                          <TableCell className="sticky right-0 bg-[white] z-50 flex justify-end space-x-5 py-4 px-0 pl-6 !important border-l items-center border-slate-200">                          
                              <Image src={"/svg/view.svg"} width={17} height={20} alt="view-svg" className="cursor-pointer"/>
                              <ToggleButton />
                          </TableCell>
                </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </div>
        </div>
    </>
  );
};

export default CancelList;