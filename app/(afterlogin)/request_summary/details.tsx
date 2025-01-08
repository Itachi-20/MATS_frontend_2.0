'use client'
import React, { useEffect, useState } from 'react';
import { Utils } from '@/app/utility/chartUtils';
import StackedBarChart from '@/components/dashboard/request_summary/StackedBarChart';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { useAuth } from "../../context/AuthContext";
import { tableData } from "@/app/(afterlogin)/dashboard/page"
import { useRouter } from "nextjs-toploader/app";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import DatePicker from "@/app/(afterlogin)/event_list/date-picker";
import TableList from "@/components/requestSummary/activityTable";
import ExpenseTableList from "@/components/requestSummary/expenseTable";
import ExecuteTableList from "@/components/requestSummary/executeTable";

type CardData = {
    total_count: number,
    preactivity_approved_count: number,
    postactivity_approved_count: number,
    draft_count: number,
    total_approved_count: number,
    advance_approved_count: number,
    post_exp_appr_count: number,
    expense_approved_count: number
}
type ActivityListType = {
    modules:string,
    total: string,
    approved: string,
    send_back: string,
    awaiting_approval: string,
    rejected: string,
}

type ExpenseListType = {
    modules:string,
    total: string,
    approved: string,
    // send_back: string,
    awaiting_approval: string,
    utr_updated: string,
    utr_pending: string,
    rejected: string,
}

type ExecuteListType = {
    modules:string,
    total: string,
    approved: string,
    send_back: string,
    awaiting_approval: string,
    rejected: string,
    executed: string,
    execution_pending: string,
}

type Props = {
    tableData: tableData[]
    carddata: CardData
}

export default function DetailsRequestSummary({ ...Props }: Props) {
    const { role, name, userid, clearAuthData } = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [graphFilter, setGraphFilter] = useState("Monthly Expense");
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [activityData, setActivityData] = useState<ActivityListType[]>([]);
    const [expenseData, setExpenseData] = useState<ExpenseListType[]>([]);
    const [executeData, setExecuteData] = useState<ExecuteListType[]>([]);
    const router = useRouter();


    
    const DATA_COUNT = graphFilter != "Budget Expense" ? 13 : 12;
    const NUMBER_CFG = { count: DATA_COUNT - 1, min: 0, max: 100 };
    const labels = graphFilter == "Budget Expense" ? Utils.xlabel({ count: DATA_COUNT }) : Utils.months({ count: DATA_COUNT });
    const data = {
        labels: labels,
        datasets: graphFilter != "Budget Expense" ? [
            {
                label: 'Training & Education',
                data: Utils.numbers(NUMBER_CFG),
                backgroundColor: Utils.CHART_COLORS.peach,
            },
            {
                label: 'Sponsorship Support',
                data: Utils.numbers(NUMBER_CFG),
                backgroundColor: Utils.CHART_COLORS.pink,
            },
            {
                label: 'Non Monetary Grant',
                data: Utils.numbers(NUMBER_CFG),
                backgroundColor: Utils.CHART_COLORS.blueishgreen,
            },
            {
                label: 'Monetary Grant',
                data: Utils.numbers(NUMBER_CFG),
                backgroundColor: Utils.CHART_COLORS.green,
            },
            {
                label: 'HCP Services',
                data: Utils.numbers(NUMBER_CFG),
                backgroundColor: Utils.CHART_COLORS.blue,
            },
            {
                label: 'Awareness Program',
                data: Utils.numbers(NUMBER_CFG),
                backgroundColor: Utils.CHART_COLORS.violet,
            },
            {
                label: 'Patient Support',
                data: Utils.numbers(NUMBER_CFG),
                backgroundColor: Utils.CHART_COLORS.red,
            },
        ] : [
            {
                label: 'Total Used',
                data: Utils.numbers(NUMBER_CFG),
                backgroundColor: Utils.CHART_COLORS.skyblue,
            },
            {
                label: 'Budget Used',
                data: Utils.numbers(NUMBER_CFG),
                backgroundColor: Utils.CHART_COLORS.darkblue,
            },
        ],

    };

    if (isLoading == true) {
        return (
            <>
                <div>loading please wait....</div>
            </>
        )
    }
    const handleSelectChange = (value: string, name: string) => {
        // setFormData((prev) => ({ ...prev, [name]: value }) as formData);
        console.log("in select field")
    };
    const togglePicker = () => {
        setIsPickerOpen(!isPickerOpen);
    };
    const fetchTableData = async () => {
        setActivityData([{
            modules:'Training and Education',
            total: '14',
            approved: '1',
            send_back: '12',
            awaiting_approval: '1',
            rejected: '0',

        },{
            modules:'Sponsorship Support',
            total: '113',
            approved: '88',
            send_back: '8',
            awaiting_approval: '8',
            rejected: '9',

        },{
            modules:'Non Monetary Grant',
            total: '100',
            approved: '25',
            send_back: '25',
            awaiting_approval: '25',
            rejected: '25',

        },{
            modules:'Monetary Grant',
            total: '200',
            approved: '50',
            send_back: '50',
            awaiting_approval: '50',
            rejected: '50',

        },{
            modules:'HCP Services',
            total: '400',
            approved: '190',
            send_back: '200',
            awaiting_approval: '10',
            rejected: '1',

        },{
            modules:'Awareness Program',
            total: '400',
            approved: '100',
            send_back: '100',
            awaiting_approval: '100',
            rejected: '100',

        },{
            modules:'Patient Support',
            total: '40',
            approved: '10',
            send_back: '10',
            awaiting_approval: '10',
            rejected: '10',

        },])
        setExecuteData([{
            modules:'Training and Education',
            total: '14',
            approved: '1',
            send_back: '12',
            awaiting_approval: '1',
            rejected: '0',
            executed: '0',
            execution_pending: '0',

        },{
            modules:'Sponsorship Support',
            total: '113',
            approved: '88',
            send_back: '8',
            awaiting_approval: '8',
            rejected: '9',
            executed: '0',
            execution_pending: '0',

        },{
            modules:'Non Monetary Grant',
            total: '100',
            approved: '25',
            send_back: '25',
            awaiting_approval: '25',
            rejected: '25',
            executed: '0',
            execution_pending: '0',
        },{
            modules:'Monetary Grant',
            total: '200',
            approved: '50',
            send_back: '50',
            awaiting_approval: '50',
            rejected: '50',
            executed: '0',
            execution_pending: '0',
        },{
            modules:'HCP Services',
            total: '400',
            approved: '190',
            send_back: '200',
            awaiting_approval: '10',
            rejected: '1',
            executed: '0',
            execution_pending: '0',
        },{
            modules:'Awareness Program',
            total: '400',
            approved: '100',
            send_back: '100',
            awaiting_approval: '100',
            rejected: '100',
            executed: '0',
            execution_pending: '0',
        },{
            modules:'Patient Support',
            total: '40',
            approved: '10',
            send_back: '10',
            awaiting_approval: '10',
            rejected: '10',
            executed: '0',
            execution_pending: '0',

        },])
        setExpenseData([{
            modules:'Training and Education',
            total: '14',
            approved: '1',
            // send_back: '12',
            awaiting_approval: '1',
            rejected: '0',
            utr_updated: '12',
            utr_pending:'14',

        },{
            modules:'Sponsorship Support',
            total: '113',
            approved: '88',
            // send_back: '8',
            awaiting_approval: '8',
            rejected: '9',
            utr_updated: '12',
            utr_pending:'14',

        },{
            modules:'Non Monetary Grant',
            total: '100',
            approved: '25',
            // send_back: '25',
            awaiting_approval: '25',
            rejected: '25',
            utr_updated: '12',
            utr_pending:'14',
        },{
            modules:'Monetary Grant',
            total: '200',
            approved: '50',
            // send_back: '50',
            awaiting_approval: '50',
            rejected: '50',
            utr_updated: '12',
            utr_pending:'14',
        },{
            modules:'HCP Services',
            total: '400',
            approved: '190',
            // send_back: '200',
            awaiting_approval: '10',
            rejected: '1',
            utr_updated: '12',
            utr_pending:'14',
        },{
            modules:'Awareness Program',
            total: '400',
            approved: '100',
            // send_back: '100',
            awaiting_approval: '100',
            rejected: '100',
            utr_updated: '12',
            utr_pending:'14',
        },{
            modules:'Patient Support',
            total: '40',
            approved: '10',
            // send_back: '10',
            awaiting_approval: '10',
            rejected: '10',
            utr_updated: '12',
            utr_pending:'14',

        },])
        // setLoading(true)
        // console.log("event requetsor", event_requestor) ;
        // try {
        //   const response = await fetch(
        //     `/api/eventApprovalSummaryReport`,
        //     {
        //       method: "POST",
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //       credentials: 'include',
        //       body: JSON.stringify({
        //         search_name: debouncedSearchName,
        //         startDate: startDate,
        //         endDate: endDate,
        //         pageNo: currentPage,
        //         status: status,
        //         requestor: event_requestor,
        //       })
        //     }
        //   );
        //   if (response.ok) {
        //     const data = await response.json();
        //     // console.log('data.data', data.message)
        //     setTableData(data.message);
        //     setLoading(false)
        //   } else {
        //     setLoading(false)
        //   }
        // } catch (error) {
        //   setLoading(false);
        //   console.log(error, "something went wrong");
        // }
    };
    const exportEventList = async () => {
        // try {
        //   const Data = await fetch(
        //     `/api/exportList`,
        //     {
        //       method: "POST",
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //       credentials: 'include',
        //       body: JSON.stringify({
        //         search_name: debouncedSearchName,
        //         status: status,
        //         api_name: 'Pre Activity List',
        //         startDate: startDate,
        //         endDate: endDate,
        //       })
        //     }
        //   );
        //   if (Data.ok) {
        //     const data = await Data.json();
        //     window.open(`${data.message}`, '_blank', 'noopener,noreferrer');
        //   }
    
        // } catch (error) {
        //   console.log(error, "something went wrong");
        // }
      };
    useEffect(() => {
        if (role != undefined) {
            setIsLoading(false);
        }
    }, [role]);

    useEffect(()=>{
        setActivityData([{
            modules:'Training and Education',
            total: '14',
            approved: '1',
            send_back: '12',
            awaiting_approval: '1',
            rejected: '0',

        },{
            modules:'Sponsorship Support',
            total: '113',
            approved: '88',
            send_back: '8',
            awaiting_approval: '8',
            rejected: '9',

        },{
            modules:'Non Monetary Grant',
            total: '100',
            approved: '25',
            send_back: '25',
            awaiting_approval: '25',
            rejected: '25',

        },{
            modules:'Monetary Grant',
            total: '200',
            approved: '50',
            send_back: '50',
            awaiting_approval: '50',
            rejected: '50',

        },{
            modules:'HCP Services',
            total: '400',
            approved: '190',
            send_back: '200',
            awaiting_approval: '10',
            rejected: '1',

        },{
            modules:'Awareness Program',
            total: '400',
            approved: '100',
            send_back: '100',
            awaiting_approval: '100',
            rejected: '100',

        },{
            modules:'Patient Support',
            total: '40',
            approved: '10',
            send_back: '10',
            awaiting_approval: '10',
            rejected: '10',

        },])
        setExecuteData([{
            modules:'Training and Education',
            total: '14',
            approved: '1',
            send_back: '12',
            awaiting_approval: '1',
            rejected: '0',
            executed: '0',
            execution_pending: '0',

        },{
            modules:'Sponsorship Support',
            total: '113',
            approved: '88',
            send_back: '8',
            awaiting_approval: '8',
            rejected: '9',
            executed: '0',
            execution_pending: '0',

        },{
            modules:'Non Monetary Grant',
            total: '100',
            approved: '25',
            send_back: '25',
            awaiting_approval: '25',
            rejected: '25',
            executed: '0',
            execution_pending: '0',
        },{
            modules:'Monetary Grant',
            total: '200',
            approved: '50',
            send_back: '50',
            awaiting_approval: '50',
            rejected: '50',
            executed: '0',
            execution_pending: '0',
        },{
            modules:'HCP Services',
            total: '400',
            approved: '190',
            send_back: '200',
            awaiting_approval: '10',
            rejected: '1',
            executed: '0',
            execution_pending: '0',
        },{
            modules:'Awareness Program',
            total: '400',
            approved: '100',
            send_back: '100',
            awaiting_approval: '100',
            rejected: '100',
            executed: '0',
            execution_pending: '0',
        },{
            modules:'Patient Support',
            total: '40',
            approved: '10',
            send_back: '10',
            awaiting_approval: '10',
            rejected: '10',
            executed: '0',
            execution_pending: '0',

        },])
        setExpenseData([{
            modules:'Training and Education',
            total: '14',
            approved: '1',
            // send_back: '12',
            awaiting_approval: '1',
            rejected: '0',
            utr_updated: '12',
            utr_pending:'14',

        },{
            modules:'Sponsorship Support',
            total: '113',
            approved: '88',
            // send_back: '8',
            awaiting_approval: '8',
            rejected: '9',
            utr_updated: '12',
            utr_pending:'14',

        },{
            modules:'Non Monetary Grant',
            total: '100',
            approved: '25',
            // send_back: '25',
            awaiting_approval: '25',
            rejected: '25',
            utr_updated: '12',
            utr_pending:'14',
        },{
            modules:'Monetary Grant',
            total: '200',
            approved: '50',
            // send_back: '50',
            awaiting_approval: '50',
            rejected: '50',
            utr_updated: '12',
            utr_pending:'14',
        },{
            modules:'HCP Services',
            total: '400',
            approved: '190',
            // send_back: '200',
            awaiting_approval: '10',
            rejected: '1',
            utr_updated: '12',
            utr_pending:'14',
        },{
            modules:'Awareness Program',
            total: '400',
            approved: '100',
            // send_back: '100',
            awaiting_approval: '100',
            rejected: '100',
            utr_updated: '12',
            utr_pending:'14',
        },{
            modules:'Patient Support',
            total: '40',
            approved: '10',
            // send_back: '10',
            awaiting_approval: '10',
            rejected: '10',
            utr_updated: '12',
            utr_pending:'14',

        },])
    },[])
    console.log(role, 'role')
    return (
        <div className='p-10'>
            <div className='h-full space-y-4'>
                <div className=''>
                    <div className="grid grid-cols-6 gap-4 text-black font-poppins">
                        <div className="flex flex-col justify-between items-stretch col-span-1 bg-[#fee4cb] p-5 rounded-2xl">
                            <div className="">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                    <circle cx="20" cy="20" r="20" fill="black" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13 11C11.8954 11 11 11.8954 11 13V27C11 28.1046 11.8954 29 13 29H27C28.1046 29 29 28.1046 29 27V13C29 11.8954 28.1046 11 27 11H13ZM16 21C16 20.4477 15.5523 20 15 20C14.4477 20 14 20.4477 14 21V25C14 25.5523 14.4477 26 15 26C15.5523 26 16 25.5523 16 25V21ZM20 17C20.5523 17 21 17.4477 21 18V25C21 25.5523 20.5523 26 20 26C19.4477 26 19 25.5523 19 25V18C19 17.4477 19.4477 17 20 17ZM26 15C26 14.4477 25.5523 14 25 14C24.4477 14 24 14.4477 24 15V25C24 25.5523 24.4477 26 25 26C25.5523 26 26 25.5523 26 25V15Z" fill="white" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-[#151D48] text-base font-semibold tracking-wide">
                                    Total Events
                                </h3>
                                <span className="text-[#425166] text-sm font-semibold">{Props.carddata?.total_count ?? "n/a"}</span>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between items-stretch col-span-1 bg-[#dbf6fd] p-5 rounded-2xl">

                            <div className="pb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none">
                                    <circle cx="20.1384" cy="20.9685" r="19.9841" fill="black" />
                                    <path d="M21.1991 22.0294C21.7849 21.4436 21.7849 20.4939 21.1991 19.9081L11.6531 10.3621C11.0673 9.77636 10.1176 9.77636 9.53181 10.3621C8.94602 10.9479 8.94602 11.8977 9.53181 12.4835L18.0171 20.9688L9.53181 29.454C8.94602 30.0398 8.94602 30.9896 9.53181 31.5754C10.1176 32.1611 11.0673 32.1611 11.6531 31.5754L21.1991 22.0294ZM0.154297 22.4688H20.1384V19.4688H0.154297V22.4688Z" fill="white" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-[#151D48] text-base font-semibold tracking-wide">
                                    Pre Activity
                                </h3>
                                <span className="text-[#425166] text-sm font-semibold">{Props.carddata?.preactivity_approved_count ?? "n/a"}</span>
                            </div>
                            {/* <h1 className="text-[#4078ec] text-xs font-medium">
                    +8% from yesterday
                  </h1> */}
                        </div>
                        <div className="flex flex-col justify-between items-stretch col-span-1 bg-[#ffd3e2] p-5 rounded-2xl">
                            <div className="pb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                    <circle cx="20" cy="20" r="20" fill="black" />
                                    <path d="M9.93934 27.9393C9.35355 28.5251 9.35355 29.4749 9.93934 30.0607C10.5251 30.6464 11.4749 30.6464 12.0607 30.0607L9.93934 27.9393ZM30.5 11C30.5 10.1716 29.8284 9.5 29 9.5L15.5 9.5C14.6716 9.5 14 10.1716 14 11C14 11.8284 14.6716 12.5 15.5 12.5L27.5 12.5L27.5 24.5C27.5 25.3284 28.1716 26 29 26C29.8284 26 30.5 25.3284 30.5 24.5L30.5 11ZM12.0607 30.0607L30.0607 12.0607L27.9393 9.93934L9.93934 27.9393L12.0607 30.0607Z" fill="white" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-[#151D48] text-base font-semibold tracking-wide">
                                    Total Closed
                                </h3>
                                <span className="text-[#425166] text-sm font-semibold">{Props.carddata?.postactivity_approved_count ?? "n/a"}</span>
                            </div>
                            {/* <h1 className="text-[#4078ec] text-xs font-medium">
                    +8% from yesterday
                  </h1> */}
                        </div>
                        <div className="flex flex-col justify-between items-stretch col-span-1 bg-[#B5D9FF] p-5 rounded-2xl">
                            <div className="">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                    <circle cx="20" cy="20" r="20" fill="black" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20 32C26.6274 32 32 26.6274 32 20C32 13.3726 26.6274 8 20 8C13.3726 8 8 13.3726 8 20C8 26.6274 13.3726 32 20 32ZM21.9609 23.3732C22.3514 23.7637 22.9846 23.7637 23.3751 23.3732C23.7656 22.9826 23.7656 22.3495 23.3751 21.9589L21.4142 19.9981L23.3725 18.0398C23.763 17.6493 23.763 17.0161 23.3725 16.6256C22.9819 16.2351 22.3488 16.2351 21.9583 16.6256L20 18.5839L18.0417 16.6256C17.6512 16.2351 17.0181 16.2351 16.6275 16.6256C16.237 17.0161 16.237 17.6493 16.6275 18.0398L18.5858 19.9981L16.6249 21.9589C16.2344 22.3495 16.2344 22.9826 16.6249 23.3732C17.0154 23.7637 17.6486 23.7637 18.0391 23.3732L20 21.4123L21.9609 23.3732ZM23.4442 11.6853C21.5205 10.8885 19.38 10.7833 17.3874 11.3878C15.3949 11.9922 13.6736 13.2688 12.5168 15.0001C11.36 16.7314 10.8392 18.8102 11.0433 20.8824C11.2474 22.9546 12.1637 24.8919 13.636 26.3642C14.0266 26.7547 14.6597 26.7547 15.0503 26.3642C15.4408 25.9737 15.4408 25.3405 15.0503 24.95C13.9051 23.8048 13.1924 22.298 13.0337 20.6864C12.875 19.0747 13.28 17.4578 14.1797 16.1112C15.0795 14.7647 16.4183 13.7718 17.968 13.3017C19.5178 12.8315 21.1826 12.9133 22.6788 13.5331C24.175 14.1528 25.41 15.2722 26.1735 16.7005C26.9369 18.1287 27.1814 19.7775 26.8655 21.3659C26.5495 22.9542 25.6926 24.3839 24.4408 25.4113C23.1889 26.4387 21.6195 27.0002 20 27.0002C19.4477 27.0002 19 27.448 19 28.0002C19 28.5525 19.4477 29.0002 20 29.0002C22.0822 29.0002 24.1 28.2783 25.7095 26.9573C27.3191 25.6364 28.4209 23.7982 28.8271 21.7561C29.2333 19.7139 28.9188 17.594 27.9373 15.7577C26.9558 13.9213 25.3679 12.4821 23.4442 11.6853Z" fill="white" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-[#151D48] text-base font-semibold tracking-wide">
                                    Post Activity
                                </h3>
                                <span className="text-[#425166] text-sm font-semibold">{Props.carddata?.draft_count ?? "n/a"}</span>
                            </div>
                            {/* <h1 className="text-[#4078ec] text-xs font-medium">
                    +8% from yesterday
                  </h1> */}
                        </div>
                        <div className="flex flex-col justify-between items-stretch col-span-1 bg-[#BFFFCE] p-5 rounded-2xl">
                            <div className="">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                    <circle cx="20" cy="20" r="20" fill="black" />
                                    <path d="M27 29V23M24 26H30M30 18H10M30 20V16.2C30 15.0799 30 14.5198 29.782 14.092C29.5903 13.7157 29.2843 13.4097 28.908 13.218C28.4802 13 27.9201 13 26.8 13H13.2C12.0799 13 11.5198 13 11.092 13.218C10.7157 13.4097 10.4097 13.7157 10.218 14.092C10 14.5198 10 15.0799 10 16.2V23.8C10 24.9201 10 25.4802 10.218 25.908C10.4097 26.2843 10.7157 26.5903 11.092 26.782C11.5198 27 12.0799 27 13.2 27H20" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-[#151D48] text-base font-semibold tracking-wide">
                                    Total Budget
                                </h3>
                                <span className="text-[#425166] text-sm font-semibold">{Props.carddata?.total_budget ?? "n/a"}</span>
                            </div>
                            {/* <h1 className="text-[#4078ec] text-xs font-medium">
                    +8% from yesterday
                  </h1> */}
                        </div>
                        <div className="flex flex-col justify-between items-stretch col-span-1 bg-[#FFF4CB] p-5 rounded-2xl">
                            <div className="">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                    <circle cx="20" cy="20" r="20" fill="black" />
                                    <path d="M24 26H30M30 18H10M30 21.5V16.2C30 15.0799 30 14.5198 29.782 14.092C29.5903 13.7157 29.2843 13.4097 28.908 13.218C28.4802 13 27.9201 13 26.8 13H13.2C12.0799 13 11.5198 13 11.092 13.218C10.7157 13.4097 10.4097 13.7157 10.218 14.092C10 14.5198 10 15.0799 10 16.2V23.8C10 24.9201 10 25.4802 10.218 25.908C10.4097 26.2843 10.7157 26.5903 11.092 26.782C11.5198 27 12.0799 27 13.2 27H20" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-[#151D48] text-base font-semibold tracking-wide">
                                    Used Budget
                                </h3>
                                <span className="text-[#425166] text-sm font-semibold">{Props.carddata?.used_budget ?? "n/a"}</span>
                            </div>
                            {/* <h1 className="text-[#4078ec] text-xs font-medium">
                    +8% from yesterday
                  </h1> */}
                        </div>
                    </div>
                </div>
                <div className='w-full'>
                    <div className='rounded-2xl border border-[#848484] p-6'>
                        <StackedBarChart data={data} setGraphFilter={setGraphFilter} graphFilter={graphFilter} />
                    </div>
                    <div className='flex space-x-3 mt-10 justify-end'>
                        <div>
                            <Select
                                onValueChange={(value) => handleSelectChange(value, "graph_filter")}
                            >
                                <SelectTrigger className="dropdown rounded-[50px]" >
                                    <SelectValue placeholder={"Select User"} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={"Monthly Count"}>Monthly Count</SelectItem>
                                    <SelectItem value={"Monthly Expense"}>Monthly Expense</SelectItem>
                                    <SelectItem value={"Budget Expense"}>Budget Expense</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Select
                                onValueChange={(value) => handleSelectChange(value, "graph_filter")}
                            >
                                <SelectTrigger className="dropdown rounded-[50px]" >
                                    <SelectValue placeholder={"Select Business"} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={"Monthly Count"}>Monthly Count</SelectItem>
                                    <SelectItem value={"Monthly Expense"}>Monthly Expense</SelectItem>
                                    <SelectItem value={"Budget Expense"}>Budget Expense</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Select
                                onValueChange={(value) => handleSelectChange(value, "graph_filter")}
                            >
                                <SelectTrigger className="dropdown rounded-[50px]" >
                                    <SelectValue placeholder={"Select Requestor"} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={"Monthly Count"}>Monthly Count</SelectItem>
                                    <SelectItem value={"Monthly Expense"}>Monthly Expense</SelectItem>
                                    <SelectItem value={"Budget Expense"}>Budget Expense</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <DatePicker startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} isPickerOpen={isPickerOpen} togglePicker={togglePicker} fetchTableData={fetchTableData} />
                        </div>
                    </div>
                    <div className='mt-10 space-y-10'>
                        <div className='border border-[#848484] p-6 rounded-2xl'>
                            <div className='flex justify-between pb-5'>
                                <div className='text-[25px] font-medium leading-[32px] text-[#05004E]'>
                                    Pre-Activity Requests
                                </div>
                                <div>
                                    <Button className="text-black w-34 shadow border hover:shadow-md active:shadow-lg lg:text-sm lg:rounded-[25px] lg:gap-4 sm:rounded-[50px] rounded-[50px] sm:text-[9px] sm:gap-[10px] gap-[9px] sm:font-normal sm:leading-[10.97px] text-[9px]" onClick={exportEventList}>Export</Button>
                                </div>
                            </div>
                            <TableList activityData={activityData}/>
                        </div>


                        <div className='border border-[#848484] p-6 rounded-2xl'>
                            <div className='flex justify-between pb-5'>
                                <div className='text-[25px] font-medium leading-[32px] text-[#05004E]'>
                                    Event Executed
                                </div>
                                <div>
                                    <Button className="text-black w-34 shadow border hover:shadow-md active:shadow-lg lg:text-sm lg:rounded-[25px] lg:gap-4 sm:rounded-[50px] rounded-[50px] sm:text-[9px] sm:gap-[10px] gap-[9px] sm:font-normal sm:leading-[10.97px] text-[9px]" onClick={exportEventList}>Export</Button>
                                </div>
                            </div>
                            <ExecuteTableList executeData={executeData}/>
                        </div>


                        <div className='border border-[#848484] p-6 rounded-2xl'>
                            <div className='flex justify-between pb-5'>
                                <div className='text-[25px] font-medium leading-[32px] text-[#05004E]'>
                                    Post-Activity Requests
                                </div>
                                <div>
                                    <Button className="text-black w-34 shadow border hover:shadow-md active:shadow-lg lg:text-sm lg:rounded-[25px] lg:gap-4 sm:rounded-[50px] rounded-[50px] sm:text-[9px] sm:gap-[10px] gap-[9px] sm:font-normal sm:leading-[10.97px] text-[9px]" onClick={exportEventList}>Export</Button>
                                </div>
                            </div>
                            <TableList activityData={activityData}/>
                        </div>

                        <div className='border border-[#848484] p-6 rounded-2xl'>
                            <div className='flex justify-between pb-5'>
                                <div className='text-[25px] font-medium leading-[32px] text-[#05004E]'>
                                    Post-Expense Requests
                                </div>
                                <div>
                                    <Button className="text-black w-34 shadow border hover:shadow-md active:shadow-lg lg:text-sm lg:rounded-[25px] lg:gap-4 sm:rounded-[50px] rounded-[50px] sm:text-[9px] sm:gap-[10px] gap-[9px] sm:font-normal sm:leading-[10.97px] text-[9px]" onClick={exportEventList}>Export</Button>
                                </div>
                            </div>
                            <ExpenseTableList executeData={expenseData}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
