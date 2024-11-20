'use client'
import React from 'react'
import Table from './table'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Comment_box from '@/components/Comment_box'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation';


type File = {
    name: string;
    file_name: string;
    file_url: string;
};

type ActualVendor = {
    name: string;
    vendor_type: string;
    vendor_name: string;
    files: File[];
    event_request_number:string
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
    cost_centre: string;
    cost_code: string;
    cost_desc: string;
    cost_hod: string;
    reporting_head: string;
    business_unit: string;
    event_name: string | null;
    sub_type_of_activity: string | null;
    event_requestor: string;
    total_compensation_expense: number;
    actual_vendors: ActualVendor[];
};




const page = () => {
    const [open, setOpen] = useState(false);
    const [opencommentbox, setCommentBox] = useState(false)
    const [action, setAction] = useState('')
    const [expensedata, setExpenseData] = useState<EventData | null>(null);
    const router = useRouter();
    const refno = useParams();
    console.log(refno.request_number, 'refno')

    const eventDataApi = async () => {
        console.log("inside event Data")
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
                console.log(data, 'data')

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

        console.log("refno.expense_name,action,remark",refno.expense_name,action,remark,)
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
              router.back();
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
                        Training & Education
                    </div>
                    <div className='flex'>
                        <button className="border rounded-sm px-6 py-1 border-black text-black">Back</button>
                    </div>
                </div>
                <div className='border rounded-3xl mt-5 mb-14 p-2 text-black grid grid-cols-3'>
                    <div className='grid-cols-1 px-6 border-r'>
                        <ul className=''>
                            <li className='border-b p-2'>Event Date :<span className='font-semibold px-1'>{expensedata ? expensedata.event_date : ''}</span></li>
                            <li className='border-b p-2'>Event Name :<span className='font-semibold px-1'>{expensedata ? expensedata.event_name : ''}</span></li>
                            <li className='border-b p-2'>Event Requester Name :<span className='font-semibold px-1'>{expensedata ? expensedata.event_requestor : ''}</span></li>
                            <li className='p-2'>Event Request Number :<span className='font-semibold px-1'>{expensedata ? expensedata.name : ''}</span></li>
                        </ul>
                    </div>
                    <div className='grid-cols-1 px-6 border-r'>
                        <ul className=''>
                            <li className='border-b p-2'>Cost Center :<span className='font-semibold px-1'>{expensedata ? expensedata.cost_centre : ''}</span></li>
                            <li className='border-b p-2'>Cost Center Hod :<span className='font-semibold px-1'>{expensedata ? expensedata.cost_hod : ''}</span></li>
                            <li className='border-b p-2'>Cost Center Description :<span className='font-semibold px-1'>{expensedata ? expensedata.cost_desc : ''}</span></li>
                            <li className='p-2'>Reporting Head :<span className='font-semibold px-1'>{expensedata ? expensedata.reporting_head : ''}</span></li>
                        </ul>
                    </div>
                    <div className='grid-cols-1 px-6'>
                        <ul className=''>
                            <li className='border-b p-2'>Business Unit :<span className='font-semibold px-1'>{expensedata ? expensedata.business_unit : ''}</span></li>
                            <li className='border-b p-2'>Sub Type Of activity :<span className='font-semibold px-1'>{expensedata ? expensedata.sub_type_of_activity : ''}</span></li>
                            <li className='border-b p-2'>Total Estimated Expense :<span className='font-semibold px-1'>{expensedata ? expensedata.total_compensation_expense : ''}</span></li>
                        </ul>
                    </div>

                </div>

                <Table expensetabledata={expensedata?.actual_vendors} />

                <div className='flex justify-end gap-2 pt-8'>
                    <Button className='bg-[#5DBE74] px-6' onClick={()=>handleOpen('Approved')}>Approve</Button>
                    <Button className='bg-[#4430BF] px-6' onClick={()=>handleOpen('Send Back')}>Send Back</Button>
                    <Button className='bg-[#FF5757] px-6'onClick={()=>handleOpen('Rejected')}>Reject</Button>

                </div>
            </div>
            {opencommentbox && <Comment_box handleClose={handleOpen} handleSubmit={handleApprove} />}
        </>
    )
}

export default page
