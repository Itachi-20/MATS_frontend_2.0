"use client"
import React from 'react'
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {Event} from "@/app/(afterlogin)/event_approval_summary_report/page"
type level = "Approved" | "Rejected" | "Pending";
type EventApprovalSummaryReportTable = {
    request_number: string;
    event_name: string;
    event_type: string;
    event_date: string;
    total_expense: number;
    event_requestor: string;
    created_by:string;
    level_1: level;
    level_2: level;
    level_3: level;
    level_4: level;
    level_5: level;
    level_6: level;
    level_7: level;

};

type Props = {
    tableData : Event[]
}
const table = ({...Props}:Props) => {
      const eventReports: EventApprovalSummaryReportTable[] = [
        {
            request_number: "REQ001",
            event_name: "Annual Conference",
            event_type: "Conference",
            event_date: "2024-10-15",
            total_expense: 15000,
            event_requestor: "John Doe",
            created_by:"2024-10-15",

            level_1: "Approved",
            level_2: "Pending",
            level_3: "Approved",
            level_4: "Rejected",
            level_5: "Approved",
            level_6: "Pending",
            level_7: "Pending"
        },
        {
            request_number: "REQ002",
            event_name: "Product Launch",
            event_type: "Launch",
            event_date: "2024-11-20",
            total_expense: 25000,
            event_requestor: "Jane Smith",
            created_by:"2024-10-15",
            level_1: "Pending",
            level_2: "Approved",
            level_3: "Approved",
            level_4: "Pending",
            level_5: "Rejected",
            level_6: "Approved",
            level_7: "Pending"
        },
        {
            request_number: "REQ003",
            event_name: "Team Building Retreat",
            event_type: "Workshop",
            event_date: "2024-09-30",
            total_expense: 8000,
            event_requestor: "Mike Johnson",
            created_by:"2024-10-15",
            level_1: "Approved",
            level_2: "Approved",
            level_3: "Pending",
            level_4: "Approved",
            level_5: "Rejected",
            level_6: "Approved",
            level_7: "Pending"

        },
        {
            request_number: "REQ004",
            event_name: "End of Year Gala",
            event_type: "Gala",
            event_date: "2024-12-31",
            total_expense: 40000,
            event_requestor: "Emily Davis",
            created_by:"2024-10-15",
            level_1: "Rejected",
            level_2: "Rejected",
            level_3: "Pending",
            level_4: "Approved",
            level_5: "Approved",
            level_6: "Pending",
            level_7: "Pending"
        },
        {
            request_number: "REQ005",
            event_name: "Marketing Workshop",
            event_type: "Workshop",
            event_date: "2024-10-10",
            total_expense: 5500,
            event_requestor: "Alex Brown",
            created_by:"2024-10-15",
            level_1: "Pending",
            level_2: "Approved",
            level_3: "Rejected",
            level_4: "Approved",
            level_5: "Pending",
            level_6: "Approved",
            level_7: "Pending"
        },
        {
            request_number: "REQ006",
            event_name: "Client Appreciation Event",
            event_type: "Social",
            event_date: "2024-09-15",
            total_expense: 12000,
            event_requestor: "Sara Miller",
            created_by:"2024-10-15",
            level_1: "Approved",
            level_2: "Approved",
            level_3: "Approved",
            level_4: "Pending",
            level_5: "Rejected",
            level_6: "Approved",
            level_7: "Pending"
        }
    ];
  return (
    <div className="p-7 w-full z-20 text-black">
                <div className="flex justify-between pb-5">
                    <Input
                        className="w-[40%] rounded-[50px] bg-[#ecf2ff]"
                        placeholder="Search"
                    />
                    <div className="flex gap-5">
                        <Select>
                            <SelectTrigger className="text-black shadow focus-visible:ring-transparent rounded-[25px] gap-4">
                                <SelectValue placeholder="Export" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="text-black shadow focus-visible:ring-transparent rounded-[25px] gap-4">
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
                                    Name
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
                                    Event Start Date
                                </TableHead>
                                <TableHead
                                    className={
                                        "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                    }
                                >
                                    Event End Date
                                </TableHead>

                                <TableHead
                                    className={
                                        "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                    }
                                >
                                    Total Expense
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
                                    Created By
                                </TableHead>
                                <TableHead
                                    className={
                                        "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                    }
                                >
                                    Level 1
                                </TableHead>
                                <TableHead
                                    className={
                                        "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                    }
                                >
                                    Level 2
                                </TableHead>
                                <TableHead
                                    className={
                                        "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                    }
                                >
                                    Level 3
                                </TableHead>
                                <TableHead
                                    className={
                                        "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                    }
                                >
                                    Level 4
                                </TableHead>
                                <TableHead
                                    className={
                                        "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                    }
                                >
                                    Level 5
                                </TableHead>
                                <TableHead
                                    className={
                                        "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                    }
                                >
                                    Level 6
                                </TableHead>
                                <TableHead
                                    className={
                                        "text-center rounded-r-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat'] bg-[#E0E9FF]"
                                    }
                                >Level 7</TableHead>
                        
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Props &&
                                Props.tableData?.map((eventReport, index) => {
                                    return (
                                        <TableRow key={index} className="text-center text-nowrap">
                                            <TableCell>{eventReport.name}</TableCell>
                                            <TableCell>{eventReport.event_type}</TableCell>
                                            <TableCell>{eventReport.event_name}</TableCell>
                                            <TableCell>{eventReport.event_start_date}</TableCell>
                                            <TableCell>{eventReport.event_end_date}</TableCell>
                                            <TableCell>{eventReport.total_estimated_expense}</TableCell>
                                            <TableCell>{eventReport.event_requestor}</TableCell>
                                            <TableCell>{eventReport.owner}</TableCell>

                                            <TableCell>
                                                                      <div className="flex flex-col items-center">
                                                                        {eventReport.level1}
                                                                        {
                                                                          eventReport.level1 != null &&
                                                                          (eventReport.status1 == "Approved" ?
                                                                            <span className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                                                                              A
                                                                            </span>
                                                                            : eventReport.status1 == "Pending" ?
                                                                              <span className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                                                                                W
                                                                              </span>
                                                                              : eventReport.status1 == "Rejected" ?
                                                                                <span className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                                                                                  RJ
                                                                                </span>
                                                                                :
                                                                                <span className="w-6 rounded-md bg-[#adadfe] text-[#363d9a] text-[15px] font-semibold">
                                                                                  SB
                                                                                </span>
                                                
                                                                          )}
                                                                        {
                                                                          eventReport.level1 == null && <span>N/A</span>
                                                                        }
                                                
                                                                      </div>
                                            </TableCell>
                                            <TableCell>
                                                                      <div className="flex flex-col items-center">
                                                                        {eventReport.level2}
                                                                        {
                                                                          eventReport.level2 != null &&
                                                                          (eventReport.status2 == "Approved" ?
                                                                            <span className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                                                                              A
                                                                            </span>
                                                                            : eventReport.status2 == "Pending" ?
                                                                              <span className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                                                                                W
                                                                              </span>
                                                                              : eventReport.status2 == "Rejected" ?
                                                                                <span className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                                                                                  RJ
                                                                                </span>
                                                                                :
                                                                                <span className="w-6 rounded-md bg-[#adadfe] text-[#363d9a] text-[15px] font-semibold">
                                                                                  SB
                                                                                </span>
                                                
                                                                          )}
                                                                        {
                                                                          eventReport.level2 == null && <span>N/A</span>
                                                                        }
                                                
                                                                      </div>
                                            </TableCell>
                                            <TableCell>
                                                                      <div className="flex flex-col items-center">
                                                                        {eventReport.level3}
                                                                        {
                                                                          eventReport.level3 != null &&
                                                                          (eventReport.status3 == "Approved" ?
                                                                            <span className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                                                                              A
                                                                            </span>
                                                                            : eventReport.status3 == "Pending" ?
                                                                              <span className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                                                                                W
                                                                              </span>
                                                                              : eventReport.status3 == "Rejected" ?
                                                                                <span className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                                                                                  RJ
                                                                                </span>
                                                                                :
                                                                                <span className="w-6 rounded-md bg-[#adadfe] text-[#363d9a] text-[15px] font-semibold">
                                                                                  SB
                                                                                </span>
                                                
                                                                          )}
                                                                        {
                                                                          eventReport.level3 == null && <span>N/A</span>
                                                                        }
                                                
                                                                      </div>
                                            </TableCell>
                                            <TableCell>
                                                                      <div className="flex flex-col items-center">
                                                                        {eventReport.level4}
                                                                        {
                                                                          eventReport.level4 != null &&
                                                                          (eventReport.status4 == "Approved" ?
                                                                            <span className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                                                                              A
                                                                            </span>
                                                                            : eventReport.status4 == "Pending" ?
                                                                              <span className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                                                                                W
                                                                              </span>
                                                                              : eventReport.status4 == "Rejected" ?
                                                                                <span className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                                                                                  RJ
                                                                                </span>
                                                                                :
                                                                                <span className="w-6 rounded-md bg-[#adadfe] text-[#363d9a] text-[15px] font-semibold">
                                                                                  SB
                                                                                </span>
                                                
                                                                          )}
                                                                        {
                                                                          eventReport.level4 == null && <span>N/A</span>
                                                                        }
                                                
                                                                      </div>
                                            </TableCell>
                                            <TableCell>
                                                                      <div className="flex flex-col items-center">
                                                                        {eventReport.level5}
                                                                        {
                                                                          eventReport.level5 != null &&
                                                                          (eventReport.status5 == "Approved" ?
                                                                            <span className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                                                                              A
                                                                            </span>
                                                                            : eventReport.status5 == "Pending" ?
                                                                              <span className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                                                                                W
                                                                              </span>
                                                                              : eventReport.status5 == "Rejected" ?
                                                                                <span className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                                                                                  RJ
                                                                                </span>
                                                                                :
                                                                                <span className="w-6 rounded-md bg-[#adadfe] text-[#363d9a] text-[15px] font-semibold">
                                                                                  SB
                                                                                </span>
                                                
                                                                          )}
                                                                        {
                                                                          eventReport.level5 == null && <span>N/A</span>
                                                                        }
                                                
                                                                      </div>
                                            </TableCell>
                                            <TableCell>
                                                                      <div className="flex flex-col items-center">
                                                                        {eventReport.level6}
                                                                        {
                                                                          eventReport.level6 != null &&
                                                                          (eventReport.status6 == "Approved" ?
                                                                            <span className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                                                                              A
                                                                            </span>
                                                                            : eventReport.status6 == "Pending" ?
                                                                              <span className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                                                                                W
                                                                              </span>
                                                                              : eventReport.status6 == "Rejected" ?
                                                                                <span className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                                                                                  RJ
                                                                                </span>
                                                                                :
                                                                                <span className="w-6 rounded-md bg-[#adadfe] text-[#363d9a] text-[15px] font-semibold">
                                                                                  SB
                                                                                </span>
                                                
                                                                          )}
                                                                        {
                                                                          eventReport.level6 == null && <span>N/A</span>
                                                                        }
                                                
                                                                      </div>
                                            </TableCell>
                                                <TableCell>
                                                                      <div className="flex flex-col items-center">
                                                                        {eventReport.level7}
                                                                        {
                                                                          eventReport.level7 != null &&
                                                                          (eventReport.status7 == "Approved" ?
                                                                            <span className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                                                                              A
                                                                            </span>
                                                                            : eventReport.status7 == "Pending" ?
                                                                              <span className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                                                                                W
                                                                              </span>
                                                                              : eventReport.status7 == "Rejected" ?
                                                                                <span className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                                                                                  RJ
                                                                                </span>
                                                                                :
                                                                                <span className="w-6 rounded-md bg-[#adadfe] text-[#363d9a] text-[15px] font-semibold">
                                                                                  SB
                                                                                </span>
                                                
                                                                          )}
                                                                        {
                                                                          eventReport.level7 == null && <span>N/A</span>
                                                                        }
                                                
                                                                      </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex justify-end">
             {/* <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
             /> */}
            </div>
            </div>
  )
}

export default table