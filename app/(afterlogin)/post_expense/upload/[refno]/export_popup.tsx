import React from 'react'

import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from '@/components/ui/checkbox';
type EventTable = {
    type: string;
    sub_type: string;
    document_name: string;
    checkbox: boolean;
};
const events: EventTable[] = [
    {
        type: 'Pre - Activity',
        sub_type: 'Agenda',
        document_name: 'documentname1.docx',
        checkbox: false
    },
    {
        type: 'Pre - Activity',
        sub_type: 'Agenda',
        document_name: 'documentname1.docx',
        checkbox: false
    },
    {
        type: 'Pre - Activity',
        sub_type: 'Agenda',
        document_name: 'documentname1.docx',
        checkbox: false
    },
];

type ImportFiles = {
    name: string,
    file_name: string,
    file_url: string
}

type props = {
    handleExport: () => void;
    data: ImportFiles[];
}
const popup = ({ ...Props }: props) => {
    return (

        <>
            <div className="absolute z-50 flex inset-0 items-center justify-center bg-black bg-opacity-50">
                <div className="border-2 rounded-xl p-6 max-w-lg w-full bg-white relative text-black">
                    <h1 className="text-2xl font-poppins py-4">Add Document</h1>
                    <div className="border bg-white h-full p-4 rounded-[18px]">
                        <Table className={""}>
                            <TableHeader className={"bg-[#E0E9FF]"}>
                                <TableRow className={"text-nowrap rounded-r-2xl border-none"}>
                                    <TableHead
                                        className={
                                            "text-center rounded-l-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                        }
                                    >
                                        Type
                                    </TableHead>
                                    <TableHead
                                        className={
                                            "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                        }
                                    >
                                        Sub Type
                                    </TableHead>
                                    <TableHead
                                        className={
                                            "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                        }
                                    >
                                        Document Name
                                    </TableHead>

                                    
                                    <TableHead
                                        className={
                                            "text-center rounded-r-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat'] sticky right-0 z-50 bg-[#E0E9FF]"
                                        }
                                    ></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Props.data &&
                                    Props.data.map((data, index) => {
                                        return (
                                            <TableRow key={index} className="text-center text-nowrap text-black">
                                                <TableCell>{data.name}</TableCell>
                                                <TableCell>{data.file_name}</TableCell>
                                                <TableCell>{data.file_url}</TableCell>
                                                <TableCell className='sticky right-0 z-50 gap-3 bg-white mt-2 flex border-l'>
                                                    <Checkbox id='checkbox'/>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex justify-end pt-5 gap-4 w-full">
                        <Button className="bg-white text-black border text-md font-normal px-12 rounded-md hover:bg-white" onClick={Props.handleExport}>
                            Back
                        </Button>
                        <Button className="bg-[#4430bf] text-white text-md font-normal border px-8 hover:bg-[#4430bf]">
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </>

    )
}

export default popup
