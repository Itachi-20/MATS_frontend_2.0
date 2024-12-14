'use client'
import React from 'react'
import Table from './table'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Comment_box from '@/components/Comment_box'
import { useParams, useSearchParams } from 'next/navigation'
import { useRouter } from 'nextjs-toploader/app';
import { Textarea } from '@/components/ui/textarea'

type File = {
    file_name: string;
    name:string;
    file_url: string;
    creation:string;
    owner:string;
};

type ActualVendor = {
    name: string;
    vendor_type: string;
    vendor_name: string;
    files: File[];
    event_request_number: string
    status: string;
    advance: number;
    gst: string;
    invoice_amount: number;
    tds: number;
    net_amount: number;
    utr_number: string | null;
    payment_date: string | null;
    parent: string;
};

type EventData = {
    name: string;
    event_date: string;
    event_type: string;
    cost_center: string;
    cost_code: string;
    cost_desc: string;
    cost_hod: string;
    reporting_head: string;
    business_unit: string;
    event_name: string | null;
    sub_type_of_activity: string | null;
    event_requestor: string;
    total_compensation_expense: number;
    event_conclusion: string;
    total_balance_amount: number;
    total_advance_amount: number;
    total_estimated_expense: number;
    total_logistics_expense: number;
    actual_vendors: ActualVendor[];
};




const page = () => {
    const [open, setOpen] = useState(false);
    const [opencommentbox, setCommentBox] = useState(false)
    const [action, setAction] = useState('')
    const [expensedata, setExpenseData] = useState<EventData | null>(null);
    const router = useRouter();
    const refno = useParams();
    const view = useSearchParams().get('view')
    console.log("expensedata", expensedata)
    const eventDataApi = async () => {
        try {
            const response = await fetch(
                "/api/expenseData",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        name: refno.expense_name,
                        req_no: refno.request_number
                    })
                }
            );

            if (response.ok) {
                const data = await response.json();
                setExpenseData(data.data);

            } else {
                console.log("Login failed");
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    useEffect(() => {
        eventDataApi();
    }, [])
    const handleOpen = (value: string) => {
        setAction(value)
        setCommentBox(prev => !prev)
    }

    const handleApprove = async (remark: string) => {
        try {
            const response = await fetch(
                "/api/advanceApproval/advanceExpenseApprove",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        "name": refno.expense_name,
                        "action": action,
                        "remark": remark,

                    })
                }
            );

            const data = await response.json();

            if (response.ok) {

                setTimeout(() => {
                    router.push(`/advance_payment/${refno.request_number}`);
                }, 1000)
            } else {
                console.log("Login failed");
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <>
            <div className='p-8  '>
                <div className='text-black flex justify-between items-center'>
                    <div className='text-2xl font-semibold'>
                        {expensedata?.event_type}
                    </div>
                    <div className='flex'>
                        <button className="border rounded-sm px-6 py-1 border-black text-black" onClick={() => router.push(`/advance_payment/${refno.request_number}`)}>Back</button>
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
                <div className=" grid grid-cols-3 gap-4 pb-7">
                    <div className='col-span-3 space-y-2'>
                        <label htmlFor="event_conclusion" className="text-black md:text-sm md:font-normal capitalize">
                            Event Conclusion
                        </label>
                        <Textarea
                            className="text-black shadow md:rounded-xl md:py-2"
                            //   placeholder="Type here ..."
                            id='event_conclusion'
                            name='event_conclusion'
                            readOnly
                            value={expensedata ? expensedata.event_conclusion : ''}
                        ></Textarea>
                    </div>
                </div>

                <Table expensetabledata={expensedata?.actual_vendors} />

                <div className='flex justify-end gap-2 pt-8'>
                    {
                        view == "view" ?
                            <></>
                            : <>
                                <Button className='bg-[#5DBE74] px-6' onClick={() => handleOpen('Approved')}>Approve</Button>
                                <Button className='bg-[#4430BF] px-6' onClick={() => handleOpen('Send Back')}>Send Back</Button>
                                <Button className='bg-[#FF5757] px-6' onClick={() => handleOpen('Rejected')}>Reject</Button>
                            </>
                    }

                </div>
            </div>
            {opencommentbox && <Comment_box handleClose={handleOpen} handleSubmit={handleApprove} />}
        </>
    )
}

export default page
