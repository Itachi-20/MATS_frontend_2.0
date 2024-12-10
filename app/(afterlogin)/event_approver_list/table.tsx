"use client"
import React, { useState, useEffect } from 'react'
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
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';

type Props = {
  tableData: any
}

const table = ({ ...Props }: Props) => {
  const [tableData, setTableData] = useState(Props.tableData);
  const router = useRouter();
  return (
    <div className="p-7 w-full relative z-20 text-black">
      <div className="flex justify-between pb-5">
        <Input
          className="w-[40%] rounded-[50px] bg-[#ecf2ff]"
          placeholder="Search"
        />
        <div className="flex gap-5">
          <Select>
            <SelectTrigger className="text-black shadow focus-visible:ring-transparent rounded-[25px] gap-4">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="text-black shadow focus-visible:ring-transparent rounded-[25px] gap-4">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="border bg-white  p-4 rounded-[18px]">
        <Table className="">
          <TableHeader className={"bg-[#E0E9FF] "}>
            <TableRow className={"text-nowrap rounded-r-2xl"}>
              <TableHead
                className={
                  "text-center rounded-l-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Request Number
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
                  "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Level 7
              </TableHead>
              <TableHead
                className={
                  "text-center rounded-r-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat'] sticky right-0 z-50 bg-[#E0E9FF]"
                }
              >Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {tableData &&
              tableData.map((data: any, index: number) => {
                return (
                  <TableRow key={index} className="text-center text-nowrap">
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.event_name}</TableCell>
                    <TableCell> {data.event_type}</TableCell>
                    <TableCell>{data.event_start_date}</TableCell>
                    <TableCell>{data.total_estimated_expense}</TableCell>
                    <TableCell>{data.event_requestor}</TableCell>
                    <TableCell>
                      <div className="flex flex-col items-center">
                        {data.level1}
                        {
                          data.level1 != null && (data.status1 == "Approved" ?
                            <span className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                              A
                            </span>
                            : data.status1 == "Pending" ?
                              <span className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                                W
                              </span>
                              :
                              <span className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                                RJ
                              </span>
                          )}
                        {
                          data.level1 == null && <span>N/A</span>
                        }


                      </div>

                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col items-center">
                        {data.level2}
                        {
                          data.level2 != null && (data.status2 == "Approved" ?
                            <span className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                              A
                            </span>
                            : data.status2 == "Pending" ?
                              <span className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                                W
                              </span>
                              :
                              <span className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                                RJ
                              </span>
                          )}
                        {
                          data.level2 == null && <span>N/A</span>
                        }

                      </div>

                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col items-center">
                        {data.level3}
                        {
                          data.level3 != null && (data.status3 == "Approved" ?
                            <span className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                              A
                            </span>
                            : data.status3 == "Pending" ?
                              <span className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                                W
                              </span>
                              :
                              <span className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                                RJ
                              </span>
                          )}
                        {
                          data.level3 == null && <span>N/A</span>
                        }

                      </div>

                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col items-center">
                        {data.level4}
                        {
                          data.level4 != null && (data.status4 == "Approved" ?
                            <span className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                              A
                            </span>
                            : data.status4 == "Pending" ?
                              <span className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                                W
                              </span>
                              :
                              <span className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                                RJ
                              </span>
                          )}
                        {
                          data.level4 == null && <span>N/A</span>
                        }

                      </div>

                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col items-center">
                        {data.level5}
                        {
                          data.level5 != null && (data.status5 == "Approved" ?
                            <span className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                              A
                            </span>
                            : data.status5 == "Pending" ?
                              <span className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                                W
                              </span>
                              :
                              <span className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                                RJ
                              </span>
                          )}
                        {
                          data.level5 == null && <span>N/A</span>
                        }

                      </div>

                    </TableCell>
                      <TableCell>
                        <div className="flex flex-col items-center">
                          {data.level6}
                          {
                            data.level6 != null && (data.status6 == "Approved" ?
                              <span className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                                A
                              </span>
                              : data.status6 == "Pending" ?
                                <span className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                                  W
                                </span>
                                :
                                <span className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                                  RJ
                                </span>
                            )}
                          {
                            data.level6 == null && <span>N/A</span>
                          }

                        </div>

                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col items-center">
                          {data.level7}
                          {
                            data.level7 != null && (data.status7 == "Approved" ?
                              <span className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                                A
                              </span>
                              : data.status7 == "Pending" ?
                                <span className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                                  W
                                </span>
                                :
                                <span className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                                  RJ
                                </span>
                            )}
                          {
                            data.level7 == null && <span>N/A</span>
                          }

                        </div>

                      </TableCell>
                    <TableCell className="sticky right-0 bg-[white] z-50 ">
                      <div className="">
                        {
                          <button className="border rounded-full px-4 py-1 border-[#0e4154] text-[#0e4154]" onClick={() => { router.push(`/event_request_approver/${data.name}`) }}>Take Action</button>
                        }
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default table