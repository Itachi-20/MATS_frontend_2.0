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

export default async function AuditTrailPage ({params}:any){    

  const refno = await params
  const cookie = await cookies();
  const data = await fetchData(cookie,refno.id);
  return (
    <div>
     <AuditTrail PageName={"eventListPage"} data={data.documents}/>
     </div>
  )
}

