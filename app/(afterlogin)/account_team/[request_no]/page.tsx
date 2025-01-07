import React from 'react'
import RequestDetails from "@/components/request_details"
import BudgetRequest from '@/components/travel_desk/logistics_budget';
import LogisticActualBudget from '@/components/logistic_actual_budget';
import {travel_desk_data,dropdownData} from '../utility'
import { cookies } from 'next/headers';


type occurrence_history = {
  occurrence_no:number,
  actual_amount:number,
  gst:number,
  total_amount:number,
  occurrence_date:string,
  files:file[]
}

type file = {
  name:string,
  file_name:string,
  file_url:string,
  owner:string;
    creation:string;
}

type travel_vendors = {
  vendor_type:string,
  vendor_name:string,
  actual_amount:number,
  gst:number,
  total_amount:number,
  upload_bill:number,
  remarks:string
  files:file[]
  name:string,
  event_conclusion: string,
  status: string,
}

type logistics = {
  vendor_type:string,
  vendor_name:string,
  actual_amount:number,
  gst:number,
  total_amount:number,
  upload_bill:number,
  remarks:string
  est_amount:number,
}

type  travel_desk_data = {
  name:string,
  event_date:string,
  cost_center:string,
  cost_code:string,
  cost_desc:string,
  cost_hod:string,
  business_unit:string,
  event_name:string,
  event_type:string,
  sub_type_of_activity:string,
  event_requestor:string,
  total_logistics_expense:string,
  reporting_head:string
  logistics:logistics[]
  travel_vendors:travel_vendors[];
  occurrence_history:occurrence_history[]
  total_compensation_expense: string
  total_balance_amount: string;
  total_advance_amount: string;
  total_estimated_expense: string
}

type vendorType ={
name:string,
vendor_type:string
}
type dropdown = {
  vendor_type:vendorType[]
  gst:{
    name:string
  }[]
}


export default async function BudgetRequestDetail({...Props}:any)  {
  const {request_no} = await Props.params;
  const cookie = await cookies();
  const role = cookie.get("role")?.value;
  const data:travel_desk_data = await travel_desk_data(cookie,request_no);
  const dropdown:dropdown = await dropdownData(cookie);
  return (
    <div className='px-9 py-7'>
        <RequestDetails 
        data={data}
        />
        <BudgetRequest 
        travelData={data?.logistics}
        />
        <LogisticActualBudget 
        travel_vendors = {data?.travel_vendors}
        vendor_type={dropdown?.vendor_type}
        dropdown_gst = {dropdown?.gst}
        refno = {request_no}
        occurrence_history={data.occurrence_history}
        role = {role}
        />
    </div>
  )}
