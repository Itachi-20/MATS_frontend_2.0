'use client';
import React from "react";
import Image from "next/image";
import { useState } from "react";
import Pagination from "@/components/pagination";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";

type DivisionTable = {
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



export default function Division({initialValue}:{initialValue:string}) {

    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;  
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(initialValue);

    const handleSave = () => {
        console.log("Saved Value:", inputValue);
        setIsEditing(false);
      };
    
      const handleCancel = () => {
        setInputValue(initialValue); // Reset to initial value
        setIsEditing(false);
      };



    const handlePageChange = (page: React.SetStateAction<number>) => {
        setCurrentPage(page);
      };

    const DivisionDetails: DivisionTable[] = [
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
                    <div className="rounded-[25px] border-[.2px] border-slate-400 bg-[#FFF] text-[15px] font-normal flex space-x-3 items-center px-[30px] cursor-pointer" onClick={() => setIsEditing(true)}>
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

            {isEditing && 
                <div className="flex items-center space-x-3 py-5">
                {/* Input Field */}
                    <div className=" space-y-1 w-72">
                        <Label className="text-nowrap">Division Name<span className="text-red-500">*</span></Label>
                        <Input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="px-2 py-1 border rounded-md"
                        />

                    </div>
                    <div className="space-y-7 space-x-3">
                        {/* Save Button */}
                        <Button
                            onClick={handleSave}
                            className="px-6 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
                        >
                            Save
                        </Button>
                        {/* Cancel Button */}
                        <Button
                            onClick={handleCancel}
                            className="px-6 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                        >
                            Close
                        </Button>

                    </div>
                </div>
                }

            <div className="border bg-white h-full p-4 rounded-[18px]">
                <Table className={""}>
                    <TableHeader className={"bg-[#E0E9FF]"}>
                        <TableRow className={"text-nowrap rounded-r-2xl"}>
                            <TableHead
                                className={
                                    "text-center rounded-l-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                Division
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                {/* Approver1 */}
                            </TableHead>

                            <TableHead
                                className={
                                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                {/* Approver2 */}
                            </TableHead>

                            <TableHead
                                className={
                                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                {/* Approver3 */}
                            </TableHead>

                            <TableHead
                                className={
                                    "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                {/* Approver4 */}
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                {/* Approver5 */}
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                {/* Approver6 */}
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                {/* Approver7 */}
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                {/* Department */}
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                {/* User Division */}
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                {/* EventDivision */}
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                {/* BudgetType */}
                            </TableHead>

                            <TableHead
                                className={
                                    "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                {/* BudgetSubType */}
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
                        {DivisionDetails &&
                            DivisionDetails.map((DivisionDetail, index) => {
                                return (
                                    <>
                                        <TableRow key={index} className="text-center text-nowrap">
                                        <TableCell>{DivisionDetail.type}</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell className="sticky right-0 bg-[white] z-50 flex space-x-5 items-center border-l border-slate-200 px-0 pl-20">
                                            <Image src={"/svg/editIcon.svg"} width={17} height={20} alt="view-svg" className="cursor-pointer" onClick={() => setIsEditing(true)}/>
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

