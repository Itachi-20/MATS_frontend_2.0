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
                {/* <div>
                    {PageName === "eventListPage" ? (
                    <div>
                            <div className="flex justify-between">
                                <h1 className=" md:text-[30px] md:font-normal capitalize md:pb-4 leading-[45px]">APPROVER HIERARCHY</h1>
                                <div className="flex gap-4 bg-white">
                                    <Link href={"/event_list/id/"}> 
                                      <Button className="bg-white text-black border rounded-full px-8 hover:bg-white leading-[30px] text-[20px] font-normal">Back</Button>
                                    </Link>
                                </div>
                            </div>
                            <div className="p-4 border border-slate-300 rounded-3xl">
                                <div className="flex relative space-x-0 ">
                                    {Array.from({ length: 6 }).map((_, index) => {
                                        const isBlue = index < 3; //
                                        const isText = index < 4;
                                        // const personName = index > 5;
                                        const circleColor = isBlue && isText ? 'bg-custom-gradient ' : 'bg-gray-400'; 
                                        
                                        return (
                                            <div key={index} className="flex flex-col relative items-center space-x-14">
                                                <div className={`mt-2 leading-[22.5px] text-[15px] font-medium font-['Poppins'] ${isText ? 'text-[#5945ED]':'text-gray-300'}`}><span className="">Approver {index + 1}</span> </div>
                                                <div className={`w-4 h-4 ${circleColor} rounded-full`}></div>
                                                <span className="mt-2 leading-[22.5px] text-[15px] font-normal text-[#000000] font-['Poppins']">Person Name {index + 1}</span>
                                             
                                                {index < 5 && ( 
                                                    <div className={`h-1 w-[25vh] ${isBlue ? 'bg-custom-gradient' : 'bg-gray-300'} absolute top-[50%] left-[37.7%] transform -translate-y-1/2`}></div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                 ) : ( 
                        <div className="flex justify-between pb-5 gap-40">
                            <div className="relative">
                                <Input
                                    className="bg-[#ecf2ff] rounded-full text-black pr-10 focus-visible:outline-none focus-visible:border-none focus:outline-none focus:border-none"
                                    placeholder="Search"
                                    size={40}
                                ></Input>
                                <svg
                                    className="absolute right-3 top-3"
                                    width="15"
                                    height="15"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g id="Group 1707479612">
                                        <path
                                            id="Vector"
                                            d="M6.10129 0.961067C7.11792 0.96014 8.11199 1.26043 8.95774 1.82394C9.80349 2.38745 10.4629 3.18887 10.8526 4.12681C11.2423 5.06476 11.3447 6.09708 11.147 7.09319C10.9492 8.0893 10.4601 9.00445 9.74158 9.72285C9.02305 10.4413 8.10734 10.9306 7.11032 11.1291C6.11329 11.3276 5.07973 11.2262 4.1404 10.8378C3.20107 10.4494 2.39816 9.79138 1.83326 8.94708C1.26835 8.10278 0.966823 7.11008 0.966823 6.09457C0.972986 4.73579 1.51577 3.43434 2.4772 2.47309C3.43864 1.51184 4.74102 0.968465 6.10129 0.961067ZM6.10129 4.51938e-10C4.89457 3.62551e-10 3.71495 0.35744 2.7116 1.02712C1.70825 1.6968 0.926228 2.64864 0.464436 3.76228C0.00264368 4.87592 -0.118182 6.10133 0.117237 7.28357C0.352657 8.4658 0.933749 9.55175 1.78703 10.4041C2.64031 11.2564 3.72746 11.8369 4.91099 12.072C6.09453 12.3072 7.32129 12.1865 8.43616 11.7252C9.55102 11.2639 10.5039 10.4828 11.1743 9.48054C11.8448 8.47829 12.2026 7.29996 12.2026 6.09457C12.2026 4.47819 11.5598 2.92801 10.4156 1.78506C9.27134 0.642105 7.71946 5.71801e-10 6.10129 4.51938e-10Z"
                                            fill="black"
                                        />
                                        <path
                                            id="Vector_2"
                                            d="M14.8637 14.2L11.4047 10.7214L10.7383 11.3825L14.1972 14.8611C14.2407 14.9048 14.2923 14.9395 14.3492 14.9633C14.4061 14.9871 14.4671 14.9994 14.5288 14.9996C14.5905 14.9998 14.6516 14.9879 14.7086 14.9645C14.7657 14.9412 14.8176 14.9068 14.8613 14.8634C14.9051 14.82 14.9399 14.7684 14.9637 14.7116C14.9875 14.6548 14.9998 14.5938 15.0001 14.5322C15.0003 14.4706 14.9883 14.4096 14.9649 14.3526C14.9416 14.2956 14.9071 14.2437 14.8637 14.2Z"
                                            fill="black"
                                        />
                                    </g>
                                </svg>
                            </div>
                            <div className="flex gap-3">
                                <Input
                                    className="w-30 text-black border border-[#cecece] rounded-full"
                                    type="month"
                                    id="month"
                                    name="month"
                                    placeholder="Month"
                                />
                                <Input
                                    className="w-30 text-black border border-[#cecece] rounded-full"
                                    type="date"
                                    id="date"
                                    name="date"
                                />
                                <Button className="bg-white text-black border border-[#cecece] text-md font-normal hover:bg-white rounded-full">
                                    Back
                                </Button>
                            </div>
                        </div>
                    )}
                </div> */}
                <div className="space-y-2">
                    <h1 className="md:text-[30px] md:font-normal leading-[45px]">AUDIT TRAIL</h1>
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
                                                                {item.event_name}
                                                            </span>
                                                            <span>
                                                                ({item.event_type})
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className={"text-[#625d5d] text-[15px] font-normal text-center"}>
                                                            <span className="">
                                                                {item.event_start_date}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className={"text-[#625d5d] text-[15px] font-normal text-center"}>
                                                            <span className="">
                                                                {item.event_venue}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className={"text-[#625d5d] text-[15px] font-normal text-center"}>
                                                            <span className="">
                                                                {item.sub_type_of_activity}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className={"text-[#625d5d] text-[15px] font-normal text-center"}>
                                                            <span className="">
                                                                {item.status}
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