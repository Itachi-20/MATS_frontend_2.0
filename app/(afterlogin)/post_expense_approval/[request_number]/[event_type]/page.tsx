'use client'
import React from 'react'
import Fields from './fields';
import TableComponent from './table';
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Comment_box from '@/components/Comment_box'
import { useParams, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { Table } from 'lucide-react';
import ViewDoc from "@/components/viewDocument";
import SuccessProp from '@/components/success_prop';

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
        advance: number;
        budget_category: string;
        est_amount: number;
        gst_included: number;
        gst: string;
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
        cc_name: string | null ;
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
        city:{
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
        document_no: string;
        posting_date: string;
        invoice_number: string;
        date: string;
        basic_amount: number;
        gst: string;
        invoice_amount: number;
        tds: number;
        net_amount: number;
        division: string;
        cost_center: string;
        cc_name: string;
        nature: string;
        company_name: string;
        gl_name: string;
        gl_code: string;
        // utr_number: number;
        // payment_date: string;
        zone: string;
        state: string;
        city: string;
        action: string;
        remark: string;
        narration: string;
        isClosed: boolean;
    };
    

const page = () => {
    // const defaultFormData: FormData = {
    //     name: "",
    //     document_no: "",
    //     posting_date: "",
    //     invoice_number: "",
    //     date: "",
    //     basic_amount: 0,
    //     gst: "",
    //     invoice_amount: 0,
    //     tds: 0,
    //     net_amount: 0,
    //     division: "",
    //     cost_center: "",
    //     cc_name: "",
    //     nature: "",
    //     company_name: "",
    //     gl_name: "",
    //     gl_code: "",
    //     // utr_number: 0,
    //     // payment_date: "",
    //     zone: "",
    //     state: "",
    //     city: "",
    //     action: "",
    //     remark: "",
    //     narration: "",
    //     isClosed: false,
    // };

    // const defaultDropdown: DropdownData ={
    //     company:[{
    //     name: "",
    //     company_name: "",
    //     }],
    //     division: [{
    //     name: "",
    //     division_name: "",
    //     }],
    //     city:[{
    //         name: "",
    //         city: "",
    //         state: "",
    //     }],
    //     state:[{
    //     name: "",
    //     state: "",
    //     }],
    //     zone:[{
    //         name: "",
    //         zone: "",
    //     }],
    // };

    // const defaultEventdata: EventData = {
    //     name: "",
    //     reporting_head: "",
    //     event_date: "",
    //     cost_center: "",
    //     cost_code: "",
    //     cost_desc: "",
    //     cost_hod: "",
    //     business_unit: "",
    //     event_name: "",
    //     event_type: "",
    //     sub_type_of_activity: "",
    //     event_requestor: "",
    //     total_compensation_expense: 0,
    //     actual_vendors: [],
    //     import_files: [],
    // }
    
    const [dropdown, setDropdown] = useState<DropdownData>();
    const [opencommentbox, setCommentBox] = useState(false);
    
    const [action, setAction] = useState<string>('')
    const [expensedata, setExpenseData] = useState<EventData>();
    const [formdata, setFormData] = useState<FormData>();
    
    const router = useRouter();
    const refno = useParams();
    const targetView = useSearchParams();
    const view = targetView.get('view');
    const targetRole = document.cookie.split("; ").find(role => role.startsWith("role=")) ?? "";
    const role = targetRole.split("=")[1];
   

    const [fileData, setFileData] = useState<File[]>();
    const [open, setOpen] = useState(false);
    const [successprop, setSuccessprop] = useState(false);

    console.log(expensedata?.actual_vendors[0]?.status);

    const handleSuccessProp = async()=>{
        setCommentBox(false);
        setSuccessprop(!successprop);
        setTimeout(()=>{router.push('/post_expense_approval/')},1000);
    }
    const handleSetFileData = async (file: any) => {
        // console.log(file, 'file in setfile ')
        setFileData(file);
        setOpen(true)
    };
    const eventDataApi = async () => {
        console.log("inside event Data")
        try {
            const response = await fetch(
                "/api/postExpenseApproval/postExpenseApprovalData",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        name: refno.event_type,
                        req_no: refno.request_number
                    })
                }
            );

            if (response.ok) {
                const data = await response.json();
                setExpenseData(data.data);
                setFormData((prev)=>({...prev,
                    name: data.data?.actual_vendors[0]?.name,
                    document_no: data.data?.actual_vendors[0]?.document_no,
                    posting_date: data.data?.actual_vendors[0]?.posting_date,
                    invoice_number: data.data?.actual_vendors[0]?.invoice_number,
                    date: data.data?.event_date,
                    basic_amount: data.data?.actual_vendors[0]?.basic_amount,
                    gst: data.data?.actual_vendors[0]?.gst,
                    invoice_amount: data.data?.actual_vendors[0]?.invoice_amount,
                    tds: data.data?.actual_vendors[0]?.tds,
                    net_amount: data.data?.actual_vendors[0]?.net_amount,
                    division: data.data?.actual_vendors[0]?.division,
                    cost_center: data.data?.actual_vendors[0]?.cost_center,
                    cc_name: data.data?.actual_vendors[0]?.cc_name,
                    nature: data.data?.actual_vendors[0]?.nature,
                    company_name: data.data?.actual_vendors[0]?.company_code,
                    gl_name: data.data?.actual_vendors[0]?.gl_name,
                    gl_code: data.data?.actual_vendors[0]?.gl_code,
                    // utr_number: data.data?.actual_vendors[0]?.utr_number,
                    // payment_date: data.data?.actual_vendors[0]?.payment_date,
                    zone: data.data?.actual_vendors[0]?.zone,
                    state: data.data?.actual_vendors[0]?.state_code,
                    city: data.data?.actual_vendors[0]?.city,
                    action:'',
                    remark:'',
                    narration: data.data.actual_vendors[0]?.narration,
                    isClosed: false
                }))

                console.log(data.data?.actual_vendors[0]?.name, 'formdata is set')

            } else {
                console.log("Login failed");
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };
    const dropdownDataApi = async () => {
        console.log("inside event Data")
        try {
            const response = await fetch(
                "/api/postExpenseApproval/dropdownforApprovalProcess",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                }
            );
    
            if (response.ok) {
                const data = await response.json();
                setDropdown(data.message);
                console.log(data, 'data')
    
            } else {
                console.log("Login failed");
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };
    const handleApproveRejectSendBack = async (remark:string) => {
        if(formdata){formdata.action = action;}
        if(formdata){formdata.remark = remark;}
        const updatedFormData = {
            ...formdata
      
        };
      
        try {
          const response = await fetch(
            "/api/postExpenseApproval/finalSubmission",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: 'include',
              body: JSON.stringify(updatedFormData)
            }
          );
          if (response.ok) {
            const data = await response.json();
            handleSuccessProp();
            console.log(data, "response data");
          } else {
            console.log("submission failed");
          }
        } catch (error) {
          console.error("Error during Submission:", error);
        }
    };
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
        eventDataApi();
        dropdownDataApi();
    }, [])

    return (
        <>
            <div className='p-8  '>
                <div className='text-black flex justify-between items-center'>
                    <div className='text-2xl font-semibold'>
                    {expensedata ? expensedata.event_type : ''}
                    </div>
                    <div className='flex'>
                        <button className="border rounded-sm px-6 py-1 border-black text-black" onClick={()=>router.push(`/post_expense_approval/${refno.request_number}`)}>Back</button>
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
                            <li className='border-b p-2'>Cost Center :<span className='font-semibold px-1'>{expensedata ? expensedata.cost_center : ''}</span></li>
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
                
                <div className='border bg-white h-full p-4 rounded-[18px]'>
                    <TableComponent
                        expensetabledata={expensedata?.actual_vendors}
                        handleSetFileData={handleSetFileData}
                    />
                    {
                        role == "Event%20Finance" &&
                        <Fields
                            dropdown={dropdown}
                            handlefieldChange={handlefieldChange}
                            handleSelectChange={handleSelectChange}
                            // handleApproveRejectSendBack={handleApproveRejectSendBack}
                            view={view}   
                            formdata={formdata}
                            expenseData={expensedata} 
                        />
                    }
                </div>
                {
                    expensedata?.actual_vendors[0]?.status != "Post Expense Approved" &&
                    <div className='flex justify-end gap-2 pt-8'>
                        <Button className={`${expensedata?.actual_vendors[0].status == "Post Expense Approved" ?'cursor-not-allowed':''} bg-[#5DBE74] px-6`} disabled={expensedata?.actual_vendors[0].status == "Post Expense Approved" ? true : false} onClick={()=>handleOpen('Approved')} >Approve</Button>
                        <Button className={`${expensedata?.actual_vendors[0].status == "Post Expense Approved" ?'cursor-not-allowed':''} bg-[#4430BF] px-6`} disabled={expensedata?.actual_vendors[0].status == "Post Expense Approved" ? true : false} onClick={()=>handleOpen('Send Back')}>Send Back</Button>
                        <Button className={`${expensedata?.actual_vendors[0].status == "Post Expense Approved" ?'cursor-not-allowed':''} bg-[#FF5757] px-6`} disabled={expensedata?.actual_vendors[0].status == "Post Expense Approved" ? true : false} onClick={()=>handleOpen('Rejected')}>Reject</Button>
                    </div>
                }
            </div>
            {opencommentbox && <Comment_box handleClose={handleOpen} handleSubmit={handleApproveRejectSendBack} />}
            {open &&<ViewDoc setClose={setOpen} data={fileData}/>}
            {successprop && <SuccessProp title={"Post Expense Approval"}/>}
        </>
    )
}

export default page
