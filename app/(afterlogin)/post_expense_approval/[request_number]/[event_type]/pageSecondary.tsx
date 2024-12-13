'use client'
import React from 'react'
import Fields from './fields';
import TableComponent from './table';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Comment_box from '@/components/Comment_box';
import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Table } from 'lucide-react';
import ViewDoc from "@/components/viewDocument";
import SuccessProp from '@/components/success_prop';
import { useAuth } from "@/app/context/AuthContext";
import { Toaster, toast } from 'sonner';

type File = {
    name: string;
    file_name: string;
    file_url: string;
};

type ActualVendor = {
    name: string;
    creation: string;
    modified: string;
    modified_by: string;
    owner: string;
    docstatus: number;
    idx: number;
    vendor_type: string;
    actual_amount: number;
    status: string;
    vendor_name: string;
    vendor_code: string;
    advance: number;
    budget_category: string;
    est_amount: number;
    gst_included: number;
    gst: string;
    is_approved: boolean;
    parent: string;
    parentfield: string;
    parenttype: string;
    occurrence_no: number;
    attachment: string | null;
    event_conclusion: string | null;
    advance_expense_check: number;
    post_expense_check: number;
    document_no: string | null;
    invoice_date: string | null;
    invoice_amount: number;
    division: string;
    nature: string | null;
    gl_code: string | null;
    zone: string | null;
    finance_remark: string | null;
    posting_date: string | null;
    basic_amount: number;
    tds: number;
    cost_center: string | null;
    company_name: string | null | undefined;
    utr_number: string | null;
    state: string;
    invoice_number: string | null;
    finance_gst: string | null;
    net_amount: number;
    cc_name: string | null;
    gl_name: string | null;
    payment_date: string | null;
    city: string | null;
    file: string | null;
    narration: string | null;
    travel_expense_check: number;
    company_code: string;
    state_code: string;
    files: File[];
};

type ImportFile = {
    name: string;
    file_name: string;
    file_url: string;
};

type EventData = {
    name: string;
    reporting_head: string;
    event_date: string;
    cost_center: string;
    cost_code: string;
    cost_desc: string;
    cost_hod: string;
    business_unit: string;
    event_name: string;
    event_type: string;
    sub_type_of_activity: string | null;
    event_requestor: string;
    total_compensation_expense: number;
    total_balance_amount: number;
    total_advance_amount: number;
    total_estimated_expense: number;
    total_logistics_expense: number;
    actual_vendors: ActualVendor[];
    import_files: ImportFile[];
}

type DropdownData = {
    company: {
        name: string;
        company_name: string;
    }[];
    division: {
        name: string;
        division_name: string;
    }[];
    city: {
        name: string;
        city: string;
        state: string;
    }[];
    state: {
        name: string;
        state: string;
    }[];
    zone: {
        name: string;
        zone: string;
    }[];
};

type FormData = {
    name: string;
    document_no: string | null; // Allow null
    posting_date: string | null;
    invoice_number: string | null;
    date: string | null;
    basic_amount: number;
    gst: string | null;
    invoice_amount: number;
    tds: number;
    net_amount: number;
    division: string | null;
    cost_center: string | null;
    cc_name: string | null;
    nature: string | null;
    company_name: string | null;
    gl_name: string | null;
    gl_code: string | null;
    utr_number: string | null;
    payment_date: string | null;
    zone: string | null;
    state: string | null;
    city: string | null;
    action: string;
    remark: string;
    narration: string | null;
    isClosed: boolean;
};

type props = {
    eventDataApi: EventData,
    dropdownDataApi: DropdownData
}
const pagess = ({ ...Props }: props) => {
    const [dropdown, setDropdown] = useState<DropdownData>(Props.dropdownDataApi);
    const [opencommentbox, setCommentBox] = useState(false);

    const [action, setAction] = useState<string>('')
    const [expensedata, setExpenseData] = useState<EventData>(Props.eventDataApi);
    const [formdata, setFormData] = useState<FormData>();

    const router = useRouter();
    const refno = useParams();
    const { role, name, userid, clearAuthData } = useAuth();


    const [fileData, setFileData] = useState<File[]>();
    const [open, setOpen] = useState(false);
    const [successprop, setSuccessprop] = useState(false);

    const handleSuccessProp = async () => {
        setCommentBox(false);
        setSuccessprop(!successprop);
        setTimeout(() => { router.push('/post_expense_approval/') }, 2000);
    }
    const handleSetFileData = async (file: any) => {
        setFileData(file);
        setOpen(true)
    };
    const handleApiPromise = async () => {
        const updatedFormData = {
            ...formdata
        };
        const apiCallPromise = new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/postExpenseApproval/finalSubmission', {
                    method: "POST",
                    credentials: 'include',
                    body: JSON.stringify(updatedFormData),
                });

                if (!response.ok) {
                    throw new Error('Something went Wrong while closing the event');
                }

                const data = await response.json();
                resolve(data); // Resolve with the response data
            } catch (error) {
                reject(error); // Reject with the error
            }
        });
        toast.promise(apiCallPromise, {
            loading: `${updatedFormData.action == "Approved" ? "Approving" : updatedFormData.action == "Send Back" ? "Send backing" : updatedFormData.action == "Rejected" ? "Rejecting" : ""} the event...`,
            success: (data) => {
                handleSuccessProp();
                return `Event has successfully been ${updatedFormData.action}!`;
            },
            error: (error) => `Failed to approve/reject/send back post expense: ${error.message || error}`,
        });
    }
    const handleApproveRejectSendBack = async (remark: string) => {
        if (formdata) { formdata.action = action; }
        if (formdata) { formdata.remark = remark; }
        handleApiPromise();
    }
    const handlefieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }) as FormData);
    }
    const handleSelectChange = (value: string, name: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }) as FormData);
    };
    const handleOpen = (value: string) => {
        setAction(value)
        setCommentBox(prev => !prev)
    }

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            name: expensedata?.actual_vendors[0]?.name || "",
            document_no: expensedata?.actual_vendors[0]?.document_no || "",
            posting_date: expensedata?.actual_vendors[0]?.posting_date || "",
            invoice_number: expensedata?.actual_vendors[0]?.invoice_number || "",
            date: expensedata?.event_date || "",
            basic_amount: expensedata?.actual_vendors[0]?.basic_amount || 0,
            gst: expensedata?.actual_vendors[0]?.gst || "",
            invoice_amount: expensedata?.actual_vendors[0]?.invoice_amount || 0,
            tds: expensedata?.actual_vendors[0]?.tds || 0,
            net_amount: expensedata?.actual_vendors[0]?.net_amount || 0,
            division: expensedata?.actual_vendors[0]?.division || "",
            cost_center: expensedata?.actual_vendors[0]?.cost_center || "",
            cc_name: expensedata?.actual_vendors[0]?.cc_name || "",
            nature: expensedata?.actual_vendors[0]?.nature || "",
            company_name: expensedata?.actual_vendors[0]?.company_code || "",
            gl_name: expensedata?.actual_vendors[0]?.gl_name || "",
            gl_code: expensedata?.actual_vendors[0]?.gl_code || "",
            utr_number: expensedata?.actual_vendors[0]?.utr_number || "",
            payment_date: expensedata?.actual_vendors[0]?.payment_date || "",
            zone: expensedata?.actual_vendors[0]?.zone || "",
            state: expensedata?.actual_vendors[0]?.state_code || "",
            city: expensedata?.actual_vendors[0]?.city || "",
            action: "",
            remark: "",
            narration: expensedata?.actual_vendors[0]?.narration || "",
            isClosed: false,
        }));
    }, []);


    return (
        <>
            <div className='p-8  '>
                <div className='text-black flex justify-between items-center'>
                    <div className='text-2xl font-semibold'>
                        {expensedata ? expensedata.event_type : ''}
                    </div>
                    <div className='flex'>
                        <button className="border rounded-sm px-6 py-1 border-black text-black hover:text-white hover:bg-black transition-all delay-75 duration-100" onClick={() => router.push(`/post_expense_approval/${refno.request_number}`)}>Back</button>
                    </div>
                </div>
                <div className='border rounded-3xl mt-5 mb-7 p-2 text-black grid grid-cols-3'>
                    <div className='grid-cols-1 px-6 border-r'>
                        <ul className=''>
                            <li className='border-b p-2'>Event Date :<span className='font-semibold px-1'>{expensedata ? expensedata.event_date : ''}</span></li>
                            <li className='border-b p-2'>Event Name :<span className='font-semibold px-1'>{expensedata ? expensedata.event_name : ''}</span></li>
                            <li className='border-b p-2'>Event Requester Name :<span className='font-semibold px-1'>{expensedata ? expensedata.event_requestor : ''}</span></li>
                            <li className='border-b p-2'>Event Requester Number :<span className='font-semibold px-1'>{expensedata ? expensedata.name : ''}</span></li>
                            <li className=' p-2'>Business Unit :<span className='font-semibold px-1'>{expensedata ? expensedata.business_unit : ''}</span></li>
                        </ul>
                    </div>
                    <div className='grid-cols-1 px-6 border-r'>
                        <ul className=''>
                            <li className='border-b p-2'>Cost Center :<span className='font-semibold px-1'>{expensedata ? expensedata.cost_center : ''}</span></li>
                            <li className='border-b p-2'>Cost Center Hod :<span className='font-semibold px-1'>{expensedata ? expensedata.cost_hod : ''}</span></li>
                            <li className='border-b p-2'>Cost Center Description :<span className='font-semibold px-1'>{expensedata ? expensedata.cost_desc : ''}</span></li>
                            <li className='border-b p-2'>Reporting Head :<span className='font-semibold px-1'>{expensedata ? expensedata.event_date : ''}</span></li>
                            <li className=' p-2'>Sub Type Of activity :<span className='font-semibold px-1'>{expensedata ? expensedata.sub_type_of_activity : ''}</span></li>
                        </ul>
                    </div>
                    <div className='grid-cols-1 px-6'>
                        <ul className=''>
                            <li className='border-b p-2'>Total logistics Expense :<span className='font-semibold px-1'>{expensedata ? expensedata.total_logistics_expense : ''}</span></li>
                            <li className='border-b p-2'>Total Compensation Expense :<span className='font-semibold px-1'>{expensedata ? expensedata.total_compensation_expense : ''}</span></li>
                            <li className='border-b p-2'>Total Estimated Expense :<span className='font-semibold px-1'>{expensedata ? expensedata.total_estimated_expense : ''}</span></li>
                            <li className='border-b p-2'>Total Advance Expense :<span className='font-semibold px-1'>{expensedata ? expensedata.total_advance_amount : ''}</span></li>
                            <li className=' p-2'>Total Remaining Expense :<span className='font-semibold px-1'>{expensedata ? expensedata.total_balance_amount : ''}</span></li>
                        </ul>
                    </div>

                </div>

                <div className='border bg-white h-full p-4 rounded-[18px]'>
                    <TableComponent
                        // expensetabledata={expensedata?.actual_vendors}
                        handleSetFileData={handleSetFileData}
                        refno={refno}
                    />
                    {
                        role == "Event Finance" &&
                        <Fields
                            dropdown={dropdown as DropdownData}
                            handlefieldChange={handlefieldChange}
                            handleSelectChange={handleSelectChange}
                            // handleApproveRejectSendBack={handleApproveRejectSendBack}
                            // view={view}   
                            formdata={formdata as FormData}
                            expenseData={expensedata as EventData}
                        />
                    }
                </div>
                {
                    !(expensedata?.actual_vendors[0]?.is_approved) && (role == "Event Finance" || role == "Event Approver") ?
                        <div className='flex justify-end gap-2 pt-8'>
                            <Button className={`${expensedata?.actual_vendors[0]?.status == "Post Expense Approved" ? 'cursor-not-allowed' : ''} bg-[#5DBE74] px-6 text-white`} disabled={expensedata?.actual_vendors[0]?.status == "Post Expense Approved" ? true : false} onClick={() => handleOpen('Approved')} >Approve</Button>
                            <Button className={`${expensedata?.actual_vendors[0]?.status == "Post Expense Approved" ? 'cursor-not-allowed' : ''} bg-[#4430BF] px-6 text-white`} disabled={expensedata?.actual_vendors[0]?.status == "Post Expense Approved" ? true : false} onClick={() => handleOpen('Send Back')}>Send Back</Button>
                            <Button className={`${expensedata?.actual_vendors[0]?.status == "Post Expense Approved" ? 'cursor-not-allowed' : ''} bg-[#FF5757] px-6 text-white`} disabled={expensedata?.actual_vendors[0]?.status == "Post Expense Approved" ? true : false} onClick={() => handleOpen('Rejected')}>Reject</Button>
                        </div> : <></>
                }
            </div>
            <Toaster richColors position="top-right" />
            {opencommentbox && <Comment_box handleClose={handleOpen} handleSubmit={handleApproveRejectSendBack} />}
            {open && <ViewDoc setClose={setOpen} data={fileData} />}
            {successprop && <SuccessProp title={"Post Expense Approval"} />}
        </>
    )
}

export default pagess;
