"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Table, TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select";

type EventTable = {
  request_number: string;
  event_name: string;
  event_type: string;
  event_date: string;
  event_end_date:string;
  event_requestor: string;
  event_venue:string;
  advance:string;
  event_status:string;
  post_activity_status:string;
};

export default function EventList () {

  const router = useRouter();
  const handleClick = () => {

    //  yadi new tab mein open kerna hai tab isko use karenge 
    // const url = "/event_list/${id}"
    // window.open(url, '_blank')
    // agar same tab mein open kerna hai  to isko use krenge 
    router.push("/event_list/${id}")
  }

  const events: EventTable[] = [
    {
      request_number: "REQ001",
      event_name: "Annual Conference",
      event_type: "Conference",
      event_date: "2024-10-15",
      event_end_date:"2024-11-20",
      event_requestor: "John Doe",
      event_venue:"Name 0001",
      advance:"Request",
      event_status:"Approved",
      post_activity_status:"Not Uploaded"
    },
    {
      request_number: "REQ002",
      event_name: "Product Launch",
      event_type: "Launch",
      event_date: "2024-11-20",
      event_end_date:"2024-11-20",
      event_venue:"Name 0001",
      event_requestor: "Jane Smith",
      advance:"Request",
      event_status:"Approved",
      post_activity_status:"Not Uploaded"
    },
    {
      request_number: "REQ003",
      event_name: "Team Building Retreat",
      event_type: "Workshop",
      event_date: "2024-09-30",
      event_end_date:"2024-11-20",
      event_venue:"Name 0001",
      event_requestor: "Mike Johnson",
      advance:"Request",
      event_status:"Approved",
      post_activity_status:"Not Uploaded",
    },
    {
      request_number: "REQ004",
      event_name: "End of Year Gala",
      event_type: "Gala",
      event_date: "2024-12-31",
      event_end_date:"2024-11-20",
      event_venue:"Name 0001",
      event_requestor: "Emily Davis",
      advance:"Request",
      post_activity_status:"Not Uploaded",
      event_status:"Approved"
    },
    {
      request_number: "REQ005",
      event_name: "Marketing Workshop",
      event_type: "Workshop",
      event_date: "2024-10-10",
      event_end_date:"2024-11-20",
      event_venue:"Name 0001",
      event_requestor: "Alex Brown",
      advance:"Request",      
      event_status:"Approved",
      post_activity_status:"Not Uploaded"
    },
    {
      request_number: "REQ006",
      event_name: "Client Appreciation Event",
      event_type: "Social",
      event_date: "2024-09-15",
      event_end_date:"2024-11-20",
      event_venue:"Name 0001",
      event_requestor: "Sara Miller",
      advance:"Request",
      event_status:"Approved",
      post_activity_status:"Not Uploaded"
    },
  ];

  return (
        <div className="p-7 w-full relative z-20 text-black">
          <div className="flex justify-between pb-5 relative">           
            <Input className="w-[40%] rounded-[50px] bg-[#ecf2ff] placeholder:text-black"  placeholder="Search" />
            <Image src="svg/search.svg"  alt="search-icon" width={23} height={23} className="absolute right-[63%] top-[15%]"/>      
            <div className="flex gap-5">
              <Select>
                <SelectTrigger className="text-black shadow focus-visible:ring-transparent rounded-[25px] gap-4 border border-slate-400 !important">
                  <SelectValue placeholder="Export" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">Pdf</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="print">Print</SelectItem>
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
                  <TableHead className={"text-center rounded-l-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat']"}>
                   Request No.
                  </TableHead>
                  <TableHead  className={ "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"} >
                    Event Name 
                  </TableHead>
                  <TableHead className={"text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']" } >
                    Event Type
                  </TableHead>
                  <TableHead className={"text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"} >
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
                    Advance 
                  </TableHead>
                  <TableHead
                    className={
                      "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                  >
                   Event Status
                  </TableHead>
                  <TableHead
                    className={
                      "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                  >
                    Post Activity Status
                  </TableHead>
                
                  <TableHead
                    className={
                      "text-center rounded-r-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat'] sticky right-0 z-50 bg-[#E0E9FF]"
                    }
                  >Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                  {events &&
                    events.map((data, index) => {
                      return (
                        <TableRow key={index} className="text-center text-nowrap">
                          <TableCell>{data.request_number}</TableCell>
                          <TableCell>{data.event_type}</TableCell>
                          <TableCell>{data.event_name}</TableCell>
                          <TableCell>{data.event_date}</TableCell>
                          <TableCell>{data.event_end_date}</TableCell>
                          <TableCell>{data.event_requestor}</TableCell>
                          <TableCell>{data.event_venue}</TableCell>
                          <TableCell>{data.advance}</TableCell>
                          <TableCell>{data.event_status}</TableCell>
                          <TableCell>{data.post_activity_status}</TableCell>                        
                          <TableCell className="sticky right-0 bg-[white] z-50 flex justify-between border-l border-slate-200"> 
                              <Image src={"/svg/view.svg"} width={17} height={20} alt="view-svg" className="cursor-pointer"  onClick={handleClick}/>                        
                              <Image src={"/svg/delete.svg"} width={15} height={20} alt="delete-svg" className="cursor-pointer"/>
                          </TableCell>
                </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </div>
        </div>
  );
};