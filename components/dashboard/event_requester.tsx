'use client'
import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../app/context/AuthContext";
import { tableData } from "@/app/(afterlogin)/dashboard/page"
import { useRouter } from 'next/navigation';
import RequesterDashboard from '@/components/dashboard/event_requester'
type CardData = {
  total_count: number,
  preactivity_approved_count: number,
  postactivity_approved_count: number,
  draft_count: number,
}
type Props = {
  tableData: tableData[]
  carddata: CardData
}

const details = ({ ...Props }: Props) => {
  const { role, name, userid, clearAuthData } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  if (isLoading == true) {
    return (
      <>
        <div>loading please wait....</div>
      </>
    )
  }

  useEffect(() => {
    if (role != undefined) {
      setIsLoading(false);
    }
  }, [role])

  return (
<>
<RequesterDashboard tableData={Props.tableData} carddata={Props.carddata}/>
</>
  )
}

export default details