'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { useRouter } from 'nextjs-toploader/app';
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
import { FormatDate } from '@/app/utility/dateFormatter';
import Pagination from "@/components/eventList/pagination";
import DatePicker from "../event_list/date-picker";
import Requestor_filter from '@/components/dashboard/search_event_requestor_component'
import { Label } from "@/components/ui/label"

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
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [status, setStatus] = useState<string>();
    const total_event_list = 12;
    const [searchName, setSearchName] = useState('')
    const [formData, setFormData] = useState<FormData>(
        {
            name: ""
        }
    );
    const { role, name, userid, clearAuthData } = useAuth();
    const [event_requestor, setEventRequestor] = useState('');
    const [requestor_dropdown, setEventRequestorDropdown] = useState<[]>();
    const [checkstate, setCheckstate] = useState(false)

    const PostExpenseApprovalList = async () => {
        setTableLoading(true)
        try {
            const response = await fetch("/api/postExpenseApproval/list", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    startDate: startDate,
                    endDate: endDate,
                    pageNo: currentPage,
                    searchName: searchName,
                    requestor: event_requestor,
                })
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
    const fetchEventRequestor = async () => {
        try {
            const Data = await fetch(
                `/api/fetchEventRequestor`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                }
            );
            if (Data.ok) {
                const data = await Data.json();
                setEventRequestorDropdown(data.message)
            }
        } catch (error) {
            console.log(error, "something went wrong not able fetch requestor");
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

    const handlesearchname = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        console.log(value)
        setTimeout(() => {
            setSearchName(value);
        }, 100);
    }

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
                        status: status,
                        startDate: startDate,
                        endDate: endDate,
                        pageNo: currentPage,
                        search_name: searchName,
                        api_name: "Post Expense List"
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

    const handleDeletePopUp = async (value: string) => {
        setOpenDeletePopUp(true);
        formData.name = value;
        // handleClose();
    }

    useEffect(() => {
        PostExpenseApprovalList();
        fetchEventRequestor();
    }, [])

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

    const debouncedSearchName = useDebounce(searchName, 300);
    useEffect(() => {
        PostExpenseApprovalList();
    }, [currentPage, debouncedSearchName, status])


    const handleExportButton = () => {
        exportEventList();
    };
    console.log("List", postExpenseApprovalList);

    const handleTypeChange = (e: any) => {
        console.log(e, 'e')
        if (e == 'all') {
            setStatus('')
        } else {
            setStatus(e);
        }
    };
    const handlecheckchange = (e: any) => {
        console.log(e.target.checked)
        // setCheckstate(e.target.checked)
        if (e.target.checked) {
            setStatus('pending');
        } else {
            setStatus('');
        }
    };

    return (
        <>


            <div className="p-7 w-full relative z-20 text-black">
                <div className="flex justify-between pb-5 gap-5">
                    <Input
                        className="w-[40%] rounded-[50px] bg-[#ecf2ff]"
                        placeholder="Search"
                        onChange={(e) => { handlesearchname(e) }}
                    />
                    <div className="flex justify-end lg:gap-5 sm:gap-[10px] gap-[8px] items-center">
                        <Requestor_filter setEventRequestor={setEventRequestor} requestor_dropdown={requestor_dropdown} event_requestor={event_requestor} fetchTableData={PostExpenseApprovalList} />
                        <Button className="text-black w-34 shadow border hover:shadow-md active:shadow-lg lg:text-sm lg:rounded-[25px] lg:gap-4 sm:rounded-[50px] rounded-[50px] sm:text-[9px] sm:gap-[10px] gap-[9px] sm:font-normal sm:leading-[10.97px] text-[9px]" onClick={handleExportButton}>Export as Excel</Button>

                        <Select onValueChange={(e) => handleTypeChange(e)} value={status ? status : 'all'} >
                            <SelectTrigger className="text-black w-34 shadow focus-visible:ring-transparent lg:text-sm lg:rounded-[25px] lg:gap-4 sm:rounded-[50px] rounded-[50px] sm:text-[9px] sm:gap-[10px]  gap-[9px] sm:font-normal sm:leading-[10.97px] text-[9px]">
                                <SelectValue placeholder="Status" className="cursor-pointer" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="utr updated">UTR Updated</SelectItem>
                                <SelectItem value="utr pending">UTR Pending</SelectItem>
                                <SelectItem value="awaiting approval">Awaiting Approval</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="send back">Sendback</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                            </SelectContent>
                        </Select>
                        <DatePicker startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} isPickerOpen={isPickerOpen} togglePicker={togglePicker} fetchTableData={PostExpenseApprovalList} />
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
                                                        <TableCell>{FormatDate(data.event_start_date) ?? "-"}</TableCell>
                                                        <TableCell>{FormatDate(data.event_end_date) ?? "-"}</TableCell>
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
                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} total_event_list={total_event_list} />
            </div>
            <Toaster richColors position="top-right" />
            {
                openDeletePopUp && <DeletePopUp setClose={setOpenDeletePopUp} handleSubmit={handleClose} Loading={loading} text={"Are you sure you want to close this event?"} />
            }
        </>
    );
};

export default Index;
