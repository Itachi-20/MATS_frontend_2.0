import React from 'react';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from '@/components/ui/checkbox';

type CompensationBudget = {
    vendor_type: string;
    vendor_name: string;
    amount: number;
    gst: boolean;
};

const total_Expense = () => {
    const budgets: CompensationBudget[] = [
        {
            vendor_type: "Stationary",
            vendor_name: "Vendor Name q",
            amount: 20000,
            gst: true,
        },
        {
            vendor_type: "Stationary",
            vendor_name: "Vendor Name q",
            amount: 20000,
            gst: true,
        },
    ];

    return (
        <div className="md:pb-8">
            <div className="flex gap-5">
                <h1 className="text-black md:text-[30px] md:font-medium md:pb-4 uppercase">
                    Compensation Budget
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
                                Vendor Name
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                {"Amount (in INR)"}
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                GST Included?
                            </TableHead>

                        </TableRow>
                    </TableHeader>
                    {budgets.map((budget, index) => {
                        return(
                    <TableBody key={index}>
                        <TableRow className="text-black text-center">
                            <TableCell>{budget.vendor_type}</TableCell>
                            <TableCell>{budget.vendor_name}</TableCell>
                            <TableCell>{budget.amount}</TableCell>
                            <TableCell>
                                <div><Checkbox className='text-black w-5 h-5' /></div>
                            </TableCell>
                        </TableRow>
                    </TableBody>

                        )
                    })}
                </Table>
            </div>
        </div>
    )
}
export default total_Expense