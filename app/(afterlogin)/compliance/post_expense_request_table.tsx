import React from 'react'
import {Table, TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table";

type PostExpenseRequestTable = {
    modules:string;
    total:number;
    approved:string;
    send_bank:string;
    awaiting_approval:string;
    utr_update:string;
    utr_pending:string;   
    rejected:string;

}

const PostExpenseRequestTable = () => {

    const PostExpenseRequestDetails : PostExpenseRequestTable[] = [
        {
            modules: "HCP",
            total: 3273,
            approved: 'approved',
            send_bank: 'yes',
            awaiting_approval:'awaiting',
            utr_update:"updated",
            utr_pending:"yes",
            rejected: 'rejected'
        },
        {
            modules: "HCP",
            total: 3273,
            approved: 'approved',
            send_bank: 'yes',
            awaiting_approval:'awaiting',
            utr_update:"updated",
            utr_pending:"yes",
            rejected: 'rejected'
        },
        {
            modules: "HCP",
            total: 3273,
            approved: 'approved',
            send_bank: 'yes',
            awaiting_approval:'awaiting',
            utr_update:"updated",
            utr_pending:"yes",
            rejected: 'rejected'
        },

    ]
  return (
        <div className="border-[0.5px] border-[#848484] bg-white h-full p-4 rounded-[24px]">
           <h1 className='text-[30px] text-[#05004E] font-semibold leading-[32px] font-["Poppins"] px-[8px] py-[30px]'>Post-Expense Requests</h1>
            <Table>
              <TableHeader className={"bg-[#E0E9FF]"}>
                <TableRow className={"text-nowrap rounded-r-2xl"}>
                  <TableHead className={"text-center rounded-l-2xl text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"}>
                   Modules
                  </TableHead>
                  <TableHead  className={ "text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"} >
                  Total
                  </TableHead>
                  <TableHead  className={ "text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"} >
                  Approved
                  </TableHead>
                  <TableHead  className={ "text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"} >
                  Awaiting Approval
                  </TableHead>
                  <TableHead  className={ "text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"} >
                  UTR Updated
                  </TableHead> 
                  <TableHead  className={ "text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"} >
                  UTR Pending
                  </TableHead>       
                  <TableHead className={"text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']" } >
                   Rejected
                  </TableHead>                             
                </TableRow>
              </TableHeader>
              <TableBody>
                  {PostExpenseRequestDetails &&
                    PostExpenseRequestDetails.map((PostExpenseRequestDetail, index) => {
                      return (
                        <TableRow key={index} className="text-center text-nowrap">
                          <TableCell>{PostExpenseRequestDetail.modules}</TableCell>
                          <TableCell>{PostExpenseRequestDetail.total}</TableCell>
                          <TableCell>{PostExpenseRequestDetail.approved}</TableCell>   
                          <TableCell>{PostExpenseRequestDetail.awaiting_approval}</TableCell>
                          <TableCell>{PostExpenseRequestDetail.utr_update}</TableCell>
                          <TableCell>{PostExpenseRequestDetail.utr_pending}</TableCell>  
                          <TableCell>{PostExpenseRequestDetail.rejected}</TableCell>  
                       </TableRow>
                      );
                    })}
              </TableBody>
            </Table>            
          </div> 
  )
}

export default PostExpenseRequestTable;