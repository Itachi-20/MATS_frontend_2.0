import React from "react";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
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
  total_expense: number;
  
  level_1: level;
  level_2: level;
  level_3: level;
  level_4: level;
  level_5: level;
  level_6: level;
};

type level = "Approved" | "Rejected" | "Pending";
const Index = () => {

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
      post_activity_status:"Not Uploaded",
      total_expense: 15000,     
      level_1: "Approved",
      level_2: "Pending",
      level_3: "Approved",
      level_4: "Rejected",
      level_5: "Approved",
      level_6: "Pending"
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
      post_activity_status:"Not Uploaded",
      total_expense: 25000,      
      level_1: "Pending",
      level_2: "Approved",
      level_3: "Approved",
      level_4: "Pending",
      level_5: "Rejected",
      level_6: "Approved"
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
      total_expense: 8000,
      level_1: "Approved",
      level_2: "Approved",
      level_3: "Pending",
      level_4: "Approved",
      level_5: "Rejected",
      level_6: "Approved"
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
      event_status:"Approved",
      total_expense: 40000,
      level_1: "Rejected",
      level_2: "Rejected",
      level_3: "Pending",
      level_4: "Approved",
      level_5: "Approved",
      level_6: "Pending"
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
      post_activity_status:"Not Uploaded",
      total_expense: 5500,
      level_1: "Pending",
      level_2: "Approved",
      level_3: "Rejected",
      level_4: "Approved",
      level_5: "Pending",
      level_6: "Approved"
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
      post_activity_status:"Not Uploaded",
      total_expense: 12000,
      level_1: "Approved",
      level_2: "Approved",
      level_3: "Approved",
      level_4: "Pending",
      level_5: "Rejected",
      level_6: "Approved"
    }
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
              <div className="">
                <svg
                  width="45"
                  height="45"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Group 1707480146">
                    <path
                      id="Vector"
                      d="M25 0C21.717 0 18.4661 0.646644 15.4329 1.90301C12.3998 3.15938 9.6438 5.00087 7.32233 7.32233C2.63392 12.0107 0 18.3696 0 25C0 31.6304 2.63392 37.9893 7.32233 42.6777C9.6438 44.9991 12.3998 46.8406 15.4329 48.097C18.4661 49.3534 21.717 50 25 50C31.6304 50 37.9893 47.3661 42.6777 42.6777C47.3661 37.9893 50 31.6304 50 25C50 21.717 49.3534 18.4661 48.097 15.4329C46.8406 12.3998 44.9991 9.6438 42.6777 7.32233C40.3562 5.00087 37.6002 3.15938 34.5671 1.90301C31.5339 0.646644 28.283 0 25 0Z"
                      fill="#ECF2FF"
                    />
                    <rect
                      id="Rectangle 3959"
                      x="22"
                      y="22"
                      width="6"
                      height="16"
                      rx="2"
                      fill="#4430BF"
                    />
                    <rect
                      id="Rectangle 3960"
                      x="22"
                      y="12"
                      width="6"
                      height="6"
                      rx="3"
                      fill="#4430BF"
                    />
                  </g>
                </svg>
              </div>
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
                              <Image src={"/svg/view.svg"} width={17} height={20} alt="view-svg" className="cursor-pointer"/>
                              <Image src={"/svg/delete.svg"} width={15} height={20} alt="delete-svg" className="cursor-pointer"/>
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

export default Index;
