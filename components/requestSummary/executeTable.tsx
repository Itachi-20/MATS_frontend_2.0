import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

type data = {
    modules:string,
    total: string,
    approved: string,
    send_back: string,
    awaiting_approval: string,
    executed: string,
    execution_pending: string,
    rejected: string,
}

type props = {
    executeData: data[]
}

const table = ({...Props}:props) => {
    console.log(Props.executeData)
    return (
        <div>
            <Table className={""}>
                <TableHeader className={"bg-[#E0E9FF]"}>
                    <TableRow className={"text-nowrap rounded-r-2xl border-none"}>
                        <TableHead
                            className={
                                "text-center rounded-l-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                            }
                        >
                            Modules
                        </TableHead>
                        <TableHead
                            className={
                                "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                            }
                        >
                            Total
                        </TableHead>
                        <TableHead
                            className={
                                "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                            }
                        >
                            Approved
                        </TableHead>

                        <TableHead
                            className={
                                "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                            }
                        >
                            Send Back
                        </TableHead>

                        <TableHead
                            className={
                                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                            }
                        >
                            Awaiting Approval
                        </TableHead>
                        <TableHead
                            className={
                                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                            }
                        >
                            Rejected
                        </TableHead>
                        <TableHead
                            className={
                                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                            }
                        >
                            Executed
                        </TableHead>
                        <TableHead
                            className={
                                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat'] rounded-r-2xl"
                            }
                        >
                            Execution Pending
                        </TableHead>

                        {/* <TableHead
                                            className={
                                                "text-center rounded-r-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat'] sticky right-0 z-20 bg-[#E0E9FF]"
                                            }
                                        >Action</TableHead> */}
                    </TableRow>
                </TableHeader>
                {
                    Props.executeData ?
                        <TableBody>
                            {Props?.executeData &&
                                Props?.executeData?.map((data, index) => {
                                    return (
                                        <TableRow key={index} className="text-center text-nowrap text-black">
                                            <TableCell className='text-left'>{data.modules ?? "-"}</TableCell>
                                            <TableCell>{data.total ?? "-"}</TableCell>
                                            <TableCell>{data.approved ?? "-"}</TableCell>
                                            <TableCell>{data.send_back ?? "-"}</TableCell>
                                            <TableCell>{data.awaiting_approval ?? "-"}</TableCell>
                                            <TableCell>{data.rejected ?? "-"}</TableCell>
                                            <TableCell>{data.executed ?? "-"}</TableCell>
                                            <TableCell>{data.execution_pending ?? "-"}</TableCell>
                                            {/* <TableCell>{data.status}</TableCell>
                                            <TableCell>{data.gst}</TableCell>
                                            <TableCell>{data.invoice_amount}</TableCell>
                                            <TableCell>{data.tds}</TableCell>
                                            <TableCell>{data.net_amount}</TableCell>
                                            <TableCell>{data.utr_number ?? "-"}</TableCell>
                                            <TableCell>{data.payment_date ?? "-"}</TableCell> */}
                                            {/* <TableCell className='sticky right-0 z-20 gap-3 w-[120px] bg-white mt-2 flex justify-center border-l'>
                                                <button onClick={() => Props.handleSetFileData(data.files)}><Image src={'/svg/view.svg'} alt='viewsvg' width={24} height={18} /></button> */}
                                                {/* <Image src={'/svg/view.svg'} alt='viewsvg' width={24}  height={18}/> */}
                                                {/* <Image src={'/svg/editIcon.svg'} alt='editsvg' width={20} height={18} />
                          <Image src={'/svg/delete.svg'} alt='deletesvg' width={20} height={18} /> */}
                                            {/* </TableCell> */}
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
    )
}

export default table