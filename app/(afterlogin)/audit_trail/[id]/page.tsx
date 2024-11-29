import React from 'react';
import AuditTrail from '@/components/Audit-trail';
import {fetchData} from '@/app/(afterlogin)/audit_trail/[id]/utility'
import { cookies } from 'next/headers';
type Data = {
      "request_number": string,
        "event_name": string,
        "event_type":string,
        "event_date": string,
        "event_venue": string,
        "type_of_activity":string,
        "status":string
}

export default async function AuditTrailPage (){    

  // const data : Data[] = [     
  //   {
  //       "request_number": "5620",
  //       "event_name": "TAVI Workshop",
  //       "event_type": "Training and Education",
  //       "event_date": "11-11-2024",
  //       "event_venue": "Hhhh",
  //       "type_of_activity": "Activity",
  //       "status": "Active"
  //   },
  // ]   

  // const fetchData = async()=>{
  //   try {
  //     const Data = await fetch(
  //       `/api/eventList`,
  //       {
  //         method: "POST",
  //         headers:{
  //           "Content-Type": "application/json",
  //         },
  //         credentials:'include',
  //         body:JSON.stringify({
  //           activity:"Pre Activity"
  //         })
  //       }
  //     );
  //     if(Data.ok){
  //       const data = await Data.json();
  //       setTableData(data.message)
  //     }
      
  //   } catch (error) {
  //     console.log(error,"something went wrong");
  //   }
  // }
  const cookie = await cookies();
  const data = await fetchData(cookie);
  return (
    <>
     <AuditTrail PageName={"eventListPage"} data={data}/>
    </>
  )
}

