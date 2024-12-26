import React from "react";
import Details from '@/app/(afterlogin)/dashboard/details'
import {fetchEventList} from '@/app/(afterlogin)/dashboard/utility'
import {fetchCardData} from '@/app/(afterlogin)/dashboard/utility'
import { cookies } from "next/headers";

export type tableData = {
  name:string,
  event_type:string,
  event_start_date:string,
  current_stage:string,
  status:string
} 
 type cardData = {
  total_count:number,
  preactivity_approved_count:number,
  postactivity_approved_count:number,
  draft_count:number,
}


const Index = async() => {
  const cookie = await cookies();
  const table:tableData[] = await fetchEventList(cookie);
  const carddata:cardData[] = await fetchCardData(cookie);
  console.log(carddata,'carddata')
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
