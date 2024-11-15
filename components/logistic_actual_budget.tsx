'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useRouter } from 'next/navigation';
import DialogBox from './dialogbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";

type EventTable = {
    vendor_type: string;
    vendor_name: string;
    actual_amount: number;
    gst: number;
    total_amount: number;
    // attachment: File;
    remakrs: string
}

export default function LogisticActualBudget() {
    const router = useRouter();
    const [fileName, setFileName] = useState();

    const events: EventTable[] = [
        {
            vendor_type: "Stationary",
            vendor_name: "Vendor Name q",
            actual_amount: 20000,
            gst: 20000,
            total_amount: 30000,
            //   attachemnt: ,
            remakrs: "discription",
        },
        {
            vendor_type: "Stationary",
            vendor_name: "Vendor Name q",
            actual_amount: 20000,
            gst: 20000,
            total_amount: 30000,
            //   attachemnt: ,
            remakrs: "discription",
        }
    ];

    const handleFileChange: any = (e: any) => {
        setFileName(e.target.files[0]?.name)
    };

    const handleClick = () => {
        //   router.push("/event_list/${id}")
    }

    return (
        <div className="md:pb-8">
            <div className="flex md:gap-6 justify-between items-center">
                <h1 className="text-black md:text-[30px] md:font-medium uppercase md:pb-4">
                    LOGISTICS Actual BUDGET
                </h1>
                <div className='flex space-x-6'>
                    <button className='flex space-x-[10px] border-[1px] border-[#4430BF] rounded-[8px] items-center py-[6px] px-6'>
                        <svg width="16" height="16" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path id="Vector" d="M14.8571 9.64286H9.14286V15.3571C9.14286 15.6602 9.02245 15.9509 8.80812 16.1653C8.59379 16.3796 8.30311 16.5 8 16.5C7.6969 16.5 7.40621 16.3796 7.19188 16.1653C6.97755 15.9509 6.85714 15.6602 6.85714 15.3571V9.64286H1.14286C0.839753 9.64286 0.549063 9.52245 0.334735 9.30812C0.120408 9.09379 0 8.8031 0 8.5C0 8.1969 0.120408 7.90621 0.334735 7.69188C0.549063 7.47755 0.839753 7.35714 1.14286 7.35714H6.85714V1.64286C6.85714 1.33975 6.97755 1.04906 7.19188 0.834735C7.40621 0.620407 7.6969 0.5 8 0.5C8.30311 0.5 8.59379 0.620407 8.80812 0.834735C9.02245 1.04906 9.14286 1.33975 9.14286 1.64286V7.35714H14.8571C15.1602 7.35714 15.4509 7.47755 15.6653 7.69188C15.8796 7.90621 16 8.1969 16 8.5C16 8.8031 15.8796 9.09379 15.6653 9.30812C15.4509 9.52245 15.1602 9.64286 14.8571 9.64286Z" fill="#4430BF" />
                        </svg>
                        <span className='text-[18px] font-normal leading-normal text-[#4430BF]'>
                            Add New vendor
                        </span>
                    </button>
                    {/* <button className='flex space-x-[10px] border-[1px] border-[#E5E5E5] rounded-[8px] items-center py-[6px] px-6'>
                        <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path id="Vector" d="M12.5394 9.64286H8.06739V15.3571C8.06739 15.6602 7.97316 15.9509 7.80542 16.1653C7.63769 16.3796 7.41019 16.5 7.17298 16.5C6.93577 16.5 6.70827 16.3796 6.54054 16.1653C6.3728 15.9509 6.27857 15.6602 6.27857 15.3571V9.64286H1.80652C1.56931 9.64286 1.34181 9.52245 1.17408 9.30812C1.00634 9.09379 0.912109 8.8031 0.912109 8.5C0.912109 8.1969 1.00634 7.90621 1.17408 7.69188C1.34181 7.47755 1.56931 7.35714 1.80652 7.35714H6.27857V1.64286C6.27857 1.33975 6.3728 1.04906 6.54054 0.834735C6.70827 0.620407 6.93577 0.5 7.17298 0.5C7.41019 0.5 7.63769 0.620407 7.80542 0.834735C7.97316 1.04906 8.06739 1.33975 8.06739 1.64286V7.35714H12.5394C12.7767 7.35714 13.0041 7.47755 13.1719 7.69188C13.3396 7.90621 13.4338 8.1969 13.4338 8.5C13.4338 8.8031 13.3396 9.09379 13.1719 9.30812C13.0041 9.52245 12.7767 9.64286 12.5394 9.64286Z" fill="#635E5E" />
                        </svg>
                        <span className='text-[18px] font-normal leading-normal text-[#000]'>
                            Add vendor
                        </span>
                    </button> */}
                </div>
            </div>

            <div className="grid md:grid-cols-3 md:gap-6 mt-[35px]">

                <div className="flex flex-col md:gap-2">
                    <label className="text-black md:text-sm md:font-normal capitalize">
                        vendor type<span className="text-[#e60000]">*</span>
                    </label>
                    <Select>
                        <SelectTrigger className="text-black w-34 shadow focus-visible:ring-transparent lg:text-sm lg:rounded-[25px] lg:gap-4 sm:rounded-[50px] rounded-[50px] sm:text-[9px] sm:gap-[10px] gap-[9px] text-[9px] sm:font-normal sm:leading-[10.97px]">
                            <SelectValue placeholder="-Select-" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="v1">v1</SelectItem>
                            <SelectItem value="v2">v2</SelectItem>
                            <SelectItem value="v3">v3</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col md:gap-2">
                    <label className="text-black md:text-sm md:font-normal capitalize">
                        Vendor Name<span className="text-[#e60000]">*</span>
                    </label>
                    <Input
                        className="text-black shadow md:rounded-xl md:py-5"
                        placeholder="Type Here"
                        readOnly={true}
                    ></Input>
                </div>

                <div className="flex flex-col md:gap-2">
                    <label className="text-black md:text-sm md:font-normal capitalize">
                        Actual Amount<span className="text-[#e60000]">*</span>
                    </label>
                    <Input
                        className="text-black shadow md:rounded-xl md:py-5"
                        placeholder="Type Here"
                        readOnly={true}
                    ></Input>
                </div>

                <div className="flex flex-col md:gap-2">
                    <label className="text-black md:text-sm md:font-normal capitalize">
                        GST<span className="text-[#e60000]">*</span>
                    </label>
                    <Select>
                        <SelectTrigger className="text-black w-34 shadow focus-visible:ring-transparent lg:text-sm lg:rounded-[25px] lg:gap-4 sm:rounded-[50px] rounded-[50px] sm:text-[9px] sm:gap-[10px] gap-[9px] text-[9px] sm:font-normal sm:leading-[10.97px]">
                            <SelectValue placeholder="-Select-" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="G1">G1</SelectItem>
                            <SelectItem value="G22">G2</SelectItem>
                            <SelectItem value="G43">G3</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col md:gap-2">
                    <label className="text-black md:text-sm md:font-normal capitalize">
                        Total Amount<span className="text-[#e60000]">*</span>
                    </label>
                    <Input
                        className="text-black shadow md:rounded-xl md:py-5"
                        placeholder="No data"
                        readOnly={true}
                    ></Input>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="lable">
                        Upload Bill
                    </label>
                    <div className="flex items-center space-x-4">
                        <label className="flex items-center py-2 px-16 space-x-[80px] bg-white rounded-md shadow-sm cursor-pointer border-[1px] border-[#4430BF]">
                            <svg width="25" height="26" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path id="Vector" d="M17.5143 0.500028C16.4161 0.49724 15.3281 0.700933 14.3134 1.09934C13.2986 1.49774 12.3771 2.08295 11.6022 2.82116L1.36236 12.537C1.04822 12.8344 0.871512 13.238 0.871094 13.659C0.870677 14.0801 1.04659 14.484 1.36013 14.782C1.67367 15.08 2.09915 15.2476 2.54298 15.248C2.98681 15.2484 3.41263 15.0815 3.72676 14.7841L13.971 5.06408C14.924 4.23299 16.1787 3.78337 17.4729 3.80915C18.7671 3.83494 20.0008 4.33414 20.9161 5.20247C21.8315 6.07079 22.3577 7.24106 22.3849 8.46879C22.4121 9.69651 21.9381 10.8867 21.062 11.7907L9.24445 23.0011C8.92762 23.2812 8.50856 23.4336 8.07557 23.4264C7.64258 23.4191 7.22945 23.2527 6.92323 22.9622C6.61701 22.6718 6.4416 22.2799 6.43396 21.8691C6.42632 21.4584 6.58705 21.0608 6.88227 20.7603L18.6999 9.54992C19.014 9.25221 19.1906 8.84832 19.1908 8.4271C19.191 8.00587 19.0148 7.60182 18.701 7.30383C18.3871 7.00584 17.9614 6.83832 17.5173 6.83812C17.0733 6.83793 16.6473 7.00507 16.3332 7.30278L4.51341 18.5174C3.6373 19.4214 3.16332 20.6116 3.19051 21.8393C3.21769 23.067 3.74393 24.2373 4.65929 25.1056C5.57465 25.974 6.8083 26.4732 8.10253 26.4989C9.39675 26.5247 10.6514 26.0751 11.6044 25.244L23.422 14.0337C24.2007 13.2992 24.8181 12.4256 25.2385 11.4633C25.6589 10.5009 25.8739 9.46908 25.8711 8.42741C25.8687 6.32562 24.9875 4.31056 23.4208 2.82438C21.8541 1.33819 19.7299 0.502267 17.5143 0.500028Z" fill="#4430BF" />
                            </svg>
                            <span className="text-[18px] font-medium text-[#4430BF] ">{fileName ? fileName : 'Attacments'}</span>
                            <Input type="file" className="hidden" onChange={handleFileChange} />
                        </label>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="lable">
                        Remarks
                    </label>
                    <Textarea className='text-black shadow-md' placeholder='No Data' readOnly />
                </div>
                <div>

                </div>
                <div className='flex justify-end relative'>
                    <button className='px-6 py-[6px] border-[1px] border-[#4430BF] text-[#4430BF] rounded-[5px] flex justify-end absolute bottom-0 text-[18px] font-normal leading-normal'>Add</button>
                </div>
            </div>

            <div className="border bg-white h-full p-4 mt-[50px] rounded-[18px]">
                <Table >
                    <TableHeader className={"bg-[#E0E9FF]"}>
                        <TableRow className={"text-nowrap rounded-r-2xl"}>
                            <TableHead className={"text-center rounded-l-2xl text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"}>
                                vendor type
                            </TableHead>
                            <TableHead className={"text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"} >
                                vendor Name
                            </TableHead>
                            <TableHead className={"text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"} >
                                Actual Amount
                            </TableHead>
                            <TableHead className={"text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"} >
                                GST
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                                }
                            >
                                Total Amount
                            </TableHead>

                            <TableHead
                                className={
                                    "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                                }
                            >
                                Upload Bill
                            </TableHead>

                            <TableHead
                                className={
                                    "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                                }
                            >
                                Remarks
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center rounded-r-2xl text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat'] sticky right-0 bg-[#E0E9FF]"
                                }
                            >Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {events &&
                            events.map((data, index) => {
                                return (
                                    <TableRow key={index} className="text-center text-nowrap lg:text-[16px] sm:text-[10px] text-[10px] font-light leading-normal font-['Poppins'] border-b border-slate-200">
                                        <TableCell>{data.vendor_type}</TableCell>
                                        <TableCell>{data.vendor_name}</TableCell>
                                        <TableCell>{data.actual_amount}</TableCell>
                                        <TableCell>{data.gst}</TableCell>
                                        <TableCell>{data.total_amount}</TableCell>
                                        <TableCell>{fileName}</TableCell>
                                        <TableCell>{data.remakrs}</TableCell>
                                        <TableCell className="sticky right-0 bg-white flex lg:space-x-7 sm:space-x-5 space-x-2 border-l justify-end mr-4 border-slate-200">
                                            <Image src={"/svg/editIcon.svg"} width={17} height={20} alt="view-svg" className="cursor-pointer" onClick={handleClick} className="lg:w-[17px] lg:h-[20px] sm:w-[15px] sm:h-[18px] w-[14px] h-[16px] cursor-pointer" />
                                            <Image src={"/svg/delete.svg"} width={15} height={20} alt="delete-svg" className="cursor-pointer mr-1" className="lg:w-[15px] lg:h-[20px] sm:w-[12px] sm:h-[17px] w-[8px] h-[13px] cursor-pointer" />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                                                       
                          <TableRow> 
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>               
                            <TableCell className='text-right'>Total</TableCell>               
                            <TableCell className='flex justify-end text-4 font-medium leading-normal font-["Poppins"]'>
                                <span className='font-normal px-5 py-[10px] bg-[#F5F5F5]'>40,000</span>
                            </TableCell>                            
                         </TableRow>
                    </TableBody>
                </Table>
            </div>

            <div className="flex justify-end pt-20 gap-4">
                <Button className="bg-white text-black border rounded-[8px] text-lg leading-normal font-normal px-[50px] py-[10px] font-['Poppins']">
                    Save as Draft
                </Button>
                <Link href="/">
                    <Button className="bg-white text-black border rounded-[8px] text-lg leading-normal font-normal px-[50px] py-[10px] font-['Poppins']">
                        Back
                    </Button>
                </Link>
                <DialogBox button={"Submit"} msg={"Submitted Successfully"} />
                
            </div>
           <div>
             <h1 className="text-black md:text-[30px] md:font-medium uppercase">
               occurrence budget history
                </h1>
            <div className="border bg-white h-full p-4 mt-[20px] rounded-[18px]">
                <Table >
                    <TableHeader className={"bg-[#E0E9FF]"}>
                        <TableRow className={"text-nowrap rounded-r-2xl"}>
                            <TableHead className={"text-center rounded-l-2xl text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"}>
                               Occurrence
                            </TableHead>
                            <TableHead className={"text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"} >
                               Occurrence date
                            </TableHead>
                            <TableHead className={"text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"} >
                              Actual Amount
                            </TableHead>
                            <TableHead className={"text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"} >
                                GST
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                                }
                            >
                                Total Amount
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center text-[#625d5d] rounded-r-xl lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                                }
                            >
                                {/* Total Amount */}
                            </TableHead>
                           
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {events &&
                            events.map((data, index) => {
                                return (
                                    <TableRow key={index} className="text-center text-nowrap lg:text-[16px] sm:text-[10px] text-[10px] font-light leading-normal font-['Poppins'] border-b border-slate-200">
                                        <TableCell>{data.vendor_type}</TableCell>
                                        <TableCell>{data.vendor_name}</TableCell>
                                        <TableCell>{data.actual_amount}</TableCell>
                                        <TableCell>{data.gst}</TableCell>
                                        <TableCell>{data.total_amount}</TableCell>
                                        <TableCell className="sticky right-0 bg-white flex lg:space-x-7 sm:space-x-5 space-x-2 border-l justify-end mr-4 border-slate-200">
                                            <Image src={"/svg/editIcon.svg"} width={17} height={20} alt="view-svg" className="cursor-pointer" onClick={handleClick} className="lg:w-[17px] lg:h-[20px] sm:w-[15px] sm:h-[18px] w-[14px] h-[16px] cursor-pointer" />
                                            <Image src={"/svg/view.svg"} width={15} height={20} alt="delete-svg" className="cursor-pointer mr-1" className="lg:w-[15px] lg:h-[20px] sm:w-[12px] sm:h-[17px] w-[8px] h-[13px] cursor-pointer" />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                                                       
                          <TableRow>                             
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>               
                            <TableCell className='text-right'>Total</TableCell>               
                            <TableCell className='flex justify-end text-4 font-medium leading-normal font-["Poppins"]'>
                                <span className='font-normal px-5 py-[10px] bg-[#F5F5F5]'>40,000</span>
                            </TableCell>                            
                         </TableRow>
                    </TableBody>
                </Table>
            </div>
           </div>
        </div>
    )
}