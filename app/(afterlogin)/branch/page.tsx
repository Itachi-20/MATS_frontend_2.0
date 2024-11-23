'use client';
import React from "react";
import Image from "next/image";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";

type BranchTable = {
    branch_name: string;
};

export default function Branch({ initialValue }: { initialValue: string }) {

    const [currentPage, setCurrentPage] = useState(1);
    const rolesPerPage = 6; 
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(initialValue);

    const handleSave = () => {
        console.log("Saved Value:", inputValue);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setInputValue(initialValue);
        setIsEditing(false);
    };

    const BranchDetails: BranchTable[] = [
        {
            branch_name: "Vapi(475)(12)",
        },
        {
            branch_name: "VAPI(403)",
        },
        {
            branch_name: "VADODARA(0)",
        },
        {
            branch_name: "Surat(0)",
        },

        {
            branch_name: "Software Division(0)",
        },

        {
            branch_name: "Vapi(475)(12)",
        },
        {
            branch_name: "Surat(0)",
        },

        {
            branch_name: "Software Division(0)",
        },

        {
            branch_name: "Vapi(475)(12)",
        },
        {
            branch_name: "Software Division(0)",
        },

        {
            branch_name: "Vapi(475)(12)",
        },
        {
            branch_name: "Surat(0)",
        },

        {
            branch_name: "Software Division(0)",
        },

        {
            branch_name: "Vapi(475)(12)",
        },
    ];

    const totalPages = Math.ceil(BranchDetails.length / rolesPerPage);
    // Get paginated roles
    const paginatedRoles = BranchDetails.slice(
    (currentPage - 1) * rolesPerPage,
    currentPage * rolesPerPage
   )
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
                <div className="grid grid-cols-2 space-x-5 items-center py-5">
                    <div className="flex space-x-3">
                        <div className="space-y-1 w-[50vh]">
                            <label className="lable">
                                Branch Name<span className="text-red-700">*</span>
                            </label>
                            <Input type="text" placeholder="Branch Name" name="designation_name" id="branch_name" required className="w-full " />
                        </div>
                        <div className="items-center flex space-x-3 mt-7">
                            <Button
                                onClick={handleSave}
                                className="px-7 py-2 text-[16px] text-white bg-blue-500 rounded-md"
                            >
                                Save
                            </Button>
                            <Button
                                onClick={handleCancel}
                                className="px-6 py-2 text-[16px] text-white bg-red-400 rounded-md"
                            >
                                Close
                            </Button>

                        </div>
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
                                Branch Name
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                {/* TypeData    */}
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                {/* Visibility */}
                            </TableHead>

                            <TableHead
                                className={
                                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                {/* Level Value */}
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

                            </TableHead>
                            <TableHead
                                className={
                                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >

                            </TableHead><TableHead
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
                        {paginatedRoles &&
                            paginatedRoles.map((BranchDetail, index) => {
                                return (
                                    <TableRow key={index} className="text-center text-nowrap">
                                        <TableCell>{BranchDetail.branch_name}</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell className="sticky right-0 bg-[white] z-50 flex space-x-7 items-center justify-center border-l border-slate-200 ">
                                            <Image src={"/svg/editIcon.svg"} width={17} height={20} alt="view-svg" className="cursor-pointer" onClick={() => setIsEditing(true)} />
                                            <Image src={"/svg/delete.svg"} width={15} height={20} alt="delete-svg" className="cursor-pointer" />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </div>
            <div className="flex justify-end">
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
};

