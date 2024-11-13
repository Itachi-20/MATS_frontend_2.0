'use client'
import React from 'react'
import Table from './table'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Image from 'next/image'
import { useState } from 'react'
import UploadExport from '@/app/(afterlogin)/postexpense/upload/export_popup'
const page = () => {
    const [open, setOpen] = useState(false);
    const [exportopen, setExportOpen] = useState(false);
    const handleUplaod = () => {
        setOpen(prevState => !prevState);
    };
    const handleExport = () => {
        setExportOpen(prevState => !prevState);
    };
    const [fileName, setFileName] = useState();
    const handleFileChange: any = (e: any) => {
        setFileName(e.target.files[0]?.name)
    };
    return (
        <>
            <div className='p-8  '>
                <div className='text-black flex justify-between items-center'>
                    <div className='text-2xl font-semibold'>
                        Training & Education
                    </div>
                    <div className='flex gap-4'>
                        {/* <div className='flex justify-end gap-2 pb-7'>

                            <label className="flex items-center gap-2 px-2 bg-[#F0EDFF] rounded-md shadow-sm cursor-pointer border-[1px] py-2">
                                <Image src={'/svg/download.svg'} alt='downloadsvg' width={20} height={20} />
                                <span className="font-medium text-[#4430BF] ">{fileName ? fileName : 'Attachment'}</span>
                                <Input type="file" className="hidden" onChange={handleFileChange} />
                            </label>
                        </div> */}
                        <Button className="border rounded-sm px-6 py-1 border-black text-black">Back</Button>
                    </div>
                </div>
                <div className='border rounded-3xl mt-5 mb-7 p-2 text-black grid grid-cols-3'>
                    <div className='grid-cols-1 px-6 border-r'>
                        <ul className=''>
                            <li className='border-b p-2'>Event Date :<span className='font-semibold px-1'>11/1/24</span></li>
                            <li className='border-b p-2'>Event Name :<span className='font-semibold px-1'>Lorem ipsum</span></li>
                            <li className='border-b p-2'>Event Requester Name :<span className='font-semibold px-1'>Lorem ipsum</span></li>
                            <li className='p-2'>Event Requester Number :<span className='font-semibold px-1'>8976</span></li>
                        </ul>
                    </div>
                    <div className='grid-cols-1 px-6 border-r'>
                        <ul className=''>
                            <li className='border-b p-2'>Cost Center :<span className='font-semibold px-1'>301102021</span></li>
                            <li className='border-b p-2'>Cost Center Hod :<span className='font-semibold px-1'>Gautam Tripathy</span></li>
                            <li className='border-b p-2'>Cost Center Description :<span className='font-semibold px-1'>VAS-GT-Mumbai-MKTG</span></li>
                            <li className='p-2'>Reporting Head :<span className='font-semibold px-1'>Finance Team </span></li>
                        </ul>
                    </div>
                    <div className='grid-cols-1 px-6'>
                        <ul className=''>
                            <li className='border-b p-2'>Business Unit :<span className='font-semibold px-1'>Trauma BU</span></li>
                            <li className='border-b p-2'>Sub Type Af activity :<span className='font-semibold px-1'>Mix Event</span></li>
                            <li className='border-b p-2'>Total Estimated Expense :<span className='font-semibold px-1'>11128</span></li>
                        </ul>
                    </div>

                </div>

                <div className=" grid grid-cols-3 gap-4 pb-7">
                    <div className='col-span-3 space-y-2'>
                        <label htmlFor="event_conclusion" className="text-black md:text-sm md:font-normal capitalize">
                            Event Conclusion<span className="text-[#e60000] ">*</span>
                        </label>
                        <Textarea
                            className="text-black shadow md:rounded-xl md:py-2"
                            placeholder="Type here ..."
                            id='event_conclusion'
                            name='event_conclusion'
                        ></Textarea>
                    </div>

                    <div className='grid-cols-1 space-y-2'>
                        <label htmlFor="vendor_type" className="text-black md:text-sm md:font-normal capitalize">
                            Vendor Type<span className="text-[#e60000] ">*</span>
                        </label>
                        <Select>
                            <SelectTrigger className="dropdown rounded-sm gap-4">
                                <SelectValue placeholder="-Select-" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="null">-Select-</SelectItem>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='grid-cols-1 space-y-2'>
                        <label htmlFor="vendor_name" className="text-black md:text-sm md:font-normal capitalize">
                            Vendor Name<span className="text-[#e60000] ">*</span>
                        </label>
                        <Select>
                            <SelectTrigger className="dropdown rounded-sm gap-4">
                                <SelectValue placeholder="-Select-" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="null">-Select-</SelectItem>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='grid-cols-1 space-y-2'>
                        <label htmlFor="amount" className="text-black md:text-sm md:font-normal capitalize">
                            Amount<span className="text-[#e60000] ">*</span>
                        </label>
                        <Input
                            type='number'
                            className="text-black shadow md:rounded-sm md:py-1"
                            placeholder="Type here ..."
                            id='amount'
                            name='amount'
                        ></Input>
                    </div>
                </div>

                <div className='flex justify-end gap-2 pb-7'>
                    <Button className='text-[#4430BF] bg-[#F0EDFF] gap-2' onClick={handleExport}>
                        <Image src={'/svg/import.svg'} alt='importsvg' width={20} height={20} />
                        Import Document
                    </Button>
                    <label className="flex items-center gap-2 px-2 bg-[#F0EDFF] rounded-md shadow-sm cursor-pointer border-[1px]">
                        <Image src={'/svg/download.svg'} alt='downloadsvg' width={20} height={20} />
                        <span className="font-medium text-[#4430BF] ">{fileName ? fileName : ' Receipt/Bill'}</span>
                        <Input type="file" className="hidden" onChange={handleFileChange} />
                    </label>
                    <Button className="border border-[#4430bf] text-[#4430bf] text-[18px]">Add</Button>
                </div>
                <Table />

                <div className='flex justify-end gap-2 pt-8'>
                    <Button className='bg-[#4430BF] px-10'>Submit</Button>
                </div>
            </div>
            {exportopen && <UploadExport handleExport={handleExport} />}
        </>
    )
}

export default page
