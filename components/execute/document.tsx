import React from 'react'
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from 'next/link';

type EventEntry = {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  event_type: string;
  company: string;
  event_cost_center: string;
  state: string;
  sub_type_of_activity: string;
  business_unit: string;
  division_category: string;
  therapy: string;
  event_requestor: string;
  division_sub_category: string;
  status: string;
  current_stage: string;
  event_name: string;
  event_start_date: string;
  any_govt_hcp: string;
  comments: string;
  faculty: string;
  event_venue: string;
  event_end_date: string;
  no_of_hcp: number;
  bu_rational: string;
  participants: string;
  total_compensation_expense: number;
  has_advance_expense: number;
  total_logistics_expense: number;
  total_estimated_expense: number;
  currency: string;
  preactivity_status: string;
  advance_status: string;
  post_activity_status: string;
  post_expense_status: string;
  post_expense_check: number;
  travel_expense_status: string;
  travel_expense_check: number;
  invoice_amount: number;
  basic_amount: number;
  tds: number;
  gst: number;
  net_amount: number;
  doctype: string;
  compensation: Compensation[];
  travel_expense_approvers: any[]; // Empty array, can be customized later
  post_expense_approvers: any[]; // Empty array, can be customized later
  preactivity_approvers: ApproverStatus[];
  post_activity_approvers: any[]; // Empty array, can be customized later
  occurrence_status: OccurrenceStatus[];
  logistics: Logistics[];
  documents: ActivityDocument[];
  advance_approvers: any[]; // Empty array, can be customized later
  city:string
  reporting_head:string
}

type Compensation = {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  vendor_type: string;
  actual_amount: number;
  status: string;
  vendor_name: string;
  advance: number;
  budget_category: string;
  est_amount: number;
  gst_included: number;
  gst: string;
  occurrence_no: number;
  parent: string;
  parentfield: string;
  parenttype: string;
  doctype: string;
}

type ApproverStatus = {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  approver_level: string;
  action_date: string;
  approver: string;
  remarks: string;
  approver_status: string;
  occurrence_no: number;
  parent: string;
  parentfield: string;
  parenttype: string;
  doctype: string;
}

type OccurrenceStatus = {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  occurrence_no: number;
  status: string;
  parent: string;
  parentfield: string;
  parenttype: string;
  doctype: string;
}

type Logistics = {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  vendor_type: string;
  actual_amount: number;
  status: string;
  advance: number;
  budget_category: string;
  est_amount: number;
  gst_included: number;
  gst: string;
  occurrence_no: number;
  parent: string;
  parentfield: string;
  parenttype: string;
  doctype: string;
}

type File = {
  url: string;
  name: string;
  file_name:string
};

type DocumentDetails = {
  type: string;
  file: File[];
};

type ActivityDocument = {
  activity_type: string;
  document: DocumentDetails[];
};


type Props = {
  pathname:string
  eventData:EventEntry | undefined
}

const Documents = ({...Props}:Props) => {
  return (
    <div className="md:pb-8">
      <div className="flex gap-5">
        <h1 className="text-black md:text-[30px] md:font-medium uppercase md:pb-4">
          Documents
        </h1>
      </div>
      {
        Props.eventData && Props.eventData.documents?.map((item,index)=>{
          return (
      <div className='border border-[#848484] p-4 rounded-2xl w-full'>
        <h1 className="text-black pl-4 pb-4">
          Document type:{" "}
          <span className="font-semibold">{item.activity_type}</span>
        </h1>
        <div className="bg-white">
          <div className="flex flex-col">
            <Table>
              <TableHeader>
                <TableRow className="text-black">
                  <TableHead className={"bg-[#E0E9FF] rounded-2xl text-[15px] w-[50%]"}
                  >
                    Supporting Document
                  </TableHead>
                  <TableHead className={"bg-[#E0E9FF] rounded-2xl text-[15px] w-[50%]"}
                  >
                    Supporting Document
                    
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  item && item.document?.map((item2,index)=>{
                    return (
                <TableRow className="text-black">
                  <TableCell>{item2.type}</TableCell>
                  <TableCell>{item2.file?.map((item3,index)=>{
                    return (
                      <div className='flex justify-between'>
                      <div className='pb-2'>{item3.file_name}</div>
                      <div>
                        <Link rel="stylesheet" href={item3.url}>
                      <Image src={"/svg/view.svg"} width={20} height={20}  alt='view-document' className='cursor-pointer' />
                        </Link>
                      
                      </div>
                      </div>
                    )
                  })}</TableCell>
                </TableRow>
                    )
                  })
                }
                <TableRow className="text-black">
                  
                </TableRow>
              </TableBody>
            </Table>
          </div>
          {/* <div className="col-span-1 flex flex-col gap-3 pl-2">
            <Table>
              <TableHeader>
                <TableRow className="text-black">
                  <TableHead
                    className={"bg-[#E0E9FF] rounded-2xl text-[15px]"}
                  >
                    Uploded Documents
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="text-black flex justify-between items-center">
                  <TableCell>Stationary.cSV</TableCell>
                    <TableCell><Image src="" width={20} height={20}  alt='view-document' className='cursor-pointer' /></TableCell>                
                </TableRow>
                <TableRow className="text-black flex justify-between items-center">
                  <TableCell>Stationary.cSV</TableCell>
                    <TableCell><Image src="/svg/view.svg" width={20} height={20}  alt='view-document' className='cursor-pointer' /></TableCell>                
                </TableRow>
              </TableBody>
            </Table>
          </div>  */}
        </div>
      </div>
      )
    })
  }
    </div>
  )
}

export default Documents