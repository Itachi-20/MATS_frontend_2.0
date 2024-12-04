'use client'
import React from 'react'
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import CheckPan from '@/components/checkVendorPopup'
import { Toaster, toast } from 'sonner'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useSearchParams } from 'next/navigation'
import { useAuth } from "../../context/AuthContext";
import ConfirmPopup from '@/components/deleteDialog'


type dropdownData = {
    company: {
        name: string,
        company_name: "string"
    }[],
    division: {
        name: string,
        division_name: string
    }[],
    requestor: {
        full_name: string,
        email: string
    }[],
    vendor_type: {
        name: string,
        vendor_type: string
    }[],
    state: {
        name: string,
        state: string
    }[]
    currency: {
        name: string
    }[]
}

type DocumentRow = {
    document_type: string;
    is_private: string;
    filename: string;
    creation: string;
    owner: string;
    file: string;
};
type formData = {
    name: string;
    vendor_type: string;
    vendor_name: string;
    remark: string;
    pan_number: string;
    vendor_code: string;
    email: string;
    contact_number: string;
    pan_check: boolean;
    document: DocumentRow[];
};

type vendor = {
    vendor_type: string;
    vendor_name: string
}
const page = () => {
    const [dropdownData, setDropdownData] = useState<dropdownData | null>(null);
    const [file, setFile] = useState<FileList | null>(null);
    const [document_type, setDocumentType] = useState<string | null>(null);
    const [documentRows, setDocumentRows] = useState<DocumentRow[]>([]);
    const [fileName, setFileName] = useState<string | null>(null);
    const [vendorcheck, setVendorCheck] = useState<boolean>()
    const [error, setError] = useState<string | null>()
    const [checkpopup, setCheckPopup] = useState(false)
    const [confirmpopup, setConfirmPopup] = useState(false)
    const [formdata, setFormData] = useState<formData>();
    const [loading, setLoading] = useState(false)
    const base_url = process.env.NEXT_PUBLIC_FRAPPE_URL;
    const router = useRouter()
    const view = useSearchParams().get('view')
    const refno = useSearchParams().get('refno')
    const { role, name, userid, clearAuthData } = useAuth();
    const dropdown = async () => {
        try {
            const response = await fetch("/api/training_and_education/dropdown", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            setDropdownData(data.data);
            if (response.ok) {
            } else {
                console.log('Login failed');
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };
    useEffect(() => {
        dropdown();
    }, [])

    const vendorViewData = async () => {

        try {
            const response = await fetch("/api/vendorDetail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: refno
                })
            });

            if (response.ok) {
                const data = await response.json();
                setFormData(data.data);
                setFormData((prevState) => ({
                    ...prevState,
                    name: refno,
                }) as formData);
                setDocumentRows(data.data?.document)

            } else {
                console.log('Login failed');
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };
    useEffect(() => {
        vendorViewData();
    }, [refno])

    useEffect(() => {
        setFormData({ ...formdata } as formData)
    }, [])

    const handleFinalSubmit = async () => {
        setLoading(true)
        // e.preventDefault();
        console.log("formdata------------------------------------------update check---", formdata)
        try {
            const response = await fetch(
                "/api/addVendor",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    body: JSON.stringify(formdata)
                }
            );
            if (response.ok) {
                const data = await response.json();
                console.log(data, "response data");
                setLoading(false)
                setConfirmPopup(false)
                setTimeout(() => {
                    router.push(`/event_vendor_list`);
                }, 1000)
                toast.success(data.message)
            } else {
                console.log("submission failed");
            }
        } catch (error) {
            console.error("Error during Submission:", error);
        }
    };
    const handlefieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }) as formData);
    }
    const handleSelectChange = (value: string, name: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }) as formData);
    };
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files);
            setFileName(e.target.files[0]?.name);
        } else {
            setFile(null);
            setFileName(null);
        }
    };

    const handleTypeChange = (value: string) => {
        setDocumentType(value);
    };

    const uploadFile = async () => {
        if (!file || !document_type) {
            toast.warning("Please select a file and a type before uploading.");
            return;
        }
        const formData = new FormData();
        for (let i = 0; i < file.length; i++) {
            formData.append("file", file[i]);
            formData.append("is_private", "1");
        }
        formData.append("type", document_type);

        try {
            const response = await fetch(`/api/fileUpload`, {
                method: "POST",
                body: formData,
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Upload successful:", data.message.file_name);
                const newDocument: DocumentRow = {
                    document_type,
                    is_private: "1",
                    filename: data.message.file_name,
                    creation: data.message.creation,
                    owner: data.message.modified_by,
                    file: data.message.file_url,
                };
                console.log("newDocument", newDocument)
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    document: Array.isArray(prevFormData?.document) ? [...prevFormData.document, newDocument] : [newDocument],
                }) as formData);
                // const updatedDocumentRows = [...documentRows , newDocument];
                const updatedDocumentRows = [...(Array.isArray(documentRows) ? documentRows : []), newDocument];

                setDocumentRows(updatedDocumentRows);
                setFile(null);
                setFileName(null);
                setDocumentType('');

            } else {
                alert("File upload failed. Please try again.");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };
    const handlePanfieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }) as formData);

        checkvendor(e);
        setVendorCheck(false)
        if (role == 'Event Requestor') {
            setFormData((prevState) => ({
                ...prevState,
                pan_check: false,
            }) as formData);
        }
        setError('')

    }

    const checkvendor = async (e: any) => {
        const { name, value } = e.target;
        console.log(value, 'value in evebnt target')
        if (value && value.length >= 10) {
            try {
                const response = await fetch("/api/checkVendorExists", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        pan: value,
                    }),

                });
                if (response.ok) {
                    const data = await response.json();
                    console.log("data", data)
                    if (data.data.length > 0) {
                        setError('PAN Already exists')
                        setVendorCheck(true);
                        if (role == 'Event Requestor') {
                            setFormData((prevState) => ({
                                ...prevState,
                                pan_check: true,
                            }) as formData);
                        }
                    }
                } else {
                    console.log('Login failed');
                }
            } catch (error) {
                console.error("Error during login:", error);
            }
        } else {
            console.log("pan no is less than 10")
        }
    };
    const handlecheckpopup = async () => {
        setCheckPopup(true)
    };
    const handleConfirmpopup = async () => {
        setConfirmPopup(true)
    };
    console.log('formdata', formdata)
    return (
        <>
            <div className='p-7 w-full relative z-20 text-black'>

                <div>
                    <div className='flex justify-between'>
                        <h1 className="text-black text-[22px] font-medium capitalize pb-8">
                            Vendor Detail
                        </h1>
                        {view != "view" &&
                            <Button className="text-black text-md font-normal bg-white hover:bg-white border rounded-[25px] px-8 py-5 shadow" onClick={() => handlecheckpopup()}>
                                Check Vendor
                            </Button>
                        }
                    </div>
                    <div className="grid grid-cols-2 gap-12 pb-8">
                        <div className="flex flex-col gap-2">
                            <label className="lable">
                                Vendor Type<span className="text-[#e60000]">*</span>
                            </label>
                            <Select
                                onValueChange={(value) => handleSelectChange(value, "vendor_type")}
                                disabled={view == "view"}
                                value={formdata ? formdata.vendor_type : ''}
                            >
                                <SelectTrigger className="dropdown" >
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    {dropdownData && dropdownData.vendor_type?.filter((item, index) => {
                                        if (item.vendor_type == "Hotel" || item.vendor_type == "Travel" || item.vendor_type == "Food") {
                                            return item
                                        }
                                    })
                                        .map((item) => {
                                            return (
                                                <SelectItem value={item.name}>{item.vendor_type}</SelectItem>
                                            )
                                        })
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-black text-sm font-normal capitalize">
                                Vendor Code<span className="text-[#e60000]">*</span>
                            </label>
                            <Input className='dropdown' placeholder='Type Here'
                                name='vendor_code'
                                onChange={(e) => handlefieldChange(e)}
                                readOnly={view == "view"}
                                value={formdata ? formdata.vendor_code : ''}
                            ></Input>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-black text-sm font-normal capitalize">
                                Vendor Name<span className="text-[#e60000]">*</span>
                            </label>
                            <Input className='dropdown' placeholder='Type Here'
                                name='vendor_name'
                                onChange={(e) => handlefieldChange(e)}
                                readOnly={view == "view"}
                                value={formdata ? formdata.vendor_name : ''}
                            ></Input>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-black text-sm font-normal capitalize">
                                Contact Number<span className="text-[#e60000]">*</span>
                            </label>
                            <Input className='dropdown' placeholder='Type Here'
                                name='contact_number'
                                // type='number'
                                onChange={(e) => handlefieldChange(e)}
                                readOnly={view == "view"}
                                value={formdata ? formdata.contact_number : ''}
                            ></Input>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-black text-sm font-normal capitalize">
                                PAN Number<span className="text-[#e60000]">*</span>
                            </label>
                            <Input className='dropdown' placeholder='Type Here'
                                name='pan_number'
                                onChange={(e) => handlePanfieldChange(e)}
                                readOnly={view == "view"}
                                value={formdata ? formdata.pan_number as string : ''}
                            ></Input>
                            {error && <span className="text-red-500 mb-2">{error}<Link href={''} className='bg-white hover:underline pl-2 text-blue-500' onClick={handlecheckpopup}>Click Here to check existing records</Link></span>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-black text-sm font-normal capitalize">
                                Email<span className="text-[#e60000]">*</span>
                            </label>
                            <Input className='dropdown' placeholder='Type Here'
                                name='email'
                                onChange={(e) => handlefieldChange(e)}
                                readOnly={view == "view"}
                                value={formdata ? formdata.email : ''}
                            ></Input>
                        </div>
                        <div className="flex flex-col col-span-2 gap-2">
                            <label className="text-black text-sm font-normal capitalize">
                                Remark<span className="text-[#e60000]">*</span>
                            </label>
                            <Textarea className='text-black shadow-md' placeholder='Type Here'
                                name='remark'
                                onChange={(e) => { handlefieldChange(e) }}
                                readOnly={view == "view"}
                                value={formdata ? formdata.remark : ''}
                            />
                        </div>
                    </div>


                    <div>
                        {view != "view" &&
                            <>
                                <h1 className="text-black text-[22px] font-medium capitalize pb-4">
                                    Attach Documents
                                </h1>
                                <div className="grid grid-cols-2 gap-6 items-end">
                                    {/* Type Selection */}
                                    <div className="flex flex-col grid-cols-1 gap-2">
                                        <label className="text-black text-sm font-normal capitalize">
                                            Type<span className="text-[#e60000]">*</span>
                                        </label>
                                        <Select onValueChange={handleTypeChange}
                                            value={document_type ? document_type : ''}
                                            disabled={view == "view"}
                                        >
                                            <SelectTrigger className="text-black shadow">
                                                <SelectValue placeholder={'Select'} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Cancelled Cheque">Cancelled Cheque</SelectItem>
                                                <SelectItem value="GST Copy">GST Copy</SelectItem>
                                                <SelectItem value="Non GST Declaration">Non GST Declaration</SelectItem>
                                                <SelectItem value="Pan Card">Pan Card</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* File Upload */}
                                    <div className=" grid grid-cols-2  text-nowrap relative">
                                        <label
                                            htmlFor="file"
                                            className="lable hover:cursor-pointer  "
                                        >
                                            Do you have filled document?
                                            <span className="font-semibold"> Upload here</span>
                                            <div className="bg-[#efedff] mt-2 py-[7px] flex items-center gap-5 pl-5 rounded-md shadow-md mr-10">
                                                <svg
                                                    width="25"
                                                    height="26"
                                                    viewBox="0 0 25 26"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        id="Vector"
                                                        d="M16.6432 2.82358e-05C15.545 -0.00275969 14.457 0.200933 13.4423 0.599335C12.4275 0.997738 11.506 1.58295 10.7311 2.32116L0.491261 12.037C0.177131 12.3344 0.000418662 12.738 7.42955e-07 13.159C-0.000417176 13.5801 0.175493 13.984 0.489033 14.282C0.802572 14.58 1.22806 14.7476 1.67189 14.748C2.11572 14.7484 2.54154 14.5815 2.85567 14.2841L13.0999 4.56408C14.0529 3.73299 15.3076 3.28337 16.6018 3.30915C17.896 3.33494 19.1297 3.83414 20.0451 4.70247C20.9604 5.57079 21.4867 6.74106 21.5138 7.96879C21.541 9.19651 21.067 10.3867 20.1909 11.2907L8.37336 22.5011C8.05653 22.7812 7.63747 22.9336 7.20448 22.9264C6.77148 22.9191 6.35836 22.7527 6.05214 22.4622C5.74592 22.1718 5.57051 21.7799 5.56287 21.3691C5.55523 20.9584 5.71595 20.5608 6.01118 20.2603L17.8288 9.04992C18.1429 8.75221 18.3195 8.34832 18.3197 7.9271C18.3199 7.50587 18.1437 7.10182 17.8299 6.80383C17.516 6.50584 17.0903 6.33832 16.6462 6.33812C16.2022 6.33793 15.7763 6.50507 15.4621 6.80278L3.64232 18.0174C2.76621 18.9214 2.29223 20.1116 2.31941 21.3393C2.3466 22.567 2.87284 23.7373 3.7882 24.6056C4.70355 25.474 5.93721 25.9732 7.23143 25.9989C8.52566 26.0247 9.78032 25.5751 10.7333 24.744L22.5509 13.5337C23.3296 12.7992 23.947 11.9256 24.3674 10.9633C24.7878 10.0009 25.0028 8.96908 25 7.92741C24.9976 5.82562 24.1164 3.81056 22.5497 2.32438C20.983 0.838189 18.8588 0.00226656 16.6432 2.82358e-05Z"
                                                        fill="#4430BF"
                                                    />
                                                </svg>
                                                {/* <h1 className="mt-[2px]">{fileName ? fileName : ' Receipt/Bill'}</h1> */}
                                                <span className="font-medium truncate max-w-[200px]">{fileName ? fileName : ' Receipt/Bill'}</span>
                                            </div>
                                            <Input type="file" onChange={(e) => { handleFileUpload(e) }} id="file" className="hidden"></Input>
                                        </label>
                                        <div className='items-baseline pt-7'>
                                            <Button
                                                className="bg-white text-black border font-normal"
                                                onClick={uploadFile}
                                            >
                                                Add
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }

                        {/* Document Table */}
                        <Table className="mt-4">
                            <TableHeader className="bg-[#E0E9FF]">
                                <TableRow className="text-nowrap text-[#625d5d] text-[15px] font-normal">
                                    <TableHead className="text-center rounded-l-2xl">Type</TableHead>
                                    <TableHead className="text-center">Document Name</TableHead>
                                    <TableHead className="text-center">Created Date</TableHead>
                                    <TableHead className="text-center">Created By</TableHead>
                                    <TableHead className="text-center rounded-r-2xl">View</TableHead>
                                </TableRow>
                            </TableHeader>
                            {documentRows && documentRows.length > 0 ?
                                <TableBody className="text-black">
                                    {documentRows && documentRows.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="text-center ">{row.document_type}</TableCell>
                                            <TableCell className="text-center">{row.filename}</TableCell>
                                            <TableCell className="text-center">{row.creation.substring(0, 10)}</TableCell>
                                            <TableCell className="text-center">{row.owner}</TableCell>
                                            <TableCell className="text-center  flex justify-center gap-2">


                                                <Link
                                                    href={`${base_url}${row.file}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 underline"
                                                >
                                                    View
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                        // <TableRow className="text-black flex w-full items-center justify-center">No Result.</TableRow>
                                    }
                                </TableBody>
                                :
                                <TableBody className="text-black">
                                    <TableRow><TableCell colSpan={5} className="text-center text-black">No Results.</TableCell></TableRow>
                                </TableBody>
                            }
                        </Table>

                    </div>

                    <div className="flex justify-end pt-5 gap-4">
                        {view != "view" &&
                            <>
                                {/* <Button className="bg-white text-black border text-md font-normal hover:bg-white" >
                                   Back
                                </Button> */}
                                <Button className="bg-[#4430bf] text-white text-md font-normal border hover:bg-[#4430bf]" onClick={formdata?.pan_check ? handleConfirmpopup : handleFinalSubmit}>
                                    Submit
                                </Button>

                            </>
                        }
                    </div>
                </div>
            </div>
            <Toaster richColors position="top-right" />
            {

                checkpopup && <CheckPan setClose={setCheckPopup} pan_number={formdata?.pan_number} />
            }

            {

                confirmpopup && <ConfirmPopup setClose={setConfirmPopup} text={'Approval is Triggered PAN already exists ?'} Loading={loading} handleSubmit={handleFinalSubmit} />
            }

        </>
    )
}

export default page