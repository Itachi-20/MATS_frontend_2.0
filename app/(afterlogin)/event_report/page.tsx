import React from "react";
import Table from "@/app/(afterlogin)/event_report/table"
import {eventApprovalSummaryReport} from '../event_report/utility'
import { cookies } from "next/headers";


export type Event = {
    name: string;
    event_type: string;
    event_name: string | null;
    sub_type_of_activity: string;
    event_start_date: string | null;
    event_end_date: string | null;
    event_cost_center: string | null;
    division_category: string | null;
    therapy: string | null;
    no_of_hcp: number;
    state: string | null;
    event_venue: string | null;
    post_activity_status: string;
    status: string;
    total_estimated_expense: number;
    event_requestor: string;
    owner: string;
    business_unit: string | null;
    reporting_head: string | null;
    is_declared: number;
    occurrence_no: number;
    preactivity_submitted: number;
    preactivity_approved: number;
    advance_request_submitted: number;
    advance_request_approved: number;
    post_activity_submitted: number;
    post_activity_approved: number;
    post_expense_submitted: number;
    post_expense_approved: number;
    travel_expense_submitted: number;
    travel_expense_approved: number;
    brief_status: string;
    executed: number;
    stage: string;
    table: string;
    level1: string | null;
    level2: string | null;
    level3: string | null;
    level4: string | null;
    level5: string | null;
    level6: string | null;
    level7: string | null;
    status1: string;
    status2: string;
    status3: string;
    status4: string;
    status5: string;
    status6: string;
    status7: string;
    is_approved: boolean;
  };
  

const Index = async() => {
    const cookie = await cookies()
    const tableData:Event[] = await eventApprovalSummaryReport(cookie);
    console.log(tableData,"this is table data")
    return (
        <Table
        tableData = {tableData}
        />
    );
};

export default Index;
