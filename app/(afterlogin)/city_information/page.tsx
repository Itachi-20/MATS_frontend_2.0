'use client';
import React from "react";
import Image from "next/image";
import { useState } from "react";
import Pagination from "@/components/pagination";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";

type CityTable = {
    city_name: string;
    region_name: string;
    state_name: string;
    country_name: string;
    city_type: string;

};

export default function Division({ initialValue }: { initialValue: string }) {

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

    const CityDetails: CityTable[] = [
        {
            country_name: "India",
            region_name: "Central",
            state_name: "A Sundar Ganesh",
            city_type: "Sivanesan M",
            city_name: "Chandan Sharma",
        },
        {
            country_name: "India",
            region_name: "Central",
            state_name: "A Sundar Ganesh",
            city_type: "Sivanesan M",
            city_name: "Chandan Sharma",
        },
        {
            country_name: "India",
            region_name: "Central",
            state_name: "A Sundar Ganesh",
            city_type: "Sivanesan M",
            city_name: "Chandan Sharma",
        },
        {
            country_name: "India",
            region_name: "Central",
            state_name: "A Sundar Ganesh",
            city_type: "Sivanesan M",
            city_name: "Chandan Sharma",
        },
        {
            country_name: "India",
            region_name: "Central",
            state_name: "A Sundar Ganesh",
            city_type: "Sivanesan M",
            city_name: "Chandan Sharma",
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
                <div className="grid grid-cols-3  gap-4 items-center space-x-3 py-5">

                    <div className="flex flex-col gap-2">
                        <label className="lable">
                            Country Name<span className="text-red-600"> *</span>
                        </label>
                        <Select>
                            <SelectTrigger className="dropdown">
                                <SelectValue placeholder="-Select-" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Country-1">Country-1</SelectItem>
                                <SelectItem value="Country-2">Country-2</SelectItem>
                                <SelectItem value="Country-3">Country-3</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="lable">
                            Region Name<span className="text-red-600"> *</span>
                        </label>
                        <Select>
                            <SelectTrigger className="dropdown">
                                <SelectValue placeholder="-Select-" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="c">Central</SelectItem>
                                <SelectItem value="n">North</SelectItem>
                                <SelectItem value="s">South</SelectItem>
                                <SelectItem value="e">East</SelectItem>

                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="lable">
                            State Name<span className="text-red-600">*</span>
                        </label>
                        <Select>
                            <SelectTrigger className="dropdown">
                                <SelectValue placeholder="-Select-" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="s1">State1</SelectItem>
                                <SelectItem value="s2">State2</SelectItem>
                                <SelectItem value="s3">State</SelectItem>
                                <SelectItem value="s4">State4</SelectItem>
                                <SelectItem value="s5">State5</SelectItem>

                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="lable">
                            City Name<span className="text-red-700"> *</span>
                        </label>
                        <Input type="text" placeholder="" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="lable">
                            City type<span className="text-red-600">*</span>
                        </label>
                        <Select>
                            <SelectTrigger className="dropdown">
                                <SelectValue placeholder="-Select-" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="c1">city type-1</SelectItem>
                                <SelectItem value="c2">city type-2</SelectItem>
                                <SelectItem value="c3">city type-3</SelectItem>
                                <SelectItem value="c4">city type-4</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-x-3 items-center flex justify-end mt-7">
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
                                Country Name
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                Region Name
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                State Name
                            </TableHead>

                            <TableHead
                                className={
                                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                City Name
                            </TableHead>

                            <TableHead
                                className={
                                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                City Type
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
                        {CityDetails &&
                            CityDetails.map((CityDetail, index) => {
                                return (
                                    <>
                                        <TableRow key={index} className="text-center text-nowrap">
                                            <TableCell>{CityDetail.country_name}</TableCell>
                                            <TableCell>{CityDetail.country_name}</TableCell>
                                            <TableCell>{CityDetail.country_name}</TableCell>
                                            <TableCell>{CityDetail.country_name}</TableCell>
                                            <TableCell>{CityDetail.country_name}</TableCell>
                                            <TableCell className="sticky right-0 bg-[white] z-50 flex space-x-5 items-center border-l border-slate-200 pl-20">
                                                <Image src={"/svg/editIcon.svg"} width={17} height={20} alt="view-svg" className="cursor-pointer" onClick={() => setIsEditing(true)} />
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

