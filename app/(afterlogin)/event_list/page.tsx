"use client";
import React from "react";
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react";
import Image from "next/image";
import DatePicker from "./date-picker"
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
type EventTable = {
  name: string;
  event_name: string;
  event_type: string;
  event_start_date: string;
  event_end_date: string;
  event_requestor: string;
  event_venue: string;
  advance: string;
  status: string;
  occurrence_no: number;
  post_activity_status: string;
  advance_request_approved: boolean
  advance_request_submitted: boolean
  current_stage: string
  is_declared: boolean
  post_activity_approved: boolean
  post_activity_submitted: boolean
  post_expense_approved: boolean
  post_expense_submitted: boolean
  preactivity_approved: boolean
  preactivity_status: string
  preactivity_submitted: boolean
  travel_expense_approved: boolean
  travel_expense_submitted: boolean
  brief_status: string;
  owner: string;
};

export default function EventList() {

  const router = useRouter();
  const handleClick = (refno: string, status: string, eventType: string) => {
    console.log(eventType, "function event type")
    if (status == "Draft") {
      localStorage.setItem("refno", refno);
      if (eventType == "Training and Education") {
        router.push(`/training_and_education?forms=1&refno=${refno}`)
      } else if (eventType == "Awareness Program") {
        router.push(`/awareness_program?forms=1&refno=${refno}`)
      } else if (eventType == "HCP Services") {
        router.push(`/hcp_services?forms=1&refno=${refno}`)
      } else if (eventType == "Monetary Grant") {
        router.push(`/monetary_grant?forms=1&refno=${refno}`)
      } else if (eventType == "Non Monetary Grant") {
        router.push(`/non_monetary_grant?forms=1&refno=${refno}`)
      } else if (eventType == "Patient Support") {
        router.push(`/patient_support?forms=1&refno=${refno}`)
      } else if (eventType == "Sponsorship Support") {
        router.push(`/sponsorship_support?forms=1&refno=${refno}`)
      }
    } else {
      router.push(`/event_list/${refno}`)
    }
  }

  const [tableData, setTableData] = useState<EventTable[]>()
  const [loading, setLoading] = useState(true)
  const fetchTableData = async () => {
    setLoading(true)
    try {
      const Data = await fetch(
        `/api/eventList`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({
            activity: "Pre Activity"
          })
        }
      );
      if (Data.ok) {
        const data = await Data.json();
        setTableData(data.message)
        setLoading(false)
      }else{
        setLoading(false)
      }

    } catch (error) {
      setLoading(false)
      console.log(error, "something went wrong");
    }
  }

  useEffect(() => {
    fetchTableData();
  }, [])
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
              <SelectValue placeholder="Status" className="cursor-pointer" />
            </SelectTrigger>
            <SelectContent>
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
          <DatePicker />
        </div>
      </div>

      <div className="border bg-white h-full p-4 rounded-[18px]">
        <Table>
          <TableHeader className={"bg-[#E0E9FF]"}>
            <TableRow className={"text-nowrap rounded-r-2xl"}>
              <TableHead className={"text-center rounded-l-2xl text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"}>
                Request No.
              </TableHead>
              <TableHead className={"text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"} >
                Event Name
              </TableHead>
              <TableHead className={"text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"} >
                Event Type
              </TableHead>
              <TableHead className={"text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"} >
                Event Start Date
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
                Post Expense
              </TableHead>
              <TableHead
                className={
                  "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                }
              >
                Occurence No.
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
                Status
              </TableHead>

              <TableHead
                className={
                  "text-center rounded-r-2xl text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat'] sticky right-0 bg-[#E0E9FF]"
                }
              >View</TableHead>
            </TableRow>
          </TableHeader>
          {
            loading ? <TableBody><TableRow ><TableCell colSpan={9} ><>
            <div className='flex items-center justify-center'>
              <Loader2 className=" mr-2 h-4 w-4 animate-spin" />
              Loading...
            </div>
            </></TableCell></TableRow></TableBody> :
              tableData ? <TableBody>
                {tableData &&
                  tableData?.map((data, index) => {
                    return (
                      <TableRow key={index} className="text-center text-nowrap">
                        <TableCell>{data.name ?? "-"}</TableCell>
                        <TableCell>{data.event_name ?? "-"}</TableCell>
                        <TableCell>{data.event_type ?? "-"}</TableCell>
                        <TableCell>{data.event_start_date ?? "-"}</TableCell>
                        <TableCell>{data.event_end_date ?? "-"} </TableCell>
                        <TableCell>{data.event_requestor ?? "-"}</TableCell>
                        <TableCell>{data.owner ?? ""}</TableCell>
                        <TableCell>{data.event_venue ?? "-"}</TableCell>
                        <TableCell>
                          <Button className={`bg-[#F0EDFF] w-[75px] text-[#4430BF] text-sm  rounded-md font-semibold  hover:underline`}
                            disabled={!data.preactivity_approved}
                            onClick={() => router.push(`/advance_request/${data.name}`)}>
                            {(data.advance_request_submitted || data.is_declared) ? 'View' : "Request"}
                          </Button>
                        </TableCell>
                        <TableCell>
                          {
                            data.post_activity_submitted ?
                              (
                                !data.post_expense_submitted ?
                                  <Button className="bg-[#F0EDFF] w-[75px] text-[#4430BF] text-sm  rounded-md font-semibold hover:underline capitalize" onClick={() => router.push(`/post_expense/${data.name}`)}>Request</Button> :
                                  <Button className="bg-[#F0EDFF] w-[75px] text-[#4430BF] text-sm  rounded-md font-semibold hover:underline capitalize" onClick={() => router.push(`/post_expense/${data.name}`)}>View</Button>

                              ) : (
                                <Button className="bg-[#F0EDFF] w-[75px] text-[#4430BF] text-sm  rounded-md font-semibold hover:underline capitalize" disabled>Request</Button>
                              )

                          }
                        </TableCell>
                        <TableCell>{data.occurrence_no}</TableCell>
                        <TableCell>{data.status}</TableCell>
                        <TableCell>{data.brief_status}</TableCell>
                        <TableCell className="sticky right-0 bg-[white] z-30 flex space-x-8 border-l border-slate-200 justify-center items-center mt-4">
                          <Image src={"/svg/view.svg"} width={17} height={20} alt="view-svg" className="cursor-pointer" onClick={() => { handleClick(data.name, data.status, data.event_type) }} />
                        </TableCell>

                      </TableRow>
                    );
                  })}
              </TableBody> : <TableBody><TableRow><TableCell colSpan={9} ><div className="flex justify-center items-center">No Result.</div></TableCell></TableRow></TableBody>
          }
        </Table>
      </div>

    </div>
  );
};