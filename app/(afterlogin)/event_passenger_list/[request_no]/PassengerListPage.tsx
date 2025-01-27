'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'nextjs-toploader/app';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import FilePopup from '@/components/travel_desk/filePopup'
import { useAuth } from "../../../context/AuthContext";
import ExportUpload from "@/components/exportExcel";
import SingleUpload from "@/components/tablecell_upload"
import AddPassangerDialog from '@/components/addPassangerDialog';
import { Toaster, toast } from 'sonner'
import { Loader2 } from "lucide-react";
import { useSearchParams } from 'next/navigation'
type passanger = {
    name: string;
    full_name: string;
    gender: string;
    source: string;
    destination: string;
    date_of_birth: string;
    age: number;
    aadhar_no: string;
    remarks: string;
    event_no: string;
    date_of_journey: string;
    file: file;
    mode_of_transport: string;
    travel_type: string
};

type file = {
    name: string,
    file_name: string,
    file_url: string,
    owner: string;
    creation: string;
}
type Props = {
    passenger_list: passanger[]
    refno: string
    role: string | undefined
}


export default function PassengerListPage({ ...Props }: Props) {
    const router = useRouter();
    const [isFilePopup, setIsFilePopup] = useState<boolean>()
    const [fileData, setFileData] = useState<file[]>()
    const { role, name, userid, clearAuthData } = useAuth();
    const [addpassemgerdialog, setAddPassengerDialog] = useState<Boolean>(false);
    const [refNo, setRefNo] = useState<string | null>(Props.refno ?? "");
    const [passangerData, setPassangerData] = useState<passanger[]>(Props.passenger_list);
    const [editpassengerdata, setEditPassengerData] = useState<passanger | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedRows, setSelectedRows] = useState<passanger[] | []>();
    const [selectAll, setSelectAll] = useState(false);
    // const inputFile = useRef<HTMLInputElement | null>(null);
        const from = useSearchParams().get('from')
    const [importFile, setImportFile] = useState<File[]>([])
    const [selectedFile, setSelectedFile] = useState<File[]>([]);
    const inputFile = useRef(null);
    const handleDialog = () => {
        setAddPassengerDialog(prev => !prev)
    }
    const handleFilePopup = (data: file[]) => {
        setFileData(data);
    }
    const handleClose = () => {
        setIsFilePopup((prev) => !prev)
        setFileData([]);
    }
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/fetchPassanger", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ refno: Props.refno }),
            });
            if (response.ok) {
                const data = await response.json();
                setPassangerData(data.data);
                console.log(data.data)
                setLoading(false);
            } else {
                console.log("submission failed");
                setLoading(false)
            }
        } catch (error) {
            console.error("Error during Submission:", error);
            setLoading(false)
        }
    };
    const handleDelete = async () => {
        console.log(selectedRows, "selectedRows delete")
        const transformedData = {
            name: selectedRows?.map(item => item.name)
        };
        console.log(transformedData, "transformedData")
        const apiCallPromise = new Promise(async (resolve, reject) => {
            try {
                const response = await fetch("/api/deletePassanger/", {
                    method: "POST",
                    body: JSON.stringify(transformedData),
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error('Delete failed');
                }
                const data = await response.json();
                fetchData();
                setSelectedRows([])
                resolve(data);
                setSelectAll(false);
            } catch (error) {
                reject(error);
                setSelectedRows([])
                handleReset();
            }
        });
        toast.promise(apiCallPromise, {
            loading: 'Submitting details...',
            success: (data) => {
                return 'Passenger Deleted Successfully';
            },
            error: (error) => `Failed to delete passenger: ${error.message || error}`,
        });
    }
    const handleSubmit = async () => {
        setTimeout(() => {
            if (from) {
                router.push(`/${from}`)
            } else {
                router.push(`/event_passenger_list`)
            }
        }, 500)
    }
    const handleEditData = async (data: any) => {
        console.log(data, 'data edit')
        setEditPassengerData(data)
        handleDialog()
    };
    useEffect(() => {
        fetchData()
    }, [])
    const handleReset = () => {
        if (inputFile.current) {
            inputFile.current.value = "";
            inputFile.current.type = "text";
            inputFile.current.type = "file";
        }
    };
    const handleCheckboxChange = (name: string) => {
        setSelectedRows((prevSelectedRows = []) =>
            prevSelectedRows.some((row) => row.name === name)
                ? prevSelectedRows.filter((row) => row.name !== name)
                : [...prevSelectedRows, { name } as passanger]
        );
    };
    const handleSelectAllChange = (data: passanger[]) => {
        if (selectAll) {
            setSelectedRows([]);
        } else {
            setSelectedRows(data?.map((item) => ({ name: item.name })) as passanger[]);
        }
        setSelectAll(!selectAll);
    };
    const handleFileUpload = async (name: string) => {
        console.log(name, selectedFile, "name and file ")
        if (selectedFile) {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('file', selectedFile[0]);
            const apiCallPromise = new Promise(async (resolve, reject) => {
                try {
                    const response = await fetch("/api/addPassanger", {
                        method: "POST",
                        body: formData,
                        credentials: "include",
                    });

                    if (!response.ok) {
                        throw new Error('Import failed');
                    }
                    const data = await response.json();
                    fetchData();
                    setSelectedFile([])
                    resolve(data);
                } catch (error) {
                    reject(error);
                    setSelectedFile([])
                    handleReset();
                }
            });
            toast.promise(apiCallPromise, {
                loading: 'Submitting details...',
                success: (data) => {
                    return 'File Uploaded Successfully';
                },
                error: (error) => `Failed to Import File: ${error.message || error}`,
            });
        } else {
            handleReset();
        }
    };
    const ImportFile = async () => {
        if (!importFile) {
            toast.warning("Please select a file and a type before uploading.");
            return;
        }
        const formData = new FormData();
        for (let i = 0; i < importFile.length; i++) {
            formData.append("file", importFile[i]);
        }
        formData.append("name", refNo ? refNo : '');
        const apiCallPromise = new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/eventPassengerModule/ImportExcel', {
                    method: "POST",
                    body: formData,
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error('Import failed');
                }
                const data = await response.json();
                setImportFile([]);
                fetchData();
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
        toast.promise(apiCallPromise, {
            loading: 'Submitting details...',
            success: (data) => {
                return 'File Imported Successfully';
            },
            error: (error) => `Failed to Import File: ${error.message || error}`,
        });
    };
    return (
        <>
            <div className='flex justify-between items-center'>
                <Button className={`bg-white text-black border rounded-[8px] text-lg leading-normal font-normal px-[20px] py-[6px] font-['Poppins']`} onClick={() => handleSubmit()}>
                    {/* <div>
                        <svg fill="#000000" width="800px" height="800px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M222.927 580.115l301.354 328.512c24.354 28.708 20.825 71.724-7.883 96.078s-71.724 20.825-96.078-7.883L19.576 559.963a67.846 67.846 0 01-13.784-20.022 68.03 68.03 0 01-5.977-29.488l.001-.063a68.343 68.343 0 017.265-29.134 68.28 68.28 0 011.384-2.6 67.59 67.59 0 0110.102-13.687L429.966 21.113c25.592-27.611 68.721-29.247 96.331-3.656s29.247 68.721 3.656 96.331L224.088 443.784h730.46c37.647 0 68.166 30.519 68.166 68.166s-30.519 68.166-68.166 68.166H222.927z" /></svg>
                    </div> */}
                    Back
                    {/* <span className='text-black'>Back</span> */}
                </Button>
                { !(Props.role == 'Event Travel') && <div className='flex gap-4'>
                    <div className='flex space-x-6'>
                        <a href={`${process.env.NEXT_PUBLIC_TESTING_URL}/Passenger Details.xlsx`} download="Passenger Details.xlsx" target={'_blank'}>
                        <Button className='border border-black shadow-lg text-black'>Template</Button>
                            
                        </a>
                        <button className='flex space-x-[10px] border-[1px] border-[#4430BF] rounded-[8px] items-center py-[6px] px-6' onClick={() => handleDialog()}>
                            <svg width="16" height="16" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path id="Vector" d="M14.8571 9.64286H9.14286V15.3571C9.14286 15.6602 9.02245 15.9509 8.80812 16.1653C8.59379 16.3796 8.30311 16.5 8 16.5C7.6969 16.5 7.40621 16.3796 7.19188 16.1653C6.97755 15.9509 6.85714 15.6602 6.85714 15.3571V9.64286H1.14286C0.839753 9.64286 0.549063 9.52245 0.334735 9.30812C0.120408 9.09379 0 8.8031 0 8.5C0 8.1969 0.120408 7.90621 0.334735 7.69188C0.549063 7.47755 0.839753 7.35714 1.14286 7.35714H6.85714V1.64286C6.85714 1.33975 6.97755 1.04906 7.19188 0.834735C7.40621 0.620407 7.6969 0.5 8 0.5C8.30311 0.5 8.59379 0.620407 8.80812 0.834735C9.02245 1.04906 9.14286 1.33975 9.14286 1.64286V7.35714H14.8571C15.1602 7.35714 15.4509 7.47755 15.6653 7.69188C15.8796 7.90621 16 8.1969 16 8.5C16 8.8031 15.8796 9.09379 15.6653 9.30812C15.4509 9.52245 15.1602 9.64286 14.8571 9.64286Z" fill="#4430BF" />
                            </svg>
                            <span className='text-[18px] font-normal leading-normal text-[#4430BF]'>
                                Add New Passenger
                            </span>
                        </button>
                    </div>
                    <ExportUpload files={importFile} setFiles={setImportFile} onNext={ImportFile} buttonText={'Import'} />
                    <Button className={`px-4 py-2 bg-red-500 text-white rounded-md ${selectedRows?.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={selectedRows?.length === 0 || !selectedRows ? true : false}
                        onClick={handleDelete}>
                        Delete
                    </Button>
                </div>}
            </div>
            <div className="md:pt-2 justify-end">
                <div className='flex justify-between items-center gap-2'>
                    {/* <div className='flex gap-2 pl-2 text-black'>
                        Event No :<span>{refNo && refNo}</span>
                    </div> */}
{/* <div></div> */}
                    {/* <Button className="bg-white text-black border rounded-[8px] text-lg leading-normal font-normal px-[20px] py-[6px] font-['Poppins'] ">
                    Export
                </Button> */}
                </div>
                
                <div className="border bg-white h-full p-4 mt-[20px] rounded-[18px]">
                    <Table className="">
                        <TableHeader className={"bg-[#E0E9FF] sticky top-0 z-20"}>
                            <TableRow className={"text-nowrap rounded-r-2xl"}>
                                {!(Props.role == 'Event Travel') && <TableHead
                                    className={
                                        " rounded-l-2xl text-left text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                                    }
                                >
                                    <input
                                        type="checkbox"
                                        // className="peer hidden"
                                        id="select_all"
                                        checked={selectAll}
                                        onChange={() => handleSelectAllChange(passangerData)}
                                    />
                                    <label htmlFor="select_all" className='text-black '></label>
                                </TableHead>}
                                <TableHead
                                className={!(Props.role == 'Event Travel') ? "text-left text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']":` rounded-l-2xl text-left text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']` }
                                >
                                    Full Name
                                </TableHead>
                                <TableHead
                                    className={
                                        "text-left text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                                    }
                                >
                                    Gender
                                </TableHead>
                                <TableHead
                                    className={
                                        "text-left text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                                    }
                                >
                                    Source
                                </TableHead>
                                <TableHead
                                    className={
                                        "text-left text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                                    }
                                >
                                    Destination
                                </TableHead>
                                <TableHead
                                    className={
                                        "text-left  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                                    }
                                >
                                    Age
                                </TableHead>

                                <TableHead
                                    className={
                                        "text-left  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                                    }
                                >
                                    Date Of Birth
                                </TableHead>
                                <TableHead
                                    className={
                                        "text-left  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                                    }
                                >
                                    Aadhar No
                                </TableHead>
                                <TableHead
                                    className={
                                        "text-left  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                                    }
                                >
                                    Date Of Journey
                                </TableHead>
                                <TableHead
                                    className={
                                        "text-left  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                                    }
                                >
                                    Mode Of Transport
                                </TableHead>
                                <TableHead
                                    className={
                                        "text-left  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                                    }
                                >
                                    Travel Type
                                </TableHead>
                                <TableHead
                                    className={
                                        "text-left  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                                    }
                                >
                                    Remarks
                                </TableHead>
                                {!(Props.role == 'Event Travel') && <TableHead
                                    className={
                                        "text-left  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                                    }
                                >
                                    Upload
                                </TableHead>}
                                <TableHead
                                    className={
                                        "text-left  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat'] rounded-r-xl"
                                    }
                                >
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        {loading ? (
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={9}>
                                        <>
                                            <div className="flex items-center justify-center text-black">
                                                <Loader2 className=" mr-2 h-4 w-4 animate-spin" />
                                                Loading...
                                            </div>
                                        </>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        ) : passangerData ? (
                            <TableBody className="overflow-y-scroll text-black">
                                {passangerData &&
                                    passangerData?.map((data, index) => {
                                        return (
                                            <TableRow
                                                key={index}
                                                className="text-left text-nowrap text-black"
                                            >
                                                {!(Props.role == 'Event Travel')  && 
                                                <TableCell>
                                                    <input
                                                        type="checkbox"
                                                        id={`checkbox-${data.name}`}
                                                        checked={selectedRows?.some((row) => row.name === data.name)}
                                                        onChange={() => handleCheckboxChange(data.name)}
                                                    />
                                                </TableCell>}
                                                <TableCell>{data.full_name ?? "-"}</TableCell>
                                                <TableCell>{data.gender ?? "-"}</TableCell>
                                                <TableCell>{data.source ?? "-"} </TableCell>
                                                <TableCell>{data.destination ?? "-"} </TableCell>
                                                <TableCell>{data.age ?? "-"}</TableCell>
                                                <TableCell>{data.date_of_birth ?? "-"}</TableCell>
                                                <TableCell>{data.aadhar_no ?? "-"}</TableCell>
                                                <TableCell>{data.date_of_journey ?? "-"}</TableCell>
                                                <TableCell>{data.mode_of_transport ?? "-"}</TableCell>
                                                <TableCell>{data.travel_type ?? "-"}</TableCell>
                                                <TableCell className='max-w-[80px] truncate'>{data.remarks ?? "-"}</TableCell>
                                                {!(Props.role == 'Event Travel') && <TableCell>
                                                    <SingleUpload files={selectedFile} setFiles={setSelectedFile} onNext={handleFileUpload} buttonText={'Upload'} name={data.name} />
                                                </TableCell>}
                                                <TableCell className='flex gap-1'>
                                                    <Link
                                                        href={`${data?.file?.file_url}`}
                                                        target='_blank'
                                                        className={`flex justify-center ${data?.file?.file_url ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            height="24px"
                                                            viewBox="0 -960 960 960"
                                                            width="24px"
                                                            fill="#4430BF"
                                                        >
                                                            <path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
                                                        </svg>
                                                    </Link>
                                                    {!(Props.role == 'Event Travel') && <button onClick={() => handleEditData(data)}>
                                                        <Image src={'/svg/editIcon.svg'} alt='editsvg' width={20} height={18} />
                                                    </button>}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        ) : (
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={9}>
                                        <div className="flex justify-center  text-black items-center">
                                            No Result.
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        )}
                    </Table>
                </div>

                <div className="flex justify-end pt-20 gap-4">
                    <Button onClick={() => handleSubmit()} className={`${Props.role == "Event Accounts" ? "hidden" : ""} bg-[#5DBE74] text-white hover:bg-[#5DBE74]  border rounded-[8px] text-lg leading-normal font-normal px-[50px] py-[10px] font-['Poppins']`}>
                        Submit
                    </Button>
                </div>

            </div>
            {
                isFilePopup &&
                <FilePopup
                    handleClose={handleClose}
                    data={fileData}
                />
            }
            {addpassemgerdialog && <AddPassangerDialog handleDialog={handleDialog} refno={refNo} fetchData={fetchData} editpassengerdata={editpassengerdata} setEditPassengerData={setEditPassengerData} />}
            <Toaster richColors position="top-right" />
        </>
    )
}
