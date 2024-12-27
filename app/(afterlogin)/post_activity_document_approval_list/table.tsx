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
import Pagination from "@/components/eventList/pagination";
import DatePicker from "@/app/(afterlogin)/event_list/date-picker"
import { FormatDate } from '@/app/utility/dateFormatter';
type Props = {
  tableData: any;
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
  const [tableData, setTableData] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true)
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchName, setSearchName] = useState('')
  const total_event_list = 12;
  // useEffect(() => {
  //   if (Props.tableData) {
  //     setLoading(false);
  //   }
  //   setLoading(false);
  // }, [Props.tableData]);


  const debouncedSearchName = useDebounce(searchName, 300);

  const fetchTableData = async () => {
    setLoading(true)
    console.log
    try {
      const Data = await fetch(
        `/api/post_activity_document_approval_list`,
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
  }, [currentPage, debouncedSearchName])

  const handleTypeChange = (value: string) => {
    setStatus(value);
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
            api_name: 'Post Activity List',
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
    }, 1000);
  }

  return (
    <div className="p-7 w-full relative z-20 text-black">
      <div className="flex justify-between pb-5">
        <Input
          className="lg:w-[40%] md:w-full sm:w-full rounded-[50px] bg-[#ecf2ff]"
          placeholder="Search Request Number ..."
          name='search_name'
          onChange={(e) => { handlesearchname(e) }}
        />
        <div className="flex justify-end lg:gap-5 sm:gap-[10px] gap-[8px] items-center">
          <Button className="text-black w-34 shadow border hover:shadow-md active:shadow-lg lg:text-sm lg:rounded-[25px] lg:gap-4 sm:rounded-[50px] rounded-[50px] sm:text-[9px] sm:gap-[10px] gap-[9px] sm:font-normal sm:leading-[10.97px] text-[9px]" onClick={handleExportButton}>Export as Excel</Button>
          <Select onValueChange={() => handleTypeChange}>
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
          <DatePicker startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} isPickerOpen={isPickerOpen} togglePicker={togglePicker} fetchTableData={fetchTableData} />
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
                  "text-center rounded-r-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat'] sticky right-0 z-50 bg-[#E0E9FF]"
                }
              >Action</TableHead>
            </TableRow>
          </TableHeader>
          {
            loading ? <TableBody><TableRow ><TableCell colSpan={11} ><>
              <div className='flex items-center justify-center'>
                <Loader2 className=" mr-2 h-4 w-4 animate-spin" />
                Loading...
              </div>
            </></TableCell></TableRow></TableBody> :
              tableData.length > 0 ?
                <TableBody className="">
                  {tableData &&
                    tableData.map((data: any, index: number) => {
                      return (
                        <TableRow key={index} className="text-center text-nowrap">
                          <TableCell>{data.name ?? "-"}</TableCell>
                          <TableCell>{data.event_type ?? "-"} </TableCell>
                          <TableCell>{data.event_name ?? "-"}</TableCell>
                          <TableCell>{FormatDate(data.event_start_date) ?? "-"}</TableCell>
                          <TableCell>{FormatDate(data.event_end_date) ?? "-"}</TableCell>
                          <TableCell>{data.total_expense ?? "-"}</TableCell>
                          <TableCell>{data.event_requestor ?? "-"}</TableCell>
                          <TableCell>{data.owner ?? "-"}</TableCell>

                          <TableCell>
                            <div className="flex flex-col items-center">
                              {data.level1}
                              {
                                data.level1 != null &&
                                (data.status1 == "Approved" ?
                                  <span className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                                    A
                                  </span>
                                  : data.status1 == "Pending" ?
                                    <span className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                                      W
                                    </span>
                                    : data.status1 == "Rejected" ?
                                      <span className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                                        RJ
                                      </span>
                                      :
                                      <span className="w-6 rounded-md bg-[#adadfe] text-[#363d9a] text-[15px] font-semibold">
                                        SB
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
                                data.level2 != null &&
                                (data.status2 == "Approved" ?
                                  <span className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                                    A
                                  </span>
                                  : data.status2 == "Pending" ?
                                    <span className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                                      W
                                    </span>
                                    : data.status2 == "Rejected" ?
                                      <span className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                                        RJ
                                      </span>
                                      :
                                      <span className="w-6 rounded-md bg-[#adadfe] text-[#363d9a] text-[15px] font-semibold">
                                        SB
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
                                data.level3 != null &&
                                (data.status3 == "Approved" ?
                                  <span className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                                    A
                                  </span>
                                  : data.status3 == "Pending" ?
                                    <span className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                                      W
                                    </span>
                                    : data.status3 == "Rejected" ?
                                      <span className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                                        RJ
                                      </span>
                                      :
                                      <span className="w-6 rounded-md bg-[#adadfe] text-[#363d9a] text-[15px] font-semibold">
                                        SB
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
                                data.level4 != null &&
                                (data.status4 == "Approved" ?
                                  <span className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                                    A
                                  </span>
                                  : data.status4 == "Pending" ?
                                    <span className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                                      W
                                    </span>
                                    : data.status4 == "Rejected" ?
                                      <span className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                                        RJ
                                      </span>
                                      :
                                      <span className="w-6 rounded-md bg-[#adadfe] text-[#363d9a] text-[15px] font-semibold">
                                        SB
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
                                data.level5 != null &&
                                (data.status5 == "Approved" ?
                                  <span className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                                    A
                                  </span>
                                  : data.status5 == "Pending" ?
                                    <span className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                                      W
                                    </span>
                                    : data.status5 == "Rejected" ?
                                      <span className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                                        RJ
                                      </span>
                                      :
                                      <span className="w-6 rounded-md bg-[#adadfe] text-[#363d9a] text-[15px] font-semibold">
                                        SB
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
                                data.level6 != null &&
                                (data.status6 == "Approved" ?
                                  <span className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                                    A
                                  </span>
                                  : data.status6 == "Pending" ?
                                    <span className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                                      W
                                    </span>
                                    : data.status6 == "Rejected" ?
                                      <span className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                                        RJ
                                      </span>
                                      :
                                      <span className="w-6 rounded-md bg-[#adadfe] text-[#363d9a] text-[15px] font-semibold">
                                        SB
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
                                data.level7 != null &&
                                (data.status7 == "Approved" ?
                                  <span className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                                    A
                                  </span>
                                  : data.status7 == "Pending" ?
                                    <span className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                                      W
                                    </span>
                                    : data.status7 == "Rejected" ?
                                      <span className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                                        RJ
                                      </span>
                                      :
                                      <span className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                                        SB
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
                                <button className="border rounded-full px-4 py-1 border-[#0e4154] text-[#0e4154]" onClick={() => { router.push(`/post_activity_document_approval?refno=${data.name}`) }}>Take Action</button>
                              }
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
                :
                <TableBody>
                  <TableRow ><TableCell colSpan={11} className='text-center'>No Results.</TableCell></TableRow>
                </TableBody>
          }
        </Table>
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} total_event_list={total_event_list} />
    </div>
  )
}

export default table