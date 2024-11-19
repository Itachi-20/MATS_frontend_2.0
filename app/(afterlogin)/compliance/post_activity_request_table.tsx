import React from 'react'
import {Table, TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table";

type PreActivityTable = {
    modules:string;
    total:number;
    approved:string;
    send_bank:string;
    awaiting_approval:string;
    rejected:string;
    execute:string;
    execution_pending:string;

}

const PostActivityTable = () => {

    const PreActivityDetails : PreActivityTable[] = [
        {
            modules: "HCP",
            total: 3273,
            approved: 'approved',
            send_bank: 'yes',
            awaiting_approval:'awaiting',
            rejected: 'rejected',
            execute:'execute',
            execution_pending:"pending",
        },
        {
          modules: "HCP",
          total: 3273,
          approved: 'approved',
          send_bank: 'yes',
          awaiting_approval:'awaiting',
          rejected: 'rejected',
          execute:'execute',
          execution_pending:"pending",
      },
      {
        modules: "HCP",
        total: 3273,
        approved: 'approved',
        send_bank: 'yes',
        awaiting_approval:'awaiting',
        rejected: 'rejected',
        execute:'execute',
        execution_pending:"pending",
    },
    ]
    
  return (
        <div className="border-[0.5px] border-[#848484] bg-white h-full p-4 rounded-[24px]">
           <h1 className='text-[30px] text-[#05004E] font-semibold leading-[32px] font-["Poppins"] px-[8px] py-[30px]'>Post-Activity Requests</h1>
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
                  Send Back
                  </TableHead>
                  <TableHead  className={ "text-center text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"} >
                  Awaiting Approval
                  </TableHead>       
                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                  Rejected
                  </TableHead>
                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                 Executed
                  </TableHead>
                  <TableHead
                    className={
                      "text-center  text-[#625d5d] lg:text-[15px] sm:text-[12px] text-[11px] font-normal font-['Montserrat']"
                    }
                  >
                 Execution Pending
                  </TableHead>
                                
                </TableRow>
              </TableHeader>
              <TableBody>
                  {PreActivityDetails &&
                    PreActivityDetails.map((PreActivityDetail, index) => {
                      return (
                        <TableRow key={index} className="text-center text-nowrap">
                          <TableCell>{PreActivityDetail.modules}</TableCell>
                          <TableCell>{PreActivityDetail.total}</TableCell>
                          <TableCell>{PreActivityDetail.approved}</TableCell>                          
                          <TableCell>{PreActivityDetail.send_bank}</TableCell>
                          <TableCell>{PreActivityDetail.awaiting_approval}</TableCell>
                          <TableCell>{PreActivityDetail.rejected}</TableCell>
                          <TableCell>{PreActivityDetail.execute}</TableCell>
                          <TableCell>{PreActivityDetail.execution_pending}</TableCell>
                       </TableRow>
                      );
                    })}
              </TableBody>
            </Table>            
          </div> 
  )
}

export default PostActivityTable