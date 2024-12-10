import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Table, TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select";
import {getTableData} from './utility'
import { cookies } from "next/headers";
import Link from "next/link";

type EventDetails = {
  name: string;
  event_type: string;
  event_name: string;
  event_start_date: string; // Use Date if you plan to parse it as a Date object
  event_end_date: string;   // Same as above
  event_requestor: string;
  event_venue: string;
  current_stage: string;
  total_amount: number;
  owner: number;
};





export default async function BudgetRequestPage () {
  // const router = useRouter();

  // const handleClick = () => {
  //   router.push("/budget_request/${request_no}")
  // }

  
const cookie = await cookies();

  const tableData:EventDetails[] = await getTableData(cookie);
  console.log(tableData && tableData,"this is tabledata")
 
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
                    Created By
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
                      "text-center rounded-r-2xl text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat'] sticky right-0 bg-[#E0E9FF]"
                    }
                  >Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                  {tableData &&
                    tableData.map((data, index) => {
                      return (
                        <TableRow key={index} className="text-center text-nowrap lg:text-[16px] sm:text-[10px] text-[10px] font-light leading-normal font-['Poppins']">
                          <TableCell>{data.name ?? "-"}</TableCell>
                          <TableCell>{data.event_type ?? "-"}</TableCell>
                          <TableCell>{data.event_name ?? "-"}</TableCell>
                          <TableCell>{data.event_start_date ?? "-"}</TableCell>
                          <TableCell>{data.event_end_date ?? "-"}</TableCell>
                          <TableCell>{data.event_requestor ?? "-"}</TableCell>
                          <TableCell>{data.owner ?? "-"}</TableCell>
                          <TableCell>{data.event_venue ?? "-"}</TableCell>    
                          <TableCell className="sticky right-0 bg-[white] flex border-l items-center border-slate-200"> 
                            <Link href={`/travel_desk/${data.name}`}>
                             <button className="rounded-[50px] lg:px-[14px] lg:py-[7px] sm:py-[3px] sm:px-[4px] px-[3px] py-[2px] border-[0.5px] border-[#0E4154] text-[#0E4154] lg:text-[12px] sm:text-[7px] text-[6px] font-light leading-normal">Take Action</button>
                            </Link>
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


