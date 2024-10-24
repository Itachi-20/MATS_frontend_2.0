import React from 'react'
import Image from 'next/image'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
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
    total_expense: number;
    event_requestor: string;
    level_1: level;
    level_2: level;
    level_3: level;
    level_4: level;
    level_5: level;
    level_6: level;
  };
  
  type level = "Approved" | "Rejected" | "Pending";
    const events: EventTable[] = [
      {
        request_number: "REQ001",
        event_name: "Annual Conference",
        event_type: "Conference",
        event_date: "2024-10-15",
        total_expense: 15000,
        event_requestor: "John Doe",
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
        total_expense: 25000,
        event_requestor: "Jane Smith",
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
        total_expense: 8000,
        event_requestor: "Mike Johnson",
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
        total_expense: 40000,
        event_requestor: "Emily Davis",
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
        total_expense: 5500,
        event_requestor: "Alex Brown",
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
        total_expense: 12000,
        event_requestor: "Sara Miller",
        level_1: "Approved",
        level_2: "Approved",
        level_3: "Approved",
        level_4: "Pending",
        level_5: "Rejected",
        level_6: "Approved"
      }
    ];

const page = () => {
  return (
    <div className="h-screen bg-[#EBEBF6] grid grid-cols-6 relative overflow-hidden">
       
            
      <div className="col-span-1 px-11">
        <Sidebar />
      </div>
    <Image
            className=" w-full absolute z-10 -top-96 -right-[500px] -rotate-6"
            src={"/Lines.png"}
            alt=""
            width={1500}
            height={100}
            ></Image>
      <div className="col-span-5 border-2 rounded-l-[60px] w-full h-screen bg-white overflow-scroll overflow-x-hidden">
        <div className="sticky top-0 z-30 bg-white">
          <Navbar />
        </div>
        <div className='p-7 w-full relative z-20 text-black'>
        <div className="flex justify-between pb-5">
            <Input
              className="w-[40%] rounded-[50px] bg-[#ecf2ff]"
              placeholder="Search"
            />
            <div className="flex gap-5">
              <Select>
                <SelectTrigger className="dropdown rounded-[25px] gap-4">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="dropdown rounded-[25px] gap-4">
                  <SelectValue placeholder="Theme" />
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
              <TableBody>
                  {events &&
                    events.map((data, index) => {
                      return (
                        <TableRow key={index} className="text-center text-nowrap">
                          <TableCell>{data.request_number}</TableCell>
                          <TableCell>{data.event_type}</TableCell>
                          <TableCell>{data.event_name}</TableCell>
                          <TableCell>{data.event_date}</TableCell>
                          <TableCell>{data.total_expense}</TableCell>
                          <TableCell>{data.event_requestor}</TableCell>
                          <TableCell>
                            <div  className="flex flex-col items-center">
                              {data.level_1}
                              {
                                data.level_1 == "Approved"?
                              <span className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                              A
                              </span>
                              :data.level_1 == "Pending"?
                              <span className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                              W
                              </span>
                              :
                              <span className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                              RJ
                              </span>
                              } 

                            </div>

                            </TableCell>
                          <TableCell>
                            <div className="flex flex-col items-center">

                            {data.level_2}
                          {
                            data.level_2 == "Approved"?
                            <span className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                            A
                            </span>
                            :
                            data.level_2 == "Pending"?
                            <span className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                            W
                            </span>
                            :
                            <span className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                            RJ
                            </span>
                            }
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col items-center">

                            {data.level_3}
                          {
                            data.level_3 == "Approved"?
                            <div className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                            A
                            </div>
                            :data.level_3 == "Pending"?
                            <div className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                            W
                            </div>
                            :
                            <div className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                            RJ
                            </div>
                            }
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col items-center">

                            {data.level_4}
                          {
                            data.level_4 == "Approved"?
                            <div className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                            A
                            </div>
                            :data.level_4 == "Pending"?
                            <div className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                            W
                            </div>
                            :
                            <div className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                            RJ
                            </div>
                            }
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col items-center">

                            {data.level_5}
                          {
                            data.level_5 == "Approved"?
                            <div className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                            A
                            </div>
                            :data.level_5 == "Pending"?
                            <div className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                            W
                            </div>
                            :
                            <div className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                            RJ
                            </div>
                            }
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col items-center">

                            {data.level_6}
                          {
                            data.level_6 == "Approved"?
                            <div className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                            A
                            </div>
                            :data.level_6 == "Pending"?
                            <div className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                            W
                            </div>
                            :
                            <div className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                            RJ
                            </div>
                            }
                            </div>
                          </TableCell>
                          <TableCell className="sticky right-0 bg-[white] z-50 ">
                            <div className="">
                            {
                              data.level_1 == "Approved"?<button className="border rounded-full px-4 py-1 border-[#0e4154] text-[#0e4154]">view</button>
                              :
                              <button className="border rounded-full px-4 py-1 border-[#5dbe74] text-[#5dbe74]">Approve</button>
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
    </div>
    </div>
  )
}

export default page