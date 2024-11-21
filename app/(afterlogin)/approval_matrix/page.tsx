'use client';
import React from "react";
import Image from "next/image";
import { useState } from "react";
import Pagination from "@/components/pagination";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";

type ApprovalMatrixTable = {
    employee:string;
    type: string;
    name: string;
    approver1: string;
    approver2: string;
    approver3: string;
    approver4: string;
    approver5: string;
    approver6: string;
    approver7: string;
    department: string;
    user_division: string;
    event_division: string;
    budget_type: string;
    budget_sub_type: string;
};

export default function ApprovalMatrix() {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;    
    const handlePageChange = (page: React.SetStateAction<number>) => {
        setCurrentPage(page);
        // Fetch your data for the new page here
      };

    const ApprovalDetails: ApprovalMatrixTable[] = [
        {
            employee:"Sundar Ganesh",
            type: "Advance Payment",
            name: "A Sundar Ganesh",
            approver1: "Sivanesan M",
            approver2: "Chandan Sharma",
            approver3: "Nikita Suhasaria",
            approver4: "Nikita Suhasaria",
            approver5: "Chandan Sharma",
            approver6: "Chandan Sharma",
            approver7: "Chandan Sharma",
            department: "Sales - Healthcare (Joints)",
            user_division: "Orthopedics",
            event_division: "Healthcare",
            budget_type: "budget type",
            budget_sub_type: "sub_type"
        },
        {
            employee:"Sundar Ganesh",

            type: "Advance Payment",
            name: "A Sundar Ganesh",
            approver1: "Sivanesan M",
            approver2: "Chandan Sharma",
            approver3: "Nikita Suhasaria",
            approver4: "Nikita Suhasaria",
            approver5: "Chandan Sharma",
            approver6: "Chandan Sharma",
            approver7: "Chandan Sharma",
            department: "Sales - Healthcare (Joints)",
            user_division: "Orthopedics",
            event_division: "Healthcare",
            budget_type: "budget type",
            budget_sub_type: "sub_type"
        },
        {
            employee:"Sundar Ganesh",

            type: "Advance Payment",
            name: "A Sundar Ganesh",
            approver1: "Sivanesan M",
            approver2: "Chandan Sharma",
            approver3: "Nikita Suhasaria",
            approver4: "Nikita Suhasaria",
            approver5: "Chandan Sharma",
            approver6: "Chandan Sharma",
            approver7: "Chandan Sharma",
            department: "Sales - Healthcare (Joints)",
            user_division: "Orthopedics",
            event_division: "Healthcare",
            budget_type: "budget type",
            budget_sub_type: "sub_type"
        },
        {
            employee:"Sundar Ganesh",

            type: "Advance Payment",
            name: "A Sundar Ganesh",
            approver1: "Sivanesan M",
            approver2: "Chandan Sharma",
            approver3: "Nikita Suhasaria",
            approver4: "Nikita Suhasaria",
            approver5: "Chandan Sharma",
            approver6: "Chandan Sharma",
            approver7: "Chandan Sharma",
            department: "Sales - Healthcare (Joints)",
            user_division: "Orthopedics",
            event_division: "Healthcare",
            budget_type: "budget type",
            budget_sub_type: "sub_type"
        },
        {
            employee:"Sundar Ganesh",
            type: "Advance Payment",
            name: "A Sundar Ganesh",
            approver1: "Sivanesan M",
            approver2: "Chandan Sharma",
            approver3: "Nikita Suhasaria",
            approver4: "Nikita Suhasaria",
            approver5: "Chandan Sharma",
            approver6: "Chandan Sharma",
            approver7: "Chandan Sharma",
            department: "Sales - Healthcare (Joints)",
            user_division: "Orthopedics",
            event_division: "Healthcare",
            budget_type: "budget type",
            budget_sub_type: "sub_type"
        },
        {
            employee:"Sundar Ganesh",
            type: "Advance Payment",
            name: "A Sundar Ganesh",
            approver1: "Sivanesan M",
            approver2: "Chandan Sharma",
            approver3: "Nikita Suhasaria",
            approver4: "Nikita Suhasaria",
            approver5: "Chandan Sharma",
            approver6: "Chandan Sharma",
            approver7: "Chandan Sharma",
            department: "Sales - Healthcare (Joints)",
            user_division: "Orthopedics",
            event_division: "Healthcare",
            budget_type: "budget type",
            budget_sub_type: "sub_type"
        },
    ];

    return (

        <div className="p-7 w-full relative z-20 text-black">

            <div className="flex justify-between pb-5 relative">
                <Input className="w-[40%] rounded-[50px] bg-[#ecf2ff] placeholder:text-black" placeholder="Search" />
                <Image src="svg/search.svg" alt="search-icon" width={23} height={23} className="absolute right-[63%] top-[15%]" />

                <div className="flex gap-5">
                    <div className="rounded-[25px] border-[.2px] border-slate-400 bg-[#FFF] text-[15px] font-normal flex space-x-3 items-center px-[30px] cursor-pointer" onClick={() => router.push('/approval_matrix/add_matrix')}>
                       <span>Add</span><Image src={"/svg/addIcon.svg"} alt="add-Icon" width={13} height={13} />                        
                    </div>
                        <Select>
                            <SelectTrigger className="text-black shadow focus-visible:ring-transparent rounded-[25px] gap-4 border border-slate-400 !important">
                                <SelectValue placeholder="Export" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pdf">Pdf</SelectItem>
                                <SelectItem value="excel">Excel</SelectItem>
                                <SelectItem value="print">Print</SelectItem>
                            </SelectContent>
                        </Select>
                </div>
            </div>

          {/* start filter section ------------  */}
            <div className="grid grid-cols-2 gap-5 py-4">

                <div className="flex space-x-14 items-center">
                    <Label htmlFor="type">
                      Region:
                    </Label>
                    <Select>
                                <SelectTrigger className="text-black shadow-md rounded-[8px] gap-4!important">
                                    <SelectValue placeholder="-Select-" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pdf">Pdf</SelectItem>
                                    <SelectItem value="excel">Excel</SelectItem>
                                    <SelectItem value="print">Print</SelectItem>
                                </SelectContent>
                    </Select>
                </div>

                <div className="flex space-x-6 items-center">
                    <Label htmlFor="user">
                    User:
                    </Label>
                    <Select>
                                <SelectTrigger className="text-black shadow-md rounded-[8px] gap-4!important">
                                    <SelectValue placeholder="-Select-" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pdf">Pdf</SelectItem>
                                    <SelectItem value="excel">Excel</SelectItem>
                                    <SelectItem value="print">Print</SelectItem>
                                </SelectContent>
                    </Select>
                </div>

                <div className="flex space-x-6 items-center">
                    <Label htmlFor="department">
                      Department:
                    </Label>
                    <Select>
                                <SelectTrigger className="text-black shadow-md rounded-[8px] gap-4!important">
                                    <SelectValue placeholder="-Select-" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pdf">Pdf</SelectItem>
                                    <SelectItem value="excel">Excel</SelectItem>
                                    <SelectItem value="print">Print</SelectItem>
                                </SelectContent>
                    </Select>
                </div>

                <div className="flex space-x-6 items-center">
                    <Label htmlFor="state">
                    State:
                    </Label>
                    <Select>
                                <SelectTrigger className="text-black shadow-md rounded-[8px] gap-4!important">
                                    <SelectValue placeholder="-Select-" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pdf">Pdf</SelectItem>
                                    <SelectItem value="excel">Excel</SelectItem>
                                    <SelectItem value="print">Print</SelectItem>
                                </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex justify-end mb-4">
                <Button className="text-white bg-blue-400 px-6 rounded-[10px] font-medium">Serach</Button>
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
                                Type
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                Name
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                Approver1
                            </TableHead>

                            <TableHead
                                className={
                                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                Approver2
                            </TableHead>

                            <TableHead
                                className={
                                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                Approver3
                            </TableHead>

                            <TableHead
                                className={
                                    "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                Approver4
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                Approver5
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                Approver6
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                Approver7
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                Department
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                User Division
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                EventDivision
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                BudgetType
                            </TableHead>

                            <TableHead
                                className={
                                    "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                BudgetSubType
                            </TableHead>

                            <TableHead
                                className={
                                    "text-center rounded-r-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat'] sticky right-0 z-50 bg-[#E0E9FF]"
                                }
                            >
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {ApprovalDetails &&
                            ApprovalDetails.map((ApprovalDetail, index) => {
                                return (
                                    <>
                                    
                                        <TableRow className="min-w-full">
                                          <TableCell className="w-full flex space-x-1"><span>Emplyee:</span> <span className="text-nowrap font-medium">{ApprovalDetail.employee}</span></TableCell>
                                        </TableRow>      

                                        <TableRow key={index} className="text-center text-nowrap">
                                        <TableCell>{ApprovalDetail.type}</TableCell>
                                        <TableCell>{ApprovalDetail.name}</TableCell>
                                        <TableCell>{ApprovalDetail.approver1}</TableCell>
                                        <TableCell>{ApprovalDetail.approver2}</TableCell>
                                        <TableCell>{ApprovalDetail.approver3}</TableCell>
                                        <TableCell>{ApprovalDetail.approver4}</TableCell>
                                        <TableCell>{ApprovalDetail.approver5}</TableCell>
                                        <TableCell>{ApprovalDetail.approver6}</TableCell>
                                        <TableCell>{ApprovalDetail.approver7}</TableCell>
                                        <TableCell>{ApprovalDetail.department}</TableCell>
                                        <TableCell>{ApprovalDetail.user_division}</TableCell>
                                        <TableCell>{ApprovalDetail.event_division}</TableCell>
                                        <TableCell>{ApprovalDetail.budget_type}</TableCell>
                                        <TableCell>{ApprovalDetail.budget_sub_type}</TableCell>
                                        <TableCell className="sticky right-0 bg-[white] z-50 flex space-x-5 items-center border-l border-slate-200">
                                            <Image src={"/svg/editIcon.svg"} width={17} height={20} alt="view-svg" className="cursor-pointer" onClick={()=> router.push('/approval_matrix/add_matrix')}/>
                                            <Image src={"/svg/delete.svg"} width={15} height={20} alt="delete-svg" className="cursor-pointer" />
                                        </TableCell>
                                    </TableRow>
                                    </>
                                );
                            })}
                    </TableBody>
                </Table>
            </div>
            <div className="flex justify-end">
             <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
             />
            </div>
        </div>

    );
};

