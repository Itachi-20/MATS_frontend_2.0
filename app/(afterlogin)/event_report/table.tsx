"use client"
import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {Event} from "@/app/(afterlogin)/event_approval_summary_report/page"
import { useRouter } from 'next/navigation';
type level = "Approved" | "Rejected" | "Pending";
type EventApprovalSummaryReportTable = {
    request_number: string;
    event_name: string;
    event_type: string;
    event_date: string;
    total_expense: number;
    event_requestor: string;
    created_by:string;
    level_1: level;
    level_2: level;
    level_3: level;
    level_4: level;
    level_5: level;
    level_6: level;
    level_7: level;

};

type Props = {
    tableData : Event[]
}

const table = ({ ...Props }: Props) => {
  const router = useRouter()
  console.log(Props.tableData,"this is table data")
  return (
    <div className="border bg-white h-full p-4 rounded-[18px]">
      <Table className={""}>
        <TableHeader className={"bg-[#E0E9FF]"}>
          <TableRow className={"text-nowrap"}>
            <TableHead
              className={
                "text-center rounded-l-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Request No
            </TableHead>
            <TableHead
              className={
                "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Type Of Activity
            </TableHead>
            <TableHead
              className={
                "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Event Name
            </TableHead>

            <TableHead
              className={
                "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              HCP Name
            </TableHead>

            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Sub Activity
            </TableHead>
            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Event Date
            </TableHead>
            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Event End Date
            </TableHead>
            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Cost Center
            </TableHead>
            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Budget
            </TableHead>
            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Therapy
            </TableHead>
            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              No. of Engagement
            </TableHead>
            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Region
            </TableHead>
            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Event Venue
            </TableHead>
            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Status
            </TableHead>
            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Post Act. Status
            </TableHead>
            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Estimated Expense
            </TableHead>
            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Requester
            </TableHead>
            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Created By
            </TableHead>

            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Business Unit
            </TableHead>

            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Reporting Head
            </TableHead>

            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Approver 1
            </TableHead>
            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Approver 2
            </TableHead>
            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Approver 3
            </TableHead>
            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Approver 4
            </TableHead>
            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Approver 5
            </TableHead>
            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Approver 6
            </TableHead>

            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Approver 7
            </TableHead>
            

            <TableHead
              className={
                "sticky right-0 bg-[#E0E9FF] border-l-2 border-gray-450 shadow-2xl rounded-r-2xl  text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              View
            </TableHead>
            

          </TableRow>
        </TableHeader>
        <TableBody>
          {Props &&
            Props.tableData?.map((data, index) => {
              return (
                <TableRow key={index} className="text-center text-nowrap text-black">
                  <TableCell>{data.name}</TableCell>
                  <TableCell>{data.event_type}</TableCell>
                  <TableCell>{data.event_name}</TableCell>
                  <TableCell>{data.hcp_name}</TableCell>
                  <TableCell>{data.sub_type_of_activity}</TableCell>
                  <TableCell>{data.event_start_date}</TableCell>
                  <TableCell>{data.event_end_date}</TableCell>
                  <TableCell>{data.event_cost_center}</TableCell>
                  <TableCell>{data.division_category}</TableCell>
                  <TableCell>{data.therapy}</TableCell>
                  <TableCell>{data.no_of_hcp}</TableCell>
                  <TableCell>{data.zone}</TableCell>
                  <TableCell>{data.event_venue}</TableCell>
                  <TableCell>{data.status}</TableCell>
                  <TableCell>{data.post_activity_status}</TableCell>
                  <TableCell>{data.total_estimated_expense}</TableCell>
                  <TableCell>{data.event_requestor}</TableCell>
                  <TableCell>{data.owner}</TableCell>
                  <TableCell>{data.business_unit}</TableCell>
                  <TableCell>{data.reporting_head}</TableCell>
                  <TableCell>{data.level1?data.level1:"NA"}</TableCell>
                  <TableCell>{data.level2?data.level2:"NA"}</TableCell>
                  <TableCell>{data.level3?data.level3:"NA"}</TableCell>
                  <TableCell>{data.level4?data.level4:"NA"}</TableCell>
                  <TableCell>{data.level5?data.level5:"NA"}</TableCell>
                  <TableCell>{data.level6?data.level6:"NA"}</TableCell>
                  <TableCell>{data.level7?data.level7:"NA"}</TableCell>
                  <TableCell className="flex space-x-6 items-center justify-center sticky right-0 bg-[white] border-l-2 shadow-2xl">
                    <div className="hover:cursor-pointer" onClick={()=>router.push(`/event_detail/${data.name}`)}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                        <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  )
}

export default table