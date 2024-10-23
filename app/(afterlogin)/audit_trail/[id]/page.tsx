"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import AuditTrail from '@/components/Audit-trail';

export default function AuditTrailPage (){        

    // const router = useRouter() as unknown as { query: any };

    // const { id } = router.query;
    // console.log("id", id)

  return (
    <>
     <AuditTrail PageName={"eventListPage"} />
    </>
  )
}

