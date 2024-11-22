'use client';
import React from "react";
import Image from "next/image";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/pagination";
import ToggleButton from "@/components/toggle_button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";

type EventCostCenterTable = {
    description:string;
    cost_center_hod: string;
    cost_center_code: number;
    division: string;
};

export default function ApprovalMatrix() {

    // const [isEditable, setIsEditable] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10; 

    const toggleEdit = () => {
        setIsEditable((prev) => !prev);
      };

    const handlePageChange = (page: React.SetStateAction<number>) => {
        setCurrentPage(page);
      };

    const EventCostCenterDetails: EventCostCenterTable[] = [
        {
            description:"description is not available",
            cost_center_hod: "Hod name",
            cost_center_code: 78098765,
            division: "Peripheral",
        },
        {
            description:"description is not available",
            cost_center_hod: "Hod name",
            cost_center_code: 78098765,
            division: "Peripheral",
        },
        {
            description:"description is not available",
            cost_center_hod: "Hod name",
            cost_center_code: 78098765,
            division: "Peripheral",
        },
        {
            description:"description is not available",
            cost_center_hod: "Hod name",
            cost_center_code: 78098765,
            division: "Peripheral",
        },
        {
            description:"description is not available",
            cost_center_hod: "Hod name",
            cost_center_code: 78098765,
            division: "Peripheral",
        },
      
    ];

    return (

        <div className="p-7 w-full relative z-20 text-black">

            <div className="flex justify-between pb-4 relative">
                <Input className="w-[40%] rounded-[50px] bg-[#ecf2ff] placeholder:text-black" placeholder="Search" />
                <Image src="svg/search.svg" alt="search-icon" width={23} height={23} className="absolute right-[63%] top-[15%]" />

                <div className="flex gap-5">
                    {/* <div className="rounded-[25px] border-[.2px] border-slate-400 bg-[#FFF] text-[15px] font-normal flex space-x-3 items-center px-[30px] cursor-pointer" onClick={() => router.push('/approval_matrix/add_matrix')}>
                       <span>Add</span><Image src={"/svg/addIcon.svg"} alt="add-Icon" width={13} height={13} />                        
                    </div> */}
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
      
            <div className="grid grid-cols-3 gap-5 pb-6">
                <div className="space-y-1">
                    <Label htmlFor="description">
                        Description<span className="text-red-600">*</span>
                    </Label>
                    <Input
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Description"
                    // disabled={!isEditable}
                    />
                </div>

                <div className="space-y-1">
                    <Label htmlFor="cchod">Cost Center HOD</Label>
                    <Input
                        type="text"
                        name="cchod"
                        id="cchod"
                        placeholder="Cost Center HOD"
                    // disabled={!isEditable}
                    />
                </div>

                <div className="space-y-1">
                    <Label htmlFor="division_id">
                        Division<span className="text-red-600">*</span>
                    </Label>
                    <Select
                    //   disabled={!isEditable}
                    >
                        <SelectTrigger className="text-black shadow-md rounded-[8px] gap-4 !important">
                            <SelectValue placeholder="-Select-" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="id1">id-1</SelectItem>
                            <SelectItem value="id2">id-2</SelectItem>
                            <SelectItem value="id3">id-3</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-1">
                    <Label htmlFor="cost_center_code">
                        Cost Center Code <span className="text-red-600">*</span>
                    </Label>
                    <Input
                        type="text"
                        name="cost_center_code"
                        id="cost_center_code"
                        placeholder="Cost Center Code"
                    // disabled={!isEditable}
                    />
                </div>

                <div className="flex space-x-3 justify-end col-span-2 mt-7">
                    <Button
                        className="text-white bg-green-400 px-8 rounded-[10px] font-medium text-[16px]"
                    // disabled={!isEditable}
                    >
                        Save
                    </Button>
                    <Button className="text-white bg-blue-400 px-7 rounded-[10px] font-medium text-[16px]">
                        Reset
                    </Button>
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
                                Description
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                            Cost Center Hod
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                            Cost Center Code
                            </TableHead>

                            <TableHead
                                className={
                                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                Division
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                {/* Division */}
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
                        {EventCostCenterDetails &&
                            EventCostCenterDetails.map((EventCostCenterDetail, index) => {
                                return (
                                      <TableRow key={index} className="text-center text-nowrap">
                                        <TableCell>{EventCostCenterDetail.description}</TableCell>
                                        <TableCell>{EventCostCenterDetail.cost_center_hod}</TableCell>
                                        <TableCell>{EventCostCenterDetail.cost_center_code}</TableCell>
                                        <TableCell>{EventCostCenterDetail.description}</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell className="sticky right-0 bg-[white] z-50 flex space-x-5 items-center justify-center border-l border-slate-200">
                                            <span className="">
                                              <ToggleButton />                                               
                                            </span>
                                            <Image src={"/svg/editIcon.svg"} width={17} height={20} alt="view-svg" className="cursor-pointer" onClick={toggleEdit} />
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
              onPageChange={handlePageChange}
             />
            </div>
        </div>

    );
};

