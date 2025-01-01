import React from "react";
import Details from '@/app/(afterlogin)/dashboard/details'
import {fetchEventList} from '@/app/(afterlogin)/dashboard/utility'
import {fetchCardData} from '@/app/(afterlogin)/dashboard/utility'
import {fetchEventApproverList} from '@/app/(afterlogin)/dashboard/utility'
import {fetchApproverCardData} from '@/app/(afterlogin)/dashboard/utility'
import {fetchEventFinanceList} from '@/app/(afterlogin)/dashboard/utility'
import {fetchFinanceCardData} from '@/app/(afterlogin)/dashboard/utility'
import {fetchEventTravelList} from '@/app/(afterlogin)/dashboard/utility'
import {fetchTravelCardData} from '@/app/(afterlogin)/dashboard/utility'
import { cookies } from "next/headers";

export type tableData = {
  name:string,
  event_type:string,
  event_start_date:string,
  event_end_date:string,
  current_stage:string,
  status:string
  event_name:string
} 
 type CardData = {
  total_count:number,
  preactivity_approved_count:number,
  postactivity_approved_count:number,
  draft_count:number,
}


const Index = async() => {
  const cookie = await cookies();
  const role = cookie.getAll()[5].value;
  let table;
  let  carddata;
  if(role == 'Event Requestor'){
     table = await fetchEventList(cookie);
     carddata = await fetchCardData(cookie);
  }
  if(role == 'Event Approver'){
    table = await fetchEventApproverList(cookie);
    carddata = await fetchApproverCardData(cookie);
 }  

 if(role == 'Event Finance'){
  table = await fetchEventFinanceList(cookie);
  carddata = await fetchFinanceCardData(cookie);
}

if(role == 'Event Travel'){
  table = await fetchEventTravelList(cookie);
  carddata = await fetchTravelCardData(cookie);
}

 console.log(table,'table')
  return (
    (
    <Details
    tableData={table}
    carddata={carddata}
    />
  )
  );
};

export default Index;
