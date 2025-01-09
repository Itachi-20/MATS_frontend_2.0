'use client'
import Link from "next/link";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

type LogEntry = {
    timestamp: string;
    user: string;
    action: string;
    changes: string;
    attachments: any[];
    custom_detail: Record<string, any>;
}

type EventData = {
    name: string;
    event_name: string;
    event_type: string;
    event_start_date: string;
    event_venue: string;
    status: string;
    sub_type_of_activity: string;
    logs: LogEntry[];
}



type AuditTrailProps = {
    PageName: string;
    data: EventData[];
}

const AuditTrail = ({ ...props }: AuditTrailProps) => {
    const PageName = props.PageName;
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    const dataHeader = [
        {
            title: "Request Number",

        },
        {
            title: "Event Name & Type",

        },
        {
            title: "Event Date",

        },
        {
            title: "Event Venue",

        },
        {
            title: "Type of Activity",

        },
        {
            title: "Status",

        },
        {
            title: "",

        },
    ]

    const timeline = [

        {
            "date": "10-10-2024",
            "time": "12:52 pm",
            "description": "Test of Training & Education was approved by Parita Pandya"
        },
        {
            "date": "10-10-2024",
            "time": "12:52 pm",
            "description": "Test of Training & Education was approved by Parita Pandya"
        },
        {
            "date": "10-10-2024",
            "time": "12:52 pm",
            "description": "Test of Training & Education was approved by Parita Pandya"
        },
        {
            "date": "10-10-2024",
            "time": "12:52 pm",
            "description": "Test of Training & Education was approved by Parita Pandya"
        },
        {
            "date": "10-10-2024",
            "time": "12:52 pm",
            "description": "Test of Training & Education was approved by Parita Pandya"
        },
        {
            "date": "10-10-2024",
            "time": "12:52 pm",
            "description": "Test of Training & Education was approved by Parita Pandya"
        }
    ];

    const handleExpandClick = (id: number) => {
        setIsOpen(!isOpen);
        setExpandedRow(expandedRow === id ? null : id);
    };

    return (
        <>
            <div className="p-6 space-y-10">
                <div className="flex justify-end">
                    {/* <h1 className="md:text-[30px] md:font-normal leading-[45px]">AUDIT TRAIL</h1> */}
                    <Button className="bg-white text-black border text-md font-normal hover:bg-white" onClick={() => router.back()}>Back</Button>
                </div>
                <div className="space-y-2">
                    <div className="border rounded-xl py-4 px-3 overflow-y-auto">
                        <Table>
                            <TableHeader className={"sticky top-0"}>
                                <TableRow className={"bg-[#E0E9FF] rounded-xl border-none"}>
                                    {dataHeader && dataHeader.map((item, index: number) => (
                                        <TableHead
                                            className={
                                                `${([0].includes(index)) ? 'rounded-l-xl' : ([6].includes(index)) ? 'rounded-r-xl' : ''} text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']`
                                            }
                                        >
                                            {item.title}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            {props.data ?
                                <TableBody className="">
                                    {
                                        props.data && props.data?.map((item, index) => {
                                            return (
                                                <>
                                                    <TableRow className={`${expandedRow === index ? 'border-b-0' : ''}`}>
                                                        <TableCell className={"text-[#625d5d] text-[15px] font-normal text-center"}>
                                                            <span className="">
                                                                {item.name}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className={"text-[#625d5d] text-[15px] font-normal text-center flex flex-col"}>
                                                            <span className="">
                                                                {item.event_name ?? "-"}
                                                            </span>
                                                            <span>
                                                                ({item.event_type ?? "-"})
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className={"text-[#625d5d] text-[15px] font-normal text-center"}>
                                                            <span className="">
                                                                {item.event_start_date ?? "-"}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className={"text-[#625d5d] text-[15px] font-normal text-center"}>
                                                            <span className="">
                                                                {item.event_venue ?? "-"}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className={"text-[#625d5d] text-[15px] font-normal text-center"}>
                                                            <span className="">
                                                                {item.sub_type_of_activity ?? "-"}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className={"text-[#625d5d] text-[15px] font-normal text-center"}>
                                                            <span className="">
                                                                {item.status ?? "-"}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className={"text-[#625d5d] text-[15px] font-normal text-center cursor-pointer"} onClick={() => { handleExpandClick(index) }}>
                                                            {/* {isOpen ? */}
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6 ${isOpen ? '-rotate-180 transition-all duration-150 delay-100' : ''}`}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                            </svg>
                                                            {/* :
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                                            </svg>

                                                        } */}
                                                        </TableCell>
                                                    </TableRow>
                                                    {
                                                        expandedRow === index && (
                                                            <TableRow className="">
                                                                <TableCell colSpan={7} className={"text-[#625d5d] text-[15px] font-normal text-center"}>
                                                                    {item.logs && item.logs.map((data, index: number) => (
                                                                        <div className={`grid grid-cols-5 ${index ? 'mt-5' : ''}`}>
                                                                            <div className="col-span-1">
                                                                                <div className="flex flex-col space-y-1 ">
                                                                                    <div className="flex items-center space-x-5">
                                                                                        <div>
                                                                                            <div className={`${item.logs.length - 1 != index ? 'before:h-10' : ''} before:absolute before:w-0.5 before:bg-[#988AFF]`}></div>
                                                                                            <div className="ml-0.5">
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6" fill="none">
                                                                                                    <g filter="url(#filter0_ii_652_29226)">
                                                                                                        <path d="M5 0.337291C7.76142 0.337291 10 2.57587 10 5.33729C10 8.09871 7.76142 1.3374 5 1.3374C2.23858 1.3374 9.17377e-08 8.09872 -2.89679e-08 5.33729C-1.49674e-07 2.57587 2.23858 0.337292 5 0.337291Z" fill="url(#paint0_linear_652_29226)" />
                                                                                                    </g>
                                                                                                    <defs>
                                                                                                        <filter id="filter0_ii_652_29226" x="0" y="-1.6626" width="10" height="9.6626" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                                                                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                                                                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                                                                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                                                                            <feOffset dy="-2" />
                                                                                                            <feGaussianBlur stdDeviation="2" />
                                                                                                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                                                                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                                                                                            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_652_29226" />
                                                                                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                                                                            <feOffset dy="2" />
                                                                                                            <feGaussianBlur stdDeviation="2" />
                                                                                                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                                                                                            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
                                                                                                            <feBlend mode="normal" in2="effect1_innerShadow_652_29226" result="effect2_innerShadow_652_29226" />
                                                                                                        </filter>
                                                                                                        <linearGradient id="paint0_linear_652_29226" x1="-2.18552e-07" y1="5.3374" x2="10" y2="5.3374" gradientUnits="userSpaceOnUse">
                                                                                                            <stop stop-color="#988AFF" />
                                                                                                            <stop offset="1" stop-color="#5945ED" />
                                                                                                        </linearGradient>
                                                                                                    </defs>
                                                                                                </svg>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="space-x-2">
                                                                                            <span className="font-bold">

                                                                                                {data.timestamp}
                                                                                            </span>
                                                                                            {/* <span>
                                                                                            {item.time}
                                                                                        </span> */}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <p className="col-span-4 text-left">
                                                                                {data.changes}
                                                                            </p>
                                                                        </div>
                                                                    ))
                                                                    }
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    }
                                                </>
                                            )
                                        }
                                        )}
                                </TableBody>
                                : <TableBody>
                                    <TableRow className="text-center text-black text-nowrap ">
                                        <TableCell colSpan={9}>No Results</TableCell>
                                    </TableRow>
                                </TableBody>
                            }
                        </Table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuditTrail;