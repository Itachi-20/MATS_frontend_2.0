import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
type vendor = {
    vendor_type: string;
    vendor_name: string
}[]
type Props = {
    setClose: React.Dispatch<React.SetStateAction<boolean>>
    pan_number: string | null | undefined;
};

const AddDocument = ({ ...Props }: Props) => {
    const [pan, setPan] = useState<string | null>(Props.pan_number ? Props.pan_number : '')
    const [vendorlist, setVendorList] = useState<vendor>()
    const [error, setError] = useState<string | null>()
    const [loading, setLoading] = useState(false)
    //   const base_url = process.env.NEXT_PUBLIC_FRAPPE_URL;
    const handlePanfieldsearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPan(value);
    }
    const checkvendor = async () => {
        console.log(pan, 'value in evebnt target')
        setError("")
        if (pan && pan.length >= 10) {
            setLoading(true)
            try {
                const response = await fetch("/api/checkVendorExists", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        pan: pan,
                    }),

                });
                if (response.ok) {
                    const data = await response.json();
                    console.log("data", data)
                    setVendorList(data.data);
                    setLoading(false)
                } else {
                    setLoading(false)
                    console.log('Login failed');
                }
            } catch (error) {
                setLoading(false)
                console.error("Error during login:", error);
            }
        } else {
            setError("PAN cannot less then 10 char")
            console.log("pan no is less than 10")
        }
    };
    return (
        <div className="absolute z-50 flex inset-0 items-center justify-center bg-black bg-opacity-50">
            <div className="border-2 w-[600px] rounded-xl p-10 bg-white relative">
                <h1 className="text-black text-[30px] font-medium capitalize pb-4">
                    Check Vendor
                </h1>
                <div className="flex gap-2">

                    <Input className='dropdown' placeholder='Search PAN here'
                        name='pan_number'
                        defaultValue={pan ? pan : ''}
                        onChange={(e) => handlePanfieldsearch(e)}
                    ></Input>
                    <Button className="bg-[#4430bf] text-white text-md font-normal border hover:bg-[#4430bf]" onClick={checkvendor}>
                        Search
                    </Button>
                </div>
                {error && <span className="text-red-500 mb-2">{error}</span>}
                <Table className="mt-4">
                    <TableHeader className="bg-[#E0E9FF]">
                        <TableRow className="text-nowrap text-[#625d5d] text-[15px] font-normal">
                            <TableHead className="text-center rounded-l-2xl">Vendor Type</TableHead>
                            <TableHead className="text-center rounded-r-2xl">Vendor Name</TableHead>
                        </TableRow>
                    </TableHeader>
                    {
                        loading ? <TableBody><TableRow ><TableCell colSpan={5} ><>
                            <div className='flex items-center justify-center'>
                                <Loader2 className=" mr-2 h-4 w-4 animate-spin" />
                                Loading...
                            </div>
                        </></TableCell></TableRow></TableBody> :
                            vendorlist && vendorlist.length > 0 ?
                                <TableBody className="text-black">
                                    {vendorlist && vendorlist.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="text-center">{row.vendor_type}</TableCell>
                                            <TableCell className="text-center">
                                                {row.vendor_name}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    }
                                </TableBody>
                                :
                                <TableBody className="text-black">
                                    <TableRow>

                                        <TableCell colSpan={5} className="text-center text-black">No Results.</TableCell>
                                    </TableRow>
                                </TableBody>
                    }
                </Table>
                <div className="flex justify-end mt-4 gap-4">
                    <Button className="bg-white text-black border text-md font-normal hover:bg-white" onClick={() => Props.setClose((prev) => !prev)}>
                        Back
                    </Button>

                </div>
            </div>
        </div>
    );
};

export default AddDocument;
