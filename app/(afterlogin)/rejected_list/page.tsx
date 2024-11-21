'use client';
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import ToggleButton from "@/components/toggle_button";
import { useState } from "react";
import Pagination from "@/components/pagination";
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type RejectedListTable = {
  request_number: string;
  event_name: string;
  event_type: string;
  event_date: string;
  event_end_date:string;
  event_requestor: string;
  event_venue:string;
};


const RejectedList = () => {
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;    
    const handlePageChange = (page: React.SetStateAction<number>) => {
        setCurrentPage(page);
        // Fetch your data for the new page here
      };


  const rejectedLists: RejectedListTable[] = [
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
               <Button className="rounded-[25px] border-[.2px] border-[#636363] bg-red-500  text-white text-[14px] flex space-x-2 px-[20px]">
                    <span>Rejected list</span>
                    <Image src={"/svg/cancelwhite.svg"} alt="add-Icon" width={20} height={20} />
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
              <Button className="text-black text-md font-normal bg-white hover:bg-white border rounded-[25px] px-8 py-5 shadow" onClick={()=>router.push('/reject')}>
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
                  {rejectedLists &&
                    rejectedLists.map((rejectedList, index) => {
                      return (
                        <TableRow key={index} className="text-center text-nowrap">
                          <TableCell>{rejectedList.request_number}</TableCell>
                          <TableCell>{rejectedList.event_type}</TableCell>
                          <TableCell>{rejectedList.event_name}</TableCell>
                          <TableCell>{rejectedList.event_date}</TableCell>
                          <TableCell>{rejectedList.event_end_date}</TableCell>
                          <TableCell>{rejectedList.event_requestor}</TableCell>   
                          <TableCell>{rejectedList.event_venue}</TableCell>                  
                          <TableCell className="sticky right-0 bg-[white] z-50 flex justify-end space-x-5 py-4 px-0 pl-6 !important border-l border-slate-200">                          
                              <Image src={"/svg/view.svg"} width={17} height={20} alt="view-svg" className="cursor-pointer"/>
                              <ToggleButton />
                            </TableCell>
                </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end">
             <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
             />
            </div>
        </div>
    </>
  );
};

export default RejectedList;