"use client";
import React from 'react';
import AuditTrail from '@/components/Audit-trail';

type Data = {
      "request_number": string,
        "event_name": string,
        "event_type":string,
        "event_date": string,
        "event_venue": string,
        "type_of_activity":string,
        "status":string
}

export default function AuditTrailPage (){    

  const data : Data[] = [     
    {
        "request_number": "5620",
        "event_name": "TAVI Workshop",
        "event_type": "Training and Education",
        "event_date": "11-11-2024",
        "event_venue": "Hhhh",
        "type_of_activity": "Activity",
        "status": "Active"
    },
  ]   
  return (
    <>
     <AuditTrail PageName={"eventListPage"} data={data}/>
    </>
  )
}

