"use client";
import React from "react";
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

export default function BudgetRequestPage () {
  const router = useRouter();

  const handleClick = () => {
    router.push("/budget_request/${request_no}")
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
          <div className="flex lg:justify-between flex-col-reverse lg:flex-row pb-5 gap-5 lg:gap-0">
            <Input
              className="lg:w-[40%] md:w-full sm:w-full rounded-[50px] bg-[#ecf2ff]"
              placeholder="Search"
            />            
            <div className="flex justify-end lg:gap-5 sm:gap-[10px] gap-[8px] items-center">
              <Select>
                <SelectTrigger className="text-black w-34 shadow focus-visible:ring-transparent lg:text-sm lg:rounded-[25px] lg:gap-4 sm:rounded-[50px] rounded-[50px] sm:text-[9px] sm:gap-[10px]  gap-[9px] sm:font-normal sm:leading-[10.97px] text-[9px]">
                  <SelectValue placeholder="Export" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">Pdf</SelectItem>
                  <SelectItem value="print">Print</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="text-black w-34 shadow focus-visible:ring-transparent lg:text-sm lg:rounded-[25px] lg:gap-4 sm:rounded-[50px] rounded-[50px] sm:text-[9px] sm:gap-[10px]  gap-[9px] sm:font-normal sm:leading-[10.97px] text-[9px]">
                  <SelectValue placeholder="Filter" className="cursor-pointer"/>
                </SelectTrigger>
                <SelectContent className="w-52">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="awaitingApproval">Awaitting Approval</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="approved">Draft</SelectItem>
                  <SelectItem value="sendback">Sendback</SelectItem>
                  <SelectItem value="executed">Executed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="postactivity">PostActivity Document Uploaded</SelectItem>
                </SelectContent>
              </Select>
              <Button className="text-black text-md font-normal bg-white hover:bg-white border lg:px-7 lg:py-4 sm:px-[20px] sm:py-[10px] shadow lg:text-sm rounded-[50px] sm:text-[9px] sm:font-normal sm:leading-normal font-['Montserrat'] text-[9px]">
                Back
              </Button>
            </div>
          </div>
          
          <div className="border bg-white h-full p-4 rounded-[18px]">
            <Table>
              <TableHeader className={"bg-[#E0E9FF]"}>
                <TableRow className={"text-nowrap rounded-r-2xl"}>
                  <TableHead className={"text-center rounded-l-2xl text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"}>
                   Request No.
                  </TableHead>
                  <TableHead  className={ "text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"} >
                    Event Name 
                  </TableHead>
                  <TableHead className={"text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']" } >
                    Event Type
                  </TableHead>
                  <TableHead className={"text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"} >
                    Event Date
                  </TableHead>
                  <TableHead
                    className={
                      "text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                    Event End date
                  </TableHead>

                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                    Event Requestor
                  </TableHead>

                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                    Event Venue
                  </TableHead>
                 
                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                    Advance 
                  </TableHead>
                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                   Event Status
                  </TableHead>
                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                    Post Activity Status
                  </TableHead>
                
                  <TableHead
                    className={
                      "text-center rounded-r-2xl text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat'] sticky right-0 bg-[#E0E9FF]"
                    }
                  >Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                  {events &&
                    events.map((data, index) => {
                      return (
                        <TableRow key={index} className="text-center text-nowrap lg:text-[16px] sm:text-[10px] text-[10px] font-light leading-normal font-['Poppins']">
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
                          <TableCell className="sticky right-0 bg-[white] flex border-l items-center border-slate-200"> 
                             <button className="rounded-[50px] lg:px-[14px] lg:py-[7px] sm:py-[3px] sm:px-[4px] px-[3px] py-[2px] border-[0.5px] border-[#0E4154] text-[#0E4154] lg:text-[12px] sm:text-[7px] text-[6px] font-light leading-normal" onClick={handleClick}>Add Expense</button>
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


