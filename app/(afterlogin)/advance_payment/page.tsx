'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { useRouter } from 'nextjs-toploader/app';
import { Loader2 } from "lucide-react";
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
import { FormatDate } from '@/app/utility/dateFormatter';
import DatePicker from '../event_list/date-picker'
type post_expense_approvers = {
    level1: string;
    level2: string;
    level3: string;
    level4: string;
    level5: string;
    level6: string;
    level7: string;
    status: string;
}[];

type EventTable = {
    name: string;
    event_name: string;
    event_type: string;
    event_start_date: string;
    event_end_date: string;
    total_expense: number;
    event_requestor: string;
    total_compensation_expense: number;
    total_logistics_expense: number;
    total_estimated_expense: number;
    event_venue: string;
    current_stage: string;
    owner: string;
    post_expense_approvers: post_expense_approvers;
};


export default function Page() {
    const [postExpenseApprovalList, setPostExpenseApprovalList] = useState<Array<EventTable>>();
    const router = useRouter();
    const [loading, setLoading] = useState(true)
    const [startDate, setStartDate] = useState<string>('');
     const [endDate, setEndDate] = useState<string>('');
     const [isPickerOpen, setIsPickerOpen] = useState(false);
     const [currentPage, setCurrentPage] = useState<number>(1);
    const PostExpenseApprovalList = async () => {
        setLoading(true)
        try {
            const response = await fetch("/api/advanceApproval/list", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                // body: JSON.stringify({
                //     activity: "Pre Activity",
                //     startDate: startDate,
                //     endDate: endDate,
                //     pageNo: currentPage,
                //   })
            });

            if (response.ok) {
                const data = await response.json();
                setPostExpenseApprovalList(data.message);
                setLoading(false)
            } else {
                console.log('Error fetching data');
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            console.error("Error during login:", error);
        }
    };

    const handleExportButton = () => {
        exportEventList();
    };
    useEffect(() => {
        PostExpenseApprovalList();
    }, [])

    const togglePicker = () => {
        setIsPickerOpen(!isPickerOpen);
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
                // activity: "Pre Activity",
                startDate: startDate,
                endDate: endDate,
                // pageNo: currentPage,
    
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
        useEffect(() => {
            PostExpenseApprovalList();
        }, [currentPage])
    console.log(postExpenseApprovalList, 'postExpenseApprovalList')
    return (
        <>

            <div className="p-7 w-full relative z-20 text-black">
                <div className="flex justify-between pb-5">
                    <Input
                        className="w-[40%] rounded-[50px] bg-[#ecf2ff]"
                        placeholder="Search"
                    />
                    <div className="flex justify-end lg:gap-5 sm:gap-[10px] gap-[8px] items-center">
                              <Button className="text-black w-34 shadow border hover:shadow-md active:shadow-lg lg:text-sm lg:rounded-[25px] lg:gap-4 sm:rounded-[50px] rounded-[50px] sm:text-[9px] sm:gap-[10px] gap-[9px] sm:font-normal sm:leading-[10.97px] text-[9px]" onClick={handleExportButton}>Export as Excel</Button>
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
                              <DatePicker startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} isPickerOpen={isPickerOpen} togglePicker={togglePicker} fetchTableData={PostExpenseApprovalList} />
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
                                    Total Compensation Amount
                                </TableHead>
                                <TableHead
                                    className={
                                        "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                    }
                                >
                                    Total Logistics Amount
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
                                    Status
                                </TableHead>
                                <TableHead
                                    className={
                                        "text-center rounded-r-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat'] sticky right-0 z-50 bg-[#E0E9FF]"
                                    }
                                >Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        {
                            loading ? <TableBody><TableRow ><TableCell colSpan={7} ><>
                                <div className='flex items-center justify-center'>
                                    <Loader2 className=" mr-2 h-4 w-4 animate-spin" />
                                    Loading...
                                </div>
                            </></TableCell></TableRow></TableBody> :
                               postExpenseApprovalList ?
                               <TableBody>
                                   {postExpenseApprovalList &&
                                       postExpenseApprovalList?.map((data, index) => {
                                           return (
                                               <TableRow key={index} className="text-center text-nowrap">
                                                   <TableCell>{data.name ?? "-"}</TableCell>
                                                   <TableCell>{data.event_name ?? "-"}</TableCell>
                                                   <TableCell>{data.event_type ?? "-"}</TableCell>
                                                   <TableCell>{FormatDate(data.event_start_date) ?? "-"}</TableCell>
                                                   <TableCell>{FormatDate(data.event_end_date) ?? "-"}</TableCell>
                                                   <TableCell>{data.total_compensation_expense ?? ""}</TableCell>
                                                   <TableCell>{data.total_logistics_expense ?? ""}</TableCell>
                                                   <TableCell>{data.total_estimated_expense ?? ""}</TableCell>
                                                   <TableCell>{data.event_requestor ?? ""}</TableCell>
                                                   <TableCell>{data.owner ?? ""}</TableCell>
                                                   <TableCell>{data.current_stage ?? ""}</TableCell>
                                                   <TableCell className="sticky right-0 bg-[white] z-50 ">
                                                       {/* { */}
                                                       {/* "Not" == "Approved" ? */}
                                                       {/* // <button className="border rounded-full px-4 py-1 border-[#0E4154] text-[#0E4154]" onClick={() => router.push(`/advance_payment/update_utr/${data.name}`)} >Update UTR</button> */}
                                                       {/* : */}
                                                       <button className="border rounded-full px-4 py-1 border-[#0E4154] text-[#0E4154] hover:text-white hover:bg-[#0E4154] active:text-white active:bg-[#0E4154] transition-all delay-100" onClick={() => router.push(`/advance_payment/${data.name}`)} >Take Action</button>
                                                       {/* } */}
                                                   </TableCell>
                                               </TableRow>
                                           );
                                       })}
                               </TableBody>

                               :
                               <TableBody>
                                   <TableRow className="text-center text-nowrap">
                                       <TableCell className="" colSpan={7}>No Result</TableCell>
                                   </TableRow>

                               </TableBody>
                        }
                    </Table>
                </div>
            </div>

        </>
    );
};
