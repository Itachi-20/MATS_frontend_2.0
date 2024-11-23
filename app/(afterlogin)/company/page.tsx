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

type CompanyTable = {
    company_name:string;
};

export default function Company() {

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10; 

    const handlePageChange = (page: React.SetStateAction<number>) => {
        setCurrentPage(page);
      };

    const CompanyDetails: CompanyTable[] = [
        {
            company_name:"company name",
        },
        {
            company_name:"company name",
        },
        {
            company_name:"company name",
        },
        {
            company_name:"company name",
        },
        {
            company_name:"company name",
        },
        {
            company_name:"company name",
        },
        
      
    ];

    return (

        <div className="p-7 w-full relative z-20 text-black">

            {/* {start search and fliter section } */}
            <div className="flex justify-between pb-4 relative">
                <Input className="w-[40%] rounded-[50px] bg-[#ecf2ff] placeholder:text-black" placeholder="Search" />
                <Image src="svg/search.svg" alt="search-icon" width={23} height={23} className="absolute right-[63%] top-[15%]" />

                <div className="flex gap-5">
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
      
             <div className="flex items-center space-x-3 py-5">
                    <div className=" space-y-1 w-">
                        <Label className="text-nowrap">Company Name<span className="text-red-500">*</span></Label>
                        <Input
                            type="text"                        
                            className="px-2 py-1 border rounded-md"
                        />

                    </div>
                    <div className="space-y-7 space-x-3">
                        <Button                           
                            className="px-7 py-2 text-sm text-white bg-blue-500 rounded-md"
                        >
                            Save
                        </Button>
                        <Button
                            className="px-6 py-2 text-sm text-white bg-red-400 rounded-md"
                        >
                            Close
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
                                Company Name
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
                                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                            {/* Cost Center Code */}
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
                                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                IsActive
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
                        {CompanyDetails &&
                            CompanyDetails.map((CompanyDetail, index) => {
                                return (
                                      <TableRow key={index} className="text-center text-nowrap">
                                        <TableCell>{CompanyDetail.company_name}</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell><ToggleButton /></TableCell>
                                        <TableCell className="sticky right-0 bg-[white] z-50 flex space-x-5 items-center justify-center border-l border-slate-200">
                                            <Image src={"/svg/editIcon.svg"} width={17} height={20} alt="view-svg" className="cursor-pointer" />
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

