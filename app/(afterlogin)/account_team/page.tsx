"use client";
import { Loader2 } from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import Link from "next/link";
import { useState, useEffect } from "react";
import DatePicker from "../event_list/date-picker"
import Pagination from "@/components/eventList/pagination";
import { FormatDate } from '@/app/utility/dateFormatter';
type EventDetails = {
  name: string;
  event_type: string;
  event_name: string;
  event_start_date: string; 
  event_end_date: string; 
  event_requestor: string;
  event_venue: string;
  current_stage: string;
  total_amount: number;
  owner: number;
};

export const formatDate = (dateString?: string) => {
  if (dateString) {
    const [year, month, day] = dateString?.split('-').map(Number);
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
export default function BudgetRequestPage() {
const [tableData,setTableData] = useState<EventDetails[]>([])
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const total_event_list = 12;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState('')
  const [status, setStatus] = useState('');
  const togglePicker = () => {
    setIsPickerOpen(!isPickerOpen);
  };
  const handleExportButton = () => {
    exportEventList();
  };

  const debouncedSearchName = useDebounce(searchName, 100);

  const fetchTableData = async () => {
    console.log('insode api fetch data')
    setLoading(true)
    try {
      const Data = await fetch(
        `/api/travel_desk/travelList`,
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
            status: status
          })
        }
      );
      if (Data.ok) {
        const data = await Data.json();
        console.log(data,"inside api data")
        setTableData(data.message)
        setLoading(false)
      } else {
        setLoading(false)
      }
    } catch (error) {
      setLoading(false);
      console.log(error, "something went wrong");
    }
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
            api_name: 'Event List',
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


  const handleTypeChange = (e: any) => {
    console.log(e, 'e')
    if (e == 'all') {
      setStatus('')
    } else {

      setStatus(e);
    }
  };

  const handlesearchname = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(value)
    setTimeout(() => {
      setSearchName(value);
    }, 1000);
  }

  useEffect(() => {
    fetchTableData()
  }, [])

  useEffect(() => {
    fetchTableData()
  }, [currentPage, debouncedSearchName, status])

  console.log(tableData,"this is table data")


  return (
    <div className="p-7 w-full relative z-20 text-black">
      <div className="flex lg:justify-between flex-col-reverse lg:flex-row pb-5 gap-5 lg:gap-0">
        <Input
          className="lg:w-[40%] md:w-full sm:w-full rounded-[50px] bg-[#ecf2ff]"
          placeholder="Search Request Number ..."
          name='search_name'
          onChange={(e) => { handlesearchname(e) }}

        />

        <div className="flex justify-end lg:gap-5 sm:gap-[10px] gap-[8px] items-center">
          <Button className="text-black w-34 shadow border hover:shadow-md active:shadow-lg lg:text-sm lg:rounded-[25px] lg:gap-4 sm:rounded-[50px] rounded-[50px] sm:text-[9px] sm:gap-[10px] gap-[9px] sm:font-normal sm:leading-[10.97px] text-[9px]" onClick={handleExportButton}>Export as Excel</Button>
          <Select onValueChange={(e) => handleTypeChange(e)} defaultValue="all">
            <SelectTrigger className="text-black w-34 shadow focus-visible:ring-transparent lg:text-sm lg:rounded-[25px] lg:gap-4 sm:rounded-[50px] rounded-[50px] sm:text-[9px] sm:gap-[10px]  gap-[9px] sm:font-normal sm:leading-[10.97px] text-[9px]">
              <SelectValue placeholder="Status" className="cursor-pointer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {/* <SelectItem value="draft">Draft</SelectItem> */}
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="sendback">Sendback</SelectItem>
              {/* <SelectItem value="executed">Executed</SelectItem> */}
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
              {/* <SelectItem value="postactivity">PostActivity Document Uploaded</SelectItem> */}
            </SelectContent>
          </Select>
          <DatePicker startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} isPickerOpen={isPickerOpen} togglePicker={togglePicker} fetchTableData={fetchTableData} />
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
          {
            loading ? <TableBody><TableRow ><TableCell colSpan={9} ><>
              <div className='flex items-center justify-center'>
                <Loader2 className=" mr-2 h-4 w-4 animate-spin" />
                Loading...
              </div>
            </></TableCell></TableRow></TableBody> :
              tableData && tableData?.length > 0 ?
                <TableBody>
                  {tableData &&
                    tableData.map((data, index) => {
                      return (
                        <TableRow key={index} className="text-center text-nowrap lg:text-[16px] sm:text-[10px] text-[10px] font-light leading-normal font-['Poppins']">
                          <TableCell>{data.name ?? "-"}</TableCell>
                          <TableCell className="truncate max-w-[300px]">{data.event_name ?? "-"}</TableCell>
                          <TableCell>{data.event_type ?? "-"}</TableCell>
                          <TableCell>{FormatDate(data.event_start_date) ?? "-"}</TableCell>
                          <TableCell>{FormatDate(data.event_end_date) ?? "-"} </TableCell>
                          <TableCell>{data.event_requestor ?? "-"}</TableCell>
                          <TableCell>{data.owner ?? "-"}</TableCell>
                          <TableCell className="truncate max-w-[300px]">{data.event_venue ?? "-"}</TableCell>
                          <TableCell className="sticky right-0 bg-[white] flex border-l items-center border-slate-200">
                            <Link href={`/account_team/${data.name}`}>
                              <button className="border rounded-full px-4 py-1 border-[#0E4154] text-[#0E4154] hover:text-white hover:bg-[#0E4154] active:text-white active:bg-[#0E4154] transition-all delay-100">Take Action</button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody> : <TableBody><TableRow><TableCell colSpan={9} ><div className="flex justify-center items-center">No Result.</div></TableCell></TableRow></TableBody>
          }
        </Table>
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} total_event_list={total_event_list} />
    </div>
  );
};


