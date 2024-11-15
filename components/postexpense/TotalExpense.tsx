import React from 'react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
const Totalexpense = () => {
    return (
        <div className="md:pb-8">
            <div className="gap-5">
                <h1 className="text-black md:text-[30px] md:font-medium uppercase md:pb-4">
                    total expense
                </h1>
            </div>
            <div className="grid md:grid-cols-3 md:gap-6">
                <div className="flex flex-col md:gap-2">
                    <label htmlFor='total_expense' className="text-black md:text-sm md:font-normal capitalize">
                        total estimated expense<span className="text-[#e60000]">*</span>
                    </label>
                    <Input
                        className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
                        placeholder="12,00,000"
                        id='total_expense'
                        name='total_expense'
                        readOnly={true}
                    ></Input>
                </div>
                <div className="flex flex-col md:gap-2">
                    <label className="text-black md:text-sm md:font-normal capitalize">
                        currency<span className="text-[#e60000]">*</span>
                    </label>
                    <div className="grid md:grid-cols-2">

                        <Input
                            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
                            placeholder="INR"
                            readOnly={true}
                        ></Input>
                    </div>
                </div>

            </div>
            <div className="md:pb-8 md:pt-8">
                    <div className='border border-[#848484] p-4 rounded-2xl w-full'>
                        <h1 className="text-black pl-4 pb-4">
                            Document type:{" "}
                            <span className="font-semibold">Pre-Activity</span>
                        </h1>
                        <div className="grid grid-cols-2 bg-white divide-x-2">
                            <div className="col-span-1 flex flex-col mr-2">
                                <Table className=''>
                                    <TableHeader>
                                        <TableRow className="text-black">
                                            <TableHead className={"bg-[#E0E9FF] rounded-2xl text-[15px] w-full"}
                                            >
                                                <span>Supporting Document</span>

                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow className="text-black">
                                            <TableCell>Letter of understanding joint event</TableCell>
                                        </TableRow>
                                        <TableRow className="text-black">
                                            <TableCell>Letter of understanding joint event</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                            <div className="col-span-1 flex flex-col gap-3 pl-2">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="text-black">
                                            <TableHead
                                                className={"bg-[#E0E9FF] rounded-2xl text-[15px]"}
                                            >
                                                Uploded Documents
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow className="text-black flex justify-between items-center">
                                            <TableCell>Stationary.cSV</TableCell>
                                            <TableCell><Image src="/svg/view.svg" width={20} height={20} alt='view-document' className='cursor-pointer' /></TableCell>
                                        </TableRow>
                                        <TableRow className="text-black flex justify-between items-center">
                                            <TableCell>Stationary.cSV</TableCell>
                                            <TableCell><Image src="/svg/view.svg" width={20} height={20} alt='view-document' className='cursor-pointer' /></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Totalexpense