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
import { useAuth } from "../../context/AuthContext";
import { Toaster, toast } from 'sonner';
import DeletePopUp from "@/components/deleteDialog";
import { Loader2 } from "lucide-react";

type EventTable = {
    name: string;
    event_name: string;
    event_type: string;
    event_start_date: string;
    event_end_date: string;
    total_amount: number;
    event_requestor: string;
    event_venue: string;
    current_stage: string;
    status: string;
    owner: string;
    travel_request_approved: boolean;
    total_estimated_expense: string;
    total_logistics_expense: string;
    total_compensation_expense: string;
};

type FormData = {
    name: string;
};

const Index = () => {
    const [postExpenseApprovalList, setPostExpenseApprovalList] = useState<Array<EventTable>>();
    const [openDeletePopUp, setOpenDeletePopUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tableloading, setTableLoading] = useState(true);
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>(
        {
            name: ""
        }
    );
    const { role, name, userid, clearAuthData } = useAuth();
    const PostExpenseApprovalList = async () => {
        setTableLoading(true)
        try {
            const response = await fetch("/api/postExpenseApproval/list", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setTableLoading(false)
                setPostExpenseApprovalList(data.message);
            } else {
                console.log('Error fetching data');
                setTableLoading(false)
            }
        } catch (error) {
            setTableLoading(false)
            console.error("Error during login:", error);
        }
    };
    const handleClose = async () => {
        const apiCallPromise = new Promise(async (resolve, reject) => {
            setLoading(true);
            try {
                const response = await fetch('/api/postExpenseApproval/closeTheEvent', {
                    method: "POST",
                    credentials: 'include',
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    setLoading(false);
                    throw new Error('Something went Wrong while closing the event');
                }

                const data = await response.json();
                resolve(data); // Resolve with the response data
            } catch (error) {
                setLoading(false)
                reject(error); // Reject with the error
            }
        });
        toast.promise(apiCallPromise, {
            loading: 'Closing the event...',
            success: (data) => {
                setLoading(false);
                setOpenDeletePopUp(false);

                setTimeout(() => {
                    PostExpenseApprovalList();
                }, 500);
                return `Event ${formData.name} has successfully been closed!`;
            },
            error: (error) => `Failed to add vendor: ${error.message || error}`,
        });
    }

    const handleDeletePopUp = async (value: string) => {
        setOpenDeletePopUp(true);
        formData.name = value;
        // handleClose();
    }

    useEffect(() => {
        PostExpenseApprovalList();
    }, [])

    console.log("List", postExpenseApprovalList);


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
                        {/* <Button className="text-black text-md font-normal bg-white hover:bg-white border rounded-[25px] px-8 py-5 hover:shadow-md transition-all delay-75 duration-100">
                            Back
                        </Button> */}
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
                                    Total Estimated Amount
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
                            tableloading ? <TableBody><TableRow ><TableCell colSpan={7} ><>
                                <div className='flex items-center justify-center'>
                                    <Loader2 className=" mr-2 h-4 w-4 animate-spin" />
                                    Loading...
                                </div>
                            </></TableCell></TableRow></TableBody> :
                               postExpenseApprovalList && postExpenseApprovalList.length > 0 ?
                               <TableBody>
                                   {postExpenseApprovalList &&
                                       postExpenseApprovalList.map((data, index) => {
                                           return (
                                               <TableRow key={index} className="text-center text-nowrap">
                                                   <TableCell>{data.name ?? "-"}</TableCell>
                                                   <TableCell>{data.event_name ?? "-"}</TableCell>
                                                   <TableCell>{data.event_type ?? "-"}</TableCell>
                                                   <TableCell>{data.event_start_date ?? "-"}</TableCell>
                                                   <TableCell>{data.event_end_date ?? "-"}</TableCell>
                                                   <TableCell>{data.total_compensation_expense ?? ""}</TableCell>
                                                   <TableCell>{data.total_logistics_expense ?? ""}</TableCell>
                                                   <TableCell>{data.total_estimated_expense ?? ""}</TableCell>
                                                   <TableCell>{data.total_amount ?? ""}</TableCell>
                                                   <TableCell>{data.event_requestor ?? "-"}</TableCell>
                                                   <TableCell>{data.owner ?? "-"}</TableCell>
                                                   <TableCell>{data.current_stage ?? "-"}</TableCell>
                                                   <TableCell className={(data.travel_request_approved == true && role == "Event Finance") ? 'sticky right-0 bg-[white] z-50 space-x-2 border-l border-slate-200' : 'sticky right-0 bg-[white] z-50 border-l border-slate-200 space-x-2'}>
   
                                                       <Button className="border rounded-full px-4 py-1 border-[#0E4154] text-[#0E4154] hover:text-white hover:bg-[#0E4154] active:text-white active:bg-[#0E4154] transition-all delay-100" onClick={() => router.push(`/post_expense_approval/${data.name}`)} >Take Action</Button>
   
                                                       {
                                                           (data.travel_request_approved == true && role == "Event Finance" && data.status != "Closed") ?
                                                               <Button className="border rounded-full px-4 py-1 border-red-600 text-red-600 hover:text-white hover:bg-red-600 transition-all delay-100" onClick={() => handleDeletePopUp(data.name)} >Close</Button>
                                                               :
                                                               <Button className="border rounded-full px-4 py-1 border-red-600 text-red-600 hover:text-white hover:bg-red-600 transition-all delay-100 disabled:cursor-not-allowed" disabled>Close</Button>
                                                       }
   
                                                   </TableCell>
                                               </TableRow>
                                           );
                                       })}
                               </TableBody>
                               :
                               <TableBody>
                                   <TableRow className="text-center text-black text-nowrap ">
                                       <TableCell colSpan={7}>No Results</TableCell>
                                   </TableRow>
                               </TableBody>
                        }
                    </Table>
                </div>
            </div>
            <Toaster richColors position="top-right" />
            {
                openDeletePopUp && <DeletePopUp setClose={setOpenDeletePopUp} handleSubmit={handleClose} Loading={loading} text={"Are you sure you want to close this event?"} />
            }
        </>
    );
};

export default Index;
