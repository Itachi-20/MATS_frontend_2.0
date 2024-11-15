'use client'
import React from 'react'
import Table from './table'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Comment_box from '@/components/Comment_box'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
const page = () => {
    const [open, setOpen] = useState(false);

    const handleApprove = () => {
        setOpen(prevState => !prevState);
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
                        <div className='flex justify-end gap-2 pb-7'>

                            <label className="flex items-center gap-2 px-2 bg-[#F0EDFF] rounded-md shadow-sm cursor-pointer border-[1px] py-2">
                                <Image src={'/svg/download.svg'} alt='downloadsvg' width={20} height={20} />
                                <span className="font-medium text-[#4430BF] ">{fileName ? fileName : 'Attachment'}</span>
                                <Input type="file" className="hidden" onChange={handleFileChange} />
                            </label>
                        </div>
                        <Button className='bg-white  shadow text-black px-6'>Back</Button>
                    </div>
                </div>
                <div className='border rounded-3xl mt-5 mb-14 p-2 text-black grid grid-cols-3'>
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

                <Table />


                <div className=" grid grid-cols-3 gap-4 py-7">
                    <div className='grid-cols-1 space-y-2'>
                        <label htmlFor="document_number" className="text-black md:text-sm md:font-normal capitalize">
                            Document Number<span className="text-[#e60000] ">*</span>
                        </label>
                        <Input
                            className="text-black shadow md:rounded-sm md:py-1"
                            placeholder="Type here ..."
                            id='document_number'
                            name='document_number'
                        ></Input>
                    </div>
                    <div className='grid-cols-1 space-y-2'>
                        <label htmlFor="amount" className="text-black md:text-sm md:font-normal capitalize">
                            Posting Date<span className="text-[#e60000] ">*</span>
                        </label>
                        <Input
                            type='date'
                            className="text-black shadow md:rounded-sm md:py-1"
                            placeholder="Type here ..."
                            id='posting_date'
                            name='posting_date'
                        ></Input>
                    </div>
                    <div className='grid-cols-1 space-y-2'>
                        <label htmlFor="posting_date" className="text-black md:text-sm md:font-normal capitalize">
                            Invoice Number<span className="text-[#e60000] ">*</span>
                        </label>
                        <Input
                            className="text-black shadow md:rounded-sm md:py-1"
                            placeholder="Type here ..."
                            id='posting_date'
                            name='posting_date'
                        ></Input>
                    </div>
                    <div className='grid-cols-1 space-y-2'>
                        <label htmlFor="date" className="text-black md:text-sm md:font-normal capitalize">
                            Date<span className="text-[#e60000] ">*</span>
                        </label>
                        <Input
                            type='date'
                            className="text-black shadow md:rounded-sm md:py-1"
                            placeholder="Type here ..."
                            id='date'
                            name='date'
                        ></Input>
                    </div>
                    <div className='grid-cols-1 space-y-2'>
                        <label htmlFor="basic_amount" className="text-black md:text-sm md:font-normal capitalize">
                            Basic Amount<span className="text-[#e60000] ">*</span>
                        </label>
                        <Input
                            type='number'
                            className="text-black shadow md:rounded-sm md:py-1"
                            placeholder="Type here ..."
                            id='date'
                            name='basic_amount'
                        ></Input>
                    </div>
                    <div className='grid-cols-1 space-y-2'>
                        <label htmlFor="gst" className="text-black md:text-sm md:font-normal capitalize">
                            GST<span className="text-[#e60000] ">*</span>
                        </label>
                        <Input
                            className="text-black shadow md:rounded-sm md:py-1"
                            placeholder="Type here ..."
                            id='gst'
                            name='gst'
                        ></Input>
                    </div>
                    <div className='grid-cols-1 space-y-2'>
                        <label htmlFor="invoice_amount" className="text-black md:text-sm md:font-normal capitalize">
                            Invoice Amount<span className="text-[#e60000] ">*</span>
                        </label>
                        <Input
                            type='number'
                            className="text-black shadow md:rounded-sm md:py-1"
                            placeholder="Type here ..."
                            id='invoice_amount'
                            name='invoice_amount'
                        ></Input>
                    </div>
                    <div className='grid-cols-1 space-y-2'>
                        <label htmlFor="tds" className="text-black md:text-sm md:font-normal capitalize">
                            TDS<span className="text-[#e60000] ">*</span>
                        </label>
                        <Input
                            type='number'
                            className="text-black shadow md:rounded-sm md:py-1"
                            placeholder="Type here ..."
                            id='tds'
                            name='tds'
                        ></Input>
                    </div>
                    <div className='grid-cols-1 space-y-2'>
                        <label htmlFor="net_amount" className="text-black md:text-sm md:font-normal capitalize">
                            Net Amount<span className="text-[#e60000] ">*</span>
                        </label>
                        <Input
                            type='number'
                            className="text-black shadow md:rounded-sm md:py-1"
                            placeholder="Type here ..."
                            id='net_amount'
                            name='net_amount'
                        ></Input>
                    </div>

                    <div className='grid-cols-1 space-y-2'>
                        <label htmlFor="division" className="text-black md:text-sm md:font-normal capitalize">
                            Division<span className="text-[#e60000] ">*</span>
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
                        <label htmlFor="cost_center" className="text-black md:text-sm md:font-normal capitalize">
                            Cost Center<span className="text-[#e60000] ">*</span>
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
                        <label htmlFor="cc_name" className="text-black md:text-sm md:font-normal capitalize">
                            CC Name<span className="text-[#e60000] ">*</span>
                        </label>
                        <Input
                            className="text-black shadow md:rounded-sm md:py-1"
                            placeholder="Type here ..."
                            id='cc_name'
                            name='cc_name'
                        ></Input>
                    </div>
                    <div className='grid-cols-1 space-y-2'>
                        <label htmlFor="cc_name" className="text-black md:text-sm md:font-normal capitalize">
                            Nature<span className="text-[#e60000] ">*</span>
                        </label>
                        <Input
                            className="text-black shadow md:rounded-sm md:py-1"
                            placeholder="Type here ..."
                            id='nature'
                            name='nature'
                        ></Input>
                    </div>
                    <div className='grid-cols-1 space-y-2'>
                        <label htmlFor="company_name" className="text-black md:text-sm md:font-normal capitalize">
                            Company Name<span className="text-[#e60000] ">*</span>
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
                        <label htmlFor="gl_name" className="text-black md:text-sm md:font-normal capitalize">
                            GL Name<span className="text-[#e60000] ">*</span>
                        </label>
                        <Input
                            className="text-black shadow md:rounded-sm md:py-1"
                            placeholder="Type here ..."
                            id='gl_name'
                            name='gl_name'
                        ></Input>
                    </div>
                    <div className='grid-cols-1 space-y-2'>
                        <label htmlFor="gl_code" className="text-black md:text-sm md:font-normal capitalize">
                            GL Code<span className="text-[#e60000] ">*</span>
                        </label>
                        <Input
                            className="text-black shadow md:rounded-sm md:py-1"
                            placeholder="Type here ..."
                            id='gl_code'
                            name='gl_code'
                        ></Input>
                    </div>
                    <div className='grid-cols-1 space-y-2'>
                        <label htmlFor="utr_number" className="text-black md:text-sm md:font-normal capitalize">
                            UTR Number<span className="text-[#e60000] ">*</span>
                        </label>
                        <Input
                            className="text-black shadow md:rounded-sm md:py-1"
                            placeholder="Type here ..."
                            id='utr_number'
                            name='utr_number'
                        ></Input>
                    </div>
                    <div className='grid-cols-1 space-y-2'>
                        <label htmlFor="payment_date" className="text-black md:text-sm md:font-normal capitalize">
                            Payment Date<span className="text-[#e60000] ">*</span>
                        </label>
                        <Input
                            type='date'
                            className="text-black shadow md:rounded-sm md:py-1"
                            placeholder="Type here ..."
                            id='payment_date'
                            name='payment_date'
                        ></Input>
                    </div>
                    <div className='grid-cols-1 space-y-2'>
                        <label htmlFor="zone" className="text-black md:text-sm md:font-normal capitalize">
                            Zone<span className="text-[#e60000] ">*</span>
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
                        <label htmlFor="state" className="text-black md:text-sm md:font-normal capitalize">
                            State<span className="text-[#e60000] ">*</span>
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
                        <label htmlFor="city" className="text-black md:text-sm md:font-normal capitalize">
                            City<span className="text-[#e60000] ">*</span>
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
                        <label htmlFor="remark" className="text-black md:text-sm md:font-normal capitalize">
                            Remark<span className="text-[#e60000] ">*</span>
                        </label>
                        <Textarea
                            className="text-black shadow md:rounded-sm md:py-2"
                            placeholder="Type here ..."
                            id='remark'
                            name='remark'
                        ></Textarea>
                    </div>
                </div>


                <div className='flex justify-end gap-2 pt-8'>
                    
                    <Button className='bg-[#5DBE74] px-6' onClick={handleApprove}>Submit</Button>
                </div>
            </div>
            {/* {open && <Comment_box  handleClose={handleApprove}/>} */}
        </>
    )
}

export default page
