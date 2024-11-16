"use client"
import React, { useState ,useEffect} from 'react'
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
    tableData:any
  }

const table = ({...Props}:Props) => {
    const [tableData,setTableData] = useState(Props.tableData);
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
                      "text-center rounded-r-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat'] sticky right-0 z-50 bg-[#E0E9FF]"
                    }
                  >Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="">
                  {tableData &&
                    tableData.map((data:any, index:number) => {
                      return (
                        <TableRow key={index} className="text-center text-nowrap">
                          <TableCell>{data.name}</TableCell>
                          <TableCell>{data.event_type}</TableCell>
                          <TableCell>{data.event_name}</TableCell>
                          <TableCell>{data.event_start_date}</TableCell>
                          <TableCell></TableCell>
                          <TableCell>{data.event_requestor}</TableCell>
                          <TableCell>
                            <div  className="flex flex-col items-center">
                              {
                               data.preactivity_approvers && data.preactivity_approvers[0] && data.preactivity_approvers[0].status == "Approved"?
                              <span className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                              A
                              </span>
                              : data.preactivity_approvers && data.preactivity_approvers[0] && data.preactivity_approvers[0].status == "Rejected"?
                              <span className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                              RJ
                              </span>
                              : data.preactivity_approvers &&data.preactivity_approvers[0] && data.preactivity_approvers[0].status == "Pending"?
                              <span className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                              W
                              </span>:"-"
                              } 

                            </div>

                            </TableCell>
                          <TableCell>
                            <div  className="flex flex-col items-center">
                              {
                               data.preactivity_approvers && data.preactivity_approvers[1] && data.preactivity_approvers[1].status == "Approved"?
                              <span className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                              A
                              </span>
                              : data.preactivity_approvers && data.preactivity_approvers[1] && data.preactivity_approvers[1].status == "Rejected"?
                              <span className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                              RJ
                              </span>
                              : data.preactivity_approvers &&data.preactivity_approvers[1] && data.preactivity_approvers[1].status == "Pending"?
                              <span className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                              W
                              </span>:"-"
                              } 

                            </div>

                            </TableCell>
                          <TableCell>
                            <div  className="flex flex-col items-center">
                              {
                               data.preactivity_approvers && data.preactivity_approvers[3] && data.preactivity_approvers[3].status == "Approved"?
                              <span className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                              A
                              </span>
                              : data.preactivity_approvers && data.preactivity_approvers[3] && data.preactivity_approvers[3].status == "Rejected"?
                              <span className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                              RJ
                              </span>
                              : data.preactivity_approvers &&data.preactivity_approvers[3] && data.preactivity_approvers[3].status == "Pending"?
                              <span className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                              W
                              </span>:"-"
                              } 

                            </div>

                            </TableCell>
                          <TableCell>
                            <div  className="flex flex-col items-center">
                              {
                               data.preactivity_approvers && data.preactivity_approvers[4] && data.preactivity_approvers[4].status == "Approved"?
                              <span className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                              A
                              </span>
                              : data.preactivity_approvers && data.preactivity_approvers[4] && data.preactivity_approvers[4].status == "Rejected"?
                              <span className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                              RJ
                              </span>
                              : data.preactivity_approvers &&data.preactivity_approvers[4] && data.preactivity_approvers[4].status == "Pending"?
                              <span className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                              W
                              </span>:"-"
                              } 

                            </div>

                            </TableCell>
                          <TableCell>
                            <div  className="flex flex-col items-center">
                              {
                               data.preactivity_approvers && data.preactivity_approvers[5] && data.preactivity_approvers[5].status == "Approved"?
                              <span className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                              A
                              </span>
                              : data.preactivity_approvers && data.preactivity_approvers[5] && data.preactivity_approvers[5].status == "Rejected"?
                              <span className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                              RJ
                              </span>
                              : data.preactivity_approvers &&data.preactivity_approvers[5] && data.preactivity_approvers[5].status == "Pending"?
                              <span className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                              W
                              </span>:"-"
                              } 

                            </div>

                            </TableCell>
                          <TableCell>
                            <TableCell>
                            <div  className="flex flex-col items-center">
                              {
                               data.preactivity_approvers && data.preactivity_approvers[6] && data.preactivity_approvers[6].status == "Approved"?
                              <span className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                              A
                              </span>
                              : data.preactivity_approvers && data.preactivity_approvers[6] && data.preactivity_approvers[6].status == "Rejected"?
                              <span className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                              RJ
                              </span>
                              : data.preactivity_approvers &&data.preactivity_approvers[6] && data.preactivity_approvers[6].status == "Pending"?
                              <span className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                              W
                              </span>:"-"
                              } 

                            </div>

                            </TableCell>
                          </TableCell>
                          <TableCell className="sticky right-0 bg-[white] z-50 ">
                            <div className="">
                            {
                              <button className="border rounded-full px-4 py-1 border-[#0e4154] text-[#0e4154]" onClick={()=>{router.push(`/event_request_approver?refno=${data.name}`)}}>Take Action</button>
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