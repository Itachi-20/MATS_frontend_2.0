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
import { useAuth } from "../../context/AuthContext";
import { tableData } from "@/app/(afterlogin)/dashboard/page"
import { useRouter } from 'next/navigation';
import RequesterDashboard from '@/components/dashboard/event_requester'
import ApproverDashboard from '@/components/dashboard/approver_dashboard'
import FinancerDashboard from '@/components/dashboard/financer_dashboard'
import TravelDashboard from '@/components/dashboard/travel'
type CardData = {
  total_count: number,
  preactivity_approved_count: number,
  postactivity_approved_count: number,
  draft_count: number,
  total_approved_count: number,
  advance_approved_count: number,
  post_exp_appr_count: number,
  expense_approved_count: number
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
  console.log(role, 'role')
  return (
    <>

      {
        role == 'Event Requestor' && <RequesterDashboard tableData={Props.tableData} carddata={Props.carddata} />
      }

      {
        role == 'Event Approver' && <ApproverDashboard tableData={Props.tableData} carddata={Props.carddata} />
      }

      {
        role == 'Event Finance' && <FinancerDashboard tableData={Props.tableData} carddata={Props.carddata} />
      }
      {
        role == 'Event Travel' && <TravelDashboard tableData={Props.tableData} carddata={Props.carddata} />
      }

    </>
  )
}

export default details