import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";9



const LogisticBudget: React.FC = () => {
    return (
        <div className="pb-8">
            <div className="flex gap-6">
                <h1 className="text-black md:text-[30px] md:font-medium uppercase md:pb-4">
                    Logistics Budget
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
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="text-black text-center">
                      

                            <TableCell>Stationary</TableCell>
                            <TableCell>20000</TableCell>
                        </TableRow>
                        <TableRow className="text-black text-center">
                    

                            <TableCell>Hotel</TableCell>
                            <TableCell>20000</TableCell>
                        </TableRow>                        
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default LogisticBudget;