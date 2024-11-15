"use client"
import React, { useEffect } from 'react';
import Link from 'next/link';
import DialogBox from '@/components/dialogbox';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

import DocumentDetails from '@/components/execute/document-details';
import { useParams } from 'next/navigation'

const page = () => {
    const param = useParams();
    const refno = param.refno;
    console.log(refno,"this is document refno")

    const fetchData = async()=>{
        
    }

    useEffect(()=>{

    })

    return (
        <div className="md:px-7 md:pb-7 md:pt-[35px] w-full relative z-20 text-black">
            <div className="pb-5">
                <div className="flex justify-between">
                    <h1 className=" md:text-[30px] md:font-medium capitalize md:pb-4"> Training and Education</h1>
                    <div className="flex gap-4 bg-white leading-normal">
                        <Button className="border border-[#4430bf] text-[#4430bf] px-6 text-[18px]">Audit Trail</Button>
                        <Link href={"/"}>
                            <Button className="bg-white text-black border px-9 hover:bg-white text-[18px]">Back</Button>
                        </Link>
                    </div>
                </div>
                <div className="flex border rounded-xl justify-between p-3 bg-white gap-4">
                    <div className="grid grid-cols-5 w-full gap-4">
                        <div className="col-span-2 border-r-[1px] border-slate-300 pr-2">
                            <h1 className="bg-[#ecf2ff] px-2 rounded-xl text-center">Request Number</h1>
                            <h1 className="text-center">1234567</h1>
                        </div>
                        <div className="col-span-2  border-r-[1px] border-slate-300 pr-2">
                            <h1 className="bg-[#ecf2ff] px-2 rounded-xl text-center">Request Date</h1>
                            <h1 className="text-center">11/11/24</h1>
                        </div>
                        <div className="col-span-1 flex justify-center pt-1">
                            <div className="px-20">
                                {/* <DialogBox button={"Execute"} msg={"Next Occurrence date"}/> */}
                                <DialogBox button={"Execute"} msg={"Are you sure you wanted to execute the event?"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DocumentDetails />
        </div>
    )
}

export default page