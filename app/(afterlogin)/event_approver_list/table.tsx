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
import { useRouter } from 'nextjs-toploader/app';
import { Loader2 } from "lucide-react";
import Loader from '@/components/loader'
import DatePicker from "@/app/(afterlogin)/event_list/date-picker"
import { Events } from './page'
import Pagination from "@/components/eventList/pagination";
import Requestor_filter from '@/components/dashboard/search_event_requestor_component'
import { Label } from "@/components/ui/label"
import { FormatDate } from '@/app/utility/dateFormatter';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
type EventRequestor2 = {
  "user": string,
  "email": string,
}
type Props = {
  tableData: Events[];
  eventrequestor: EventRequestor2[];
}

export const formatDate = (dateString: string) => {
  if (dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
    return formattedDate;
  }
};

const useDebounce = (value: any, delay: any) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
const table = ({ ...Props }: Props) => {
  const [tableData, setTableData] = useState(Props.tableData);
  const router = useRouter();
  const [loading, setLoading] = useState(true)
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchName, setSearchName] = useState('')
  const total_event_list = 12;
  const [event_requestor, setEventRequestor] = useState('');
  const [requestor_dropdown, setEventRequestorDropdown] = useState(Props.eventrequestor);
  const [checkstate, setCheckstate] = useState(false)

  const debouncedSearchName = useDebounce(searchName, 300);

  const fetchTableData = async () => {
    setLoading(true)
    console.log
    try {
      const Data = await fetch(
        `/api/event_approval_list`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({
            search_name: debouncedSearchName,
            startDate: startDate,
            endDate: endDate,
            pageNo: currentPage,
            status: status,
            requestor: event_requestor,
          })
        }
      );
      if (Data.ok) {
        const data = await Data.json();
        console.log('data.data.events', data.data.events)
        setTableData(data.data.events)
        setLoading(false)
      } else {
        setLoading(false)
      }
    } catch (error) {
      setLoading(false);
      console.log(error, "something went wrong");
    }
  };

  useEffect(() => {
    fetchTableData();
  }, [])

  useEffect(() => {
    fetchTableData();
  }, [currentPage, debouncedSearchName, status])

  const handleTypeChange = (e: any) => {
    console.log(e, 'e')
    if (e == 'all') {
      setStatus('')
    } else {
      setStatus(e);
    }
  };
  const handleExportButton = () => {
    exportEventList();
  };

  const exportEventList = async () => {
    try {
      const Data = await fetch(
        `/api/exportList`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({
            search_name: debouncedSearchName,
            status: status,
            api_name: 'Pre Activity List',
            startDate: startDate,
            endDate: endDate,
          })
        }
      );
      if (Data.ok) {
        const data = await Data.json();
        window.open(`${data.message}`, '_blank', 'noopener,noreferrer');
      }

    } catch (error) {
      console.log(error, "something went wrong");
    }
  };

  const togglePicker = () => {
    setIsPickerOpen(!isPickerOpen);
  };

  const handlesearchname = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(value)
    setTimeout(() => {
      setSearchName(value);
    }, 100);
  }

  const handlecheckchange = (e: any) => {
    console.log(e.target.checked)
    // setCheckstate(e.target.checked)
    if (e.target.checked) {
      setStatus('pending');
    } else {
      setStatus('');
    }
  };

  console.log(event_requestor, 'event_requestor')
  console.log(status, 'status')
  return (
    <TooltipProvider>
      <div className="p-7 w-full  z-20 text-black">
        <div className="flex lg:justify-between flex-col-reverse lg:flex-row pb-5 lg:gap-3">
          <Input
            className="lg:w-[30%] md:w-full sm:w-full rounded-[50px] bg-[#ecf2ff]"
            placeholder="Search Request Number ..."
            name='search_name'
            onChange={(e) => { handlesearchname(e) }}
          />
          <div className="flex justify-end lg:gap-5 sm:gap-[10px] gap-[8px] items-center">
            <Requestor_filter setEventRequestor={setEventRequestor} requestor_dropdown={requestor_dropdown} event_requestor={event_requestor} fetchTableData={fetchTableData} />
            <Button className="text-black w-34 shadow border hover:shadow-md active:shadow-lg lg:text-sm lg:rounded-[25px] lg:gap-4 sm:rounded-[50px] rounded-[50px] sm:text-[9px] sm:gap-[10px] gap-[9px] sm:font-normal sm:leading-[10.97px] text-[9px]" onClick={handleExportButton}>Export</Button>
            <Select onValueChange={(e) => handleTypeChange(e)} value={status ? status : 'all'} >
              <SelectTrigger className="text-black w-34 shadow focus-visible:ring-transparent lg:text-sm lg:rounded-[25px] lg:gap-4 sm:rounded-[50px] rounded-[50px] sm:text-[9px] sm:gap-[10px]  gap-[9px] sm:font-normal sm:leading-[10.97px] text-[9px]">
                <SelectValue placeholder="Status" className="cursor-pointer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="awaiting approval">Awaiting Approval</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="send back">Sendback</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <DatePicker startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} isPickerOpen={isPickerOpen} togglePicker={togglePicker} fetchTableData={fetchTableData} />
            <label className="inline-flex items-center cursor-pointer">
              <input
                id='airplane-mode'
                type="checkbox"
                checked={status == 'pending' ? true : false}
                onChange={(e) => handlecheckchange(e)}
                className="sr-only peer"
              />
              <span
                className={`relative w-14 h-8 transition-all duration-300 ease-in-out rounded-full ${status == 'pending' ? 'bg-[#2196F3]' : 'bg-gray-300'
                  } peer-checked:bg-[#2196F3]`}
              >
                <span
                  className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 ease-in-out ${status == 'pending' ? 'translate-x-6' : 'translate-x-0'
                    }`}
                />
              </span>
            </label>
            <Label htmlFor="airplane-mode">Ready For Approval</Label>
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
                    "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                  }
                >
                  Level 7
                </TableHead>
                <TableHead
                  className={
                    "text-center rounded-r-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat'] sticky right-0 z-10 bg-[#E0E9FF]"
                  }
                >Action</TableHead>
              </TableRow>
            </TableHeader>
            {
              loading ? <TableBody><TableRow ><TableCell colSpan={10} ><>
                <div className='flex items-center justify-center'>
                  <Loader2 className=" mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </div>
              </></TableCell></TableRow></TableBody> :
                tableData.length > 0 ?
                  <TableBody className="">
                    {tableData &&
                      tableData?.map((data: any, index: number) => {
                        return (
                          <TableRow key={index} className="text-center text-nowrap">
                            <TableCell>{data.name ?? "-"}</TableCell>
                            <TableCell>{data.event_name ?? "-"}</TableCell>
                            <TableCell> {data.event_type ?? "-"}</TableCell>
                            <TableCell>{FormatDate(data.event_start_date) ?? "-"}</TableCell>
                            <TableCell>{FormatDate(data.event_end_date) ?? "-"}</TableCell>
                            <TableCell>{data.total_estimated_expense}</TableCell>
                            <TableCell>{data.event_requestor ?? "-"}</TableCell>
                            <TableCell>{data.owner ?? "-"}</TableCell>
                            <TableCell>
                              <div className="flex flex-col items-center">
                                {data.level1}
                                {
                                  data.level1 != null &&
                                  (data.status1 == "Approved" ?

                                    <Tooltip>
                                      <TooltipTrigger className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                                        A
                                        <TooltipContent className="bg-white">
                                          <p>Approved</p>
                                        </TooltipContent>
                                      </TooltipTrigger>
                                    </Tooltip>
                                    : data.status1 == "Pending" ?
                                      <Tooltip>
                                        <TooltipTrigger className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                                          W
                                          <TooltipContent className="bg-white">
                                            <p>Waiting</p>
                                          </TooltipContent>
                                        </TooltipTrigger>
                                      </Tooltip>
                                      : data.status1 == "Rejected" ?
                                        <Tooltip>
                                          <TooltipTrigger className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                                            RJ
                                            <TooltipContent className="bg-white">
                                              <p>Rejected</p>
                                            </TooltipContent>
                                          </TooltipTrigger>
                                        </Tooltip>
                                        :
                                        <Tooltip>
                                          <TooltipTrigger className="w-6 rounded-md bg-[#adadfe] text-[#363d9a] text-[15px] font-semibold">
                                            SB
                                            <TooltipContent className="bg-white">
                                              <p>Send Back</p>
                                            </TooltipContent>
                                          </TooltipTrigger>
                                        </Tooltip>

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
                                  data.level2 != null &&
                                  (data.status2 == "Approved" ?

                                    <Tooltip>
                                      <TooltipTrigger className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                                        A
                                        <TooltipContent className="bg-white">
                                          <p>Approved</p>
                                        </TooltipContent>
                                      </TooltipTrigger>
                                    </Tooltip>
                                    : data.status2 == "Pending" ?
                                      <Tooltip>
                                        <TooltipTrigger className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                                          W
                                          <TooltipContent className="bg-white">
                                            <p>Waiting</p>
                                          </TooltipContent>
                                        </TooltipTrigger>
                                      </Tooltip>
                                      : data.status2 == "Rejected" ?
                                        <Tooltip>
                                          <TooltipTrigger className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                                            RJ
                                            <TooltipContent className="bg-white">
                                              <p>Rejected</p>
                                            </TooltipContent>
                                          </TooltipTrigger>
                                        </Tooltip>
                                        :
                                        <Tooltip>
                                          <TooltipTrigger className="w-6 rounded-md bg-[#adadfe] text-[#363d9a] text-[15px] font-semibold">
                                            SB
                                            <TooltipContent className="bg-white">
                                              <p>Send Back</p>
                                            </TooltipContent>
                                          </TooltipTrigger>
                                        </Tooltip>

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
                                  data.level3 != null &&
                                  (data.status3 == "Approved" ?
                                    <Tooltip>
                                      <TooltipTrigger className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                                        A
                                        <TooltipContent className="bg-white">
                                          <p>Approved</p>
                                        </TooltipContent>
                                      </TooltipTrigger>
                                    </Tooltip>
                                    : data.status3 == "Pending" ?
                                      <Tooltip>
                                        <TooltipTrigger className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                                          W
                                          <TooltipContent className="bg-white">
                                            <p>Waiting</p>
                                          </TooltipContent>
                                        </TooltipTrigger>
                                      </Tooltip>
                                      : data.status3 == "Rejected" ?
                                        <Tooltip>
                                          <TooltipTrigger className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                                            RJ
                                            <TooltipContent className="bg-white">
                                              <p>Rejected</p>
                                            </TooltipContent>
                                          </TooltipTrigger>
                                        </Tooltip>
                                        :
                                        <Tooltip>
                                          <TooltipTrigger className="w-6 rounded-md bg-[#adadfe] text-[#363d9a] text-[15px] font-semibold">
                                            SB
                                            <TooltipContent className="bg-white">
                                              <p>Send Back</p>
                                            </TooltipContent>
                                          </TooltipTrigger>
                                        </Tooltip>

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
                                  data.level4 != null &&
                                  (data.status4 == "Approved" ?
                                    <Tooltip>
                                      <TooltipTrigger className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                                        A
                                        <TooltipContent className="bg-white">
                                          <p>Approved</p>
                                        </TooltipContent>
                                      </TooltipTrigger>
                                    </Tooltip>
                                    : data.status4 == "Pending" ?
                                      <Tooltip>
                                        <TooltipTrigger className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                                          W
                                          <TooltipContent className="bg-white">
                                            <p>Waiting</p>
                                          </TooltipContent>
                                        </TooltipTrigger>
                                      </Tooltip>
                                      : data.status4 == "Rejected" ?
                                        <Tooltip>
                                          RJ
                                          <TooltipTrigger className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                                            <TooltipContent className="bg-white">
                                              <p>Rejected</p>
                                            </TooltipContent>
                                          </TooltipTrigger>
                                        </Tooltip>
                                        :
                                        <Tooltip>
                                          <TooltipTrigger className="w-6 rounded-md bg-[#adadfe] text-[#363d9a] text-[15px] font-semibold">
                                            SB
                                            <TooltipContent className="bg-white">
                                              <p>Send Back</p>
                                            </TooltipContent>
                                          </TooltipTrigger>
                                        </Tooltip>

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
                                  data.level5 != null &&
                                  (data.status5 == "Approved" ?
                                    <Tooltip>
                                      <TooltipTrigger className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                                        A
                                        <TooltipContent className='bg-white'>
                                          <p>Approved</p>
                                        </TooltipContent>
                                      </TooltipTrigger>
                                    </Tooltip>
                                    : data.status5 == "Pending" ?
                                      <Tooltip>
                                        <TooltipTrigger className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                                          W
                                          <TooltipContent className='bg-white'>
                                            <p>Waiting</p>
                                          </TooltipContent>
                                        </TooltipTrigger>
                                      </Tooltip>
                                      : data.status5 == "Rejected" ?
                                        <Tooltip>
                                          <TooltipTrigger className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                                            RJ
                                            <TooltipContent className='bg-white'>
                                              <p>Rejected</p>
                                            </TooltipContent>
                                          </TooltipTrigger>
                                        </Tooltip>
                                        :
                                        <Tooltip>
                                          <TooltipTrigger className="w-6 rounded-md bg-[#adadfe] text-[#363d9a] text-[15px] font-semibold">
                                            SB
                                            <TooltipContent>
                                              <p>Send Back</p>
                                            </TooltipContent>
                                          </TooltipTrigger>
                                        </Tooltip>

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
                                  data.level6 != null &&
                                  (data.status6 == "Approved" ?
                                    <Tooltip>
                                      <TooltipTrigger className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                                        A
                                        <TooltipContent className='bg-white'>
                                          <p>Approved</p>
                                        </TooltipContent>
                                      </TooltipTrigger>
                                    </Tooltip>
                                    : data.status6 == "Pending" ?
                                      <Tooltip>
                                        <TooltipTrigger className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                                          W
                                          <TooltipContent className='bg-white'>
                                            <p>Waiting</p>
                                          </TooltipContent>
                                        </TooltipTrigger>
                                      </Tooltip>
                                      : data.status6 == "Rejected" ?
                                        <Tooltip>
                                          <TooltipTrigger className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                                            RJ
                                            <TooltipContent className='bg-white'>
                                              <p>Rejected</p>
                                            </TooltipContent>
                                          </TooltipTrigger>
                                        </Tooltip>
                                        :
                                        <Tooltip>
                                          <TooltipTrigger className="w-6 rounded-md bg-[#adadfe] text-[#363d9a] text-[15px] font-semibold">
                                            SB
                                            <TooltipContent className='bg-white'>
                                              <p>Send Back</p>
                                            </TooltipContent>
                                          </TooltipTrigger>
                                        </Tooltip>

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
                                  data.level7 != null &&
                                  (data.status7 == "Approved" ?
                                    <Tooltip>
                                      <TooltipTrigger className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                                        A
                                        <TooltipContent className='bg-white'>
                                          <p>Approved</p>
                                        </TooltipContent>
                                      </TooltipTrigger>
                                    </Tooltip>
                                    : data.status7 == "Pending" ?
                                      <Tooltip>
                                        <TooltipTrigger className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                                          W
                                          <TooltipContent>
                                            <p>Waiting</p>
                                          </TooltipContent>
                                        </TooltipTrigger>
                                      </Tooltip>
                                      : data.status7 == "Rejected" ?
                                        <Tooltip>
                                          <TooltipTrigger className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                                            RJ
                                            <TooltipContent className='bg-white'>
                                              <p>Rejected</p>
                                            </TooltipContent>
                                          </TooltipTrigger>
                                        </Tooltip>
                                        :
                                        <Tooltip>
                                          <TooltipTrigger className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                                            SB
                                            <TooltipContent className='bg-white'>
                                              <p>Send Back</p>
                                            </TooltipContent>
                                          </TooltipTrigger>
                                        </Tooltip>

                                  )}
                                {
                                  data.level7 == null && <span>N/A</span>
                                }

                              </div>

                            </TableCell>
                            <TableCell className="sticky right-0 bg-[white] z-20 ">
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

                  :
                  <TableBody>
                    <TableRow ><TableCell colSpan={10} className='text-center'>No Results.</TableCell></TableRow>
                  </TableBody>
            }
          </Table>
        </div>
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} total_event_list={total_event_list} />
      </div>
    </TooltipProvider>
  )
}

export default table