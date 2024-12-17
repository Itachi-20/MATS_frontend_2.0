import React from "react";
import Details from '@/app/(afterlogin)/dashboard/details'
import {fetchEventList} from '@/app/(afterlogin)/dashboard/utility'
import { cookies } from "next/headers";

export type tableData = {
  name:string,
  event_type:string,
  event_start_date:string,
  current_stage:string,
  status:string
}

const Index = async() => {
  const cookie = await cookies();
  const table:tableData[] = await fetchEventList(cookie);
  return (
    (
    <Details
    tableData={table}
    />
  )
  );
};

export default Index;
