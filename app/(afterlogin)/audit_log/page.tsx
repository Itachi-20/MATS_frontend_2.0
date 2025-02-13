'use client'
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Page() {
  const [tableData, setTableData] = useState({
    actual_vendors:[{
      req_no:"22222",
      event_requestor:"Ramesh D",
      created_by:"Gauri Jain",
      event_start_date:"11/02/24",
      event_end_date:"23/02/24",
      saved_as_draft:"23/02/24",
      saved_draft_in_days:"1",
      request_submitted_for_approval:"26/11/24",
      request_submitted_in_days:"1",
      approver_1_name:"Person Name",
      first_approved_date:"27/04/24",
      first_business_approved_in_days:"1",
      approver_2_name:"Person Name",
      second_approved_date:"27/04/24",
      second_business_approved_in_days:"1",
      approver_3_name:"Person Name",
      third_approved_date:"27/04/24",
      third_business_approved_in_days:"1",
      approver_4_name:"Person Name",
      fourth_approved_date:"27/04/24",
      fourth_business_approved_in_days:"1",
      approver_5_name:"Person Name",
      fifth_approved_date:"27/04/24",
      fifth_business_approved_in_days:"1",
      approver_6_name:"Person Name",
      sixth_approved_date:"27/04/24",
      sixth_business_approved_in_days:"1",
      approver_7_name:"Person Name",
      seventh_approved_date:"27/04/24",
      seventh_business_approved_in_days:"1",
      total_days_by_requestor:"3",
      total_days_by_approver:"7",

    },
    {
      req_no:"22222",
      event_requestor:"Ramesh D",
      created_by:"Gauri Jain",
      event_start_date:"11/02/24",
      event_end_date:"23/02/24",
      saved_as_draft:"23/02/24",
      saved_draft_in_days:"1",
      request_submitted_for_approval:"26/11/24",
      request_submitted_in_days:"1",
      approver_1_name:"Person Name",
      first_approved_date:"27/04/24",
      first_business_approved_in_days:"1",
      approver_2_name:"Person Name",
      second_approved_date:"27/04/24",
      second_business_approved_in_days:"1",
      approver_3_name:"Person Name",
      third_approved_date:"27/04/24",
      third_business_approved_in_days:"1",
      approver_4_name:"Person Name",
      fourth_approved_date:"27/04/24",
      fourth_business_approved_in_days:"1",
      approver_5_name:"Person Name",
      fifth_approved_date:"27/04/24",
      fifth_business_approved_in_days:"1",
      approver_6_name:"Person Name",
      sixth_approved_date:"27/04/24",
      sixth_business_approved_in_days:"1",
      approver_7_name:"Person Name",
      seventh_approved_date:"27/04/24",
      seventh_business_approved_in_days:"10",
      total_days_by_requestor:"10",
      total_days_by_approver:"14",

    }

    ]
  });

  const tabledata = {
    actual_vendors:[{
      req_no:"22222",
      event_requestor:"Ramesh D",
      created_by:"Gauri Jain",
      event_start_date:"11/02/24",
      event_end_date:"23/02/24",
      saved_as_draft:"23/02/24",
      saved_draft_in_days:"1",
      request_submitted_for_approval:"26/11/24",
      request_submitted_in_days:"1",
      approver_1_name:"Person Name",
      first_approved_date:"27/04/24",
      first_business_approved_in_days:"1",
      approver_2_name:"Person Name",
      second_approved_date:"27/04/24",
      second_business_approved_in_days:"1",
      approver_3_name:"Person Name",
      third_approved_date:"27/04/24",
      third_business_approved_in_days:"1",
      approver_4_name:"Person Name",
      fourth_approved_date:"27/04/24",
      fourth_business_approved_in_days:"1",
      approver_5_name:"Person Name",
      fifth_approved_date:"27/04/24",
      fifth_business_approved_in_days:"1",
      approver_6_name:"Person Name",
      sixth_approved_date:"27/04/24",
      sixth_business_approved_in_days:"1",
      approver_7_name:"Person Name",
      seventh_approved_date:"27/04/24",
      seventh_business_approved_in_days:"1",
      total_days_by_requestor:"3",
      total_days_by_approver:"7",

    },
    {
      req_no:"22222",
      event_requestor:"Ramesh D",
      created_by:"Gauri Jain",
      event_start_date:"11/02/24",
      event_end_date:"23/02/24",
      saved_as_draft:"23/02/24",
      saved_draft_in_days:"1",
      request_submitted_for_approval:"26/11/24",
      request_submitted_in_days:"1",
      approver_1_name:"Person Name",
      first_approved_date:"27/04/24",
      first_business_approved_in_days:"1",
      approver_2_name:"Person Name",
      second_approved_date:"27/04/24",
      second_business_approved_in_days:"1",
      approver_3_name:"Person Name",
      third_approved_date:"27/04/24",
      third_business_approved_in_days:"1",
      approver_4_name:"Person Name",
      fourth_approved_date:"27/04/24",
      fourth_business_approved_in_days:"1",
      approver_5_name:"Person Name",
      fifth_approved_date:"27/04/24",
      fifth_business_approved_in_days:"1",
      approver_6_name:"Person Name",
      sixth_approved_date:"27/04/24",
      sixth_business_approved_in_days:"1",
      approver_7_name:"Person Name",
      seventh_approved_date:"27/04/24",
      seventh_business_approved_in_days:"10",
      total_days_by_requestor:"11",
      total_days_by_approver:"14",

    }

    ]
  }

  useEffect(()=>{
    setTableData({
      actual_vendors:[{
        req_no:"22222",
        event_requestor:"Ramesh D",
        created_by:"Gauri Jain",
        event_start_date:"11/02/24",
        event_end_date:"23/02/24",
        saved_as_draft:"23/02/24",
        saved_draft_in_days:"1",
        request_submitted_for_approval:"26/11/24",
        request_submitted_in_days:"1",
        approver_1_name:"Person Name",
        first_approved_date:"27/04/24",
        first_business_approved_in_days:"1",
        approver_2_name:"Person Name",
        second_approved_date:"27/04/24",
        second_business_approved_in_days:"1",
        approver_3_name:"Person Name",
        third_approved_date:"27/04/24",
        third_business_approved_in_days:"1",
        approver_4_name:"Person Name",
        fourth_approved_date:"27/04/24",
        fourth_business_approved_in_days:"1",
        approver_5_name:"Person Name",
        fifth_approved_date:"27/04/24",
        fifth_business_approved_in_days:"1",
        approver_6_name:"Person Name",
        sixth_approved_date:"27/04/24",
        sixth_business_approved_in_days:"1",
        approver_7_name:"Person Name",
        seventh_approved_date:"27/04/24",
        seventh_business_approved_in_days:"1",
        total_days_by_requestor:"3",
        total_days_by_approver:"7",
  
      },
      {
        req_no:"22222",
        event_requestor:"Ramesh D",
        created_by:"Gauri Jain",
        event_start_date:"11/02/24",
        event_end_date:"23/02/24",
        saved_as_draft:"23/02/24",
        saved_draft_in_days:"1",
        request_submitted_for_approval:"26/11/24",
        request_submitted_in_days:"1",
        approver_1_name:"Person Name",
        first_approved_date:"27/04/24",
        first_business_approved_in_days:"1",
        approver_2_name:"Person Name",
        second_approved_date:"27/04/24",
        second_business_approved_in_days:"1",
        approver_3_name:"Person Name",
        third_approved_date:"27/04/24",
        third_business_approved_in_days:"1",
        approver_4_name:"Person Name",
        fourth_approved_date:"27/04/24",
        fourth_business_approved_in_days:"1",
        approver_5_name:"Person Name",
        fifth_approved_date:"27/04/24",
        fifth_business_approved_in_days:"1",
        approver_6_name:"Person Name",
        sixth_approved_date:"27/04/24",
        sixth_business_approved_in_days:"1",
        approver_7_name:"Person Name",
        seventh_approved_date:"27/04/24",
        seventh_business_approved_in_days:"10",
        total_days_by_requestor:"10",
        total_days_by_approver:"14",
  
      }
  
      ]
    })
  },[]);
  console.log("Table data", tableData)
  return (
    <div>
      <div className="border bg-white h-full p-4 rounded-[18px] m-6">
        <Table className={""}>
          <TableHeader className={"bg-[#E0E9FF]"}>
            <TableRow className={"text-nowrap rounded-r-2xl border-none"}>
              <TableHead
                className={
                  "text-center rounded-l-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Req no.
              </TableHead>
              <TableHead
                className={
                  "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Event Request Number
              </TableHead>
              <TableHead
                className={
                  "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Created By
              </TableHead>
              <TableHead
                className={
                  "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Event Start Date
              </TableHead>

              <TableHead
                className={
                  "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Event End Date
              </TableHead>

              <TableHead
                className={
                  "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Saved as draft
              </TableHead>

              <TableHead
                className={
                  "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Saved draft in Days
              </TableHead>

              <TableHead
                className={
                  "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Request Submitted
                for Approval
              </TableHead>

              <TableHead
                className={
                  "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Request Submitted
                in Days
              </TableHead>

              <TableHead
                className={
                  "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Approver 1
                Name
              </TableHead>
              <TableHead
                className={
                  "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Approved
                Date
              </TableHead>
              <TableHead
                className={
                  "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Business Approved
                in Days
              </TableHead>
              <TableHead
                className={
                  "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Approver 2
                Name
              </TableHead>
              <TableHead
                className={
                  "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Approved
                Date
              </TableHead>
              <TableHead
                className={
                  "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Business Approved
                in Days
              </TableHead>
              <TableHead
                className={
                  "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Approver 3
                Name
              </TableHead>
              <TableHead
                className={
                  "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Approved
                Date
              </TableHead>
              <TableHead
                className={
                  "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Business Approved
                in Days
              </TableHead>
              <TableHead
                className={
                  "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Approver 4
                Name
              </TableHead>
              <TableHead
                className={
                  "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Approved
                Date
              </TableHead>
              <TableHead
                className={
                  "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Business Approved
                in Days
              </TableHead>
              <TableHead
                className={
                  "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Approver 5
                Name
              </TableHead>
              <TableHead
                className={
                  "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Approved
                Date
              </TableHead>
              <TableHead
                className={
                  "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Business Approved
                in Days
              </TableHead>
              <TableHead
                className={
                  "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Approver 6
                Name
              </TableHead>
              <TableHead
                className={
                  "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Approved
                Date
              </TableHead>
              <TableHead
                className={
                  "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Business Approved
                in Days
              </TableHead>
              <TableHead
                className={
                  "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Approver 7
                Name
              </TableHead>
              <TableHead
                className={
                  "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Approved
                Date
              </TableHead>

              <TableHead
                className={
                  "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Business Approved
                in Days
              </TableHead>

              <TableHead
                className={
                  "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat'] border-l border-r sticky right-[200px] z-20 bg-[#E0E9FF] min-w-[80px]"
                }
              >Total Days
                by Requestor</TableHead>
              <TableHead
                className={
                  "text-center rounded-r-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat'] sticky right-0 z-20 bg-[#E0E9FF] min-w-[120px]"
                }
              >Total Days
                by Approver</TableHead>
            </TableRow>
          </TableHeader>
          {
            tabledata?.actual_vendors &&
              tabledata.actual_vendors.length > 0 ?
              <TableBody>
                {tableData &&
                  tableData.actual_vendors.map((data, index) => {
                    return (
                      <TableRow key={index} className="text-center text-nowrap text-black">
                        <TableCell>{data.req_no ?? "-"}</TableCell>
                        <TableCell>{data.event_requestor ?? "-"}</TableCell>
                        <TableCell>{data.created_by ?? "-"}</TableCell>
                        <TableCell>{data.event_start_date ?? "-"}</TableCell>
                        <TableCell>{data.event_end_date ?? "-"}</TableCell>
                        <TableCell>{data.saved_as_draft ?? "-"}</TableCell>
                        <TableCell>{data.saved_draft_in_days ?? "-"}</TableCell>
                        <TableCell>{data.request_submitted_for_approval ?? "-"}</TableCell>
                        <TableCell>{data.request_submitted_in_days ?? "-"}</TableCell>
                        <TableCell>{data.approver_1_name ?? "-"}</TableCell>
                        <TableCell>{data.first_approved_date ?? "-"}</TableCell>
                        <TableCell>
                          <span className={`text-[15px] font-semibold rounded-[5px] px-2 py-1 ${(Number(data.first_business_approved_in_days) > 0 && Number(data.first_business_approved_in_days) < 8) ? 'bg-[#319EC340] text-[#2177948C]': (Number(data.first_business_approved_in_days) > 6 && Number(data.first_business_approved_in_days) < 11) ? 'bg-[#FFB681] text-[#FF532D]' : (Number(data.first_business_approved_in_days) > 10) ? 'bg-[#FF9A9A] text-[#B60101]' : '' }`}>
                            {data.first_business_approved_in_days ?? "-"}
                          </span>
                        </TableCell>
                        <TableCell>{data.approver_2_name ?? "-"}</TableCell>
                        <TableCell>{data.second_approved_date ?? "-"}</TableCell>
                        <TableCell>
                          <span className={`text-[15px] font-semibold rounded-[5px] px-2 py-1 ${(Number(data.second_business_approved_in_days) > 0 && Number(data.second_business_approved_in_days) < 8) ? 'bg-[#319EC340] text-[#2177948C]': (Number(data.second_business_approved_in_days) > 6 && Number(data.second_business_approved_in_days) < 11) ? 'bg-[#FFB681] text-[#FF532D]' : (Number(data.second_business_approved_in_days) > 10) ? 'bg-[#FF9A9A] text-[#B60101]' : '' }`}>
                            {data.second_business_approved_in_days ?? "-"}
                          </span>
                        </TableCell>
                        <TableCell>{data.approver_3_name ?? "-"}</TableCell>
                        <TableCell>{data.third_approved_date ?? "-"}</TableCell>
                        <TableCell>
                          <span className={`text-[15px] font-semibold rounded-[5px] px-2 py-1 ${(Number(data.third_business_approved_in_days) > 0 && Number(data.third_business_approved_in_days) < 8) ? 'bg-[#319EC340] text-[#2177948C]': (Number(data.third_business_approved_in_days) > 6 && Number(data.third_business_approved_in_days) < 11) ? 'bg-[#FFB681] text-[#FF532D]' : (Number(data.third_business_approved_in_days) > 10) ? 'bg-[#FF9A9A] text-[#B60101]' : '' }`}>
                            {data.third_business_approved_in_days ?? "-"}
                          </span>
                        </TableCell>
                        <TableCell>{data.approver_4_name ?? "-"}</TableCell>
                        <TableCell>{data.fourth_approved_date ?? "-"}</TableCell>
                        <TableCell>
                          <span className={`text-[15px] font-semibold rounded-[5px] px-2 py-1 ${(Number(data.fourth_business_approved_in_days) > 0 && Number(data.fourth_business_approved_in_days) < 8) ? 'bg-[#319EC340] text-[#2177948C]': (Number(data.fourth_business_approved_in_days) > 6 && Number(data.fourth_business_approved_in_days) < 11) ? 'bg-[#FFB681] text-[#FF532D]' : (Number(data.fourth_business_approved_in_days) > 10) ? 'bg-[#FF9A9A] text-[#B60101]' : '' }`}>
                            {data.fourth_business_approved_in_days ?? "-"}
                          </span>
                        </TableCell>
                        <TableCell>{data.approver_5_name ?? "-"}</TableCell>
                        <TableCell>{data.fifth_approved_date ?? "-"}</TableCell>
                        <TableCell>
                          <span className={`text-[15px] font-semibold rounded-[5px] px-2 py-1 ${(Number(data.fifth_business_approved_in_days) > 0 && Number(data.fifth_business_approved_in_days) < 8) ? 'bg-[#319EC340] text-[#2177948C]': (Number(data.fifth_business_approved_in_days) > 6 && Number(data.fifth_business_approved_in_days) < 11) ? 'bg-[#FFB681] text-[#FF532D]' : (Number(data.fifth_business_approved_in_days) > 10) ? 'bg-[#FF9A9A] text-[#B60101]' : '' }`}>
                            {data.fifth_business_approved_in_days ?? "-"}
                          </span>
                        </TableCell>
                        <TableCell>{data.approver_6_name ?? "-"}</TableCell>
                        <TableCell>{data.sixth_approved_date ?? "-"}</TableCell>
                        <TableCell>
                          <span className={`text-[15px] font-semibold rounded-[5px] px-2 py-1 ${(Number(data.sixth_business_approved_in_days) > 0 && Number(data.sixth_business_approved_in_days) < 8) ? 'bg-[#319EC340] text-[#2177948C]': (Number(data.sixth_business_approved_in_days) > 6 && Number(data.sixth_business_approved_in_days) < 11) ? 'bg-[#FFB681] text-[#FF532D]' : (Number(data.sixth_business_approved_in_days) > 10) ? 'bg-[#FF9A9A] text-[#B60101]' : '' }`}>
                            {data.sixth_business_approved_in_days ?? "-"}
                          </span>
                        </TableCell>
                        <TableCell>{data.approver_7_name ?? "-"}</TableCell>
                        <TableCell>{data.seventh_approved_date ?? "-"}</TableCell>
                        <TableCell>
                          <span className={`text-[15px] font-semibold rounded-[5px] px-2 py-1 ${(Number(data.seventh_business_approved_in_days) > 0 && Number(data.seventh_business_approved_in_days) < 8) ? 'bg-[#319EC340] text-[#2177948C]': (Number(data.seventh_business_approved_in_days) > 6 && Number(data.seventh_business_approved_in_days) < 11) ? 'bg-[#FFB681] text-[#FF532D]' : (Number(data.seventh_business_approved_in_days) > 10) ? 'bg-[#FF9A9A] text-[#B60101]' : '' }`}>
                            {data.seventh_business_approved_in_days ?? "-"}
                          </span>
                        </TableCell>

                        {/* <TableCell className='z-20 gap-4 w-[120px] bg-white mt-2 flex border-l justify-center mb-2'> */}
                        <TableCell className="sticky right-[203px] z-20 min-w-[80px] bg-white shadow-2xl shadow-black border-l border-r border-slate-200">
                        <span className={`text-[15px] font-semibold rounded-[5px] px-2 py-1 ${(Number(data.total_days_by_requestor) > 0 && Number(data.total_days_by_requestor) < 8) ? 'bg-[#319EC340] text-[#2177948C]': (Number(data.total_days_by_requestor) > 6 && Number(data.total_days_by_requestor) < 11) ? 'bg-[#FFB681] text-[#FF532D]' : (Number(data.total_days_by_requestor) > 10) ? 'bg-[#FF9A9A] text-[#B60101]' : '' }`}>{data.total_days_by_requestor}</span>
                        </TableCell>

                        <TableCell className="sticky right-0 z-20 gap-4 min-w-[120px] mt-2 mb-2 bg-white">
                          <span className={`text-[15px] font-semibold rounded-[5px] px-2 py-1 ${(Number(data.total_days_by_approver) > 0 && Number(data.total_days_by_approver) < 8) ? 'bg-[#319EC340] text-[#2177948C]': (Number(data.total_days_by_approver) > 6 && Number(data.total_days_by_approver) < 11) ? 'bg-[#FFB681] text-[#FF532D]' : (Number(data.total_days_by_approver) > 10) ? 'bg-[#FF9A9A] text-[#B60101]' : '' }`}>{data.total_days_by_approver ?? "-"}</span>
                        </TableCell>
                      </TableRow>

                    );
                  })}
              </TableBody>
              :
              <TableBody>
                <TableRow className="text-center text-black text-nowrap ">
                  <TableCell colSpan={9}>No Results</TableCell>
                </TableRow>
              </TableBody>
          }
        </Table>
      </div>
    </div>
  )
}
