'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';

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
    total_compensation_expense:number;
    total_logistics_expense:number;
    total_estimated_expense:number;
    event_venue: string;
    current_stage: string;
    owner:string;
    post_expense_approvers: post_expense_approvers;
};


export default function Page() {
    const [postExpenseApprovalList, setPostExpenseApprovalList] = useState<Array<EventTable>>();
    const router = useRouter();
    
    const PostExpenseApprovalList = async () => {
        try {
            const response = await fetch("/api/advanceApproval/list", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setPostExpenseApprovalList(data.message);
            } else {
                console.log('Error fetching data');
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    useEffect(() => {
        PostExpenseApprovalList();
    }, [])

    console.log(postExpenseApprovalList,'postExpenseApprovalList')
    return (
        <>

            <div className="p-7 w-full relative z-20 text-black">
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
                                   Status
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
                                        "text-center rounded-r-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat'] sticky right-0 z-50 bg-[#E0E9FF]"
                                    }
                                >Action</TableHead>
                            </TableRow>
                        </TableHeader>

                        {
                            postExpenseApprovalList ?
                                <TableBody>
                                    {postExpenseApprovalList &&
                                        postExpenseApprovalList?.map((data, index) => {
                                            return (
                                                <TableRow key={index} className="text-center text-nowrap">
                                                    <TableCell>{data.name ?? "-"}</TableCell>
                                                    <TableCell>{data.event_name}</TableCell>
                                                    <TableCell>{data.event_type}</TableCell>
                                                    <TableCell>{data.event_start_date}</TableCell>
                                                    <TableCell>{data.total_compensation_expense ?? ""}</TableCell>
                                                    <TableCell>{data.total_logistics_expense ?? ""}</TableCell>
                                                    <TableCell>{data.total_estimated_expense ?? ""}</TableCell>
                                                    <TableCell>{data.event_requestor ?? ""}</TableCell>
                                                    <TableCell>{data.current_stage ?? ""}</TableCell>
                                                    <TableCell>{data.owner ?? ""}</TableCell>
                                                    <TableCell className="sticky right-0 bg-[white] z-50 ">
                                                        {/* { */}
                                                            {/* "Not" == "Approved" ? */}
                                                                {/* // <button className="border rounded-full px-4 py-1 border-[#0E4154] text-[#0E4154]" onClick={() => router.push(`/advance_payment/update_utr/${data.name}`)} >Update UTR</button> */}
                                                                {/* : */}
                                                                 <button className="border rounded-full px-4 py-1 border-[#0E4154] text-[#0E4154]" onClick={() => router.push(`/advance_payment/${data.name}`)} >Take Action</button>
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
