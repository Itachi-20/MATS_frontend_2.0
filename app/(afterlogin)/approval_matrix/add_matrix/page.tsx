'use client';
import React from 'react';
import { useRouter } from "next/navigation";
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";

export default function AddMatrix() {
    const router = useRouter()
    return (
        <div className='px-10 mb-10'>
            <div className="grid grid-cols-2 gap-5 py-5">

                <div className="space-y-1">
                    <Label htmlFor="type">
                        Type:
                    </Label>
                    <Select>
                        <SelectTrigger className="text-black shadow-md rounded-[8px] gap-4!important">
                            <SelectValue placeholder="-Select-" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pdf">Pdf</SelectItem>
                            <SelectItem value="excel">Excel</SelectItem>
                            <SelectItem value="print">Print</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-1">
                    <Label htmlFor="displaywise" className='text-nowrap'>
                        Display Wise:<span className='text-red-500'>*</span>
                    </Label>
                    <Select>
                        <SelectTrigger className="text-black shadow-md rounded-[8px] gap-4!important">
                            <SelectValue placeholder="-Select-" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pdf">Pdf</SelectItem>
                            <SelectItem value="excel">Excel</SelectItem>
                            <SelectItem value="print">Print</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-1">
                    <Label htmlFor="option">
                        Opyion:<span className='text-red-500'>*</span>
                    </Label>
                    <Select>
                        <SelectTrigger className="text-black shadow-md rounded-[8px] gap-4!important">
                            <SelectValue placeholder="-Select-" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pdf">Pdf</SelectItem>
                            <SelectItem value="excel">Excel</SelectItem>
                            <SelectItem value="print">Print</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="spce-y-1">
                    <Label htmlFor="displaywise">
                        User Division:<span className='text-red-500'>*</span>
                    </Label>
                    <Select>
                        <SelectTrigger className="text-black shadow-md rounded-[8px] gap-4!important">
                            <SelectValue placeholder="-Select-" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pdf">Pdf</SelectItem>
                            <SelectItem value="excel">Excel</SelectItem>
                            <SelectItem value="print">Print</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-1">
                    <Label htmlFor="budgetType">
                        Budget TGype
                    </Label>
                    <Select>
                        <SelectTrigger className="text-black shadow-md rounded-[8px] gap-4!important">
                            <SelectValue placeholder="-Select-" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pdf">Pdf</SelectItem>
                            <SelectItem value="excel">Excel</SelectItem>
                            <SelectItem value="print">Print</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-1">
                    <Label htmlFor="budget_sub_type">
                        Budget Sub Type
                    </Label>
                    <Select>
                        <SelectTrigger className="text-black shadow-md rounded-[8px] gap-4!important">
                            <SelectValue placeholder="-Select-" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pdf">Pdf</SelectItem>
                            <SelectItem value="excel">Excel</SelectItem>
                            <SelectItem value="print">Print</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-5  ">

                <div className="fspace-y-1">
                    <Label htmlFor="approver1">
                        Approver1
                    </Label>
                    <Select>
                        <SelectTrigger className="text-black shadow-md rounded-[8px] gap-4!important">
                            <SelectValue placeholder="-Select-" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pdf">Pdf</SelectItem>
                            <SelectItem value="excel">Excel</SelectItem>
                            <SelectItem value="print">Print</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-1">
                    <Label htmlFor="approver1">
                        Approver2
                    </Label>
                    <Select>
                        <SelectTrigger className="text-black shadow-md rounded-[8px] gap-4!important">
                            <SelectValue placeholder="-Select-" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pdf">Pdf</SelectItem>
                            <SelectItem value="excel">Excel</SelectItem>
                            <SelectItem value="print">Print</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-1">
                    <Label htmlFor="approver1">
                        Approver3
                    </Label>
                    <Select>
                        <SelectTrigger className="text-black shadow-md rounded-[8px] gap-4!important">
                            <SelectValue placeholder="-Select-" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pdf">Pdf</SelectItem>
                            <SelectItem value="excel">Excel</SelectItem>
                            <SelectItem value="print">Print</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-1">
                    <Label htmlFor="approver1">
                        Approver4
                    </Label>
                    <Select>
                        <SelectTrigger className="text-black shadow-md rounded-[8px] gap-4!important">
                            <SelectValue placeholder="-Select-" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pdf">Pdf</SelectItem>
                            <SelectItem value="excel">Excel</SelectItem>
                            <SelectItem value="print">Print</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-1">
                    <Label htmlFor="approver1">
                        Approver5
                    </Label>
                    <Select>
                        <SelectTrigger className="text-black shadow-md rounded-[8px] gap-4!important">
                            <SelectValue placeholder="-Select-" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pdf">Pdf</SelectItem>
                            <SelectItem value="excel">Excel</SelectItem>
                            <SelectItem value="print">Print</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-1">
                    <Label htmlFor="approver1">
                        Approver6
                    </Label>
                    <Select>
                        <SelectTrigger className="text-black shadow-md rounded-[8px] gap-4!important">
                            <SelectValue placeholder="-Select-" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pdf">Pdf</SelectItem>
                            <SelectItem value="excel">Excel</SelectItem>
                            <SelectItem value="print">Print</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-1">
                    <Label htmlFor="approver1">
                        Approver7
                    </Label>
                    <Select>
                        <SelectTrigger className="text-black shadow-md rounded-[8px] gap-4!important">
                            <SelectValue placeholder="-Select-" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pdf">Pdf</SelectItem>
                            <SelectItem value="excel">Excel</SelectItem>
                            <SelectItem value="print">Print</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className='flex justify-end space-x-3'>
            <Button className='text-[15px] text-white font-medium bg-blue-400 px-7 py-2'>Save</Button>
            <Button className='text-[15px] text-white font-medium bg-red-400 px-6 py-2' onClick={() => router.push("/approval_matrix") }>Cancel</Button>
            </div>

        </div>
    )
}
