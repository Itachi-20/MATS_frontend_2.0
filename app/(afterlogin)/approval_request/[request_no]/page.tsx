import React from 'react';
import DialogBox from '@/components/dialogbox';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import RequestDetails from "@/components/request_details";
import BudgetRequest from '@/components/logistics_budget';
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table";

export default function ApprovalRequestDetail() {
    return (
        <div className='px-9 py-7'>
            <RequestDetails />
            <BudgetRequest RequestNo={10101} />

            {/* ------- STATRT LOGISTICS Actual BUDGET section ------ */}
            <div className="flex gap-6">
                <h1 className="text-black md:text-[30px] md:font-medium uppercase md:pb-4">
                    LOGISTICS Actual BUDGET
                </h1>
            </div>

            <div className="border border-[#848484] p-7 rounded-[50px] w-full mr-4  bg-white">
                <Table className={""}>
                    <TableHeader className={"bg-[#E0E9FF]"}>
                        <TableRow className={""}>
                            <TableHead
                                className={
                                    "text-center rounded-l-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                Vendor Type
                            </TableHead>

                            <TableHead
                                className={
                                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                Amount (in INR)
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                Amount (in INR)
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                Amount (in INR)
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                Amount (in INR)
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center text-[#625d5d] rounded-r-2xl text-[15px] font-normal font-['Montserrat']"
                                }
                            >

                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="text-black text-center">
                            <TableCell>Stationary</TableCell>
                            <TableCell>Vendor Name q</TableCell>
                            <TableCell>20000</TableCell>
                            <TableCell>20000</TableCell>
                            <TableCell>20000</TableCell>
                            <TableCell className='cursor-pointer'><svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Group 33">
                                    <path id="Vector" d="M10.4988 9.99755C11.9716 9.99755 13.1655 8.80361 13.1655 7.3308C13.1655 5.858 11.9716 4.66406 10.4988 4.66406C9.02597 4.66406 7.83203 5.858 7.83203 7.3308C7.83203 8.80361 9.02597 9.99755 10.4988 9.99755Z" fill="black" />
                                    <path id="Vector_2" d="M20.4603 7.10687C19.6762 5.07858 18.3149 3.32451 16.5447 2.06145C14.7745 0.798393 12.6731 0.0817176 10.5 0C8.32695 0.0817176 6.22547 0.798393 4.4553 2.06145C2.68512 3.32451 1.32385 5.07858 0.539718 7.10687C0.486761 7.25334 0.486761 7.41374 0.539718 7.56021C1.32385 9.58851 2.68512 11.3426 4.4553 12.6056C6.22547 13.8687 8.32695 14.5854 10.5 14.6671C12.6731 14.5854 14.7745 13.8687 16.5447 12.6056C18.3149 11.3426 19.6762 9.58851 20.4603 7.56021C20.5132 7.41374 20.5132 7.25334 20.4603 7.10687ZM10.5 11.667C9.64292 11.667 8.80509 11.4128 8.09246 10.9367C7.37983 10.4605 6.8244 9.78372 6.49641 8.99188C6.16842 8.20005 6.0826 7.32873 6.24981 6.48813C6.41702 5.64752 6.82974 4.87537 7.43578 4.26932C8.04183 3.66328 8.81398 3.25056 9.65458 3.08335C10.4952 2.91614 11.3665 3.00196 12.1583 3.32995C12.9502 3.65794 13.627 4.21337 14.1031 4.926C14.5793 5.63864 14.8335 6.47646 14.8335 7.33354C14.8317 8.4823 14.3746 9.58351 13.5623 10.3958C12.75 11.2081 11.6488 11.6652 10.5 11.667Z" fill="black" />
                                </g>
                            </svg>
                            </TableCell>

                        </TableRow>
                        <TableRow className="text-black text-center">
                            <TableCell>Stationary</TableCell>
                            <TableCell>Vendor Name q</TableCell>
                            <TableCell>20000</TableCell>
                            <TableCell>20000</TableCell>
                            <TableCell>20000</TableCell>
                            <TableCell className='cursor-pointer'><svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Group 33">
                                    <path id="Vector" d="M10.4988 9.99755C11.9716 9.99755 13.1655 8.80361 13.1655 7.3308C13.1655 5.858 11.9716 4.66406 10.4988 4.66406C9.02597 4.66406 7.83203 5.858 7.83203 7.3308C7.83203 8.80361 9.02597 9.99755 10.4988 9.99755Z" fill="black" />
                                    <path id="Vector_2" d="M20.4603 7.10687C19.6762 5.07858 18.3149 3.32451 16.5447 2.06145C14.7745 0.798393 12.6731 0.0817176 10.5 0C8.32695 0.0817176 6.22547 0.798393 4.4553 2.06145C2.68512 3.32451 1.32385 5.07858 0.539718 7.10687C0.486761 7.25334 0.486761 7.41374 0.539718 7.56021C1.32385 9.58851 2.68512 11.3426 4.4553 12.6056C6.22547 13.8687 8.32695 14.5854 10.5 14.6671C12.6731 14.5854 14.7745 13.8687 16.5447 12.6056C18.3149 11.3426 19.6762 9.58851 20.4603 7.56021C20.5132 7.41374 20.5132 7.25334 20.4603 7.10687ZM10.5 11.667C9.64292 11.667 8.80509 11.4128 8.09246 10.9367C7.37983 10.4605 6.8244 9.78372 6.49641 8.99188C6.16842 8.20005 6.0826 7.32873 6.24981 6.48813C6.41702 5.64752 6.82974 4.87537 7.43578 4.26932C8.04183 3.66328 8.81398 3.25056 9.65458 3.08335C10.4952 2.91614 11.3665 3.00196 12.1583 3.32995C12.9502 3.65794 13.627 4.21337 14.1031 4.926C14.5793 5.63864 14.8335 6.47646 14.8335 7.33354C14.8317 8.4823 14.3746 9.58351 13.5623 10.3958C12.75 11.2081 11.6488 11.6652 10.5 11.667Z" fill="black" />
                                </g>
                            </svg>
                            </TableCell>
                        </TableRow>

                        <TableRow className="text-black text-center">
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>                            
                            <TableCell className='flex justify-end text-4 font-medium leading-normal font-["Poppins"] items-center space-x-4'><span>Total</span><span className='font-normal px-5 py-[10px] bg-[#F5F5F5]'>40,000</span></TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </div>

            <div className="pt-10 w-[520px] space-y-[10px]">
                    <label className="lable text-[20px] font-normal leading-normal">
                        Remarks
                    </label>
                    <Textarea className='text-black shadow-md placeholder:text-[18px] font-light leading-light' placeholder='Type here...' readOnly />
            </div>            
            {/* ----------END LOGISTICS Actual BUDGET  setcion ------------*/}

            <div className="flex justify-end pt-20 gap-4">
              <Button className="bg-white text-black border rounded-[8px] text-lg leading-normal font-normal px-[50px] py-[10px] font-['Poppins']">
                 Back
              </Button>                
              <DialogBox button={'Approve'} msg={"Submitted Successfully"}/>
            </div>

        </div>
    )
}
