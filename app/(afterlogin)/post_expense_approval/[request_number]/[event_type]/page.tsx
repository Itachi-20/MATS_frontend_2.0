'use client'
import React from 'react'
import Table from './table'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Comment_box from '@/components/Comment_box'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
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
                        <Button className="border rounded-sm px-6 py-1 border-black text-black">Back</Button>
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

                <div className='flex justify-end gap-2 pt-8'>
                    <Button className='bg-[#5DBE74] px-6' onClick={handleApprove}>Approve</Button>
                    <Button className='bg-[#4430BF] px-6'>Send Back</Button>
                    <Button className='bg-[#FF5757] px-6'>Reject</Button>
                </div>
            </div>
            {open && <Comment_box  handleClose={handleApprove}/>}
        </>
    )
}

export default page
